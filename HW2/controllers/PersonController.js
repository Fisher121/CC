const PersonService = require("../services/PersonService")
const RelationService = require("../services/RelationService")
const { getReqData,splitParams } = require("../utils");

class PersonController{
    constructor(){
        this.person_service = new PersonService()
        this.relation_service = new RelationService()
    }


    async InsertPerson(connection,request,res){
        let body = await getReqData(request)
        body = JSON.parse(body)
        let result = await this.person_service.InsertPerson(connection,body.name)

        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[1] }));
        }
        else{
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end();
        }
    }
    async GetAll(connection,request,res){
        let result = await this.person_service.GetAll(connection)
        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[2] }));
        }
        else{
            if(result[1].length == 0){
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end();
            }else{
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ data: result[1] }));
            }
        } 
    }
    async DeleteByID(connection,request,res){
        let body = await getReqData(request)
        body = JSON.parse(body)

        //deleting all the relations of the person
        let result = await this.relation_service.DeleteAllByPersonID(connection,body.id)
        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[1] }));
        }


        //deleting the person
        result = await this.person_service.DeleteById(connection,body.id)
        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[1] }));
        }
        else{
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();
        }
    }
    async UpdateNameByID(connection,request,res){
        let body = await getReqData(request)
        body = JSON.parse(body)
        let result = await this.person_service.UpdateNameByID(connection,body.id,body.new_name)
        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[1] }));
        }
        else{
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();
        }
    }
    async GetByID(connection,request,res){
        let id = splitParams(request.url).id
        let result = await this.person_service.GetByID(connection,id)
        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[2] }));
        }
        else{
            if(result[1].length == 0){
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end();
            }else{
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ data: result[1] }));
            }
        }
    }
    async ShortestPath(connection,req,res){
        let idA = splitParams(req.url).idA
        let idB = splitParams(req.url).idB
        let result = await this.person_service.ShortestPath(connection,idA,idB)
        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[2] }));
        }
        else{
            if(result[1].length == 0){
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end();
            }else{
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ data: result[1] }));
            }
        }
    }
    async UpdateAllNamesByName(connection,request,res){
        let body = await getReqData(request)
        body = JSON.parse(body)
        let result = await this.person_service.UpdateAllNamesByName(connection,body.old_name,body.new_name)
        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[1] }));
        }
        else{
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();
        }
    }
}
module.exports = PersonController