async function fetchTickets() {
  try {
    const ticketsTable = document.getElementById('zero_config');
    const response = await fetch('/tickets');
    const tickets = await response.json();
    
    while (ticketsTable?.rows.length > 1) {
      ticketsTable.deleteRow(1);
    }

    tickets.forEach(ticket => {
      const row = ticketsTable.insertRow();
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
    console.error("Error fetching tickets:", error);
  }
}

async function deleteTicket(ticket_no) {
  try {
    console.log(`/tickets/${ticket_no}`);
    
    const response = await fetch(`/tickets/${ticket_no}`, {
      method: 'DELETE'
      
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete ticket: ${response.statusText}`);
    }

    await fetchTickets();

  } catch (error) {
    console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTickets()

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const ticket_no = e.target.dataset.id;
      deleteTicket(ticket_no);
    }
  });
})
