import React, { useState, useEffect, useRef } from "react";

import * as Yup from "yup";
import { Formik, FieldArray, Form, Field } from "formik";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from '@material-ui/lab/Autocomplete';

import { i18n } from "../../translate/i18n";

import api from "../../services/api";
import toastError from "../../errors/toastError";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		marginRight: theme.spacing(1),
		flex: 1,
	},

	extraAttr: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	btnWrapper: {
		position: "relative",
	},

	buttonProgress: {
		color: green[500],
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
}));

const ContactSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Muito curto!")
		.max(50, "Muito longo!")
		.required("Campo Obrigatório"),
	number: Yup.string().min(8, "Muito curto!").max(50, "Muito longo!").required("Campo Obrigatório"),
	email: Yup.string().email("Email inválido"),
});

const ContactModal = ({ open, onClose, contactId, initialValues, onSave }) => {
	const classes = useStyles();
	const isMounted = useRef(true);

	const estagioOptions = ['ESPECULATIVO', 'OPORTUNIDADE', 'INTERNAÇÃO', 'DESCLASSIFICADO', 'NÃO RETORNOU CONTATO'];
	const sexOptions = ['MASCULINO', 'FEMININO'];
	const [stageValue, setStageValue] = React.useState('');
	const [sexValue, setSexValue] = React.useState('MASCULINO');

	const initialState = {
		name: "",
		number: "",
		email: "",
		stage: "",
		sex: "",
		target: "",
		zipCode: "",
		availability: "",
		insurance: "",
		caseDescription: "",
		typeTreatment: "",
		answered: ""
	};

	const [contact, setContact] = useState(initialState);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);
	
	useEffect(() => {
		const fetchContact = async () => {
			if (initialValues) {
				setContact(prevState => {
					return { ...prevState, ...initialValues };
				});
			}
			
			if (!contactId) return;

			try {
				const { data } = await api.get(`/contacts/${contactId}`);
				if (isMounted.current) {
					setContact(data);
				}
			} catch (err) {
				toastError(err);
			}
		};

		fetchContact();
	}, [contactId, open, initialValues]);

	const handleClose = () => {
		onClose();
		setContact(initialState);
	};

	const handleSaveContact = async values => {
		try {
			if (contactId) {
				await api.put(`/contacts/${contactId}`, values);
				handleClose();
			} else {
				const { data } = await api.post("/contacts", { ...values, stage: stageValue, sex: sexValue });
				if (onSave) {
					onSave(data);
				}
				handleClose();
			}
			toast.success(i18n.t("contactModal.success"));
		} catch (err) {
			toastError(err);
		}
	};

	return (
		<div className={classes.root}>
			<Dialog open={open} onClose={handleClose} maxWidth="lg" scroll="paper">
				<DialogTitle id="form-dialog-title">
					{contactId
						? `${i18n.t("contactModal.title.edit")}`
						: `${i18n.t("contactModal.title.add")}`}
				</DialogTitle>
				<Formik
					initialValues={contact}
					enableReinitialize={true}
					validationSchema={ContactSchema}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							handleSaveContact(values);
							actions.setSubmitting(false);
						}, 400);
					}}
				>
					{({ values, errors, touched, isSubmitting }) => (
						<Form>
							<DialogContent dividers>
								<Typography variant="subtitle1" gutterBottom>
									{i18n.t("contactModal.form.mainInfo")}
								</Typography>
								<Field
									as={TextField}
									label={i18n.t("contactModal.form.name")}
									name="name"
									autoFocus
									error={touched.name && Boolean(errors.name)}
									helperText={touched.name && errors.name}
									variant="outlined"
									margin="dense"
									className={classes.textField}
								/>
								<Field
									as={TextField}
									label={i18n.t("contactModal.form.number")}
									name="number"
									error={touched.number && Boolean(errors.number)}
									helperText={touched.number && errors.number}
									placeholder="5513912344321"
									variant="outlined"
									margin="dense"
								/>
								<div>
									<Field
										as={TextField}
										label={i18n.t("contactModal.form.email")}
										name="email"
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && errors.email}
										placeholder="Email address"
										fullWidth
										margin="dense"
										variant="outlined"
									/>
								</div>

								<div>
									<Autocomplete
										value={stageValue}
										onInputChange={(event, newInputValue) => {
											setStageValue(newInputValue);
										}}
										as={TextField}
										options={estagioOptions}
										fullWidth
										name="stage"
										renderInput={(params) =>
											<Field
												{...params}
												name="stage"
												as={TextField}
												label="Estágio"
												variant="outlined"
												margin="dense"
											/>
										}
									/>
								</div>

								<br />

								<div>
									<Typography variant="subtitle1" gutterBottom>
										Questionário
									</Typography>

									<div>
										<Autocomplete
											value={sexValue}
											onInputChange={(event, newInputValue) => {
												setSexValue(newInputValue);
											}}
											as={TextField}
											options={sexOptions}
											name="sex"
											renderInput={(params) =>
												<Field
													{...params}
													name="stage"
													as={TextField}
													label="Sexo"
													variant="outlined"
													margin="dense"
												/>
											}
										/>
									</div>
									<Field
										as={TextField}
										label="Atendimento para"
										name="target"
										variant="outlined"
										margin="dense"
										className={classes.textField}
									/>
								</div>

								<div>
									<Field
										as={TextField}
										label="CEP"
										name="zipCode"
										variant="outlined"
										margin="dense"
										className={classes.textField}
										placeholder="CEP"
									/>
									<Field
										as={TextField}
										label="Consegue levar o paciente?"
										name="availability"
										variant="outlined"
										margin="dense"
										className={classes.textField}
										placeholder="Consegue levar o paciente?"
									/>
								</div>

								<div>
									<Field
										as={TextField}
										label="Possui convênio médico?"
										name="insurance"
										variant="outlined"
										margin="dense"
										className={classes.textField}
										placeholder="Possui convênio médico?"
									/>
									<Field
										as={TextField}
										label="Resumo do caso"
										name="caseDescription"
										variant="outlined"
										margin="dense"
										className={classes.textField}
										placeholder="Resumo do caso"
									/>
								</div>

								<div>
									<Field
										as={TextField}
										label="Tipo de tratamento"
										name="typeTreatment"
										variant="outlined"
										margin="dense"
										className={classes.textField}
										placeholder="Tipo de tratamento"
									/>
									<Field
										as={TextField}
										label="Respondeu o Questionário"
										name="answered"
										variant="outlined"
										margin="dense"
										className={classes.textField}
										placeholder="Respondeu o Questionário"
									/>
								</div>

								<Typography
									style={{ marginBottom: 8, marginTop: 12 }}
									variant="subtitle1"
								>
									{i18n.t("contactModal.form.extraInfo")}
								</Typography>

								<FieldArray name="extraInfo">
									{({ push, remove }) => (
										<>
											{values.extraInfo &&
												values.extraInfo.length > 0 &&
												values.extraInfo.map((info, index) => (
													<div
														className={classes.extraAttr}
														key={`${index}-info`}
													>
														<Field
															as={TextField}
															label={i18n.t("contactModal.form.extraName")}
															name={`extraInfo[${index}].name`}
															variant="outlined"
															margin="dense"
															disabled="disabled"
															className={classes.textField}
														/>
														<Field
															as={TextField}
															label={i18n.t("contactModal.form.extraValue")}
															name={`extraInfo[${index}].value`}
															variant="outlined"
															margin="dense"
															className={classes.textField}
														/>
													</div>
												))}
										</>
									)}
								</FieldArray>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={handleClose}
									color="secondary"
									disabled={isSubmitting}
									variant="outlined"
								>
									{i18n.t("contactModal.buttons.cancel")}
								</Button>
								<Button
									type="submit"
									color="primary"
									disabled={isSubmitting}
									variant="contained"
									className={classes.btnWrapper}
								>
									{contactId
										? `${i18n.t("contactModal.buttons.okEdit")}`
										: `${i18n.t("contactModal.buttons.okAdd")}`}
									{isSubmitting && (
										<CircularProgress
											size={24}
											className={classes.buttonProgress}
										/>
									)}
								</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</div>
	);
};

export default ContactModal;
