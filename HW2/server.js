const http = require("http");

const Database = require("./DAO/Database");

const PersonController = require("./controllers/PersonController")
const RelationController = require("./controllers/RelationController")

const person_controller = new PersonController()
const relation_controller = new RelationController()

const PORT = process.env.PORT || 5000;


const server = http.createServer(async (req, res) => {
    const database = new Database()
    if (req.url.match(/\/api\/person\/insert/) && req.method === "POST") {
        person_controller.InsertPerson(database.pool,req,res)
    }else
    if (req.url.match(/\/api\/person\/delete/) && req.method === "DELETE") {
        person_controller.DeleteByID(database.pool,req,res)
    }else
    if (req.url.match(/\/api\/person\/update/) && req.method === "PUT") {
        person_controller.UpdateNameByID(database.pool,req,res)  
    }else
    if (req.url.match(/\/api\/person\/putByName/) && req.method === "PUT") {
        person_controller.UpdateAllNamesByName(database.pool,req,res)  
    }else
    if (req.url.match(/\/api\/person\/getAll/) && req.method === "GET") {
        person_controller.GetAll(database.pool,req,res)   
    }else
    if (req.url.match(/\/api\/person\/getByID[?id=^\d+$]/) && req.method === "GET") {
        person_controller.GetByID(database.pool,req,res)
    }else
    if (req.url.match(/\/api\/person\/shorthestPath[?idA=^\d+$&idB=^\d+$]/) && req.method === "GET") {
        //not implemented
        //person_controller.ShortestPath(database.pool,req,res)
    }else
    if (req.url.match(/\/api\/relation\/insert/) && req.method === "POST") {
        relation_controller.InsertRelation(database.pool,req,res)
    }else
    if (req.url.match(/\/api\/relation\/delete/) && req.method === "DELETE") {
        relation_controller.DeleteByID(database.pool,req,res)
    }else
    if (req.url.match(/\/api\/relation\/update/) && req.method === "PUT") {
        //not implemented  
    }else
    if (req.url.match(/\/api\/relation\/getAllByPersonID[?id=^\d+$]/) && req.method === "GET") {
        relation_controller.GetAllByPersonID(database.pool,req,res)
    }else
    if (req.url.match(/\/api\/relation\/getAll/) && req.method === "GET") {
        relation_controller.GetAll(database.pool,req,res)
    }else
    {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});