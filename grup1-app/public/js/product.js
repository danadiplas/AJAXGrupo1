apiURL= 'http://localhost:3020'
document.addEventListener("DOMContentLoaded",async()=>{

    await fillProductTable()

    let createBtn = document.getElementById("button-create-product")
    createBtn.addEventListener("click", (e)=>{
        let product ={
            "product_id": product_id.value,
            "prodict_type": product_type.value
        }
        saveProduct(product)
    })
})

async function saveProduct(product){
    let result = await fetch('product', {
        method: 'POST',
        headers: {
            "Content-type": application/json
        },
        body:json.stringify(product)
    })
}

async function fillProductTable(){
    let response = await fetch(`${apiURL}/products`)
    let result = await response.json()
    let table = document.querySelector('#product-table')
    for(let product of products){
        table.innerHTML += `<tr>
        <td>${ticket_no}</td>
        <td>${flight_id}</td>
        <td>${fare_conditions}</td>
        <td>${amount}</td>
        </tr>`
    }
    console.log(result)
}