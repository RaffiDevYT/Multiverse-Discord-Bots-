const {
	MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration, handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let settings = client.settings.get(message.guild.id);
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language");

    try {
      if (args[0]) {
        const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if(args[0].toLowerCase().includes("cust")){
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = [handlemsg(client.la[ls].cmds.info.help.error1)]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable1"]))
            .setDescription(items.join("︲"))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom), client.user.displayAvatarURL());
          
          message.reply({embeds: [embed]})
          return;
        }var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.reply({embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, {command: args[0].toLowerCase()}))]});
        } else if (cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable2"]))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom, {prefix: prefix}), client.user.displayAvatarURL());
          let embeds = allotherembeds_eachcategory();
          if(cat == "🔰 Info")
            return message.reply({embeds: [embeds[0]]})
          if(cat == "💸 Economy")
            return message.reply({embeds: [embeds[1]]})
          if(cat == "🏫 School Commands")
            return message.reply({embeds: [embeds[2]]})
          if(cat == "🎶 Music")
            return message.reply({embeds: [embeds[3]]})
          if(cat == "👀 Filter")
            return message.reply({embeds: [embeds[4]]})
          if(cat == "🚫 Administration")
            return message.reply({embeds: [embeds[5]]})
          if(cat == "💪 Setup")
            return message.reply({embeds: [embeds[6]]})
          if(cat == "⚙️ Settings")
            return message.reply({embeds: [embeds[7]]})
          if(cat == "👑 Owner")
            return message.reply({embeds: [embeds[8]]})
          if(cat == "📈 Ranking")
            return message.reply({embeds: [embeds[9]]})
          if(cat == "🎤 Voice")
            return message.reply({embeds: [embeds[10]]})
          if(cat == "🕹️ Fun")
            return message.reply({embeds: [embeds[11]]})
          if(cat == "🎮 MiniGames")
            return message.reply({embeds: [embeds[12]]})
          if(cat == "🤞 Mincraft")
            return message.reply({embeds: [embeds[13]]})
          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable3"]));
            } catch {}
          } else {
            embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable4"]))
          }
          return message.reply({embeds: [embed]})
        }
        if (cmd.name) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.name), `\`\`\`${cmd.name}\`\`\``);
        if (cmd.name) embed.setTitle(handlemsg(client.la[ls].cmds.info.help.detail.about, {cmdname: cmd.name}));
        if (cmd.description) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.desc), `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases && cmd.aliases.length > 0 && cmd.aliases[0].length > 1) try {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.aliases), `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch { }
        if (cmd.cooldown) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.usage), `\`\`\`${prefix}${cmd.usage}\`\`\``);
          embed.setFooter(handlemsg(client.la[ls].cmds.info.help.detail.syntax), es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL());
        }
        return message.reply({embeds: [embed]});
      } else {
        let button_back = new MessageButton().setStyle('SECONDARY').setCustomId('1').setEmoji("833802907509719130").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.back))
        let button_home = new MessageButton().setStyle('SECONDARY').setCustomId('2').setEmoji("🏠").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.home))
        let button_forward = new MessageButton().setStyle('SECONDARY').setCustomId('3').setEmoji('832598861813776394').setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.forward))        
        let menuOptions = [
          {
            label: "Overview",
            value: "Overview",
            emoji: "<a:Overview:986653828172611644>",
            description: "My Overview of me!"
          },
          {
            label: "Information",
            value: "Information",
            emoji: "<:icons_exclamation:988292332203954247>",
            description: "Commands to share Information"
          },
          {
            label: "Economy",
            value: "Economy",
            emoji: "<:icons_coin:990545995509149716>",
            description: "Commands to use the Economy System"
          },
          {
            label: "School",
            value: "School",
            emoji: "<:icons_o:988312505493368842>",
            description: "Commands useful for School and work!"
          },
          {
            label: "Music",
            value: "Music",
            emoji: "<:icons_music:990546169287544842>",
            description: "Commands to play Music / add Filter"
          },
          {
            label: "Moderator",
            value: "Admin",
            emoji: "<:staff:988343906905235476>",
            description: "Commands to Moderator the Server"
          },
          {
            label: "Setup",
            value: "Setup",
            emoji: "<:icons_discord:988292193800323112>",
            description: "Commands to Setup Systems"
          },
          {
            label: "Settings",
            value: "Settings",
            emoji: "<:icons_settings:988295321262108692>",
            description: "Commands to change Server Settings"
          },
          {
            label: "Owner",
            value: "Owner",
            emoji: "<:icons_ticket:988293167663181844>",
            description: "Commands to to manage the Bot"
          },
          {
            label: "Ranking",
            value: "Ranking",
            emoji: "<a:level:986655301614862376>",
            description: "Commands to mange and show Ranks"
          },
          {
            label: "Voice",
            value: "Voice",
            emoji: "<:icons_music:990546169287544842>",
            description: "Commands for Voice Channels Management"
          },
          {
            label: "Fun",
            value: "Fun",
            emoji: "<:icons_shine2:988292783079063552>",
            description: "Commands for Fun (Image) uses"
          },
          {
            label: "Minigames",
            value: "Minigames",
            emoji: "<:icons_games:988293479392223242>",
            description: "Commands for Minigames with the Bot"
          },
          {
            label: "Minecraft",
            value: "Mincraft",
            emoji: "<:Fn_Minecraft:939104276540706826>",
            description: "Commands for Minecraft with the Bot"
          },
        ];
        menuOptions = menuOptions.map(i=>{
          if(settings[`${i?.value.toUpperCase()}`] === undefined){
            return i; //if its not in the db, then add it
          }
          else if(settings[`${i?.value.toUpperCase()}`]){
            return i; //If its enabled then add it
          }
          else if(settings.showdisabled && settings[`${i?.value.toUpperCase()}`] === false){
            return i;
          } else {
            //return i // do not return, cause its disabled! to be shown
          }
        })
        let menuSelection = new MessageSelectMenu()
          .setCustomId("MenuSelection")
          .setPlaceholder("Click me to view the Help Menu Category Pages")
          .setMinValues(1)
          .setMaxValues(5)
        .addOptions(menuOptions.filter(Boolean))
        let buttonRow = new MessageActionRow().addComponents([button_back,button_home, button_forward])
        let SelectionRow = new MessageActionRow().addComponents([menuSelection])
        const allbuttons = [buttonRow, SelectionRow]
        //define default embed
        let OverviewEmbed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setDescription(`**Information**,
> My Prefix For **${message.guild.name}** is \`${prefix}\`, 
> You can also mention ${client.user} to get prefix info.`)
        .setFooter(""+ client.user.username, client.user.displayAvatarURL())
        .setTitle(`<:icons_info:987910779133128784> Help Menu <:icons_info:987910779133128784>`)
        .addField("<a:a_b_badge:987910606923374594> **Categories**",
`>>> <:icons_Correct:987931568939102228> Overview
<:icons_info:987910779133128784> Information
<:icons_coin:990545995509149716> Economy
<:icons_o:988312505493368842> School
<:icons_music:990546169287544842> Music
<:staff:988343906905235476> Moderator
<:icons_discord:988292193800323112> Setup
<:icons_settings:988295321262108692> Settings
<:icons_ticket:988293167663181844> Owner
<:giveaway_45:991304589548720188> Ranking
<:icons_music:990546169287544842> Voice
<:icons_shine2:988292783079063552> Fun
<:icons_games:988293479392223242> Minigames
<:Fn_Minecraft:939104276540706826> Minecraft`, true)
        .addField(`<a:a_b_badge:987910606923374594> **STATS**`,`>>> **Guilds:** \`${client.guilds.cache.size}\`\n**Members:** \`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\`\n**Prefix Commands:** \`${client.commands.map(a => a).length}\`\n**Slash Commands:** \`${client.slashCommands.map(a => a).length}\``, true)

       
        //Send message with buttons
        let helpmsg = await message.reply({   
            content: `***Click on the __Buttons__ to swap the Help-Pages***`,
            embeds: [OverviewEmbed], 
            components: allbuttons
        }).catch(e=>{
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          return message.reply(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => {})
        });
        var edited = false;
        var embeds = [OverviewEmbed]
        for(const e of allotherembeds_eachcategory(true))
          embeds.push(e)        
        let currentPage = 0;

        //create a collector for the thinggy
        const collector = helpmsg.createMessageComponentCollector({filter: (i) => (i?.isButton() || i?.isSelectMenu()) && i?.user && i?.message.author.id == client.user.id, time: 180e3 });
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        collector.on('collect', async b => {
          try{
            if(b?.isButton()){
            if(b?.user.id !== message.author.id)
              return b?.reply({content: handlemsg(client.la[ls].cmds.info.help.buttonerror, {prefix: prefix}), ephemeral: true});
            
              //page forward
              if(b?.customId == "1") {
                //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage !== 0) {
                    currentPage -= 1
                  } else {
                      currentPage = embeds.length - 1
                  }
              }
              //go home
              else if(b?.customId == "2"){
                //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                  currentPage = 0;
              } 
              //go forward
              else if(b?.customId == "3"){
                //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage < embeds.length - 1) {
                      currentPage++;
                  } else {
                      currentPage = 0
                  }
              }
              await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons}).catch(e=>{})
              b?.deferUpdate().catch(e=>{})
            
              
            }
            if(b?.isSelectMenu()){
              //b?.reply(`***Going to the ${b?.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
              //information, music, admin, settings, voice, minigames, nsfw
              let index = 0;
              let vembeds = []
              let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
              for(const value of b?.values){
                switch (value.toLowerCase()){
                  case "overview": index = 0; break;
                  case "information": index = 1; break;
                  case "economy": index = 2; break;
                  case "school": index = 3; break;
                  case "music": index = 4; break;
                  case "filter": index = 5; break;
                  case "admin": index = 6; break;
                  case "setup": index = 7; break;
                  case "settings": index = 8; break;
                  case "owner": index = 9; break;
                  case "ranking": index = 10; break;
                  case "voice": index = 11; break;
                  case "fun": index = 12; break;
                  case "minigames": index = 13; break;
                  case "mincraft": index = 14; break;
                }
                vembeds.push(theembeds[index])
              }
              b?.reply({
                embeds: vembeds,
                ephemeral: true
              });
            }
          }catch (e){
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            console.log(String(e).italic.italic.grey.dim)
          }
        });
        
        collector.on('end', collected => {
          //array of all disabled buttons
          let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true),button_home.setDisabled(true), button_forward.setDisabled(true)])
          const alldisabledbuttons = [d_buttonRow]
          if(!edited){
            edited = true;
            helpmsg.edit({content: handlemsg(client.la[ls].cmds.info.help.timeended, {prefix: prefix}), embeds: [helpmsg.embeds[0]], components: alldisabledbuttons}).catch((e)=>{})
          }
        });
        }        
        function allotherembeds_eachcategory(filterdisabled = false){
          //ARRAY OF EMBEDS
          var embeds = [];

          //INFORMATION COMMANDS
          var embed0 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔰 Info").size}\`] <:icons_exclamation:988292332203954247> Information Commands <:icons_exclamation:988292332203954247>`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(`<:icons_exclamation:988292332203954247> **User Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "user").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`<:icons_exclamation:988292332203954247> **Games Related Commands**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "games").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`<:icons_exclamation:988292332203954247> **Server Related Commands**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "server").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`<:icons_exclamation:988292332203954247> **Bot Related Commands**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "bot").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`<:icons_exclamation:988292332203954247> **Util Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "util").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          embeds.push(embed0)

          //ECONOMY COMMANDS
          var embed1 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💸 Economy").size}\`] 💸 Economy Commands 💸 | ${settings.ECONOMY ? "<:icons_Correct:987931568939102228> ENABLED" : "<:no:833101993668771842> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💸 Economy").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(`🕹️ **Mini Game to earn 💸**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "game").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`:clock1: **Repeatingly earn 💸 via Event(s)**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "earn").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`<:Builder:866089513654419466> **Information & Manage 💸**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "💸 Economy" && cmd.type === "info").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            if(!filterdisabled || settings.ECONOMY || settings.showdisabled) embeds.push(embed1)

          //SCHOOL COMMANDS
          var embed2 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").size}\`] 🏫 School Commands 🏫 | ${settings.SCHOOL ? "<:icons_Correct:987931568939102228> ENABLED" : "<:no:833101993668771842> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField(`:school: **Mathematics**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🏫 School Commands" && cmd.type === "math").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField(`:clock1: **Time Management**`,  ">>> " + client.commands.filter((cmd) => cmd.category === "🏫 School Commands" && cmd.type === "time").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          if(!filterdisabled || settings.SCHOOL || settings.showdisabled) embeds.push(embed2)

          //MUSIC COMMANDS type: song, queue, queuesong, bot
          var embed3 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "<:icons_music:990546169287544842> Music").size}\`] <:icons_music:988293666693054474> Music Commands <:icons_music:990546169287544842> | ${settings.MUSIC ? "<:icons_Correct:987931568939102228> ENABLED" : "<:icons_Wrong:988298434354249809> DISABLED"}`)
            .setDescription("> ``addprevious``︲``addsimilar``︲``autoplay``︲``clearqueue``︲``forward``︲``grab``︲``join``︲``jump``︲``loop``︲``loopqueue``︲``loopsong``︲``lyrics``︲``move``︲``moveme``︲``nowplaying``︲``pause``︲``play``︲``playlist``︲``playmusicmix``︲``playprevious``︲``playsc``︲``playskip``︲``playskipsc``︲``playsongoftheday``︲``queue``︲``queuestatus``︲``radio``︲``reconnect``︲``removedupes``︲``removetrack``︲``restart``︲``resume``︲``rewind``︲``search``︲``searchplaylist``︲``searchradio``︲``searchsc``︲``searchsimilar``︲``seek``︲``shuffle``︲``skip``︲``stop``︲``stoploop``︲``unshuffle``︲``volume``")
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:icons_music:988293666693054474> **Queue Commands**", "> ``addprevious``︲``addsimilar``︲``autoplay``︲``clearqueue``︲``forward``︲``grab``︲``join``︲``jump``︲``loop``︲``loopqueue``︲``loopsong``︲``lyrics``︲``move``︲``moveme``︲``nowplaying``︲``pause``︲``play``︲``playlist``︲``playmusicmix``︲``playprevious``︲``playsc``︲``playskip``︲``playskipsc``︲``playsongoftheday``︲``queue``︲``queuestatus``︲``radio``︲``reconnect``︲``removedupes``︲``removetrack``︲``restart``︲``resume``︲``rewind``︲``search``︲``searchplaylist``︲``searchradio``︲``searchsc``︲``searchsimilar``︲``seek``︲``shuffle``︲``skip``︲``stop``︲``stoploop``︲``unshuffle``︲``volume``"+client.commands.filter((cmd) => cmd.category === "<:icons_music:988293666693054474> Music" && cmd.type.includes("queue")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<a:Playing_Audio:859459305152708630> **Song Commands**", "> ``forward``︲``grab``︲``loop``︲``loopsong``︲``lyrics``︲``nowplaying``︲``pause``︲``play``︲``playlist``︲``playmusicmix``︲``playprevious``︲``playsc``︲``playskip``︲``playskipsc``︲``playsongoftheday``︲``radio``︲``restart``︲``resume``︲``rewind``︲``seek``︲``skip``︲``stop``︲``stoploop``︲``volume``"+client.commands.filter((cmd) => cmd.category === "<:icons_music:988293666693054474> Music" && cmd.type.includes("song")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:Bot_Flag:835928340715012137> **Bot Commands**", "> ``join``︲``moveme``︲``reconnect``"+client.commands.filter((cmd) => cmd.category === "<:icons_music:988293666693054474> Music" && cmd.type.includes("bot")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            if(!filterdisabled || settings.MUSIC || settings.showdisabled) embeds.push(embed3)

          //FILTER COMMANDS
          var embed4 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👀 Filter").size}\`] 👀 Filter Commands 👀 | ${settings.FILTER ? "<:icons_Correct:987931568939102228> ENABLED" : "<:icons_Wrong:988298434354249809> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👀 Filter").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          if(!filterdisabled || settings.FILTER || settings.showdisabled) embeds.push(embed4)

          //ADMINISTRATION
          var embed5 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🚫 Administration").size}\`] <:icons_ban:988292951430033548> Moderator Commands <:icons_ban:988292951430033548>`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🚫 Administration").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:6149_discord:971276208027340810> **Server Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("server")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:staff:988343906905235476> **Channel Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("channel")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:staff:988343906905235476> **Thread Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("thread")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:staff:988343906905235476> **Role Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("role")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:staff:988343906905235476> **Member Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🚫 Administration" && cmd.type.includes("member")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          embeds.push(embed5)

          //SETUP
          var embed6 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "<:icons_settings:988295321262108692> Setup").size}\`] <:icons_settings:988295321262108692> Setup Commands <:icons_settings:988295321262108692>`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💪 Setup").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:icons_settings:988295321262108692> **Setups for Entertainment**", "> "+client.commands.filter((cmd) => cmd.category === "💪 Setup" && cmd.type.includes("fun")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("💡 **Information & Manage (Bot/Server) Settings**", "> ``setup``︲``setup-admin``︲``setup-admincmdlog``︲``setup-commands``︲``setup-embed``︲``setup-epicgamesverify``︲``setup-language``︲``setup-leave``︲``setup-welcome``"+client.commands.filter((cmd) => cmd.category === "<:icons_settings:988295321262108692> Setup" && cmd.type.includes("info")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:blurple_shield:958372860487929856> **Most used Systems**", "> ``setup-apply``︲``setup-autodelete``︲``setup-autoembed``︲``setup-autosupport``︲``setup-boost``︲``setup-boostlog``︲``setup-customcommand``︲``setup-joinvc``︲``setup-jtc``︲``setup-keyword``︲``setup-membercount``︲``setup-menuapply``︲``setup-menuticket``︲``setup-rank``︲``setup-reactionrole``︲``setup-roster``︲``setup-serverstats``︲``setup-suggestion``︲``setup-ticket``"+client.commands.filter((cmd) => cmd.category === "<:icons_settings:988295321262108692> Setup" && cmd.type.includes("system")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:Builder:866089513654419466> **Security Systems**", "> ``setup-anticaps``︲``setup-antidiscord``︲``setup-antilink``︲``setup-antimassmention``︲``setup-antimasspings``︲``setup-antimention``︲``setup-antinewaccount``︲``setup-antinuke``︲``setup-antipings``︲``setup-antiscamlinks``︲``setup-antiselfbot``︲``setup-antispam``︲``setup-auditlog``︲``setup-autobackup``︲``setup-autowarn``︲``setup-blacklist``︲``setup-ghost-ping-detector``︲``setup-joinlist``︲``setup-logger``︲``setup-reportlog``︲``setup-warn``"+client.commands.filter((cmd) => cmd.category === "<:icons_settings:988295321262108692> Setup" && cmd.type.includes("security")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          embeds.push(embed6)
          
          //Settings
          var embed7 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").size}\`] ⚙️ Settings Commands ⚙️`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:icons_settings:988295321262108692> **User Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("user")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:icons_settings:988295321262108692> **Bot Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("bot")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:icons_music:990546169287544842> **Music Related Commands**", "> "+client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type.includes("music")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          embeds.push(embed7)
          
          //Owner
          var embed8 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👑 Owner").size}\`] 👑 Owner Commands 👑`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👑 Owner").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:Discord:787321652345438228> **Information & Manage**", "> "+client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type.includes("info")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:Bot_Flag:835928340715012137> **Adjust the Bot**", "> "+client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type.includes("bot")).sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            embeds.push(embed8)
          
          //Ranking
          var embed9 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "📈 Ranking").size}\`] 📈 Ranking Commands 📈 | ${settings.RANKING ? "<:icons_Correct:987931568939102228> ENABLED" : "<:icons_Wrong:988298434354249809> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "📈 Ranking").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:Builder:866089513654419466> **Manage Rank**", `> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking" && cmd.type === "manage").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
            .addField("📈 **Rank Information**", `> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking" && cmd.type === "info").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`)
          if(!filterdisabled || settings.RANKING || settings.showdisabled) embeds.push(embed9)

          //Voice COMMANDS
          var embed10 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().extracustomdesc.length}\`] 🎤 Voice Commands 🎤 | ${settings.VOICE ? "<:icons_Correct:987931568939102228> ENABLED" : "<:icons_Wrong:988298434354249809> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().extracustomdesc.split(",").map(i => i?.trim()).join("︲")}*`)
            .addField("\u200b", "\u200b")
            .addField("<:icons_Correct:987931568939102228>  **Usage**", "> "+client.commands.filter((cmd) => cmd.category === "🎤 Voice").first().usage)
          if(!filterdisabled || settings.VOICE || settings.showdisabled) embeds.push(embed10)
          
          //FUN COMMANDS
          var embed11 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").size}\`] 🕹️ Fun Commands 🕹️ | ${settings.FUN ? "<:icons_Correct:987931568939102228> ENABLED" : "<:icons_Wrong:988298434354249809> DISABLED"}`)
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:icons_games:988293479392223242> **Fun User Image Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "user").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:icons_games:988293479392223242> **Fun User Image-Text Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "usertext").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:icons_games:988293479392223242> **Fun Text Commands**", "> "+client.commands.filter((cmd) => cmd.category === "🕹️ Fun" && cmd.type === "text").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
          if(!filterdisabled || settings.FUN || settings.showdisabled) embeds.push(embed11)
          
          //MINIGAMES
          var embed12 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").size}\`] <:icons_games:988293479392223242> Mini Games Commands <:icons_games:988293479392223242> | ${settings.MINIGAMES ? "<:icons_Correct:987931568939102228> ENABLED" : "<:icons_Wrong:988298434354249809> DISABLED"}`)
            .addField("\u200b", "__**Sub-Categorized Commands:**__")
            .addField("<:icons_games:988293479392223242> **Text Based Minigames**", "> "+client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "text").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:icons_games:988293479392223242> **Button(s) Minigames**", "> "+client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "buttons").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .addField("<:icons_games:988293479392223242> **Voice Minigames**", "> "+client.commands.filter((cmd) => cmd.category === "🎮 MiniGames" && cmd.type === "voice").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          if(!filterdisabled || settings.MINIGAMES || settings.showdisabled) embeds.push(embed12)
          //MINECRAFT
          var embed13 = new MessageEmbed()
            .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🤞 Mincraft").size}\`] <:Fn_Minecraft:939104276540706826> Minecraft Commands <:Fn_Minecraft:939104276540706826> | ${settings.MINECRAFT ? "<:icons_Correct:987931568939102228> ENABLED" : "<:icons_Wrong:988298434354249809> DISABLED"}`)
            .addField("<:Fn_Minecraft:939104276540706826> **Minecrafts**", "> ``server``︲``skin``︲``uuid``"+client.commands.filter((cmd) => cmd.category === "🤞 Mincraft" && cmd.type === "voice").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
            .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🤞 Mincraft").sort((a,b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          if(!filterdisabled || settings.MINECRAFT || settings.showdisabled) embeds.push(embed13)
        
          return embeds.map((embed, index) => {
            return embed
            .setColor(es.color)
            .setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
            .setFooter(client.getFooter(`Page ${index + 1} / ${embeds.length}\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL()));
          })
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
 * Bot Coded by RaffiDev | https://discord.gg/DcR5n6PTFf
 * @INFO
 * Work for Stromz Development | 
 * @INFO
 * Please mention him / Stromz Development, when using this Code!
 * @INFO
 */
