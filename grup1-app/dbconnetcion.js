// const {Client} = require('pg')
import pg from 'pg'
//import cors from 'cors'

const {Pool} = pg
const dataconnection = new Pool({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"admin",
    database:"demo"
})



// app.use(cors(origin: { * }))

export default dataconnection