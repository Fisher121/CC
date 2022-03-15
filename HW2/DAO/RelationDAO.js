class RelationDAO{
    async InsertRelation(connection,id_a,id_b){
        const insert_relation_query = `INSERT INTO relations(idA,idB) VALUES($1,$2)`
        let succes = true
        let err = null
        await connection.query(insert_relation_query,[id_a,id_b]).catch(error =>{
            succes = false
            err = error.stack
        }) 
        return [succes,err]
    }
    async GetAall(connection){
        const get_all_relations_query = "SELECT * FROM relations"
        let succes = true
        let err = null
        let r = []
        await connection.query(get_all_relations_query).then(result=>{
            r = result["rows"]
        }).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,r,err]
    }
    async DeleteById(connection,id){
        const delete_query = `DELETE FROM relations WHERE id = $1`
        let succes = true
        let err = null
        await connection.query(delete_query,[id]).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,err]
    }

    async GetAllByPersonID(connection,id){
        const get_relations_query = `SELECT * FROM relations WHERE idA = $1`
        let succes = true
        let err = null
        let r = []
        await connection.query(get_relations_query,[id]).then(result=>{ 
            r = result["rows"]
        }).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,r,err]
    }
    async DeleteAllByPersonID(connection,id){
        const delete_query = `DELETE FROM relations WHERE idA = $1 or idb = $1`
        let succes = true
        let err = null
        await connection.query(delete_query,[id]).catch(error =>{
            succes = false
            err = error.stack
        })
        return [succes,err]
    }
}
module.exports = RelationDAO