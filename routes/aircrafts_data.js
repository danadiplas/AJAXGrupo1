// const {Client} = require('pg')
import express from 'express';

//import cors from 'cors'
import dataconnection  from '../dbconnection.js';

const router = express.Router()


// app.use(cors(origin: { * }))

const app = express();

app.use(express.json())

app.listen(3010, () => {
    console.log("conectado")
})


app.get('/aircrafts_data/:aircraft_code', async (req,res) => {
    dataconnection.connect()
    const aircraft_code =req.params.aircraft_code
    const fetch_query = 'SELECT * FROM aircrafts_data WHERE aircraft_code=$1'
    try{
        let result = await dataconnection.query(fetch_query,[aircraft_code])
        res.json(result.rows[0])
    } catch (err){
        res.send(err)
    }
    
})

app.post('/aircrafts_data', (req,res) => {
    dataconnection.connect()
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

app.put('/aircrafts_data/:aircraft_code',(req,res)=>{
    dataconnection.connect()
    const aircraft_code=req.params.aircraft_code;
    const model=req.body.model;
    const range=req.body.range;
    const update_query="UPDATE aircrafts_data SET    model=$1,  range=$2   WHERE aircraft_code=$3"
    dataconnection.query(update_query,[model,range,aircraft_code],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send("SUCCESSFULLY UPDATED")
        }
    })
})

app.delete('/aircrafts_data/:aircraft_code',(req,res)=>{
    dataconnection.connect()
    const aircraft_code=req.params.aircraft_code
    const delete_query='DELETE  from aircrafts_data where aircraft_code=$1'
    dataconnection.query(delete_query,[aircraft_code],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

export default router