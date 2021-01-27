const request=require('request')


const forecast=(place,callback)=>{
    const url="http://api.weatherapi.com/v1/forecast.json?key=c176c516129a4d5693b200749202811&q="+place
     request({url:url,json:true},(error,response)=>{
         if(error)
         {
             callback('Unable to connect')
         }else if(response.body.error)
         {
            callback('Unable to find location')
         }
         else{
              callback(undefined,'Humidity  ' +response.body.current.humidity+' It has '+response.body.current.precip_in+' % chances of rainfall')
         }
     })



}
module.exports=forecast
