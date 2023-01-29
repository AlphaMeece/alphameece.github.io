let activeTab = "about-us"

let toggleAccordion = (event, button) => {
    button.classList.toggle("on")

    let panel = document.querySelector("#collapsed-buttons")
    if(panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px"
    }
}

let changeTab = (event, button) => {
    let id = prepareText(button)
    document.querySelector(".accordion-button").classList.remove("on")
    document.querySelector("#collapsed-buttons").style.maxHeight = null;
    if(activeTab === id) return

    activeTab = id
    let buttons = [...document.getElementsByClassName("nav-button")]
    buttons.forEach(element => {
        if(prepareText(element.innerHTML) === id) {
            element.classList.add("active")
        } else element.classList.remove("active")
    })
    
    let content = document.querySelectorAll(".content-block")
    content.forEach(element => {
        if(element.id !== id) {
            element.classList.add("hidden")
        } else element.classList.remove("hidden")
    })
}

let imageModal = (event, modal) => {
    
}

let prepareText = (text) => text.toLowerCase().replace(/ /, "-")