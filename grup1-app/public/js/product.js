apiURL= 'http://localhost:3020'
document.addEventListener("DOMContentLoaded",async()=>{
    await fillProductTable()
})

async function fillProductTable(){
    let response = await fetch(`${apiURL}/products`)
    let result = await response.json()
    let table = document.querySelector('#product-table')
    for(let product of products){
        tavle.innerHTML += `<tr>
        <td>${product_id}</td>
        <td>${product_id}</td>
        <td>${product_id}</td>
        <td>${product_id}</td>
        </tr>`
    }
    console.log(result)
}