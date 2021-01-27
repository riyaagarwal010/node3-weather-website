
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./forecast.js')

const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

const app=express()
app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'../public')))
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
 
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:'Riya'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Riya'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'I m here to help you',
        name:'Riya'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Adress must be provided'
        })
    }
    forecast(req.query.address,(error,data)=>{
        if(error)
        {
            return res.send({error})
        }
        res.send({
            forecast:data,
            address:req.query.address
        })
         
    })
   
}
)

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Riya',
        errorMessage:'Help Article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Riya',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is on port 3000')
})