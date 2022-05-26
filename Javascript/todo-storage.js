if (!localStorage.getItem("todolist")){
    localStorage.setItem("todolist",["Eat","Sleep","Exercise"].toString());
}
// localStorage.setItem("todolist",["Eat","Sleep","Exercise"].toString());

document.addEventListener("DOMContentLoaded", function(){
    let listitem;
    const newTask = document.querySelector("#newTaskInput");
    const todolist = document.querySelector(".todolist");
    const submit = document.querySelector(".submit");
    const todo_store = localStorage.getItem("todolist");

    console.log(todo_store.split(","))

    tasklist = todo_store.split(",")

    tasklist.forEach(task => {
        console.log(task)
        listitem = document.createElement("li")
        listitem.innerHTML = task;

        todolist.appendChild(listitem)
    })
    
    document.querySelector("form").onsubmit = () => {
        addTask(newTask);
    } 
    
})



function addTask(inputelement) {

    tasklist.push(inputelement.value)
    console.log(inputelement.value)
    console.log(tasklist)
    localStorage.setItem("todolist",tasklist.toString());
   
    return true;
}
