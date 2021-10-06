const themeBtn = document.getElementById("themeBtn")

// document.cookie = `theme=day; expires=Thu, 31 Dec 2099 12:00:00 UTC; path='/'`
// document.cookie = `currentTheme=night; expires=Thu, 31 Dec 2099 12:00:00 UTC; path='/'`

const style = document.documentElement.style

const changeTheme = (value) => {

    // console.log(document.cookie)

    document.cookie = `theme=${value}; expires=Thu, 31 Dec 2099 12:00:00 UTC; path='/'`

    if(document.cookie.match('day') === null) {
        style.setProperty('--theme-btn-color', 'yellow')
        style.setProperty('--main-bg', 'url("../images/night.png")')
        style.setProperty('--text-color', '#ffffff')
        style.setProperty('--text-shadow-color', '#000000')
        style.setProperty('--app-title-color', 'yellow')
        themeBtn.innerHTML = '<img class="fa fa-spin" src="https://img.icons8.com/officel/40/000000/sun.png"/>'
    }
    else {
        style.setProperty('--theme-btn-color', 'white')
        style.setProperty('--main-bg', 'url("../images/day.png")')
        style.setProperty('--text-color', '#000000')
        style.setProperty('--text-shadow-color', '#ffffff')
        style.setProperty('--app-title-color', 'red')
        themeBtn.innerHTML = '<img src="https://img.icons8.com/plasticine/40/000000/bright-moon.png"/>'
    }
}

themeBtn.addEventListener('click', () => {
    (document.cookie.split('=')[1] === 'day' ) ? changeTheme('night') : changeTheme('day')
})

window.addEventListener('load', () => {
    // console.log(document.cookie)
    if(document.cookie.length == 0) {
        document.cookie = `theme=day; expires=Thu, 31 Dec 2099 12:00:00 UTC; path='/'`
    } else {
        changeTheme(document.cookie.split('=')[1])
    }
})