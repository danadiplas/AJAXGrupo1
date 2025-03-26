document.addEventListener("DOMContentLoaded", ()=>{
  function fetchearGet(){
    fetch('http://localhost:3020/ticket_flights/')
      .then(response => response.json())
      .then(data => {
        let tablas = document.querySelector('.ticket_flights')
        data.forEach(dato => {
          tablas.innerHTML +=
            `<tr>
              <td>
                ${dato.ticket_no}
              </td>
              <td>
                  ${dato.flight_id}
              </td>
              <td>
                  ${dato.fare_conditions}
              </td>
              <td>
                  ${dato.amount}
              </td>
              <td>
                <div>
                  <button id="update" class="btn btn-danger btn-sm text-white">Update</button>
                  <button id="delete" class="btn btn-warning btn-sm">Delete</button>
                </div>
              </td>
            </tr>`
        });
      })
    .catch(error => console.log(error))
  }
  fetchearGet()

  


})

