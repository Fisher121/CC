const RelationService = require("../services/RelationService")
const { getReqData,splitParams } = require("../utils");
class RelationController{
    constructor(){
        this.relation_service = new RelationService()
    }

    async InsertRelation(connection,request,res){
        let body = await getReqData(request)
        body = JSON.parse(body)
        let result = await this.relation_service.InsertRelation(connection,body.idA,body.idB)

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
        let result = await this.relation_service.GetAll(connection)
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
        let result = await this.relation_service.DeleteById(connection,body.id)
        if(result[0] == false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: result[1] }));
        }
        else{
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();
        }
    }

    async GetAllByPersonID(connection,request,res){
        let id = splitParams(request.url).id
        let result = await this.relation_service.GetAllByPersonID(connection,id)
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
}

module.exports = RelationController