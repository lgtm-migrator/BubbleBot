require("dotenv").config();

require("./src/Console");

const Discord = require("discord.js");
const ShardManager = new Discord.ShardingManager(__dirname+"/src/index.js", {token:process.env.TOKEN});

console.info("Spawning Shards...");

ShardManager.spawn();