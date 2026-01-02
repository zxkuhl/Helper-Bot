// Import discord.js and dotenv
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

// Create the bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define your slash commands
const commands = [
  new SlashCommandBuilder()
    .setName("howtogetkey")
    .setDescription("Explains how to get the key")
    .toJSON()
];

// Register commands in your server on startup
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
    console.error("Error registering commands:", error);
  }
})();

// Listen for slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "key") {
    await interaction.reply({
      content: `Hey ${interaction.user}, We typically get some confused people, whether confused about scripts or getting the key

HOW TO GET THE KEY

Step1: Go to <#1443062455516270764>

Step2: Press verify to get the role to receive the key

Step3: Go to <#1443110895457665044> 

Step4: You should see the key and you’re done!

EXTRA: IF YOU DONT HAVE ACCESS TO <#1443110895457665044> CHECK TO SEE IF YOUR KEY VERIFIED!`,
      allowedMentions: { users: [interaction.user.id] } // mentions the user
    });
  }
});

// Login the bot using your token from Replit Secrets
client.login(process.env.DISCORD_TOKEN);
