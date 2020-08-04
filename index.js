const {welcome, purge, kick, ban, status, say, mute} = require("discord-bot-maker");
const Discord = require("discord.js");
//const Canvas = require('canvas');
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://database.sqlite');
const bot = new Discord.Client();
const client = new Discord.Client();
const fs = require('fs');
bot.login(process.env.TOKEN);
client.login(process.env.TOKEN);
// process.env.TOKEN
keyv.on('error', err => console.log('Connection Error', err));
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px arial`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};
function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
require('dotenv').config();
bot.once('ready', () => {
  console.log('Ready to use!');
  console.log(`Logged in as ${bot.user.tag}!`);
});
status(bot, {
  type: "WATCHING", //PLAYING, WATCHING, STREAMING, LISTENING
  title: "people | !!cmds"
});




bot.on('message', msg => {
  if (msg.content == 'ping') {
    msg.channel.send('Pong!');
  }
});

bot.on('message', message => {
if (message.content.startsWith("!!time") === true){
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
message.reply(time);
}
});

bot.on('message', async message => {
if (message.content.startsWith(",set") === true){
var args = message.content.split(' ');
await keyv.set(args[1], args[2]);
message.channel.send(args[1]+": "+args[2]);
}
if (message.content.startsWith(",get") === true){
var args = message.content.split(' ');
message.channel.send(await keyv.get(args[1]));
}
});

bot.on('message', message => {
	if (message.content === '!!value') {
    fs.readFile("value.txt", function(err, buf) {message.channel.send("The current value is:\n_" + buf + "_");});
	} else if (message.content.startsWith('!!write') === true) {
let value = message.content.substring(7, message.content.length) + '\n\n Wrote by: ' + message.author.tag;
fs.writeFile('value.txt', value, (err) => {
    if (err) throw err;
    console.log('ERROR (S):\n' + err);
});
message.channel.send("Wrote \n`" + value + "`\n\n to the file. So now you can try reading by using __!!value__ command!")
    console.log(message.author.tag + " wrote\n" + value + "\nto the file.");
}
});
bot.on('message', message => {
if (message.content === '!!fruits') {
	message.react('🍎');
	console.log('Reacted with an apple');
	message.react('🍊');
	console.log('Reacted with an orange');
	message.react('🍇');
	console.log('Reacted with grapes');
}
});
/*
bot.on('message', async message => {
  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
  }
	if (message.content.startsWith('!!play ') === true) {
      const connection = await message.member.voice.channel.join();
      var song = message.content.substring(7,message.content.length)
      message.channel.send(`${song}`);
      const dispatcher = connection.play(song, { volume: 0.5 });;
dispatcher.on('start', () => {
  console.log(song + ' have started playing');
  message.channel.send(`${message.author.name.tag} have started playing ${song}`);
});
dispatcher.on('finish', () => {
  console.log(song + ' have finished playing');
});
dispatcher.on('error', console.error);
	}
}); */
bot.on('message', message => {
  if (message.content === "!!cmds") {
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#00a6ff')
	.setTitle('Commands | Prefix: !!')
	.setThumbnail('https://imageog.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF')
	.addFields(
		{ name: 'Fun', value: 'fruits, thumbs, ping (no prefix), random'},
		{ name: 'Info & Tools', value: 'serverinfo, myinfo, membercount, find, cmds, help, value, write, invite, time'},
    { name: 'Moderation', value: 'kick, ban, superduperkick (same as kick)',},
    { name: 'Under developement', value: 'mute, play',}
	)
	.setTimestamp()
	.setFooter('Help', 'https://imageog.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF');
message.channel.send(exampleEmbed);
  } else if (message.content === "!!help") {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#00a6ff')
      .setTitle('Help | Prefix: !!')
      .setDescription('This help message gives you help about commands')
      .setThumbnail('https://imageog.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF')
      .addFields(
        { name: '!!fruits', value: 'Gives you 3 fruit reactions'},
        { name: '!!thumbs', value: 'Gives you a choice between like and dislike'},
        { name: 'ping', value: 'Replies you with a Pong!'},
        { name: '!!random', value: 'Generates a random number'},
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
        { name: '!!kick <mention>', value: 'Kicks a member from the server'},
        { name: '!!ban <mention>', value: 'Bans a member from the server'},
        { name: '!!superduperkick <mention>', value: "Same function as 'kick' but sounds more cool"},
        { name: '~~!!play <link>~~', value: '~~Plays music~~'},
        { name: '~~!!mute <mention>~~', value: '~~Mutes a member in the server~~'},
      )
      .setFooter('Help', 'https://imageog.flaticon.com/icons/png/512/682/682055.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF')
      .setTimestamp()
    message.channel.send(exampleEmbed);
      }
});
bot.on ('message', message => {
  if (message.content === "!!invite") {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#00a6ff')
      .setTitle('Bot invite')
      .addFields(
        { name: 'Invitation link', value: 'https://discord.com/api/oauth2/authorize?client_id=735733544730492958&permissions=8&scope=bot'},
        { name: 'Info', value: 'You can always contact KimPlayz4LK#1055!'},
      )
    message.channel.send(exampleEmbed);
      }
});
bot.on('message', message => {
	if (message.content === '!!serverinfo') {
    message.channel.send(`Server's name: ${message.guild.name}`);
    message.channel.send(`Member count: ${message.guild.memberCount}`);
  } else if (message.content === "!!myinfo") {
    message.reply(`\nyour username: ${message.author.username}\nYour ID: ${message.author.id}`);
  }
});
bot.on('message', message => {
	if (message.content === '!!random') {
    message.reply("your random number between 0 and 100 is "+between(0, 100));
  }
});
bot.on('message', message => {
	if (message.content === '!!membercount') {
    message.channel.send(`This server have ${message.guild.memberCount} members!`);
  }
});
bot.on('message', message => {
  if (message.content.startsWith("!!find ") === true) {
  var file = new Discord.MessageAttachment(message.content.substring(7,message.content.length));
  message.channel.send({files: [file]});
}});
/*
client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'public-chat');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('./'+ between(1,4) +'.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px arial';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on('message', message => {
	if (message.content === '!!:newmember') {
		client.emit('guildMemberAdd', message.member);
	}
});
*/
bot.on('message', message => {
if (message.content === '!!thumbs') {
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
		}
	})
	.catch(collected => {
		message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
	});
}
});

 kick(bot, {
  prefix:"!!",
  kickcommand: "kick",
  nopermmsg: "Haven't got right permissions!",
  mentionerrormsg: "No one with that name exists!",
  higherroleerrormsg: "The user is higher in the hierarchy! Oh no!",
  defaultreason: "You were being naughty!",
  kickmsg: "@KICKAUTHOR have been kicked @KICKEDUSER" //@KICKAUTHOR @KICKEDUSER @REASON
}); 
 kick(bot, {
  prefix:"!!",
  kickcommand: "superduperkick",
  nopermmsg: ":x: ACCESS DENIED :x:",
  mentionerrormsg: "No one with that name exists!",
  higherroleerrormsg: "Don't kick him. Just don't.",
  defaultreason: "You were being naughty!",
  kickmsg: "YOU HAVE SUPER-DUPER KICKED @KICKEDUSER" //@KICKAUTHOR @KICKEDUSER @REASON
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
mute(bot, {
  prefix:"!!",
  nopermmsg: "Can't mute @MUTEDUSER",
  mentionerrormsg: "Mention Error",
  alreadyhasrole: "Already Has Role Error",
  roleid: "735794684034678844", //SECONDARY ROLE ID*
  defaultreason: "Default Reason",
  mutemsg: "@MUTEAUTHOR have muted @MUTEDUSER." //@MUTEDUSER, @MUTEAUTHOR, @REASON
});
// bot.on('message', message => {
//   if (message.content.startsWith('!!kick') === true)
//   const member = message.mentions.members.first();
//   member.kick();
// });