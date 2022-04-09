# Fila de atendimento Whats

**NOTA**: A nova versão do whatsapp-web.js exigiu o Node 14. Atualize suas instalações para continuar usando.

Um sistema de tickets muito simples baseado em mensagens do WhatsApp.

O Backend usa o [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) para receber e enviar mensagens do WhatsApp, criar tickets a partir delas e armazenar tudo em um banco de dados MySQL.

O frontend é um aplicativo de chat multiusuário com recursos completos inicializado com react-create-app e Material UI, que se comunica com o backend usando REST API e Websockets. Ele permite que você interaja com contatos, tickets, envie e receba mensagens do WhatsApp.

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=14.17.0&color=green&style=for-the-badge"/>
  <img src="https://img.shields.io/static/v1?label=Express&message=4.17.1&color=red&style=for-the-badge"/>
</p>

> Status do Projeto: :warning: (em desenvolvimento...)

## Como rodar a aplicação :arrow_forward:

Instale dependências de back-end, crie aplicativos, execute migrations e seeds:

```
$ npm install
$ npm run build
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```

Instale dependências de front-end:

```
$ npm install
$ npm run build
```

Execute os projetos: 

```
$ npm start
```

No seu navegador acesse o endereço: 

```
$ http://localhost:8080
```