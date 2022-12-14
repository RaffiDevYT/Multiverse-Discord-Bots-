# Important notes and thank ❤️

First of all, thanks for using this Source Code, it was and is a ton of work to create and maintain it!
That's why I'm asking everyone to [**Donate**](https://saweria.co/RaffiDev) or if that's not possible, then join my [Discord Server](https://discord.gg/DcR5n6PTFf)!

# Installation Guide 🔥

## ✅ Hosting Requirements

<details>
  <summary>Click to expand</summary>

- [nodejs](https://nodejs.org) version 16.6 or higher, i recommend the latest STABLE version
- [python](https://python.org) version 3.8 or higher, to install the database `enmap` (better-sqlite3)

</details>

## 🎶 Music Requirements

<details>
  <summary>Click to expand</summary>

- To have your Bot able to play music, you need to connect it to a lavalink Station!\*
- There are many public ones out there for example lavalink.eu\*
  An example for a public configuration will be listed down below

1. Make sure `Java 11` is installed on your System!
   - [Click here for a Download for **Linux**](https://github.com/Tomato6966/Debian-Cheat-Sheet-Setup/wiki/3.5.2-java-11)
   - [Click here for a Download for **Windows**](https://downloads.milrato.eu/windows/java/jdk-11.0.11.exe) ​
2. Download [Lavalink.jar](https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar)
   - here is a direct link: https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar
   - if you are on linux do this: `wget https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar` (prep: `apt-get install -y wget`)
3. Download [application.yml](https://cdn.discordapp.com/attachments/734517910025928765/934084553751015475/application.yml)
   - Download my example, it's the configuration for the lavalink.jar file!
   - here is a direct link: https://cdn.discordapp.com/attachments/734517910025928765/934084553751015475/application.yml
   - if you are on linux do this: `wget https://cdn.discordapp.com/attachments/734517910025928765/934084553751015475/application.yml` (prep: `apt-get install -y wget`)
4. Now put application.yml and Lavalink.jar in the same folder and start it
   - To start lavalink type: `java -jar Lavalink.jar`
   - Make sure to keep your terminal Open!
   - If you want to use something like `npm i -g pm2` to host it without keeping your terminal open type: `pm2 start java -- -jar Lavalink.jar`
5. The settings like **password** in application.yml and **port** must be provided in the `botconfig/config.json` of the Bot
   - If you used the default settings, than no adjust ments are needed and it should look like this:
   ```json
   {
     "clientsettings": {
       "nodes": [
         {
           "host": "localhost",
           "port": 2333,
           "password": "youshallnotpass"
         }
       ]
     }
   }
   ```
6. You don't want to host your own Lavalink?
   - then use something like this:
   ```json
   {
     "clientsettings": {
       "nodes": [
         {
           "host": "node01.lavalink.eu",
           "port": 2333,
           "password": "Raccoon"
         }
       ]
     }
   }
   ```

</details>

## 🤖 Configuration and Starting

<details>
  <summary>Click to expand</summary>
 
 > *First i recommend using the .json Files, but if u want to have your API KEYS "hidden" aka more secure, you can also use `.env`, i created a `example.env` File which u should rename to `.env` and place in the keys etc. instead of in the config.json*
 
   1. Check `🎶 Music Requirements` that you started lavalink / use a valid public lavalink station
   2. Fill in all required data in `./botconfig/config.json` **NOTE:** *If you're on replit.com, it is exposed to everyone!(use .env instead)*
   3. Fill in all required data in the `.json` Files in `./social_log/` (`./social_log/streamconfig.json` & `./social_log/twitter.json`), if you want the SOCIAL LOGS to work! (the key `authToken` in streamconfig is not needed to be filled in!)
   4. You can adjust some settings in the other `./botconfig/*.json` Files, **BUT PLEASE __KEEP__ MY CREDITS & ADS!** This is the only way on how my hard work is "revenued"
   5. Now start the bot by typing opening a cmd in that folder and type: `node index.js` or `npm start`
     * If you don't want to keep the terminal open or if you're on linux, check out [pm2 (and my tutorial)](https://github.com/Tomato6966/Debian-Cheat-Sheet-Setup/wiki/4-pm2-tutorial) and type: `pm2 start --name Bot_Name index.js`
  
</details>

## ❓ Where to get which Api-Key(s)

<details>
  <summary>Click to expand</summary>

1. `./botconfig/config.json`
   - `token` you can get from: [discord-Developers](https://discord.com/developers/applications)
   - `memer_api` you can get from: [Meme-Development DC](https://discord.gg/Mc2FudJkgP)
   - `spotify.clientSecret` you can get from: [Spotify-Developer](https://developer.spotify.com)
   - `spotify.clientID` you can get from: [Spotify-Developer](https://developer.spotify.com)
2. `./social_log/streamconfig.json`
   - `twitch_clientID` you can get from: [Twitch-Developer](https://dev.twitch.tv/docs/api) ([developer-console](https://dev.twitch.tv/console))
   - `twitch_secret` you can get from: [Twitch-Developer](https://dev.twitch.tv/docs/api) ([developer-console](https://dev.twitch.tv/console))
   - `authToken` is not required to be filled in --> will be done automatically
3. `./social_log/twitter.json`
   - `consumer_key` you can get from: [twitter Developers](https://developer.twitter.com)
   - `consumer_secret` you can get from: [twitter Developers](https://developer.twitter.com)
   - `access_token` you can get from: [twitter Developers](https://developer.twitter.com)
   - `access_token_secret` you can get from: [twitter Developers](https://developer.twitter.com)

</details>

## 😩 Have Problems while installing?

> [Check the FAQ](https://github.com/Tomato6966/Multipurpose-discord-bot/wiki)
