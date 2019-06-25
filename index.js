require("dotenv").config()
const functions = require("./functions.js")
const commands = require("./commands.json")
const axios = require("axios")
const Discord = require('discord.js')
const client = new Discord.Client()
const helixAPI = axios.create({
    baseURL: "https://api.twitch.tv/helix/",
    headers: {
        "Client-ID": process.env.TTV_Client_ID
    }
})

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.setInterval(function() {
    helixAPI.get('users?login=anonbasicnerd').then(response => {
        let general = client.channels.get('593030321172381735')
        let data = response.data.data[0].type
        if (data == "") {
            return
        }
        else {
            general.send(
                "@everyone, ANonBasicNerd is now live!!! https://www.twitch.tv/anonbasicnerd"
            )
        }
    })
}, 180*1000)

client.on("guildMemberAdd", (member) => {
    let general = client.channels.get('591702228054704141')
    general.send(
        "Welcome to the \"Nerediest\" server around.  We have but one rule here: Don't be a dick.  For a list of commands that have some helpful info type \!help"
    )
})

client.on('message', (message) => {
    if (message.author == client.user) {
        return
    }
    if (message.content.startsWith('!')) {
        command(message)
    }
})

function command(message) {
    let author = message.author
    let full = message.content.substr(1)
    let split = full.split(" ")
    let primary = split[0]
    let args = split.splice(1)
    if (primary == "help") {
        message.channel.send(author + " Here are a list of Commands:\n!schedule\n!twitch\n!twitter\n!youtube")
    }
    else if (primary == "schedule") {
        message.channel.send(author + " Tuesday to Friday from 930am to 330pm EST")
    }
    else if(primary == "twitch") {
        message.channel.send(author + " https://www.twitch.tv/anonbasicnerd")
    }
    else if(primary == "twitter") {
        message.channel.send(author + " Check out my twitter feed at https://twitter.com/ANonBasicNerd")
    }
    else if(primary == "youtube") {
        message.channel.send(author + " Here is a link to my youtube https://www.youtube.com/channel/UCI3cVtSnhOCgcNZPpwCBmCQ Here you can find stream highlights and hopefully more content soon.")
    }
    else {
        message.channel.send(author + " I do not understand that command. Try '!help' for a list of commands")
    }
}

client.login(process.env.BOT_TOKEN)
