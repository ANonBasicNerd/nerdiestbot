const cmd = require("./commands.js")
const axios = require("axios")
exports.command =  (message, client) => {
    let author = message.member
    let full = message.content.substr(1)
    let split = full.split(" ")
    let primary = split[0]
    let args = split.splice(1)
    let user = client.users.find(user => user.username == args)
    let guild = message.guild
    let channel = message.channel
    if (primary in cmd.commands) {
        switch (cmd.commands[primary].enabled) {
            case true:
                cmd.commands[primary].output(author, user, channel, guild)
                break
            case false:
                channel.send(
                    author + ", I'm sorry that command is not currently enabled. Try !help for a list of commands you can use."
                )
        }
    }
    else {
        channel.send(author + " I do not understand that command. Try '!help' for a list of commands")
    }
}

exports.isLive = (client, usernames) => {
    var currently = false
    client.setInterval(function()  {
            axios.get("https://api.twitch.tv/helix/streams?user_login=anonbasicnerd", {
                headers: {
                    "Client-ID": process.env.TTV_Client_ID
                }
            }).then((response) => {
                let live = client.channels.find(channel => channel.name == "live")
                let data = response.data.data
                if (currently == false && data.length == 1){
                    live.send(
                        "@everyone, ANonBasicNerd just went live!!! https://www.twitch.tv/anonbasicnerd"
                    )
                    client.on('message', (message) => {
                        if(message.channel.name == "live") {
                            currently = true
                        }
                    })
                }
                else if (currently == true && data.length < 1) {
                    currently = false
                }
                else if (currently ==  true && data.length == 1){
                    currently = true
                }
            })
    }, 60*1000)
}

exports.cmdsList = (member) => {
    var available = []
    var coms = Object.keys(cmd.commands)
    coms.forEach((command) => {
        if (command == "help") {
        }
        else if (cmd.commands[command].enabled && member.hasPermission(cmd.commands[command].perms)) {
            available.push(command)
        }
    })
    return available
}
