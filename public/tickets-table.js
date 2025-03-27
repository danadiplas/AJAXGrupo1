async function fetchTickets() {
  try {
    const ticketsTable = document.getElementById('zero_config');
    const createBtn = document.getElementById('.btn-info');
    const response = await fetch('/tickets');
    const tickets = await response.json();
    console.log(tickets);
    

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

document.addEventListener('DOMContentLoaded', () => {
  fetchTickets() 
})