const { Client, MessageEmbed, Collection, Intents } = require("discord.js");
const client = global.client = new Client({fetchAllMembers: true, intents: Object.keys(Intents.FLAGS)});
const { readdirSync } = require("fs");

client.on("ready", async() => {
client.user.setActivity("URL 😘")
});

const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
readdirSync('./komutlar/', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
  let command = require(`./komutlar/${files}`);
  console.log(`Yüklenen komut ./komutlar/${files}`)
  if(!command) return console.log(`/komutlar/${files}`)
  if (!command.name) return console.log(`Hatalı Komut: [/komutlar/${files}]`)
  commands.set(command.name, command);
  if (!command.aliases || command.aliases.length < 1) return
  command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

client.on('messageCreate', message => {
  if (!message.guild || message.author.bot || !message.content.startsWith("!")) return;
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return; 
  cmd.ktria(client, message, args);
})

client.on('guildMemberAdd', (member) => {

   member.send({embeds : [new MessageEmbed().setColor("RANDOM").setTitle(`Kardeşim bak url yi aldın 😂`).setImage("https://tenor.com/view/dance-dancing-dancing-baby-india-indian-gif-20876123").setDescription(`Kardeşim bu url mühürlenmiştir.`)]}) 
   member.guild.members.kick(member.id)
})

client.login("OTAzNTU4MzgxNDcyNzEwNjU3.GMFIA6.VEE-2Q9dOx9H0Wq0wpWLRO_kkVgJ0JtgksmZWw")