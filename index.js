
console.log('Entrando... Aguarde')

const { MessageMedia } = require("whatsapp-web.js")
const client = require("./src/clientStart.js")
// const { List , Client , LocalAuth , MessageMedia , Buttons, Reaction } = require("whatsapp-web.js");
const chalk = require("chalk");


const prefix = '?'


const welcome_msg = () => {
    const text = `
        bem-vindo ao grupo
        Me chame de alves
        automações para whatsapp me chame pv
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

client.on("group_leave", async (group_update, msg) => {
    const user = await group_update.getContact()
    const quit = await client.getContactById(group_update.recipientIds[0])

    console.log(`${chalk.redBright(`${quit.pushname}`)} removido por ${chalk.yellow(`${user.pushname}`)}.`)
    console.log(group_update)

})

client.on("message", async (msg) => {
    let msgLower = msg.body.toLowerCase().trim()

    user = await msg.getContact()
    if(msg.body == prefix + 'ping'){
        msg.reply('pong')
        console.log(`ping... ${chalk.yellow(`${user.pushname}`)}`)    
    }

    if(msgLower == "gay acima"){
        client.sendMessage(msg.from, "gay abaixo")
    }

    if(msgLower.includes("alves")){
        msg.reply("oie")
    }
})