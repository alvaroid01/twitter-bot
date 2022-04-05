require('dotenv').config()
//initizlize bot
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  console.log('💫💫💫The bot is starting!💫💫💫');

var Twit = require('twit');

const rwClient = require('./twitterClientV2.js');
var T = new Twit(require('./twitterClient'));

const userID = process.env.TWITTER_API_USER_ID
const blockNumber = 50

var cron = require('node-cron');

cron.schedule('*/15 * * * *', () => {
  console.log('running a task every 15 minutes');
  findUsers(blockNumber)
    getUserBlocked()
});

setTimeout(() => {
    console.log('aldfrg')
}, 1000);
const searchIndividualUser =  (username) =>{
 
    rwClient.v1.searchUsers(username).then((res)=>{
      
        if(typeof res._realData[0] === null || typeof res._realData[0] === 'undefined'){
            console.log('💀💀 This account does not exist 💀💀')
           
       }else{
             let userBlock = (res._realData[0].id_str)
            
             rwClient.v2.block(userID, userBlock).then((data)=>{
             console.log('🚫🚫🚫 Blocked user ' + res._realData[0].name + ' with ID: ' + userBlock + ' 🚫🚫🚫')
             
             
             
             return {data } 
                 
             }
          
           ).catch((err)=>{
               return console.log(err.data.errors)
           }) 


       }          
    })
}
const findUsers = async(numb) =>{
      await T.get('search/tweets', { q: 'NFT #NFT crypto since:2021-03-11', count: numb }, function(err, data, response) {
         for (const user of data.statuses){
           
            searchIndividualUser(user.user.screen_name, numb)
        } 
       
    })  
      
}
const blokedId = async() =>{
    await T.get('blocks/ids',function(err, data, response) {
        let size = data.ids.length
        return size}
      
    )
}


const getUserBlocked = async() =>{
await T.get('blocks/ids',function(err, data, response) {
    
    let size = data.ids.length
    return console.log('🎉🎉🎉 You have blocked ' + size + ' cryptobros!🎉🎉🎉 ')

    })
}


  
  
