const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.listen(5000, function(err){
    if(err) console.log(err);
    })


// Syntactic sugar

// app.listen(5000, (err) => {
//     if(err) console.log(err);
//     })

// sends an html file
// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/Lecture2.html")
// })

// the ':' stands for a query

// res.write writes a lot of lines
// res.send sends them all at once

const https = require("https");

app.get("/profile/:id", function (req, res) {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    //req.params.id;
    //console.log(req);

    // res.write(` <h1> Hello, this pokemon has the id ${req.params.id} </h1>`)
    // res.write(` <h1> This pokemon has the id ${req.params.id} </h1>`)
    // res.write(` <h1> Id of pokemon: ${req.params.id} </h1>`)
    // res.send();

    https.get(url, function(https_res) {
        https_res.on("data", function(chunk){
            // console.log(JSON.parse(data))
            data += chunk;
        })
        https_res.on("end", function (){
            // console.log(JSON.parse(data))
            data = JSON.parse(data)

            z = data.stats.filter((obj_) =>{
                return obj_.stat.name == "hp"
            })

            // returns the value
            console.log(z[0].base_stat)

            // returns the value as an array
            // CAN COMBINE WITH Z VARIABLE DECLARATION ABOVE
            console.log(z.map((obj2) => {
                return obj2.base_stat
            }))

            tmp= data.stats.filter((obj_) =>{
                return obj_.stat.name == "hp"
            }).map((obj2) => {
                return obj2.base_stat
            })

            console.log("name: " + data.name);
            // sends an entire html page
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "hp": tmp[0]
            });
        })
    });

    // console.log("name: " + data.name);
    // // sends an entire html page
    // res.render("profile.ejs", {
    //     "id": req.params.id,
    //     "name": data.name,
    //     "hp": "?"
    // });

    // res.json({
    //     "k1": "v1",
        
    //     "k2": "v1",
        
    //     "k3": "v1"

    // })
})

// app.use enables a middleware
// HAS TO HAVE index.html INSIDE PUBLIC FOLDER
app.use(express.static('public'));

function f_1(){
    console.log("dummy middleware");
}

app.use(f_1)
