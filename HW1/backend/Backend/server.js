const countries = require("./controllers/countryController")
const Articles = require("./controllers/ArticleController")
const Date = require("./controllers/DateController")
const utils = require("./utils")

var fs = require('fs')

const http = require("http");
const CountryController = require("./controllers/countryController");
const { json } = require("stream/consumers");
const ArticleController = require("./controllers/ArticleController");
const DateController = require("./controllers/DateController");


const PORT = process.env.PORT || 5000;
let logs = []
let total_requests = 0


const server = http.createServer(async (req, res) => {
    const start = process.hrtime()
    if (req.url.match(/\/api\/final\/(\w)/) && req.method === "GET") {
        total_requests += 1
        
        let country = req.url.split("/")[3]

        let date = await new DateController().getDate()
        date = JSON.parse(date)["data"]
        date = Object.keys(date)[0].replaceAll("-","")

        let articles = await new ArticleController().getArticles(country,date)
        let options = await utils.CreateOptions()

        articles = JSON.parse(articles)
        let response = ""
        if(articles["response"] !=undefined)
            Object.keys(articles["response"]["docs"]).forEach(element => {

                response += "abstract: " + articles["response"]["docs"][element]["abstract"] + "<br>"
                + "link: " + "<a href="+articles["response"]["docs"][element]["web_url"] +">here</a><br><br>" 
            });
        else
            res.writeHead(400, { "Content-Type": "text/html" });

        res.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile("interface.html", 'utf8', function(err, data) {
            data = data.replaceAll("var_options",options)
            data = data.replaceAll("news_here",response)
            data += articles
            res.write(data);
            res.end();
            total_requests -= 1
            utils.Log(start,req.url,data,logs)
            //console.log(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`)
        })
    }else
    if (req.url.match("api/final") && req.method === "GET") {  
        let date = await new DateController().getDate()
        date = JSON.parse(date)["data"]
        date = Object.keys(date)[0].replaceAll("-","")

        let unpackedCountries = await utils.GetCountries()
        let country = unpackedCountries[Math.floor(Math.random()*unpackedCountries.length)]
        let articles = await new ArticleController().getArticles(country,date)
        let options = await utils.CreateOptions()


        articles = JSON.parse(articles)
        let response = ""
        if(articles["response"]!=undefined){
            Object.keys(articles["response"]["docs"]).forEach(element => {

                response += "abstract: " + articles["response"]["docs"][element]["abstract"] + "<br>"
                + "link: " + "<a href="+articles["response"]["docs"][element]["web_url"] +">here</a><br><br>" 
            });
            res.writeHead(200, { "Content-Type": "text/html" });
        }
        else
            res.writeHead(400, { "Content-Type": "text/html" });

        
        fs.readFile("interface.html", 'utf8', function(err, data) {
            data = data.replace("var_options",options)
            data = data.replace("news_here",response)
            data += articles
            res.write(data);
            utils.Log(start,req.url,data,logs)
            res.end();
        })
    }
    else if(req.url.match("/api/countries")){

        const Countries = await new CountryController().getCountries()
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(Countries)
        utils.Log(start,req.url,Countries,logs)
        res.end();
    }
    else if(req.url.match("/api/date")){
        const date = await new DateController().getDate()
        res.writeHead(200, { "Content-Type": "application/json" });
        console.log(JSON.parse(date))
        res.write(date)
        utils.Log(start,req.url,date,logs)
        res.end();

    }
    else if(req.url.match("/api/metrics")){
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(logs))
        res.end();

    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
        utils.Log(start,req.url,"route not found",logs)
    }
    //console.log(logs)
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});