class PersonDAO{
    async InsertPerson(connection,name){
        const insert_persopn_query = `INSERT INTO persons(name_name) VALUES($1)`
        let succes = true
        let err = null
        await connection.query(insert_persopn_query,[name]).catch(error =>{
            succes = false
            err = error.stack
        }) 
        return [succes,err]
    }
    async GetAall(connection){
        const get_all_persons_query = "SELECT * FROM persons"
        let succes = true
        let err = null
        let r = []
        await connection.query(get_all_persons_query).then(result=>{
            r = result["rows"]
        }).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,r,err]
    }
    async DeleteById(connection,id){
        const delete_query = `DELETE FROM persons WHERE id = $1`
        let succes = true
        let err = null
        await connection.query(delete_query,[id]).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,err]
    }
    async UpdateNameById(connection,id,new_name){
        const update_query = `UPDATE persons SET name_name = $1 WHERE id=$2`
        let succes = true
        let err = null
        await connection.query(update_query,[new_name,id]).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,err]
    }
    async UpdateAllNamesByName(connection,old_name,new_name){
        const update_query = `UPDATE persons SET name_name = $1 WHERE name_name=$2`
        let succes = true
        let err = null
        await connection.query(update_query,[new_name,old_name]).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,err]
    }
    async GetByID(connection,id){
        const get_persons_query = `SELECT * FROM persons WHERE id = $1`
        let succes = true
        let err = null
        let r = []
        await connection.query(get_persons_query,[id]).then(result=>{
            r = result["rows"]
        }).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,r,err]
    }

}
module.exports = PersonDAO