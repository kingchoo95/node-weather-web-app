const geoInfo = require('./utils/geocode')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { query } = require('express')

const app = express()

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//define paths for express config
const viewPath = path.join(__dirname, '../template/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname,'../template/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render("index",{
        title: 'Weahter App',
        name: 'Andrew Mead'
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title: 'About Page',
        name: 'David'
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"About Page",
        message: "Message to screen",
        name: "Livia"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "You need to provide an address"
        })
    }   

    geoInfo.getGeoCode(req.query.address, (item1, error)=>{

        if(!error){
            if(item1.status){
                
                geoInfo.getWeather(item1.location,(item2, error)=>{
                    
                  
                    if(!error){
                        if(item2.status){
                            return res.send({
                                location: req.query.address,
                                address: item1.location, 
                                weather:item2.weather
                            })
                       }else{
                            return res.send(item2)
                       }
                    }else{
                        res.send(error);
                    }
                })
            }else{
                return res.send(item1)
            }

        }else{
            
            return res.send(error)
        }
    })

    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a searh term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })    
})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: 'help article not found',
        name: 'as'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title:'Page Not Found',
        name: 'Apple'
    })
})

// app.com
// app.get('',(req, res)=>{
//     res.send('<h1>Contain</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([
//         {
//             name: 'David',
//             age: '26'
//         },
//         {
//             name: 'David GF',
//             age: '21'
//         }
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>HTML</h1>')
// })



app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})