const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const content1 = document.querySelector('#msg-1')
const content2 = document.querySelector('#msg-2')

// content1.textContent = ''
// content2.textContent=''


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    // console.log(location)
    
    content1.textContent = 'Loading!!!'
    content2.textContent=''
    fetch("http://localhost:3000/weather?address="+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
       if(data.error){
        content1.textContent = data.error
       }
       else{
       
            content1.textContent = data.location
            content2.textContent = data.forecast
       }
       
   })
})
})