document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("select").onchange = function() {

        console.log(this);
        document.querySelector("h1").innerHTML = `This color is ${this.value}`;
        document.querySelector("h1").style.color = this.value;

    }

});
