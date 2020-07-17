const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix)) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("665379261976281130");
  let channel = await client.channels.cache.get("671462517524135975");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === ":grinning:");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(` Boas-vindas `)
      .setImage("https://i.postimg.cc/MKBTdMTx/7e9d86951050ce0953894254583fca6d.png")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**!       
      Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .addField('Canais', 'Siga as regras e evite ser Banido! <#671462522716422147> ')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Código de Nuffle")
      .setTimestamp();

    channel.send(embed);
  }
});


client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token