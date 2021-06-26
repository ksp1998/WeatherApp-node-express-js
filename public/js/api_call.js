// const submitBtn = document.getElementById('submitBtn')
// const inputValue = document.getElementById('inputValue')

// const cityText = document.getElementById('cityText')
// const dateText = document.getElementById('dateText')
// const weatherStatus = document.getElementById('weatherStatus')
// const descText = document.getElementById('descText')
// const temp = document.getElementById('temp')
// const minTemp = document.getElementById('minTemp')
// const maxTemp = document.getElementById('maxTemp')

const API_KEY = '284b84ec4a7e7f27748df72eb78ddbd2'

const showConnectionDialog = () => {
    connectionDialog.style.display = 'flex';
    setTimeout(function() { 
        errorForm.style.transform = 'translateY(0)'
    }, 250);
    // console.log('show')
}

const hideConnectionDialog = () => {
    errorForm.style.transform = 'translateY(-100vh)'
    setTimeout(function() { 
        connectionDialog.style.display = 'none'
    }, 250);
    // console.log('hide')
}

const getAPIData = async (cityName) => {
    let data = {
        cod: "404",
        message: "We couldn't found data!"
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    await fetch(apiURL)
        .then(async (response) => {
            data = await response.json() 
        })
        .catch(error => {
            showConnectionDialog();
            console.log(error)
        })
    return data
}

const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday' ]
const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

const setDate = (offset) => {

    let currDate = new Date()
    currDate.setMinutes(currDate.getMinutes() + currDate.getTimezoneOffset())
    currDate.setSeconds(currDate.getSeconds() + offset)

    const day = currDate.getDay()
    const month = currDate.getMonth()
    const date = currDate.getDate()
    let tag = 'th'
    switch(date) {
        case 1, 21, 31 : tag = 'st'; break
        case 2, 22 : tag = 'nd'; break
        case 3, 33 : tag = 'rd'; break
    }
    
    const year = currDate.getFullYear()
    let hours = currDate.getHours()
    const minutes = ('0' + currDate.getMinutes()).slice(-2)

    let ampm = 'AM'
    if(hours === 0) {
        hours = 12
    }
    else if(hours >= 12) {
        
        ampm = 'PM'
        if(hours > 12)
            hours -= 12
    }

    hours = ('0' + hours).slice(-2)
    dateText.innerHTML = `${weekdays[day]}, ${months[month]} ${date}<sup>${tag}</sup>, ${year} | ${hours}:${minutes} ${ampm}`
}

const defaultData = {
    timezone: 19800,
    weather: [ 
        { 
            main: "question", 
            description: "?" 
        } 
    ],
    main: {
        temp: "?",
        temp_min: "?",
        temp_max: "?"
    }
}

const setData = (data = defaultData) => {

    cityText.innerHTML = (data.name === undefined) 
        ? `<i class="fa fa-spinner fa-pulse"></i> Please Wait...`
        : `${data.name}, ${data.sys.country}`
    
    setDate(data.timezone)
    temp.innerHTML = data.main.temp
    minTemp.innerHTML = data.main.temp_min
    maxTemp.innerHTML = data.main.temp_max

    descText.innerHTML = data.weather[0].description

    switch(data.weather[0].main) {
        case 'Clear' : 
            weatherStatus.innerHTML = `<i class="fa fa-sun" style="color: yellow"></i>`
            break
        case 'Clouds' :
            weatherStatus.innerHTML = `<i class="fa fa-cloud" style="color: skyblue"></i>`
            break
        case 'Haze', 'Mist' :
            weatherStatus.innerHTML = `<i class="fa fa-smog" style="color: whitesmoke"></i>`
            break
        case 'Rain' :
            weatherStatus.innerHTML = `<i class="fa fa-cloud-rain" style="color: deepskyblue"></i>`
            break
        default :
            weatherStatus.innerHTML = `<i class="fa fa-question"></i>`
    }
}

const processRequest = async (cityName) => {

    if(!window.navigator.onLine) {
        showConnectionDialog();
        return
    }

    setData()
    if(cityName === '') {
        cityText.innerHTML = 'Please input city name!'
        inputValue.focus()
    }
    else {
        inputValue.disabled = submitBtn.disabled = true;
        const data = await getAPIData(cityName)
        inputValue.disabled = submitBtn.disabled = false;
        // console.log(data)

        if(data.cod === 200) {
            setData(data)
        }
        else if(data.cod == 401) {
            cityText.innerHTML = `Invalid API Key`
        }
        else if(data.cod === "404") {
            cityText.innerHTML = data.message
        }
    }
}

const getData = async (event) => {
    event.preventDefault();

    cityName = inputValue.value.trim();
    await processRequest(cityName)
    inputValue.blur()
}

submitBtn.addEventListener('click', getData)

processRequest('Mumbai')

window.onerror = function(error) {
    console.log("Error", error)
};