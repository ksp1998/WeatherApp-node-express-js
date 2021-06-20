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
        // focus on input field when weather nav item is clicked : CURRENTLY NOT WORKING 😞
        if(section === navWeather) {
            inputValue.focus()
        }
    }
    section.classList.add("active")
}

navHome.addEventListener('click', changeActive)
navWeather.addEventListener('click', changeActive)
navAbout.addEventListener('click', changeActive)


// Event to change nav item active status on mouseover
window.addEventListener('mouseover', (screen) => {
    
    const elements = document.elementsFromPoint(screen.x, screen.y);
    elements.map((element) => {

        if(element.classList.contains('home-section'))
            changeActive(null, navHome)
        
        if(element.classList.contains('weather-section'))
            changeActive(null, navWeather)
        
        if(element.classList.contains('about-section'))
            changeActive(null, navAbout)
    })
})


// focus on weather form on button click
checkNowBtn.addEventListener('click', () => {
    window.location.href = '#weather'
    inputValue.focus()
});