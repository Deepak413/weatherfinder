// const async = require("hbs/lib/async");

const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');

const dataHide = document.querySelector('.middle_layer')


const sumbitBtn = document.getElementById('submitBtn');

const getInfo = async(event) => {
    event.preventDefault();      //doesnt change the URL
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Plz write the city name before search`;
        dataHide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=ce9b8b4e40206a82f4ef5d4b7adca4de`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            //conditions to check sunny or cloudy
            if(tempMood == "Clear"){
                temp_status.innerHTML = "<i class= 'fas fa-sun' style='color: #eccc68;'></i>";
            }else if(tempMood == "Clouds"){
                temp_status.innerHTML = "<i class= 'fas fa-cloud' style='color: #f1f2f6;'></i>";
            }else if(tempMood == "Rain"){
                temp_status.innerHTML = "<i class= 'fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }else{
                temp_status.innerHTML = "<i class= 'fas fa-cloud' style='color: #f1f2f6;'></i>";
            }

            dataHide.classList.remove('data_hide');

        }catch{
            city_name.innerText = `Plz enter city name properly`;   
            dataHide.classList.add('data_hide');

        }
        
    }

}

sumbitBtn.addEventListener('click', getInfo);