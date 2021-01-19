const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}!`);
});

const diceRegex = /([0-9]+)d([0-9]+)/

// Mensagem de Boas-Vindas!
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');

  if (!channel) return;

  channel.send(`Seja bem vindo(a), ${member}`);
});

client.on('message', msg => {

  if (msg.content === 'ping') {
    msg.reply('pong');
  }

  // Jogar dados ndn
  if (msg.content.startsWith('joga') || msg.content.startsWith('Joga')) {
    try {
      const dicearray = msg.content.slice(5).split(' ');
      let result = "";
      let soma = 0;
      
      dicearray.forEach(value => {
        var dice = diceRegex.exec(value)

        result = result.concat(dice[0] + ' ')

        result = result.concat('(')
        for (let index = 1; index <= dice[1]; index++) {
          random = Math.floor(Math.random() * (dice[2] - 1 + 1) + 1)
          soma += random
          if (String(random) == dice[2]) {
            result = result.concat(` **${random}**,`)
          }else{
            result = result.concat(` ${random},`)
          }
        }
        result = result.slice(0, -1)
        result = result.concat( ')\n')
      })

      if (result.length > 1024) {
        result = result.slice(0, 100) + '...'
      }

      result = result.concat('\n' + 'Resultado: ' + '**'+soma+'**')

      const embed = new Discord.MessageEmbed()
      .setTitle('Aqui está')
      .setColor(0x009688)
      .setDescription(result)


      msg.reply(embed);
    } catch (error) {
      const embed_example = new Discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(
        "esse comando não parece estar certo\n\n\
         **Tente seguir esse exemplo**\n\
         ```json\njoga 1d20 2d10 4d6...```"
      )
      .setColor(0xff0000)

      msg.reply(embed_example);
    }
  }

  if (msg.content === 'chama a galera') {
    for (let index = 0; index < 10; index++) {
      msg.channel.send('@everyone');
    }
  }
});

client.login(config.token);