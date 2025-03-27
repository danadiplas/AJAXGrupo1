import express from 'express'
import ticket from './routes/ticket.js'
import seats from './routes/seats.js'
import aircrafts_data from './routes/aircrafts_data.js'
import ticket_flights from './routes/ticket_flights.js'


const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use('/ticket', ticket)
app.use('/ticket_flights', ticket_flights)
app.use('/seats', seats)
app.use('/aircrafts_data', aircrafts_data)

app.listen(3020, () => {
    console.log('listening on http://localhost:3020');
})
