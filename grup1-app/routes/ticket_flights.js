// import express, { Router } from 'express'

// const router = express.Router()


// export default Router


// const {Client} = require('pg')
import express from 'express';

//import cors from 'cors'
import dataconnection  from '../dbconnetcion.js';

const router = express.Router()


// app.use(cors(origin: { * }))

const app = express();

app.use(express.json())L

app.listen(3010, () => {
    console.log("conectado")
})


app.get('/ticket_flights/:ticket_no', async (req,res) => {
    dataconnection.connect()
    const ticket_no =req.params.ticket_no
    const fetch_query = 'SELECT * FROM ticket_flights WHERE ticket_no=$1'
    try{
        let result = await dataconnection.query(fetch_query,[ticket_no])
        res.json(result.rows[0])
    } catch (err){
        res.send(err)
    }
    
})

app.post('/ticket_flights', (req,res) => {
    dataconnection.connect()
    const {ticket_no, model, range} = req.body
    const data = 'INSERT INTO ticket_flights (ticket_no, model, range) VALUES ($1,$2,$3)'
    dataconnection.query(data, [ticket_no, model, range], (err, result)=>{
        if(err){
            res.send(err)
        }else{
            console.log(result)
            res.send("POSTED DATA")
        }
    })
})

app.put('/ticket_flights/:ticket_no',(req,res)=>{
    dataconnection.connect()
    const ticket_no=req.params.ticket_no;
    const model=req.body.model;
    const range=req.body.range;
    const update_query="UPDATE ticket_flights SET    model=$1,  range=$2   WHERE ticket_no=$3"
    dataconnection.query(update_query,[model,range,ticket_no],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send("SUCCESSFULLY UPDATED")
        }
    })
})

app.delete('/ticket_flights/:ticket_no',(req,res)=>{
    dataconnection.connect()
    const ticket_no=req.params.ticket_no
    const delete_query='DELETE  from ticket_flights where ticket_no=$1'
    dataconnection.query(delete_query,[ticket_no],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

export default router