async function fetchTickets() {
  try {
    const ticketsTable = document.getElementById('zero_config')
    const response = await fetch('/tickets')
    const tickets = await response.json()

    while (ticketsTable?.rows.length > 1) {
      ticketsTable.deleteRow(1);
    }

    tickets.forEach(ticket => {
      const row = ticketsTable.insertRow()
      row.innerHTML = `
        <td>${ticket.ticket_no}</td>
        <td>${ticket.book_ref}</td>
        <td>${ticket.passenger_id}</td>
        <td>${ticket.passenger_name}</td>
        <td>
          <button class="btn btn-warning btn-sm edit" data-id="${ticket.ticket_no}">Edit</button>
          <button class="btn btn-danger btn-sm delete" data-id="${ticket.ticket_no}">Delete</button>
        </td>
      `
    })
  } catch (error) {
    console.error("Error fetching tickets:", error)
  }
}

async function deleteTicket(ticket_no) {
  try {
    const response = await fetch(`/tickets/${ticket_no}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ticket: ${response.statusText}`)
    }

    await fetchTickets()

  } catch (error) {
    console.error('Error deleting ticket:', error)
  }
}

function createTicket(createModal) {
  createModal.showModal()

  const form = document.getElementById('tickets-form')
  const ticketNoInput = document.getElementById('ticket_no')
  ticketNoInput.value = ''
  ticketNoInput.readOnly = false

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
      const ticket_no = document.getElementById('ticket_no').value
      const book_ref = document.getElementById('book_ref').value
      const passenger_id = document.getElementById('passenger_id').value
      const passenger_name = document.getElementById('passenger_name').value

      const response = await fetch('/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ticket_no,
          book_ref,
          passenger_id,
          passenger_name
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to create ticket: ${response.statusText}`)
      }

      await fetchTickets()
    } catch (error) {
      console.error('Error creating ticket:', error)
    }
  })
}

async function fetchBookingRefs() {
  try {
    const response = await fetch('/bookings')
    const bookingRefs = await response.json()

    if (!response.ok) {
      throw new Error(`Failed to fetch booking references: ${response.statusText}`)
    }

    const bookRefSelect = document.getElementById('book_ref')
    bookingRefs.forEach(bookRef => {
      const option = document.createElement('option')
      option.value = bookRef.book_ref
      option.textContent = bookRef.book_ref
      bookRefSelect.appendChild(option)
    })

  } catch (error) {
    console.error('Error fetching booking references:', error)
  }
}

function editTicket(editModal, ticket_no) {
  editModal.showModal()

  const form = document.getElementById('tickets-form')
  const ticketNoInput = document.getElementById('ticket_no')
  ticketNoInput.value = ticket_no
  ticketNoInput.readOnly = true

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
      const book_ref = document.getElementById('book_ref').value
      const passenger_id = document.getElementById('passenger_id').value
      const passenger_name = document.getElementById('passenger_name').value


      const response = await fetch(`/tickets/${ticket_no}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          book_ref,
          passenger_id,
          passenger_name
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to update ticket: ${response.statusText}`)
      }

      await fetchTickets()
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTickets()

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('create')) {
      const createModal = document.getElementById('tickets-modal')
      createTicket(createModal)
      fetchBookingRefs()
    }

    if (e.target.classList.contains('delete')) {
      const ticket_no = e.target.dataset.id
      deleteTicket(ticket_no)
    }

    if (e.target.classList.contains('edit')) {
      const editModal = document.getElementById('tickets-modal')
      const ticket_no = e.target.dataset.id
      editTicket(editModal, ticket_no)
      fetchBookingRefs()
    }
  });
})
