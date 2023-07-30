
console.log('Entrando... Aguarde')

const { MessageMedia } = require("whatsapp-web.js")
const client = require("./src/clientStart.js")
// const { List , Client , LocalAuth , MessageMedia , Buttons, Reaction } = require("whatsapp-web.js");
const chalk = require("chalk");

const { 
    no_prefix_commands,
    prefix_commands 
} = require('./reactive_messages.js')

const prefix = '?'


const welcome_msg = () => {
    const text = `
        bem-vindo ao grupo
        Me chame de _alves_
        Sou o criador desse chatbot ;)

        _Em desenvolvimento_
        
        
    `

    return text
}

client.on("group_join", async (group_update) => {
    try{

        // const user = await group_update.getContact()
        const joinedUser = await client.getContactById(group_update.id.participant);
        let mentions = []
        mentions.push(joinedUser)
        var media = ''

        
        // console.log(joinedUser)
        let chat = await group_update.getChat()
        try{
            //mensagem com foto
            var url = await joinedUser.getProfilePicUrl()
            
            media = await  MessageMedia.fromUrl(url)
            chat.sendMessage(media, {mentions, caption: `Olá, @${joinedUser.id.user}!${welcome_msg()}`})    //mensagem com foto tratada 
        }catch(err){
            // mensagem sem foto
            console.log("mensagem sem foto... erro: " + err)
            chat.sendMessage(`Olá, @${joinedUser.id.user}!${welcome_msg()}`, {mentions})   // mensagem sem foto
            // console.log(`Usuário ${joinedUser.number} sem foto`)
            // group_update.reply("SEUGGUNDO TRY" + err)
            
            // console.log(joinedUser.id.user)
        }
    }catch(err){

        console.log(chalk.yellow("MEnsagem sem marcação... ") + err)
        //mensagem sem marcação nem foto
        
        const joinedUser = await client.getContactById(group_update.id.participant);
        await group_update.reply(`Olá, ${welcome_msg()}`)
        console.log("erro ao tentar enviar mensagem a usuario." + err)
        // console.log(`${joinedUser.number} entrou no grupo. Adicionado por ${user.pushname}`)
        // group_update.reply("Primeiro TRY" + err)
    }
})

client.on("group_leave", async (group_update) => {
    const user = await group_update.getContact()
    const quit = await client.getContactById(group_update.recipientIds[0])

    const chat = await group_update.getChat()
        console.log(chat.isGroup)
        
    console.log(`${chalk.redBright(`${quit.pushname}`)} removido por ${chalk.yellow(`${user.pushname}`)}.`)
    // console.log(group_update)

    chat.sendMessage(
        `Usário removido. ${
            quit.pushname == undefined 
                ? "" 
                : "nome: " + quit.pushname
        }`
    )

})

client.on("message", async (msg) => {
    let msgLower = msg.body.toLowerCase().trim()
    let msg_array = msgLower.split(" ")
    let user = await msg.getContact()
    let name = user.pushname


    // console.log(user)
    if(Object.keys(no_prefix_commands).includes(msgLower)){
        client.sendMessage(msg.from, no_prefix_commands[msgLower])
        console.log(`key in prefix... ${chalk.yellow(name)}`)
        return
    }


    if(Object.keys(prefix_commands).includes(msgLower.substring(1))){
        command_msg = no_prefix_commands[msgLower.substring(1)]
        
        msg.reply(no_prefix_commands[msgLower.substring(1)])
        console.log(`${command_msg}... ${chalk.yellow(`${name}`)}`)    
        return
    }

    if(msgLower.includes("alves")){
        // client.sendMessage(msg.from, "ALVES O #(@*$@#")
        return
    }
})