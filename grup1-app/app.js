import express from 'express'
import ticket from './routes/ticket'
import seats from './routes/seats'
import ticket_flights from './routes/ticket_flights'


const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use('/ticket', ticket)
app.use('/ticket_flights', ticket_flights)
app.use('/seats', seats)

app.listen(3010, () => {
    console.log('listening on http://localhost:3010');
})
