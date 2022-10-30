/* eslint-disable max-statements-per-line */
/* eslint-disable no-undef */
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');


// Creating a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Checking if the client is ready
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
// Adding Commands to a collection
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

for (const file of commandFiles) {
	const filepath = path.join(commandsPath, file);
	const command = require(filepath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`the command at ${filepath} is missing stuff inside it lol`);
	}
}

// login Client(Aka discord Bot)
client.login(token);

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) { console.error(`No command named ${interaction.commandName} has been found`); return; }
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

