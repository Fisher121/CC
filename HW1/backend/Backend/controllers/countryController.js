class CountryController{
    getCountries(){

        return new Promise((resolve,reject)=>{

        const http = require("https");

        const options = {
            "method": "GET",
            "hostname": "api.first.org",
            "port": null,
            "path": "/data/v1/countries",
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
module.exports = CountryController;