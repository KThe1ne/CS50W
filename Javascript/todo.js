document.addEventListener("DOMContentLoaded", function(){
    const submit = document.querySelector(".submit")
    document.querySelector("form").onsubmit = addTask;
})


function addTask() {

    const newTask = document.querySelector("#newTaskInput");

    const listitem = document.createElement("li");
    listitem.innerHTML = newTask.value;
    
    const todolist = document.querySelector(".todolist");
    todolist.append(listitem);

    newTask.value = "";

    return false;
}
