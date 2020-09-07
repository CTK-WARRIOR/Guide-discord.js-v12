const discord = require("discord.js")
const Anime = require('anime-scraper').Anime


module.exports = {
  name: "scrap",
  description: "Scrap any anime direct link from gogoanime",
  category: "FUN",
 usage: "scrap <anime_name> | <episode_no>" ,
  example: "scrap Death Note | 1",
  run: async (client, message, args) => {
    
    const cmd = args.join(" ").split(' | ');
    
    
    if(!cmd[0]) {
      return message.channel.send("Please Give anime name")
    }
    
    if(!cmd[1]) {
      return message.channel.send("Please Give anime episode number")
    }
    
        let msg = await message.channel.send("Hacking website -_-")
    
   Anime.fromName(cmd[0]).then(function (anime) {
  anime.episodes[cmd[1]-1].fetch().then(function (episode) {
    console.log(episode)
    let embed = new discord.MessageEmbed()
    .setTitle(`SCRAP - ${cmd}`)
    .setColor("#ff2050")
    
    if(episode.videoLinks[0].url) {
    embed.addField(episode.videoLinks[0].name, `[Link](${episode.videoLinks[0].url})`, true)
    }
    
    
    if(episode.videoLinks[1].url) {
    embed.addField(episode.videoLinks[1].name, `[Link](https:${episode.videoLinks[1].url})`, true)
    }
    
    
    if(episode.videoLinks[2].url) {
    embed.addField(episode.videoLinks[2].name, `[Link](${episode.videoLinks[2].url})`, true)
    }
    
    
    if(episode.videoLinks[3].url) {
    embed.addField(episode.videoLinks[3].name, `[Link](${episode.videoLinks[3].url})`, true)
    }
    
    
    if(episode.videoLinks[4].url) {
    embed.addField(episode.videoLinks[4].name, `[Link](${episode.videoLinks[4].url})`, true)
    }


    if(episode.videoLinks[5].url) {
    embed.addField(episode.videoLinks[5].name, `[Link](${episode.videoLinks[5].url})`, true)
    }
  
    msg.delete()
    message.channel.send(embed)
  
  
    
    
    
  })
}).catch(err => {
     msg.delete()
     client.x.embed.wrong("I am unable to scrap the links of episode", message)
   })
    
  }
}
