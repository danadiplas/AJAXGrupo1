import express from 'express'
import dataconnection from '../dbconnection.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await dataconnection.query('SELECT * FROM tickets LIMIT 10')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const create_query = 'INSERT INTO tickets (ticket_no, book_ref, passenger_id, passenger_name, contact_data) VALUES ($1, $2, $3, $4) RETURNING *'
    const result = await dataconnection.query(create_query, [req.body.ticket_no, req.body.book_ref, req.body.passenger_id, req.body.passenger_name])
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:ticket_no', async (req, res) => {
  try {
    const update_query = 'UPDATE tickets SET book_ref = $1, passenger_id = $2, passenger_name = $3 WHERE ticket_no = $4 RETURNING *'
    const result = await dataconnection.query(update_query, [req.body.book_ref, req.body.passenger_id, req.body.passenger_name, req.params.ticket_no])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:ticket_no', async (req, res) => {
  const client = await dataconnection.connect()
  try {
    await client.query('BEGIN')
    await client.query('DELETE FROM boarding_passes WHERE ticket_no = $1', [req.params.ticket_no])
    await client.query('DELETE FROM ticket_flights WHERE ticket_no = $1', [req.params.ticket_no])
    const delete_query = 'DELETE FROM tickets WHERE ticket_no = $1 RETURNING *'

    const result = await client.query(delete_query, [req.params.ticket_no])
    await client.query('COMMIT')

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    await client.query('ROLLBACK')
    res.status(500).json({ error: error.message })
  } finally {
    client.release()
  }
})

export default router