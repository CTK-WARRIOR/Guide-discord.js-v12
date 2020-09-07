const { token, default_prefix } = require("./config.json");
const { badwords } = require("./data.json") 
const { config } = require("dotenv");
const discord = require("discord.js"); //Gonna use Discord.js Module xD
const client = new discord.Client({
  disableEveryone: true // what does this disable thing do?
});
const db = require("quick.db"); //WE WILL BE USING QUICK.DB
const { addexp } = require("./handlers/xp.js");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
  //When bot is ready
  console.log("I am Reday to Go");
  client.user.setActivity(db.get(`status`)); //It will set status :)
});

//IS URL FUNCTION - START

function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
  
}

//FINISH


//STOP
client.on("message", async message => {
  if (message.author.bot) return;  
  //START



  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    
    if(is_url(message.content) === true) {
      message.delete()
      return message.channel.send("You can not send link here :/")
    }
    
    
    
    
    
    let confirm = false;
    //NOW WE WILL USE FOR LOOP
    var i;
    for(i = 0;i < badwords.length; i++) {
      
      if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
      
    }
    
    if(confirm) {
      message.delete()
      return message.channel.send("You are not allowed to send badwords here")
    }    
    
    
  }
  
  //END
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

let cmdx = db.get(`cmd_${message.guild.id}`)

if(cmdx) {
  let cmdy = cmdx.find(x => x.name === cmd)
  if(cmdy) message.channel.send(cmdy.responce)
}

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));



  // If a command is finally found, run the command
  if (command) command.run(client, message, args);

  return addexp(message);
}); //All codes link in description

//GONNA USE EVENT HERE

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  
   let data = await canva.welcome(member, { link: "https://i.pinimg.com/originals/f3/1c/39/f31c39d56512dc8fbf30f9d0fb3ee9d3.jpg" })
 
    const attachment = new discord.MessageAttachment(
      data,
      "welcome-image.png"
    );
  
  


  client.channels.cache.get(chx).send("Welcome to our Server " + member.user.username, attachment);
});

client.login(token);
