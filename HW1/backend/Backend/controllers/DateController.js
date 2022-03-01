class DateController{
    getDate(query){

        return new Promise((resolve,reject)=>{

        const http = require("https");

        const options = {
            "method": "GET",
            "hostname": "api.lrs.org",
            "port": null,
            "path": "/random-date-generator?num_dates=1&year=2000",
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
module.exports = DateController;