const http = require('http');
const express = require('express');
const app = express();

var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(" Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//_______________________________________________________________________________________________________________________________
const { Client, Collection } = require("discord.js");
const { TOKEN } = require("./config.json")
const db = require("quick.db")
const client = new Client({
    disableEveryone: true
})
//_____________________________________________________________________________________________________________________________

client.on("ready", () => {
  client.user.setStatus("idle");
   client.user.setActivity("one piece", {
     type: "WATCHING"
   })
  console.log(`Hi, ${client.user.username} is now online!`);
});


//________________________________________________________________________________________________________________________________
client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
   let prefix = await db.fetch(`prefix_${message.guild.id}`)
   if(prefix == null) {
    prefix = "a?" 
  }
  
     let blacklist = await db.fetch(`blacklist_${message.author.id}`)
   
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
      
    if (blacklist === "Blacklisted") return message.reply("You are blacklisted from the bot!")

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
  
});

client.login(TOKEN);

