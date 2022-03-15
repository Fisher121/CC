const RelationDAO  = require("../DAO/RelationDAO")

class RelationService{
    constructor(){
        this.relationDAO = new RelationDAO()
    }
    async InsertRelation(connection,id_A,id_B){
        return await this.relationDAO.InsertRelation(connection,id_A,id_B)
    }
    async GetAll(connection){
        return await this.relationDAO.GetAall(connection)
    }
    async DeleteById(connection,id){
        return await this.relationDAO.DeleteById(connection,id)
    }
    async GetAllByPersonID(connection,id){
        return await this.relationDAO.GetAllByPersonID(connection,id)
    }
    async DeleteAllByPersonID(connection,id){
        return await this.relationDAO.DeleteAllByPersonID(connection,id)
    }
}

module.exports = RelationService