document.addEventListener("click", function(event) {

    const element = event.target;
    console.log(element, element.parentElement)

    if (element.className === "hide"){
        element.parentElement.style.animationPlayState = 'running';
        element.remove();

        element.parentElement.addEventListener('animationend', () => {
            // element.parentElement.remove();
        })
    }
})

function hide(){
    
}