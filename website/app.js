/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = 'c71251f839d735bdc76b0ef2a6e96f0e';
const btn = document.querySelector('#generate');


// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', btnClick);


/* Function called by event listener */
function btnClick(){
    try{
        //get ZipCode from user
        const  feel = document.querySelector('#feelings').value;
        let zipCode = document.querySelector('#zip').value;
        if(!zipCode){
            alert('please, Enter Zip Code');
            return;
        }
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    getData(url)
    .then(function(data){
        console.log(data);
        if (data.cod == "404") {alert('please, enter a vaild zip number');}
        else{
        postData('/addWeather',{temp: data.main.temp, date:d, content: feel})
        }
    })
    .then(function(data){updateUI()});
    
        }catch(err){
            console.log(err);
        }
    
    } 

const getData = async (url) =>{
    const res = await fetch(url)
    try{
        const data = await res.json();
        return data;
        //return data.main.temp;
    }catch(err){
        console.log(err);
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

}


// Show data on for user
    const updateUI = async () => {
        const request = await fetch('/getWeather');
        try {
            const data = await request.json();
            console.log('update fn');
            console.log(data);

            document.querySelector('#date').innerHTML = data.date;
            document.querySelector('#temp').innerHTML = data.temp;
            document.querySelector('#content').innerHTML = data.content;
            console.log('after update ');
        }
        catch (error) {
            console.log('error', error);
        }
    }








