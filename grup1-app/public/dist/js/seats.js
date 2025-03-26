fetch('http://localhost:3020/seats/')
  .then(response => response.json())
  .then(data => {
    let tablas = document.querySelector('.bodySeats')
    data.forEach(dato => {
      tablas.innerHTML +=
        `<tr>
                    <td>
                      ${dato.aircraft_code}
                    </td>
                    <td>
                      <select>
                        ${dato.seat_no}
                      </select>
                    </td>
                    <td>${dato.fare_conditions}</td>
                    <td>
                      <div>
                        <button class="btn btn-danger btn-sm text-white">Update</button>
                        <button class="btn btn-warning btn-sm">Delete</button>
                      </div>
                    </td>
                  </tr>`
    });
  })
  .catch(error => console.log(error))

