const fs = require("fs")
const functions = require("./functions.js")
exports.commands = {
    schedule: {
        enabled: true,
        output: function(user, args, channel) {
            channel.send(
                user + ", Most days at random times!!!"
            )
        },
        perms: []
    },
    twitch: {
        enabled: true,
        output: function(user, args, channel) {
            channel.send(
                user + ", here is my twitch.https://www.twitch.tv/anonbasicnerd, you can see when I go live in the #Live text channel."
            )
        },
        perms: []
    },
    twitter: {
        enabled: true,
        output: function(user, args, channel) {
            channel.send(
                user + ", Check out my twitter feed at https://twitter.com/ANonBasicNerd"
            )
        },
        perms: []
    },
    youtube: {
        enabled: true,
        output: function(user, args, channel) {
            channel.send(
                user + ", Here is a link to my youtube https://www.youtube.com/channel/UCI3cVtSnhOCgcNZPpwCBmCQ Here you can find stream highlights and hopefully more content soon."
            )
        },
        perms: []
    },
    help: {
        enabled: true,
        output: function(user, args, channel) {
            var cmdList = functions.cmdsList(user)
            channel.send(
                user + ", here is a list of commands that are currently available to you. (NOTE: The command prefix is '!')"
            )
            channel.send(
                cmdList
            )
        },
        perms: []
    },
    kick: {
        enabled: true,
        output: function(user, args, channel, guild) {
            if (!guild.member(args).kickable) {
                channel.send(
                    args + " cannot be kicked"
                )
            }
            else {
                guild.member(args).kick().then(() =>
                    channel.send(
                        args + " has been kicked from the server"
                    )
                )
            }
        },
        perms: ["KICK-MEMBERS"]
    },
    ban: {
        enabled: true,
        output: function(user, args, channel, guild) {
            if (guild.member(args) == user) {
                channel.send(
                    "You are too silleh!You can't ban yourself."
                )
            }
            else if(!guild.member(args).bannable) {
                channel.send(
                    "The bot does not have sufficient permissions to ban this person, as such it is safe to say that you cannot ban this person as well."
                )
            }
            else {
                guild.ban(args).then(() =>
                    channel.send(
                        args + " has been banned from the server"
                    )
                )
            }
        },
        perms: ["BAN-MEMBERS"]
    },
    trackUser: {
        help: "This command is used to add a Twitch username to track when that streamer goes live",
        enabled: false,
        output: function(user, args, channel) {
            fs.appendFile("./trackedUsers.txt", args + " ", (err) => {
                if (err) {
                    throw err
                }
            })
            channel.send(
                args + " has been added to the tracked users list"
            )
        },
        perms: ["Administrator"]
    },
    unTrack: {
        help: "This command is used to remove a Twitch username from the tracked users list",
        enabled: false,
        output: function(user, args, channel) {
            return
        },
        perms: ["Administrator"]
    }
}
