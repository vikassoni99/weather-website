console.log("Client side JS file loaded...")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value.toString()
    p1.textContent="Loading..."

    fetch('http://localhost:3000/weather?address='+location+'')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            p1.textContent=data.error
            p2.textContent=""
        } else {
            p1.textContent=data[0].forecast
            p2.textContent=data[0].location
        }
    });


})

//const weatherForm=

// weatherForm.addEventListener('submit',()=>{
//     console.log("Tetsts")
// })