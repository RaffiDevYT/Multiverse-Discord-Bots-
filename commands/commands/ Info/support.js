const {
  MessageEmbed, MessageActionRow
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { MessageButton } = require('discord.js')
module.exports = {
  name: "support",
  category: "🔰 Info",
  usage: "invite",
  description: "Sends you the Support Server Link",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let button_public_invite = new MessageButton().setStyle('LINK').setEmoji("1001081415439483000").setLabel('Invite Me').setURL("https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands")
      let button_support_dc = new MessageButton().setStyle('LINK').setEmoji("1001081331373051955").setLabel('Join Support').setURL("https://discord.gg/DcR5n6PTFf")
      let button_invite = new MessageButton().setStyle('LINK').setEmoji("1001082258582675526").setLabel('Soon').setURL(`https://dash.stromz.ml`)
      //array of all buttons
      const allbuttons = [new MessageActionRow().addComponents([button_public_invite, button_support_dc, button_invite])]
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setTitle("<:icons_ticket:988293167663181844> **You need help? Join Stromz Discord Support Server**")
          .setDescription(eval(client.la[ls]["cmds"]["info"]["support"]["variable1"]))
          .setFooter("Stromz | Stromz Development")],
        components: allbuttons
      });
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
