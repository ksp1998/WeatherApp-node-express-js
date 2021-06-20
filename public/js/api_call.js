// const submitBtn = document.getElementById('submitBtn')
// const inputValue = document.getElementById('inputValue')

// const cityText = document.getElementById('cityText')
// const dateText = document.getElementById('dateText')
// const weatherStatus = document.getElementById('weatherStatus')
// const descText = document.getElementById('descText')
// const temp = document.getElementById('temp')
// const minTemp = document.getElementById('minTemp')
// const maxTemp = document.getElementById('maxTemp')


const setDate = (offset = 19800) => {

    const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday' ]
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    
    let currDate = new Date()
    // currDate.setHours(currDate.getHours() - 5)
    // currDate.setMinutes(currDate.getMinutes() - 30)
    currDate.setMinutes(currDate.getMinutes() + currDate.getTimezoneOffset())
    currDate.setSeconds(currDate.getSeconds() + offset)
    const day = currDate.getDay()
    const month = currDate.getMonth()
    const date = currDate.getDate()
    let tag = 'th'
    if(date === 1 || date === 21 || date === 31) {
        tag = 'st'
    }
    if(date === 2 || date === 22) {
        tag = 'nd'
    }
    if(date === 3 || date === 23) {
        tag = 'rd'
    }
    const year = currDate.getFullYear()
    let hours = currDate.getHours()
    const minutes = currDate.getMinutes()
    let ampm = 'AM'
    if(hours >= 12) {
        hours -= 12
        ampm = 'PM'
    }

    dateText.innerHTML = `${weekdays[day]}, ${months[month]} ${date}<sup>${tag}</sup>, ${year} | ${hours}:${minutes} ${ampm}`
}

const API_KEY = '284b84ec4a7e7f27748df72eb78ddbd2'

const getAPIData = async (cityName) => {

    setDate();

    weatherStatus.innerHTML = `<i class="fa fa-question"></i>`
    descText.innerHTML = '?'
    temp.innerHTML = '?'
    minTemp.innerHTML = '?'
    maxTemp.innerHTML = '?'

    if(cityName === '') {
        cityText.innerHTML = 'Please input city name!'
        // console.log('Please input city name!');
    }
    else {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        const response = await fetch(apiURL)
        const data = await response.json();
        // console.log(data)

        if(data.cod === 200) {
            cityText.innerHTML = `${data.name}, ${data.sys.country}`
            setDate(data.timezone)
            weatherStatus.innerHTML = `<i class="fa fa-smog"></i>`
            descText.innerHTML = data.weather[0].description
            temp.innerHTML = data.main.temp
            minTemp.innerHTML = data.main.temp_min
            maxTemp.innerHTML = data.main.temp_max

            if(data.weather[0].main === 'Clouds') {
                weatherStatus.innerHTML = `<i class="text-light fa fa-cloud"></i>`
            }
            if(data.weather[0].main === 'Rain') {
                weatherStatus.innerHTML = `<i class="text-primary fa fa-cloud-rain"></i>`
            }
            if(data.weather[0].main === 'Clear') {
                weatherStatus.innerHTML = `<i class="text-warning fa fa-sun-o"></i>`
            }
            if(data.weather[0].main === 'Haze') {
                weatherStatus.innerHTML = `<i class="text-warning fa fa-smog"></i>`
            }
        }
        else if(data.cod === "404") {
            cityText.innerHTML = data.message
            // console.log(data.message);
        }
    }
}

const getData = (event) => {
    event.preventDefault();
    cityName = inputValue.value.trim();
    getAPIData(cityName)
}

submitBtn.addEventListener('click', getData)

getAPIData('Mumbai')