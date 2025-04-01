// GET

function getSeats() {
  fetch('http://localhost:3020/seats/')
    .then(response => response.json())
    .then(data => {
      let tablas = document.querySelector('.bodySeats')
      data.forEach((dato) => {
        tablas.innerHTML +=
          `<tr>
                    <td>
                      ${dato.aircraft_code}
                    </td>
                    <td>
                        ${dato.seat_no}
                    </td>
                    <td>${dato.fare_conditions}</td>
                    <td>
                      <div>
                        <button class="btn btn-danger btn-sm text-white" data-bs-toggle="modal" data-bs-target="#modalEdicion" id-aircraft="${dato.aircraft_code}" id-seat="${dato.seat_no}">Update</button>
                        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalBorrar" id-aircraft="${dato.aircraft_code}" id-seat="${dato.seat_no}" id="botonBorrar">Delete</button>
                      </div>
                    </td>
                  </tr>`
      });
    })
    .catch(error => console.log(error))
}

getSeats()

// CREAR

let modalcrear = document.getElementById('modalcrear')


modalcrear.addEventListener('show.bs.modal', function (event) {
  fetch('http://localhost:3020/seats/aircraft_code')
    .then(response => response.json())
    .then(data => {

      let selectAircraft = document.getElementById('fare_conditions_select')

      data.forEach((data) => {
        selectAircraft.innerHTML += `
        <option value="${data.aircraft_code}">${data.aircraft_code}</option>
      `
      })

    })
})

function crearSeat() {
  let aircraft_code_data = document.getElementById('fare_conditions_select').value
  let seat_no_data = document.getElementById('seat_no').value
  let fare_conditions_data = document.getElementById('fare_conditions').value

  const seat = {
    aircraft_code: aircraft_code_data,
    seat_no: seat_no_data,
    fare_conditions: fare_conditions_data
  }

  fetch(`http://localhost:3020/seats/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(seat)
  })
    .then(respuesta => {
      getSeats()
      return respuesta.json()
    })
    .then(data => {
      let textoRespuesta = document.getElementById('textoRespuesta')
      textoRespuesta.innerHTML = `${data.message}`
      textoRespuesta.classList.add('text-success')

    })
    .catch(error => {
      let textoRespuesta = document.getElementById('textoRespuesta')
      textoRespuesta.innerHTML = `${error}`
      textoRespuesta.classList.add('text-danger')
    })

}

modalcrear.addEventListener('hidden.bs.modal', function (event) {
  document.getElementById('seat_no').value = ''
  document.getElementById('fare_conditions').value = ''
})


// EDITAR

let mimodal = document.getElementById('modalEdicion')
mimodal.addEventListener('show.bs.modal', function (event) {

  let air_code = event.explicitOriginalTarget.attributes['id-aircraft'].nodeValue
  let num_seat = event.explicitOriginalTarget.attributes['id-seat'].nodeValue

  fetch(`http://localhost:3020/seats/${num_seat}&${air_code}`)
    .then(response => response.json())
    .then(data => {

      let modalEdicion = document.getElementById('modalEditarSeats')
      modalEdicion.innerHTML = `
    <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Update data</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" >
            <div class="mb-3">
              <label for="aircraft_code" class="form-label">Código del avión</label>
              <input type="text" class="form-control" id="aircraft_code" value="${data.aircraft_code}" disabled>
            </div>
            <div class="mb-3">
              <label for="seat_no" class="form-label">Número del asiento</label>
              <input type="text" class="form-control" id="seat_no" value="${data.seat_no}" disabled>
            </div>
            <div class="mb-3">
              <label for="fare_conditions" class="form-label">Condiciones de tarifa</label>
              <select class="form-select" id="fare_conditions_update">
                  <option value="Economy" ${data.fare_conditions === "Economy" ? "selected" : ""}>Economy</option>
                  <option value="Business" ${data.fare_conditions === "Business" ? "selected" : ""}>Business</option>
                  <option value="Comfort" ${data.fare_conditions === "Comfort" ? "selected" : ""}>Comfort</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <p class="text-start" id="textoRespuesta_update"></p>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="updateSeats('${data.aircraft_code}', '${data.seat_no}')">Editar</button>
          </div>
    `
    })
})

function updateSeats(actual_code, actual_seat) {

  let actual_fare = document.getElementById('fare_conditions_update').value

  const fare = {
    fare_conditions: actual_fare
  }

  fetch(`http://localhost:3020/seats/${actual_seat}&${actual_code}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fare)
  })
    .then(respuesta => {
      getSeats()
      return respuesta.json()
    })
    .then(data => {
      let textoRespuesta = document.getElementById('textoRespuesta_update')
      textoRespuesta.innerHTML = `${data.message}`
      textoRespuesta.classList.add('text-success')
    })
    .catch(error => {
      let textoRespuesta = document.getElementById('textoRespuesta_update')
      textoRespuesta.innerHTML = `${error}`
      textoRespuesta.classList.add('text-danger')
    })
}


// BORRAR

let modalBorrar = document.getElementById('modalBorrar')
modalBorrar.addEventListener('show.bs.modal', function (event) {

  let air_code = event.explicitOriginalTarget.attributes['id-aircraft'].nodeValue
  let num_seat = event.explicitOriginalTarget.attributes['id-seat'].nodeValue

  let footer = document.getElementById('footer-modal-borrar')
  footer.innerHTML = `
    <p class="text-start" id="textoRespuesta_borrar"></p>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" class="btn btn-primary" onclick="borrarSeat('${air_code}', '${num_seat}')">Borrar</button>
  `
})

function borrarSeat(air_code, num_seat) {

  fetch(`http://localhost:3020/seats/${num_seat}&${air_code}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(respuesta => {
      getSeats()
      return respuesta.json()
    })
    .then(data => {
      let textoRespuesta = document.getElementById('textoRespuesta_borrar')
      textoRespuesta.innerHTML = `${data.message}`
      textoRespuesta.classList.add('text-success')
    })
    .catch(error => {
      let textoRespuesta = document.getElementById('textoRespuesta_borrar')
      textoRespuesta.innerHTML = `${error}`
      textoRespuesta.classList.add('text-danger')
    })
}
