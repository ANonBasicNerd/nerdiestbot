require("dotenv").config()
const functions = require("./functions.js")
const fs = require("fs")
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.username)
})

client.on("guildMemberAdd", (member) => {
    if (member.guild.available) {
        let welcome = member.guild.channels.find(channel => channel.name == "welcome")
        welcome.send(
            member + " Welcome to the 'Nerdiest' server around.  We have but one rule: Don't be a dick.  You can type !help for a list of helpful and informative commands."
        )
    }
})

client.on('message', (message) => {
    if (message.author == client.user) {
        return
    }
    if (message.content.startsWith('!')) {
        functions.command(message, client)
    }
})

functions.isLive(client)

client.login(process.env.BOT_TOKEN)
