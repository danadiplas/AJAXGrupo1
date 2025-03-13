// const {Client} = require('pg')
import express from 'express';
import pg from 'pg'
//import cors from 'cors'

const {Client} = pg
const dataconnection = new Client({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"admin",
    database:"demo"
})

// app.use(cors(origin: { * }))

const app = express();

app.use(express.json())

app.listen(3020, () => {
    console.log("conectado")
})

app.get('/aircrafts_data/:id', (req,res) => {
    const id =req.params.id
    const fetch_query = 'SELECT * FROM aircrafts_data WHERE id=$1'
    dataconnection.query(fetch_query,[id],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result.rows[0])
        }
    })
})

app.post('/aircrafts_data', (req,res) => {
    const {aircraft_code, model, range} = req.body
    const data = 'INSERT INTO aircrafts_data (aircraft_code, model, range) VALUES ($1,$2,$3)'
    dataconnection.query(data, [aircraft_code, model, range], (err, result)=>{
        if(err){
            res.send(err)
        }else{
            console.log(result)
            res.send("POSTED DATA")
        }
    })
})