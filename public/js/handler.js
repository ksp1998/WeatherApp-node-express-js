// const navHome = document.getElementById('navHome');
// const navWeather = document.getElementById('navWeather');
// const navAbout = document.getElementById('navAbout');
// const toggleBtn = document.getElementById('toggleBtn');
// const inputValue = document.getElementById('inputValue');
// const checkNowBtn = document.getElementById('checkNowBtn');
// const connDialogRetryBtn = document.getElementById('connDialogRetryBtn');
// const connDialogCancelBtn = document.getElementById('connDialogCancelBtn');
// const connectionDialog = document.getElementById('connectionDialog');
// const errorForm = document.getElementById('errorForm');
// const clearBtn = document.getElementById('clearBtn');
// const suggestionList = document.getElementById('suggestionList');

// Function to change nav item active status
const changeActive = (event, section) => {

    navHome.classList.remove('active');
    navWeather.classList.remove('active');
    navAbout.classList.remove('active');

    if(event !== null) {
        section = event.target;
        
        if(toggleBtn.getAttribute("aria-expanded") === "true") {
            toggleBtn.click();
        }
    }
    section.classList.add("active");
}

navHome.addEventListener('click', changeActive);
navWeather.addEventListener('click', changeActive);
navAbout.addEventListener('click', changeActive);


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

    const x = window.innerWidth / 2;
    const y = scrollY % Math.round(window.innerHeight);

    const elements = document.elementsFromPoint(x, y);    
    
    elements.map((element) => {

        if(element.classList.contains('home-section'))
            changeActive(null, navHome);
        
        if(element.classList.contains('weather-section'))
            changeActive(null, navWeather);
        
        if(element.classList.contains('about-section'))
            changeActive(null, navAbout);
    });

    let left = inputValue.style.left;
    let top = inputValue.getBoundingClientRect().y + 52;

    suggestionList.style.left = `${left}px`;
    suggestionList.style.top = `${top}px`;
});


// focus on weather form on button click
checkNowBtn.addEventListener('click', () => {
    setTimeout(function() {
        inputValue.focus();
    }, 500);
    const x = scrollX + weather.getBoundingClientRect().left; // X
    const y = scrollY + weather.getBoundingClientRect().top; // Y
    window.scrollTo(x, y);
});


// scroll to weather section on input focus
inputValue.addEventListener('focus', () => {
    setTimeout(function() {
        const x = scrollX + weather.getBoundingClientRect().left; // X
        const y = scrollY + weather.getBoundingClientRect().top; // Y
        window.scrollTo(x, y);
    }, 300)
});

// hide connection dialog on button click
connDialogCancelBtn.addEventListener('click', hideConnectionDialog);

// retry connection on button click
connDialogRetryBtn.addEventListener('click', (event) => {
    event.preventDefault();
    hideConnectionDialog();
    setTimeout(function() {
        getData(event);
    }, 250);
});

// clear input field text on button click
clearBtn.addEventListener('click', () => {
    inputValue.value = '';
});


inputValue.addEventListener('input', evt => {
    let txt = evt.target.value;
    if(txt.length === 0) {
        suggestionList.innerHTML = '';
        return;
    }
    let re = new RegExp(`^${txt}.*`, 'i');
    let searchResult = [];
    for(let i = 0; i < cities.length; i++) {
        if(re.test(cities[i])) {
            searchResult.push(cities[i]);
        }
        if(searchResult.length === 8)
            break;
    }
    // console.log(txt);
    // console.log(searchResult);
    suggestionList.innerHTML = '';
    searchResult.map(city => {
        suggestionList.innerHTML += `<p>${city}</p>`;
    });

    let children = suggestionList.childNodes;
    for(let i = 0; i < children.length; i++) {
        children[i].addEventListener('click', e => {
            e.target.style.backgroundColor = '#000000';
            e.target.style.color = '#FFFFFF';
            inputValue.value = e.target.innerHTML;
            submitBtn.click();
        });
    }
    
    let currentActive = -1;

    inputValue.addEventListener('keydown', e => {

        if(children.length === 0)
            return;

        for(let i = 0; i < children.length; i++) {
            children[i].style.backgroundColor = '#FFFFFF';
            children[i].style.color = '#000000';
        }

        if (e.keyCode === 40) {
            if(currentActive < children.length-1)
                currentActive++;
            children[currentActive].style.backgroundColor = '#000000';
            children[currentActive].style.color = '#FFFFFF';
            inputValue.value = children[currentActive].innerHTML;
        } 
        
        if (e.keyCode == 38) {
            e.preventDefault();
            if(currentActive > 0)
                currentActive--;
            children[currentActive].style.backgroundColor = '#000000';
            children[currentActive].style.color = '#FFFFFF';
            inputValue.value = children[currentActive].innerHTML;
        }
    });
});

inputValue.addEventListener('blur', e => {
    setTimeout(() => {
        suggestionList.innerHTML = '';
    }, 300);
});