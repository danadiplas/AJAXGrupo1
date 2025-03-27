import pg from 'pg'

const {Pool} = pg
const dataconnection = new Pool({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"badia123",
    database:"demo"
})

export default dataconnection