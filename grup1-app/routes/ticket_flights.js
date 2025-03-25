 import  { Router } from 'express'

const router = Router()
// export default Router
// const {Client} = require('pg')
//import cors from 'cors'
import dataconnection  from '../dbconnetcion.js';
// app.use(cors(origin: { * }))





router.get('/:ticket_no', async (req,res) => {
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

router.post('/', (req,res) => {
    dataconnection.connect()
    const {ticket_no, flight_id, fare_conditions, amount} = req.body
    const data = 'INSERT INTO ticket_flights (ticket_no, flight_id, fare_conditions, amount) VALUES ($1,$2,$3,$4)'
    dataconnection.query(data, [ticket_no, flight_id, fare_conditions, amount], (err, result)=>{
        if(err){
            res.send(err)
        }else{
            console.log(result)
            res.send("POSTED DATA")
        }
    })
})

router.put('/:ticket_no',(req,res)=>{
    dataconnection.connect()
    const ticket_no=req.params.ticket_no;
    const flight_id=req.body.flight_id;
    const fare_conditions=req.body.fare_conditions;
    const amount=req.body.amount;
    const update_query="UPDATE ticket_flights SET    flight_id=$1,  fare_conditions=$2, amount=$3  WHERE ticket_no=$4"
    dataconnection.query(update_query,[flight_id,fare_conditions,amount,ticket_no],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send("SUCCESSFULLY UPDATED")
        }
    })
})

router.delete('/:ticket_no',(req,res)=>{
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