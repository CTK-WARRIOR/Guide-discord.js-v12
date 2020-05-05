const discord = require("discord.js")
const Anime = require('anime-scraper').Anime


module.exports = {
  name: "scrap",
  description: "Scrap any anime direct link from gogoanime",
  category: "info",
 usage: "scrap <anime_name> | <episode_no>" ,
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
    
    let embed = new discord.MessageEmbed()
    .setTitle(`SCRAP - ${cmd}`)
    .setColor("#ff2050")
    .addField(episode.videoLinks[0].name, `[LINK 1](${episode.videoLinks[0].url})`, true)
    .addField(episode.videoLinks[1].name, `[LINK 2](${episode.videoLinks[1].url})`, true)
  .addField(episode.videoLinks[2].name, `[LINK 3](https:${episode.videoLinks[2].url})`, true)
    .addField(episode.videoLinks[3].name, `[LINK 4](https:${episode.videoLinks[3].url})`, true)
    .addField(episode.videoLinks[4].name, `[LINK 5](${episode.videoLinks[4].url})`, true)
  .addField(episode.videoLinks[5].name, `[LINK 6](${episode.videoLinks[5].url})`, true);
    
    message.channel.send(embed)
  
  msg.delete()
    
    
    
  })
})
    
  }
}
