const { Pool } = require('pg');

class Database{
    constructor(){

        this.pool = new Pool({
        connectionString: "postgres://tqceswttisilwb:2a503bb640e44bb2f6e1d944c9ed8ae0c6122c460fb144a2c156b6f23551bdc2@ec2-54-73-68-39.eu-west-1.compute.amazonaws.com:5432/d93nvrkvevmmms",
        ssl: {
            rejectUnauthorized: false
            }
        });
        this.CreateTables()
    }
    CreateTables(){
        const create_person_table = `CREATE TABLE IF NOT EXISTS
        persons(
          id SERIAL PRIMARY KEY,
          name_name VARCHAR(128) UNIQUE NOT NULL
        )`

        const create_relations_table = `CREATE TABLE IF NOT EXISTS
        relations(
          id SERIAL PRIMARY KEY,
          idA integer,
          idb integer
        )`

        this.Execute(create_person_table,this.pool)
        this.Execute(create_relations_table,this.pool)
        
    }

    Execute = async (query,client) => {
        try {   // gets connection
            await client.query(query);  // sends queries
            return true;
        } catch (error) {
            console.error(error.stack);
            return false;
        }
    };
}

module.exports = Database