import express from 'express'
import dataconnectionPersonal from '../dbconnetion-personal.js';
import cors from 'cors'



const router = express.Router()

const app = express();
router.use(cors())
router.use(express.json());

router.get('/', async (req, res) => {
    dataconnectionPersonal.connect()

    const query_seats = 'select * from seats limit 200'

    try {
        let result = await dataconnectionPersonal.query(query_seats)
        res.json(result.rows)
    } catch (error) {
        res.send(error)
    }
})

// HAZ UN GET SOLO DE LOS CODIGOS DE LOS AVIONES, PERO SOLO LOS ÚNICOS. PARA METERLO EN EL SELECT

router.get('/:seat_no&:aircraft_code', async (req, res) => {
    dataconnectionPersonal.connect()

    let no_seats = req.params.seat_no
    let aircraft_code = req.params.aircraft_code

    const query_seat = "select * from seats where seat_no = $1 AND aircraft_code = $2"

    try {
        let result = await dataconnectionPersonal.query(query_seat, [no_seats, aircraft_code])
        res.json(result.rows[0])
    } catch (error) {
        res.send(error)
    }
})

router.get('/aircraft_code', async (req, res) => {
    dataconnectionPersonal.connect()

    const query_seat = "select distinct aircraft_code from seats "

    try {
        let result = await dataconnectionPersonal.query(query_seat)
        res.json(result.rows)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res) => {
    dataconnectionPersonal.connect()

    const { aircraft_code, seat_no, fare_conditions } = req.body

    const query_seat = 'INSERT INTO seats VALUES ($1, $2, $3)'

    try {
        await dataconnectionPersonal.query(query_seat, [aircraft_code, seat_no, fare_conditions])
        res.json({ message: "POSTED DATA", status: "success" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/:seat_no&:aircraft_code', (req, res) => {
    dataconnectionPersonal.connect()

    const aircraft_code = req.params.aircraft_code
    const seat_no = req.params.seat_no
    const fare_conditions = req.body.fare_conditions

    const update_query = "update seats set fare_conditions = $1 where aircraft_code = $2 AND seat_no= $3"

    try {
        dataconnectionPersonal.query(update_query, [fare_conditions, aircraft_code, seat_no])
        res.json({ message: "UPDATED DATA", status: "success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

router.delete('/:seat_no&:aircraft_code', (req, res) => {
    dataconnectionPersonal.connect()

    const aircraft_code = req.params.aircraft_code
    const seat_no = req.params.seat_no

    const delete_query = 'delete from seats where aircraft_code = $1 AND seat_no = $2'

    try {
        dataconnectionPersonal.query(delete_query, [aircraft_code, seat_no])
        res.json({ message: "DELETED DATA", status: "success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router