// const navHome = document.getElementById('navHome')
// const navWeather = document.getElementById('navWeather')
// const navAbout = document.getElementById('navAbout')
// const toggleBtn = document.getElementById('toggleBtn')
// const inputValue = document.getElementById('inputValue')
// const checkNowBtn = document.getElementById('checkNowBtn')


// Function to change nav item active status
const changeActive = (event, section) => {

    navHome.classList.remove('active')
    navWeather.classList.remove('active')
    navAbout.classList.remove('active')

    if(event !== null) {
        section = event.target;
        
        if(toggleBtn.getAttribute("aria-expanded") === "true") {
            toggleBtn.click();
        }
    }
    section.classList.add("active")
}

navHome.addEventListener('click', changeActive)
navWeather.addEventListener('click', changeActive)
navAbout.addEventListener('click', changeActive)


// // Event to change nav item active status on mouseover
// window.addEventListener('mouseover', (screen) => {
    
//     const elements = document.elementsFromPoint(screen.x, screen.y);    
//     elements.map((element) => {

//         if(element.classList.contains('home-section'))
//             changeActive(null, navHome)
        
//         if(element.classList.contains('weather-section'))
//             changeActive(null, navWeather)
        
//         if(element.classList.contains('about-section'))
//             changeActive(null, navAbout)
//     })
// })

// Event to change nav item active status on scroll
window.addEventListener("scroll", (screen) => {

    const x = window.innerWidth / 2
    const y = scrollY % Math.round(window.innerHeight)

    const elements = document.elementsFromPoint(x, y);    
    
    elements.map((element) => {

        if(element.classList.contains('home-section'))
            changeActive(null, navHome)
        
        if(element.classList.contains('weather-section'))
            changeActive(null, navWeather)
        
        if(element.classList.contains('about-section'))
            changeActive(null, navAbout)
    })
});


// focus on weather form on button click
checkNowBtn.addEventListener('click', () => {
    setTimeout(function() {
        inputValue.focus()
    }, 300)
    const x = scrollX + weather.getBoundingClientRect().left // X
    const y = scrollY + weather.getBoundingClientRect().top // Y
    window.scrollTo(x, y)
});


//
inputValue.addEventListener('focus', () => {
    setTimeout(function() {
        const x = scrollX + weather.getBoundingClientRect().left // X
        const y = scrollY + weather.getBoundingClientRect().top // Y
        window.scrollTo(x, y)
    }, 300)
});

// inputValue.addEventListener('blur', () => {
//     setTimeout(function() {
//         // const x = scrollX + weather.getBoundingClientRect().left // X
//         // const y = scrollY + weather.getBoundingClientRect().top // Y
//         // window.scrollTo(x, y)
//         window.location.href = '#weather'
//     }, 200)
// });