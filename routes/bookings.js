import express from 'express'
import dataconnection from '../dbconnection.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await dataconnection.query('SELECT book_ref FROM bookings LIMIT 10')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router