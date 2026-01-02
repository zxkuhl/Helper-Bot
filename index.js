const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define commands
const commands = [
  new SlashCommandBuilder()
    .setName("howtogetkey")
    .setDescription("Explains how to get the key")
    .toJSON()
];

// Register commands on startup
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("Slash commands registered!");
  } catch (error) {
    console.error(error);
  }
})();

// Listen for slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "howtogetkey") {
    await interaction.reply({
      content: `Hey ${interaction.user}, here’s how to get the key:\n• Join the game\n• Complete the tutorial\n• Redeem in settings`,
      allowedMentions: { users: [interaction.user.id] }
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
