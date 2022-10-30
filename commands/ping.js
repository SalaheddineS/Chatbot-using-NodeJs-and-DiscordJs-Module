const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('atika')
		.setDescription('Responds by Atikawa'),
	async execute(interaction) {
		await interaction.reply('atikawa');
	},

};