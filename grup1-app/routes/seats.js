import express from 'express'
import dataconnectionPersonal from '../dbconnetion-personal.js';
import cors from 'cors'



const router = express.Router()

const app = express();
router.use(cors())

router.get('/', async (req, res) => {
    dataconnectionPersonal.connect()
    const query_seats = 'select * from seats'

    try {
        let result = await dataconnectionPersonal.query(query_seats)
        res.json(result.rows)
    } catch (error) {
        res.send(error)
    }
})

export default router