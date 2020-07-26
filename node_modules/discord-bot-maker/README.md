<p align="center"><a href="https://nodei.co/npm/discord-bot-maker/"><img src="https://nodei.co/npm/discord-bot-maker.png"></a></p>

# discord-bot-maker
An extremely simple module that perform basic commands.
Support server: https://discord.gg/3eKwSne

## Installation
```
npm install discord.js
```
```
npm install discord-bot-maker
``` 

Once you've done this, setting the module will be very easy.
And you can follow the code  below to get started!

## Commands and Messages
```js
const token = 'YOUR TOKEN HERE';
const {welcome, purge, kick, ban, status, say, mute} = require("discord-bot-maker");
const Discord = require("discord.js");
const bot = new Discord.Client();

welcome(bot, {
  privatemsg : "Private Message", 
  publicmsg : "Public Message", //@GUILDNAME @MEMBER
  publicchannelid : "999999999999999999" //CHANNEL ID
});

purge(bot, {
  prefix:"!",
  purgecommand: "purge",
  errormsg: "asd",
  nopermmsg: "asd",
});

kick(bot, {
  prefix:"!",
  kickcommand: "kick",
  nopermmsg: "No Perm Error",
  mentionerrormsg: "Mention Error",
  higherroleerrormsg: "Higher Role Error",
  defaultreason: "Default Reason",
  kickmsg: "@KICKAUTHOR @KICKEDUSER @REASON" //@KICKAUTHOR @KICKEDUSER @REASON
});

ban(bot, {
  prefix:"!",
  bancommand: "ban",
  nopermmsg: "No Perm Error",
  mentionerrormsg: "Mention Error",
  higherroleerrormsg: "Higher Role Error",
  defaultreason: "Default Reason",
  banmsg: "Ban Message" //@BANAUTHOR @BANNEDUSER @REASON
});

status(bot, {
  type: "PLAYING", //PLAYING, WATCHING, STREAMING
  title: "Title"
});

say(bot, {
  prefix:"!",
  nopermmsg: "No Perm Error"
});

mute(bot, {
  prefix:"!",
  nopermmsg: "No Perm Error",
  mentionerrormsg: "Mention Error",
  alreadyhasrole: "Already Has Role Error",
  roleid: "999999999999999999", //SECONDARY ROLE ID*
  defaultreason: "Default Reason",
  mutemsg: "Mute Message" //@MUTEDUSER, @MUTEAUTHOR, @REASON
});

bot.login(token)
```
##Author:
freezy0001
Discord: freezy#0001
E-mail: freezy0001w@gmail.com