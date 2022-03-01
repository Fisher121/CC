class ArticleController{
    getArticles(query,date){

        return new Promise((resolve,reject)=>{
        query = query.replaceAll(" ","-")
        const http = require("https");
        let path = "/svc/search/v2/articlesearch.json?api-key=iWlXeJruYcoq0YWaljim8VW700ODveWF&query=" + query 
        if(date!=null){
            path += "&begin_date=" + date
        }
        const options = {
            "method": "GET",
            "hostname": "api.nytimes.com",
            "port": null,
            "path": path,
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            var body = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                    body = Buffer.concat(chunks);
                    resolve(body.toString())
                });
        });

        req.end(); })
    }
}
module.exports = ArticleController;