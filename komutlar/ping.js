const Discord = require("discord.js");

module.exports = {
    name: "ktria",
    aliases: ["ktria"],
    ktria: async ( client, message, args) => {
        if(message.author.id != '711897884391637062') return message.reply({content: `bot owner olmanız gerekmektedir.`})
        message.reply({content: `\`AKTİF\``})

  } 
}