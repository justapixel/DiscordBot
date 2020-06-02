const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const diceRegex = /([0-9]+)d([0-9]+)/

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
  if (msg.content === 'boa') {
    msg.reply('hehehe');
  }
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
          result = result.concat(random + ',')
        }
        result = result.concat(') ')
      })

      result = result.replace(/,\)/g, ')')

      result = result.concat('\n' + 'Resultado: ' + '**'+soma+'**')

      const embed = new Discord.MessageEmbed()
      .setTitle('Ai estão')
      .setColor(0x009688)
      .setDescription(result)


      msg.reply(embed);
    } catch (error) {
      console.log(error)
      msg.reply('Joga direito, Ex "joga 1d20"');
    }
  }
});

client.login('token');