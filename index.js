const {welcome, purge, kick, ban, status, say, mute} = require("discord-bot-maker");
const Discord = require("discord.js");
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://database.sqlite');
const bot = new Discord.Client();
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
bot.login(process.env.TOKEN);
client.login(process.env.TOKEN);
// process.env.TOKEN
keyv.on('error', err => console.log('Connection Error', err));
const botprefixes = ["!!","@ToolBot#1694","tb!","toolbot!","toolbot"];
keyv.set("prefixes",botprefixes);
function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
function randomObject() {  
return(","+weapons[between(0,weapons.length-1)]+","+materials[between(0,materials.length-1)]);
}
const weapons = ["sword","knife","fork","pistol"];
const materials = ["rock","wood","steel"];
require('dotenv').config();
function newStatus() {
  if (between(0,10) > 4) {
    client.user.setActivity(`${client.users.cache.size} users | !!cmds`, { type: 'LISTENING' });
    } else {client.user.setActivity(`${client.guilds.cache.size} servers | !!cmds`, { type: 'WATCHING' });}
}
async function checkPrefix(value) {
var srvPrefix = await keyv.get(message.guild.id+"-prefix");
var prefixes = await keyv.get("prefixes");
if (srvPrefix !== null || srvPrefix !== undefined) {var prefixes = prefixes +","+srvPrefix;}
var prefixes = prefixes.split(",");
for (var i=0;i < prefixes.length;i++){
if (value.startsWith(value[i])){return "true "+i;}
}
return false;
}
client.on("ready", () => {
  console.log('Ready to use!');
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  newStatus();
});
client.on("guildCreate", guild => {
  console.log(`Joined to: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  newStatus();
});
client.on("guildDelete", guild => {
  console.log(`Removed from: ${guild.name} (id: ${guild.id})`);
  newStatus();
});
client.on('guildMemberAdd', async member => {
  console.log(`New member joined: ${member}`);
  newStatus();
const user = client.users.cache.get('671458145658470420');
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':inbox_tray: | New member joined')
.setDescription("A new member joined a server!")
.addField("Member ID",member)
.addField("Server name",member.guild)
user.send(embed);
});
client.on('guildMemberRemove', async member => {
  console.log(`New member leaved: ${member}`);
  newStatus();
const user = client.users.cache.get('671458145658470420');
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':outbox_tray: | Member leaved')
.setDescription("A member leaved a server!")
.addField("Member ID",member)
.addField("Server name",member.guild)
user.send(embed);
});
client.on('message', message => {
if (message.content.startsWith('!!:emit')===true) {
var args = message.content.split(" ");
client.emit(args[1], args[2]);
}
});

bot.on('message', async message => {
if (checkPrefix(message.content).startsWith("true")===true) {
var command = command.substring(prefixes[checkPrefix(message.content).split(' ')[1].length],message.content.length);
if (command.startsWith("tim") === true){
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':clock7: | Time')
.setDescription('The current time is: '+time+" (UTC)")
message.channel.send(embed);
}
if (command.startsWith("boti") === true){
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':bar_chart: | Bot info')
.setDescription("Here's the bot's info/status:")
.addField("Total users in all servers",client.users.cache.size+" users")
.addField("Total channels in all servers",client.channels.cache.size+" channels")
.addField("Total servers the bot is in",client.guilds.cache.size+" servers")
message.channel.send(embed);
newStatus();
}
if (command.startsWith("react") === true){
var args = command.split(' ');
if (args[1] == null) {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':x: | Invalid arguments')
.setDescription('Please provide a valid emoji name with the : signs')
message.channel.send(embed);
} else {message.reply("here's your reaction!");message.react(args[1]);}
}
if (command.startsWith(",stat") === true){
    if (message.author.tag === "KimPlayz4LK#1055") {
var types = ["WATCHING","LISTENING","STREAMING","PLAYING"];
  var args = command.split(' ');
  if (args[1] !== null && args[2] !== null && types.includes(args[1])) {
    var embed = new Discord.MessageEmbed()
    .setColor('#f5cc00')
    .setTitle(':information_source: | Bot status')
    .setDescription("Here's the changed values:")
    .addField("Activity type",args[1])
    .addField("Status message/info",args[2])
    message.channel.send(embed);
    client.user.setActivity(args[2], { type: args[1] });
  } else {
    if (!types.includes(args[1]) || args[2] === null) {
  var embed = new Discord.MessageEmbed()
  .setColor('#ad0a0a')
  .setTitle(':information_source: | Syntax error')
  .setDescription("Please select the right arguments below:\rTypes: WATCHING, LISTENING, PLAYING, STREAMING\rYou can write whatever you want in details like this:\r!!,status PLAYING video_games\rAnd the bot will show this:\rPlaying **video_games**")
  message.channel.send(embed);}
  }}}
  if (command.startsWith("pin") == true) {
  const m = await message.channel.send("Ping?");
  var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':ping_pong: | Ping')
.setDescription(message.author + ", here's the bot's ping information")
.addField("Latency",m.createdTimestamp - message.createdTimestamp + "ms")
.addField("API Latency",Math.round(client.ws.ping) + "ms")
m.edit(embed);
}
if (command.startsWith("daily") === true){
var args = command.split(' ');
var ms = new Date().getTime();
var expiryTime = await keyv.get(message.author.tag+"-daily");
if (expiryTime == null) {await keyv.set(message.author.tag+"-daily", 0);}
var expiryTime = await keyv.get(message.author.tag+"-daily");
if (ms >= expiryTime) {
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
if (claimboxes == null) {await keyv.set(message.author.tag+"-claimboxes", 0);}
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
await keyv.set(message.author.tag+"-claimboxes", parseInt(claimboxes+2));
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
var embed = new Discord.MessageEmbed()
.setColor('#0ae307')
.setTitle(':package: | Daily reward')
.setDescription(message.author.username + ", you have claimed your daily reward!")
.addField("You now have **__"+claimboxes+"__** `claim-boxes`!", "You can claim a daily reward again in 24 hours!")
message.channel.send(embed);
var ms = new Date().getTime();
await keyv.set(message.author.tag+"-daily", parseInt(ms+86400000));
var claims = await keyv.get(message.author.tag+"-claims");
if (claims == null) {await keyv.set(message.author.tag+"-claims", 0);}
await keyv.set(message.author.tag+"-claims", parseInt(claims+1));
var claims = await keyv.get(message.author.tag+"-claims");
} else {
var ms = new Date().getTime();
var expiryTime = await keyv.get(message.author.tag+"-daily");
var expiryTime = parseInt(expiryTime-ms) / 60 / 60 / 1000;
var remainingTime = Math.round(expiryTime);
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':package: | Daily reward')
.setDescription(message.author.username + ", it's not the time to claim yet!")
.addField("Please wait **__"+remainingTime+"__** hours", "You will get a `claim-box` in each reward to get items!")
message.channel.send(embed);
}}
if (command.startsWith("week") === true){
var args = command.split(' ');
var ms = new Date().getTime();
var expiryTime = await keyv.get(message.author.tag+"-weekly");
if (expiryTime == null) {await keyv.set(message.author.tag+"-weekly", 0);}
var expiryTime = await keyv.get(message.author.tag+"-weekly");
if (ms >= expiryTime) {
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
if (claimboxes == null) {await keyv.set(message.author.tag+"-claimboxes", 0);}
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
await keyv.set(message.author.tag+"-claimboxes", parseInt(claimboxes+3));
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
var embed = new Discord.MessageEmbed()
.setColor('#0ae307')
.setTitle(':package: | Weekly reward')
.setDescription(message.author.username + ", you have claimed your weekly reward!")
.addField("You now have **__"+claimboxes+"__** `claim-boxes`!", "You can claim a weekly reward again in 7 days!")
message.channel.send(embed);
var ms = new Date().getTime();
await keyv.set(message.author.tag+"-weekly", parseInt(ms+604800000));
var claims = await keyv.get(message.author.tag+"-claims");
if (claims == null) {await keyv.set(message.author.tag+"-claims", 0);}
await keyv.set(message.author.tag+"-claims", parseInt(claims+1));
var claims = await keyv.get(message.author.tag+"-claims");
} else {
var ms = new Date().getTime();
var expiryTime = await keyv.get(message.author.tag+"-weekly");
var expiryTime = parseInt(expiryTime-ms)/ 24 / 60 / 60 / 1000;
var remainingTime = Math.round(expiryTime);
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':package: | Weekly reward')
.setDescription(message.author.username + ", it's not the time to claim yet!")
.addField("Please wait **__"+remainingTime+"__** days", "You will get a `claim-box` in each reward to get items!")
message.channel.send(embed);
}}
if (command.startsWith("hour") === true){
var args = command.split(' ');
var ms = new Date().getTime();
var expiryTime = await keyv.get(message.author.tag+"-hourly");
if (expiryTime == null) {await keyv.set(message.author.tag+"-hourly", 0);}
var expiryTime = await keyv.get(message.author.tag+"-hourly");
if (ms >= expiryTime) {
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
if (claimboxes == null) {await keyv.set(message.author.tag+"-claimboxes", 0);}
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
await keyv.set(message.author.tag+"-claimboxes", parseInt(claimboxes+1));
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
var embed = new Discord.MessageEmbed()
.setColor('#0ae307')
.setTitle(':package: | Hourly reward')
.setDescription(message.author.username + ", you have claimed your hourly reward!")
.addField("You now have **__"+claimboxes+"__** `claim-boxes`!", "You can claim a hourly reward again in 1 hour!")
message.channel.send(embed);
var ms = new Date().getTime();
await keyv.set(message.author.tag+"-hourly", parseInt(ms+3600000));
var claims = await keyv.get(message.author.tag+"-claims");
if (claims == null) {await keyv.set(message.author.tag+"-claims", 0);}
await keyv.set(message.author.tag+"-claims", parseInt(claims+1));
var claims = await keyv.get(message.author.tag+"-claims");
} else {
var ms = new Date().getTime();
var expiryTime = await keyv.get(message.author.tag+"-hourly");
var expiryTime = parseInt(expiryTime-ms) / 60 / 1000;
var remainingTime = Math.round(expiryTime);
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':package: | Hourly reward')
.setDescription(message.author.username + ", it's not the time to claim yet!")
.addField("Please wait **__"+remainingTime+"__** minutes", "You will get a `claim-box` in each reward to get items!")
message.channel.send(embed);
}}
if (command.startsWith("check") === true || command.startsWith("cd") === true){
var args = command.split(' ');
var ms = new Date().getTime();
var expiryTimeH = await keyv.get(message.author.tag+"-hourly");
var expiryTimeD = await keyv.get(message.author.tag+"-daily");
var expiryTimeW = await keyv.get(message.author.tag+"-weekly");
if (expiryTimeH == null) {await keyv.set(message.author.tag+"-hourly", 0);}
if (expiryTimeD == null) {await keyv.set(message.author.tag+"-daily", 0);}
if (expiryTimeW == null) {await keyv.set(message.author.tag+"-weekly", 0);}
var expiryTimeH = await keyv.get(message.author.tag+"-hourly");
var expiryTimeD = await keyv.get(message.author.tag+"-daily");
var expiryTimeW = await keyv.get(message.author.tag+"-weekly");
if (ms > expiryTimeH) {
var hRes = ":white_check_mark: | Hourly reward is now available!";
} else {
var expiryTimeH = parseInt(expiryTimeH-ms) / 60 / 1000;
var remainingTime = Math.round(expiryTimeH);
var hRes = ":x: | Hourly reward will be available in **__"+remainingTime+"__** minutes";
}
if (ms > expiryTimeD) {
var dRes = ":white_check_mark: | Daily reward is now available!";
} else {
var expiryTimeD = parseInt(expiryTimeD-ms)/ 60 / 60 / 1000;
var remainingTime = Math.round(expiryTimeD);
var dRes = ":x: | Daily reward will be available in **__"+remainingTime+"__** hours";
}
if (ms > expiryTimeW) {
var wRes = ":white_check_mark: | Weekly reward is now available!";
} else {
var expiryTimeD = parseInt(expiryTimeW-ms)/ 24 / 60 / 60 / 1000;
var remainingTime = Math.round(expiryTimeD);
var wRes = ":x: | Weekly reward will be available in **__"+remainingTime+"__** days";
}
var claims = await keyv.get(message.author.tag+"-claims");
if (claims == null) {await keyv.set(message.author.tag+"-claims", 0);}
var claims = await keyv.get(message.author.tag+"-claims");
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
if (claimboxes == null) {await keyv.set(message.author.tag+"-claimboxes", 0);}
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':timer: | Cooldowns')
.setDescription("You can check the cooldowns below:")
.addField("Hourly reward: " + hRes, "You can get 1 `claim-box` by claiming the reward")
.addField("Daily reward:  " + dRes, "You can get 2 `claim-boxes` by claiming the reward")
.addField("Weekly reward: " + wRes, "You can get 3 `claim-boxes` by claiming the reward")
.addField("You currently have **__"+claimboxes+"__** `claim-boxes` in your inventory", "Claim boxes are used to get items")
.addField("You have claimed **__"+claims+"__** rewards in total", "The number increases each time you claim a reward")
message.channel.send(embed);
}

if (command.startsWith("newi") === true || command.startsWith("claimb") === true) {
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
if (claimboxes == null) {await keyv.set(message.author.tag+"-claimboxes", 0);}
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
if (claimboxes > 0 || message.author.tag === "KimPlayz4LK#1055") {
var inventory = await keyv.get(message.author.tag+"-inventory");
if (inventory == null) {await keyv.set(message.author.tag+"-inventory", ",wood");}
var inventory = await keyv.get(message.author.tag+"-inventory");
var randomObj = randomObject();
await keyv.set(message.author.tag+"-inventory", inventory+randomObj);
var inventory = await keyv.get(message.author.tag+"-inventory");
var args = inventory.split(',');
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':toolbox: | Claim-box opening')
.setDescription("You have opened a `claim-box` and here's what you got:")
.addField(":new: | Received items",randomObj)
.addField(":toolbox: | Inventory",args)
message.channel.send(embed);
var claimboxes = await keyv.get(message.author.tag+"-claimboxes");
await keyv.set(message.author.tag+"-claimboxes", parseInt(claimboxes)-1);
} else {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':x: | Uh oh...')
.addField("You don't have a `claim-box` to open!","You can always get a claim-box by claiming a reward")
message.channel.send(embed);
}
}}

if (command.startsWith("inve") === true || command === "!!inv") {
var inventory = await keyv.get(message.author.tag+"-inventory");
if (inventory == null) {await keyv.set(message.author.tag+"-inventory", ",wood");}
var inventory = await keyv.get(message.author.tag+"-inventory");
var args = inventory.split(',');
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':toolbox: | Inventory')
.setDescription("Here's your inventory")
.addField("Items",args)
message.channel.send(embed);
}
if (command.startsWith("use ") === true) {
var item = command.split(' ');
var inventory = await keyv.get(message.author.tag+"-inventory");
if (inventory == null) {await keyv.set(message.author.tag+"-inventory", ",wood");}
var inventory = await keyv.get(message.author.tag+"-inventory");
var inv = inventory.split(',');
if (inv.includes(item[1]) === true) {
var inventory = inventory.replace(new RegExp(","+item[1]),"");
await keyv.set(message.author.tag+"-inventory", inventory);
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':tools: | Item usage')
.addField("Item used",item[1])
.addField("Inventory",inventory)
message.channel.send(embed);
} else {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':x: | Item usage')
.setDescription("You don't have "+item[1]+" in your inventory!")
message.channel.send(embed);
}}
if (command.startsWith("val") === true){
fs.readFile("value.txt", function(err, buf) {
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':memo: | File value')
.addField(":page_facing_up: | Current value",buf)
.addField(":information_source: | Info","You can change the value by using the !!write command")
message.channel.send(embed);
});
} else if (message.content.startsWith('!!write') === true) {
let value = message.content.substring(7, message.content.length) + '\n\n Wrote by: ' + message.author.tag;
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':memo: | File writing')
.setDescription(message.author.tag + " made changes to the file")
.addField(":page_facing_up: | Value changed to",value)
message.channel.send(embed);
fs.writeFile('value.txt', value, (err) => {if (err) throw err;console.log('ERROR (S):\n' + err);});
console.log(message.author.tag + " wrote\n" + value + "\nto the file.");
}
if (command.startsWith('!!fru')===true) {
message.react('🍎');
console.log('Reacted with an apple');
message.react('🍊');
console.log('Reacted with an orange');
message.react('🍇');
console.log('Reacted with grapes');
}
if (command.startsWith("cmd") === true){
const exampleEmbed = new Discord.MessageEmbed()
.setColor('#00a6ff')
.setTitle('Commands | Prefix: !!')
.setThumbnail('https://imageog.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF')
.addField("Support server link","https://discord.gg/P9V3BmZ")
.addFields(
{ name: 'Fun', value: 'fruits, thumbs, random :wrench:, daily, hourly, weekly, use :wrench:, newitem/claimbox :wrench:, react'},
{ name: 'Info & Tools', value: 'serverinfo, myinfo, membercount, find, cmds, help, value, write, invite, time, check/cd, deletemessages/del, inventory/inv, ping, botinfo, play/music, stop'},
    { name: 'Moderation', value: 'kick, ban, superduperkick (same as kick), mute, warn',},
//    { name: ':tools: Under developement :tools:', value: ""}
)
.addField("Vote on discordbotlist!","https://discord.com/api/oauth2/authorize?client_id=735733544730492958&permissions=8&scope=bot")
.addField("Check discordbots!","https://discord.bots.gg/bots/735733544730492958")
.setTimestamp()
.setFooter('Help', 'https://imageog.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF');
message.channel.send(exampleEmbed);
  } else if (command.startsWith("help") === true){
    const exampleEmbed = new Discord.MessageEmbed()
.setColor('#00a6ff')
.setTitle('Help | Prefix: !!')
.setDescription('This help message gives you help about commands')
.setThumbnail('https://imageog.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF')
.addField("Support server link","https://discord.gg/P9V3BmZ")
.addFields(
  { name: '!!fruits', value: 'Gives you 3 fruit reactions'},
  { name: '!!thumbs', value: 'Gives you a choice between like and dislike'},
  { name: '!!ping', value: "Displays the bot's ping"},
  { name: '!!random :wrench:', value: 'Generates a random number'},
  { name: '!!daily', value: 'Claims your daily reward'},
  { name: '!!hourly', value: 'Claims your hourly reward'},
  { name: '!!use <item> :wrench:', value: 'Uses an item from your inventory'},
  { name: '!!newitem / !!claimbox :wrench:', value: 'Opens a claim-box and you get items'},
  { name: '!!weekly', value: 'Claims your weekly reward'},
  { name: '!!react <emoji>', value: 'Reacts to your message with a selected emoji (: signs required)'},
  { name: '!!serverinfo', value: 'Gives the info of the server as server name and member count'},
  { name: '!!myinfo', value: 'Gives the info about you'},
  { name: '!!membercount', value: 'Shows the number of members in the server'},
  { name: '!!find <link>', value: 'Finds an image, song of anything else and sends a file to download'},
  { name: '!!cmds', value: 'Shows the list of commands'},
  { name: '!!help', value: 'Shows this help message'},
  { name: '!!value', value: 'Displays the value in the saved file'},
  { name: '!!write <new text/value>', value: 'Writes a new value to the saved file'},
  { name: '!!invite', value: 'Gives you an invite link for this bot'},
  { name: '!!time', value: 'Displays the current time in UTC format'},
  { name: '!!check / !!cd', value: 'Checks your cooldowns on reward claiming, and displays how many you have claim-boxes and you claimed rewards'},
  { name: '!!deletemessages / !!del <amount>', value: 'Deletes the selected amount of messages between 1 and 99'},
  { name: '!!inventory / !!inv', value: 'Displays your items in your inventory'},
  { name: '!!botinfo', value: 'Returns the bot stats'},
  { name: '!!kick <mention>', value: 'Kicks a member from the server'},
  { name: '!!ban <mention>', value: 'Bans a member from the server'},
  { name: '!!superduperkick <mention>', value: "Same function as 'kick' but sounds more cool"},
  { name: '!!mute <mention>', value: 'Mutes a member in the server'},
  { name: '!!warn <mention>', value: 'Warns a member, at 3 warns, the member will be kicked'},
  { name: '!!play / !!music <link>', value: 'Plays music from the selected link from YouTube'},
  { name: '!!stop', value: 'Stops music'},
)
.addField("Vote on discordbotlist!","https://discord.com/api/oauth2/authorize?client_id=735733544730492958&permissions=8&scope=bot")
.addField("Check discordbots!","https://discord.bots.gg/bots/735733544730492958")
.setFooter('Help', "https://imageog.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF")
.setTimestamp()
message.channel.send(exampleEmbed);
}
if (command.startsWith("invite") === true){
const exampleEmbed = new Discord.MessageEmbed()
.setColor('#00a6ff')
.setTitle(':love_letter: | Bot invite')
.addFields(
{ name: 'Invitation link', value: 'https://discord.com/api/oauth2/authorize?client_id=735733544730492958&permissions=8&scope=bot'},
{ name: 'Info', value: 'You can always contact KimPlayz4LK#1055!'}
)
message.channel.send(exampleEmbed);
}
if (command.startsWith("supp") === true){
const exampleEmbed = new Discord.MessageEmbed()
.setColor('#00a6ff')
.setTitle(':passport_control: | Bot support server')
.addFields(
  { name: 'Support server link', value: 'https://discord.gg/P9V3BmZ'},
  { name: 'Info', value: 'You can always contact KimPlayz4LK#1055!'}
)
message.channel.send(exampleEmbed);
}
if (command.startsWith("serveri") === true){
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':information_source: | Server info')
.setDescription("Here's the server info")
.addField("Server name",message.guild.name)
.addField("Member count",message.guild.memberCount)
message.channel.send(embed);
} else if (command.startsWith("myin") === true) {
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':information_source: | Your info')
.setDescription("Here's info about you")
.addField("Your username",message.author.username)
.addField("Your ID",message.author.id)
message.channel.send(embed);
}
if (command.startsWith("rand") === true) {
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':1234: | Random number')
.setDescription("Here's your result")
.addField("Random number between 0 and 1000",between(0,1000))
message.channel.send(embed);
}
if (command.startsWith("memberc") === true){
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':information_source: | Member count')
.setDescription("Here's the number of members in this server, including bots")
.addField("Member count",message.guild.memberCount)
message.channel.send(embed);
}
if (command.startsWith("find ") === true) {
var file = new Discord.MessageAttachment(command.substring(7,message.content.length));
message.channel.send({files: [file]});
}
if (command.startsWith("warn ") === true){
var member = message.mentions.members.first();
if (await keyv.get(member+"-warns") == null) {await keyv.set(member+"-warns", 1);}
var warns = await keyv.get(member+"-warns");
await keyv.set(member+"-warns", parseInt(warns+1));
if (warns < 3) {
var embed = new Discord.MessageEmbed()
.setColor('#e09e22')
.setTitle(':oncoming_police_car: | Moderation: Warn')
.addField(member + ", you was warned.","That member has " + warns + " warns. At 3 warns, the member will be kicked.")
message.channel.send(embed);
} else {
member.kick();
var embed = new Discord.MessageEmbed()
.setColor('#e09e22')
.setTitle(':oncoming_police_car: | Moderation: Warn')
.addField("<@"+member.id + ">, you have reached 3 warns, now you are kicked.","That member is now kicked")
message.channel.send(embed);
await keyv.set(member+"-warns", 1);
}}
if (command.startsWith("deletem") === true || command.startsWith("del ") === true){
var args = command.split(' ');
if (args[1] == null) {message.channel.send(":x: | Please provide an amout in numbers");} else {
if (args[1] < 100 && args[1] > 0){message.channel.bulkDelete(args[1],true);} else {message.channel.send(":x: | Please provide an amout between 1 and 99");}}
}
if (command.startsWith("thum") === true){
message.react('👍');
message.react('👎');
const filter = (reaction, user) => {
return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
};
message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
.then(collected => {
const reaction = collected.first();
if (reaction.emoji.name === '👍') {
message.reply('you reacted with a thumbs up.');
} else {
message.reply('you reacted with a thumbs down.');
}})
.catch(collected => {
message.reply('you reacted with neither a thumbs up, nor a thumbs down.');});
}
if (command.startsWith('!!play') === true || command.startsWith('!!music') === true) {
var args = command.split(' ');
if (args[1] !== undefined && args[1] !== null){
if (message.channel.type !== 'text') return;
const voiceChannel = message.member.voice.channel;
if (!voiceChannel) {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':musical_note: | Error')
.setDescription("You should join a voice channel before playing music!\rYou won't hear your music then!")
return message.channel.send(embed);
}
voiceChannel.join().then(connection => {
const stream = ytdl(args[1], { filter: 'audioonly' });
const dispatcher = connection.play(stream);
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':musical_note: | Music')
.setDescription('Music started at <#'+voiceChannel+'>')
.addField("Song URL/link", args[1])
.addField("Music started by", message.author)
message.channel.send(embed);
dispatcher.on('finish', () => voiceChannel.leave());});
} else {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':musical_note: | Invalid arguments')
.setDescription('Please, provide a valid link (URL)')
message.channel.send(embed);}
} else if (message.content.startsWith('!!stop') === true) {
const voiceChannel = message.member.voice.channel;
if (!voiceChannel) {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':musical_note: | Error')
.setDescription("<@"+message.author.id+">You should join the music channel where you want to stop the music")
message.channel.send(embed);
}
voiceChannel.leave();
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':musical_note: | Music')
.setDescription('Music stopped in <#'+voiceChannel+'>')
.addField("Music stopped by", message.author)
message.channel.send(embed);
}
if (command.startsWith("mute ") === true){
var args = command.split(' ');
var role = message.guild.roles.cache.find(role => role.name === 'MUTED');
var member = message.mentions.members.first();
member.roles.add(role);
}
if (command.startsWith("pref") === true){
var args = command.split(' ');
var srvPrefix = await keyv.get(message.guild.id+"-prefix");
if (args[1]===null) {
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':robot: | Prefix')
.setDescription("The server's bot prefix is "+srvPrefix)
.addField("Other available prefixes", prefixes)
message.channel.send(embed);
} else {
if (args[1] !== ",") {
await keyv.set(message.guild.id+"-prefix",args[1]);
var embed = new Discord.MessageEmbed()
.setColor('#0ba9d9')
.setTitle(':robot: | Prefix change')
.setDescription("The server's bot prefix is changed to "+args[1])
.addField("Other available prefixes", prefixes)
.addField("Prefix before", srvPrefix)
message.channel.send(embed); } else {
var embed = new Discord.MessageEmbed()
.setColor('#ad0a0a')
.setTitle(':x: | Prefix change error')
.setDescription("Please enter another prefix than comma")
message.channel.send(embed);}}}

});

bot.on('message', async message => {
if (message.author.tag === "KimPlayz4LK#1055") {
if (message.content.startsWith("!!,set") === true){
var args = message.content.split(' ');
await keyv.set(args[1], args[2]);
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':newspaper: | Database')
.setDescription("Here's the changed values:")
.addField(args[1],args[2])
message.channel.send(embed);}

if (message.content.startsWith("!!,get") === true){
var args = message.content.split(' ');
var value = await keyv.get(args[1])
var embed = new Discord.MessageEmbed()
.setColor('#f5cc00')
.setTitle(':newspaper: | Database')
.setDescription("Here's the requested values:")
.addField(args[1],value)
message.channel.send(embed);
}}});

 kick(bot, {
  prefix:"!!",
  kickcommand: "kick",
  nopermmsg: "Haven't got right permissions!",
  mentionerrormsg: "No one with that name exists!",
  higherroleerrormsg: "The user is higher in the hierarchy! Oh no!",
  defaultreason: "You were being naughty!",
  kickmsg: "@KICKAUTHOR have been kicked @KICKEDUSER" //@KICKAUTHOR @KICKEDUSER @REASON
});

ban(bot, {
  prefix:"!!",
  bancommand: "ban",
  nopermmsg: "ACCESS DENIED",
  mentionerrormsg: "Mention error",
  higherroleerrormsg: "If you are trying to ban people who is higher than you, they mabe wanna ban you.",
  defaultreason: "Default Reason",
  banmsg: "@BANNEDUSER was banned by @BANAUTHOR." //@BANAUTHOR @BANNEDUSER @REASON
});