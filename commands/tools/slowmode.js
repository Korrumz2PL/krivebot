const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return client.error(message, `Nie masz permisji! `);

    if (!args[0]) return client.error(message, "Nie podałeś czasu")
    if (isNaN(args[0])) return client.error(message, 'To nie jest liczba!');
    if ((args[0] > 21600) || (args[0] < -0)) return client.error(message, 'Dłuższy czas cooldownu nie powinien przekraczać 6h.');

    await message.channel.setRateLimitPerUser(args[0])

    const embed = new Discord.MessageEmbed()
        .setTitle("Ustawiono czas powolny")
        .addField("Ustawił", message.author.tag)
        .addField("Ustawiono na", `${args[0]} sek`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "slowmode",
    description: "Ustawia czas powolny na kanale",
    category: "tools",
    aliases: ["cooldown"]
}