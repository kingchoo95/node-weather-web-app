console.log('client side jjs script is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#messageOne')
const message2 = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    message1.textContent = "Loading..."
    const location = search.value
    fetch('http://localhost:3000/weather?address='+ decodeURIComponent(location)).then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            message1.textContent = data.error
            message2.textContent = ""
        }else{
            message1.textContent = data.weather
            message2.textContent = data.address
        }
    })
})
   
})