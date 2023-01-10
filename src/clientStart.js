const { Client, LocalAuth } = require('whatsapp-web.js');
const chalk = require("chalk");

const qrcode = require("qrcode-terminal")


// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// -+-+-+-+
// -+-+-+-+ AUTHOR:     Moisés Alves
// -+-+-+-+ GITHUB:     https://github.com/alves-Moises/ 
// -+-+-+-+ LINKEDIN:   https://www.linkedin.com/in/moises-alves-b1272a204/
// -+-+-+-+ CONTACT ME:    https://linktr.ee/alves_moises
// -+-+-+-+ 
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

const client = new Client({
    authStrategy: new LocalAuth({
	puppeteer: {
		headless: false
	},
	clientId: "aves_bot",
})})

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true })
})

client.on("auth_failure", (msg) => {
	console.error(chalk.red("Auth failed"), msg)
})

client.on("disconnected", (reason) => {
	console.log("Client was logged out", reason)
})

client.on("ready", () => {
	console.log(chalk.green("Programa On-line"))
});

client.initialize();

module.exports = client