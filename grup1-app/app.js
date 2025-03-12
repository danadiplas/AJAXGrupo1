import express from 'express';
import pg from 'pg'
//import cors from 'cors'


const app = express();
const dataconnection ={
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"admin",
    database:"demo"
}

app.use(cors(origin: { * }))



app.listen(3000, () => {
    console.log("conectado")
})