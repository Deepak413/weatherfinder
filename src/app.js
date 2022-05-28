const express = require('express');
const path = require('path');
const hbs = require('hbs')
const app = express();
const port = process.env.PORT || 100;

//Public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views"); //we use views bydefault but here views is present in templates so we manually change path
const partials_path = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');         
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));


//ROUTING
app.get("/", (req, res) => {
    res.render('index');       //use render when using pug or handlebars etc.
})

app.get("/about", (req, res) => {
    res.render('about');
})

app.get("/weather", (req, res) => {
    res.render('weather');
})

app.get("*", (req, res) => {              //for any other URL
    res.render('404error',{
        errorMsg: 'Opps! Page Not Found'
    });
})


app.listen(port , () =>{
    console.log(`listening to the port at ${port}`);
})



// nodemon src/app.js      used to run app.js 
// nodemon src/app.js -e js, hbs      used to run app.js and also all extensions javascript and hbs files
