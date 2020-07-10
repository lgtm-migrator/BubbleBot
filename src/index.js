require("dotenv").config({path: __dirname+"/../.env"});

const Discord = require("discord.js");
const BubbleWrap = require("./BubbleWrap");
const Client = new Discord.Client({
    "disableMentions":"everyone"
});

const prefix = "pop!"

Client.on("ready", () => {
    require("./Console")(Client.shard.ids[0]);
    console.info("Ready. Operating in "+Client.guilds.cache.size+" guilds.");
    Client.user.setPresence({ "activity":{ "name":"pop!gen to generate! | Shard "+(Client.shard.ids[0]+1)+"/"+Client.shard.count }, "shardID": Client.shard.ids[0] });
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix)) {
        var command = message.content.replace(prefix, "").split(" ")[0];
        var args = message.content.replace(prefix, "").split(" ").splice(1);

        if(command == "generate" || command == "g" || command == "gen") {
            if(args[0] == undefined || isNaN(parseInt(args[0]))) args[0] = "10";
            if(parseInt(args[0]) > 25) return message.reply("Must be less than 25!");
            var bubblewrap = new BubbleWrap(parseInt(args[0])) // {maxLength:args[0] == "33" ? 2000 : 1344}
            message.channel.send(bubblewrap.generate(), {split: {maxLength:1344}});
        }
        if(command == "credits") message.reply("\nStarshine System\n> Help with design ideas and also for questioning my life decisions\nWordsworth's System\n> Also helped with design ideas\nColour System\n> Also helped out");
        if(command == "help")  message.reply("\ng/gen/generate [size]\n> Generate some bubble wrapping!\ncredits\n> Credits for those who helped test\ninvite\n> Invite the bot to your own server!");
        if(command == "invite") message.reply("Invite me to your discord server by following this link\n<https://discord.com/api/oauth2/authorize?client_id=229184831769149440&permissions=0&scope=bot>");
    }
});

Client.login(process.env.TOKEN)