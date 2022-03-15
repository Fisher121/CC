function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}
function splitParams(url){
    let params = url.split('?')[1]
    params =  params.split('&')
    let result = {}
    for(x in params){
        let split_param = params[x].split("=")
        result[split_param[0]] = split_param[1]
    }
    return result
}



module.exports = { getReqData,splitParams };