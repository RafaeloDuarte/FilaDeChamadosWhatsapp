import React, { useContext, useState } from "react";
import { render } from 'react-dom';
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/Auth/AuthContext";
import { Can } from "../../components/Can";

import Chart from "./Chart";
import { ChartTiposDeAtendimento } from './ChartTiposDeAtendimento';
import { ChartAtendimentosPorAtendente } from './ChartAtendimentosPorAtendente';
import { ChartAtendimentosPorHorario } from './ChartAtendimentosPorHorario';

import moment from 'moment';
import 'moment/locale/pt-br';
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import locale from 'antd/lib/date-picker/locale/pt_BR';

const useStyles = makeStyles(theme => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	fixedHeightPaper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
		height: 240,
	},
	dataPicker: {
		marginRight: theme.spacing(1),
		flex: 1,
	},
}));

const Dashboard = () => {
	const classes = useStyles();
	const { user } = useContext(AuthContext);
	const [startDate, setStartDate] = useState(new Date());

	const dateFormat = 'DD/MM/YYYY';
	const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
	const { RangePicker } = DatePicker;


	if (user.profile == "admin") {

		return (
			<div>
				<Container maxWidth="lg" className={classes.container}>

					<RangePicker
						ranges={{
							Today: [moment(), moment()],
							'This Month': [moment().startOf('month'), moment().endOf('month')],
						}}
						onChange={date => setStartDate(date)}
						defaultValue={moment(startDate, dateFormat)} format={dateFormat}
						format={dateFormatList}
						locale={locale}
						style={{ width: "90%" }}
					/>

					<Button
						size="small"
						variant="contained"
						color="primary"
					>
						Pesquisar
					</Button>
					
					<hr></hr>	<ChartTiposDeAtendimento />
					<hr></hr>	<ChartAtendimentosPorAtendente />
					<hr></hr>	<ChartAtendimentosPorHorario />

				</Container>
			</div>
		);

	}
	else {
		return (
			<div>
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper className={classes.fixedHeightPaper}>
								<Chart />
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	}
};

export default Dashboard;