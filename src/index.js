require("dotenv").config({ path: __dirname + "/../.env" });

const Discord = require("discord.js");
const path = require('path');
const BubbleWrap = require("./BubbleWrap");
const Client = new Discord.Client({
    "disableMentions": "everyone"
});

const prefix = "pop!"

Client.on("ready", async () => {
    require("./Console")(Client.shard.ids[0]);
    console.info("Ready. Assigned " + Client.guilds.cache.size + " guilds.");
    Client.user.setPresence({ "activity": { "name": "pop!gen to generate! | Shard " + (Client.shard.ids[0] + 1) + "/" + Client.shard.count }, "shardID": Client.shard.ids[0] });

    Client.application = await Client.fetchApplication();

    if (Client.shard.ids[0] == "0") {
        // Shard 0 is responsible for DMs and Interations.
        console.debug("Creating Application Command handler.");
        const { SlashCreator, GatewayServer } = require('slash-create');

        const creator = new SlashCreator({
            applicationID: (await Client.fetchApplication()).id,
            publicKey: process.env.PUB_KEY,
            token: Client.token,
        });

        creator
            .registerCommandsIn(path.join(__dirname, '..', 'commands'))
            .syncCommands()
            .withServer(
                new GatewayServer(
                    (handler) => Client.ws.on('INTERACTION_CREATE', handler)
                )
            );

        creator.on("synced", () => {
            console.info("Listening for application commands from minified instances.");
        });
    }
});

Client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        var command = message.content.replace(prefix, "").split(" ")[0];
        var args = message.content.replace(prefix, "").split(" ").splice(1);

        if (command == "generate" || command == "g" || command == "gen") {
            if (args[0] == undefined) args[0] = "10";
            if (isNaN(parseInt(args[0]))) return message.reply("You must provide a number for the size.");
            if (parseInt(args[0]) > 25 || parseInt(args[0]) < 1) return message.reply("Size must be between 1 and 25.");
            var bubblewrap = new BubbleWrap(parseInt(args[0]))
            message.channel.send(bubblewrap.generate(), { split: { maxLength: 1344 } });
        }
        if (command == "credits") message.reply({
            "embed": {
                "title": "Credits!",
                "color": 1638144,
                "fields": [
                    {
                        "name": "Starshine System",
                        "value": "Help with design ideas and questioning my life decisions",
                        "inline": true
                    },
                    {
                        "name": "Wordsworth's System",
                        "value": "Also helped with design ideas\n",
                        "inline": true
                    },
                    {
                        "name": "Colour System",
                        "value": "Also helped out\n",
                        "inline": true
                    },
                    {
                        "name": "LegoDev",
                        "value": "Bot Creator and Maintainer",
                        "inline": true
                    }
                ]
            }
        });
        if (command == "help") message.reply({
            "embed": {
                "title": "Commands",
                "color": 58111,
                "fields": [
                    {
                        "name": "g/gen/generate [size]",
                        "value": "Generate some bubble wrapping!\nMax size is 25.",
                        "inline": true
                    },
                    {
                        "name": "credits",
                        "value": "Credits for those who helped test\n",
                        "inline": true
                    },
                    {
                        "name": "invite",
                        "value": "Invite the bot to your own server!\n",
                        "inline": true
                    }
                ]
            }
        });
        if (command == "invite") message.reply({
            "embed": {
                "title": "Click here to invite me to your server!",
                "url": "https://discord.com/api/oauth2/authorize?client_id=229184831769149440&permissions=0&scope=bot",
                "color": 15139071,
                "description": "Or alternatly, [Click here to add the mini version of Bubble Bot!](https://discord.com/api/oauth2/authorize?client_id=229184831769149440&scope=applications.commands)"
            }
        });
    }
});

Client.login(process.env.TOKEN)
