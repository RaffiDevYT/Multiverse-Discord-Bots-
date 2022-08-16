const {
	MessageEmbed, MessageButton, MessageActionRow
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let user = message.mentions.users.first() || client.user;
      if(user) {
        if(!user.bot) return interaction?.reply({ephemeral: true, content: "<:icons_Wrong:988298434354249809> You can't Invite a Normal user! **IT MUST BE A BOT**"})
        let button_support_dc = new MessageButton().setStyle('LINK').setEmoji("1001081331373051955").setLabel('Join Support').setURL("https://discord.gg/stromz")
        let button_invite = new MessageButton().setStyle('LINK').setEmoji("1001081415439483000").setLabel("Invite Me").setURL(`https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands`)
        let button_public_invite = new MessageButton().setStyle('LINK').setEmoji("1001082258582675526").setLabel('Soon').setURL("https://raffidevyt.xyz")
        //array of all buttons
        const allbuttons = [new MessageActionRow().addComponents([button_support_dc, button_invite, button_public_invite])]
        message.reply({ 
          embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`<:icons_Correct:987931568939102228> Invite: **${user.tag}**`)
            .setDescription(`||[*Click here for an Invitelink without Slash Commands*](https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot)||`)
            .setFooter(client.getFooter(`${user.username} | Stromz Development`, "https://cdn.discordapp.com/icons/966232465901510656/77620d2969df2914367cebfb5e120abf.png?size=4096"))],
          components: allbuttons
        });
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
      ]});
    }
  }
}
/**
 * @INFO
 * Bot Coded by RaffiDev#8321 | https://discord.gg/stromz
 * @INFO
 * Work for Stromz Development | https://stromz.xyz
 * @INFO
 * Please mention him / Stromz Development, when using this Code!
 * @INFO
 */
