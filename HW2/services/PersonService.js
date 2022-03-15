const PersonDAO  = require("../DAO/PersonDAO")
class PersonService{
    constructor(){
        this.personDAO = new PersonDAO()
    }
    async InsertPerson(connection,name){
        return await this.personDAO.InsertPerson(connection,name)
    }
    async GetAll(connection){
        return await this.personDAO.GetAall(connection)
    }
    async DeleteById(connection,id){
        return await this.personDAO.DeleteById(connection,id)
    }
    async GetByID(connection,id){
        return await this.personDAO.GetByID(connection,id)
    }
    async UpdateNameByID(connection,id,new_name){
        return await this.personDAO.UpdateNameById(connection,id,new_name)
    }
    async UpdateAllNamesByName(connection,old_name,new_name){
        return await this.personDAO.UpdateAllNamesByName(connection,old_name,new_name)
    }
}
module.exports = PersonService