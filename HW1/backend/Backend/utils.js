let countrycontroller = require("./controllers/countryController")

exports.CreateOptions = async function CreateOptions(){
    let response = await new countrycontroller().getCountries()
    response = JSON.parse(response)
    let countries = response["data"]
    let query = ""
    let name = ""
    
    Object.keys(countries).forEach(element=>{
        name = countries[element]["country"]
        let select = `<option value = ${name}>${name}</option>\n`
        query+=select
    })
    return query

}

exports.GetCountries = async function getUnpackedCountries(){
    let response = await new countrycontroller().getCountries()
    response = JSON.parse(response)
    let countries = response["data"]
    data = []
    Object.keys(countries).forEach(element=>{
        data.push(countries[element]["country"])
    })
    return data
}
const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

exports.Log = function Log(start,url,response,logs){
    durationInMilliseconds = getDurationInMilliseconds(start)
    logs.push([durationInMilliseconds.toLocaleString(),url])// response too big(can't see anything else except the response)
}
