let form = document.querySelector("form");
let todoInput = document.querySelector(".input-box");
let todoList = document.querySelector(".todo-list");
let checkBox = document.querySelector("input[type='checkbox']")
let checkBoxes = document.querySelectorAll("input[type='checkbox']")
let counterContainer = document.querySelector(".counter");
let counter = 0;
let statusLists = document.querySelectorAll(".todo-status p")
let todoItems = todoList.children;

form.addEventListener("submit", (e) => {
    counter++;
    counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
    e.preventDefault();
    createTodoElements(todoInput.value)
    todoInput.value = "";

    if (counter > 0) {
        counterContainer.classList.remove("hide");
    } else {
        counterContainer.classList.add("hide");
    }
})

// permanently sets header checkbox to unchecked
checkBox.addEventListener("click", () => {
    checkBox.checked = false;
})

function createTodoElements(todo) {
    let checkImg = document.createElement("img");
    let spanTag = document.createElement("span");
    let checkBox = document.createElement("input");
    let labelTag = document.createElement("label");
    let todoItem = document.createElement("div");
    let pTag = document.createElement("p");
    let crossImg = document.createElement("img");

    checkImg.src = "./images/icon-check.svg";
    spanTag.className = "checkmark";
    checkBox.type = "checkbox";
    labelTag.className = "custom-checkbox"
    todoItem.className = "todo-item container"
    pTag.innerHTML = `${todo}`
    crossImg.className = "cross-icon";
    crossImg.src = "./images/icon-cross.svg";

    spanTag.append(checkImg);
    labelTag.append(checkBox, spanTag);
    todoItem.append(labelTag, pTag, crossImg)
    todoList.append(todoItem);

    checkBox.addEventListener("click", (e) => {
        if (e.target.checked == true) {
            pTag.classList.add("completed");
            counter--;
            counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
        }
        if (e.target.checked == false) {
            pTag.classList.remove("completed");
            counter++;
            counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
        }
    })

    crossImg.addEventListener("click", (e) => {
        crossImg.parentElement.remove();
        counter--;
        counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
        if (counter > 0) {
            counterContainer.classList.remove("hide");
        } else {
            counterContainer.classList.add("hide");
        }
    })
}

for (let list of statusLists) {
    // let todoItems = todoList.children
    list.addEventListener("click", () => {
        for (let list of statusLists) {
            list.classList.remove("active");
        }
        list.classList.add("active");
        if (list.className.includes("active-list")) {
            for (let item of todoItems) {
                item.classList.remove("hide");
            }
            for (let item of todoItems) {
                if (item.children[1].className.includes("completed")) {
                    item.classList.add("hide")
                }
            }
        } else if (list.className.includes("completed-list")) {
            for (let item of todoItems) {
                item.classList.remove("hide");
            }
            for (let item of todoItems) {
                if (!(item.children[1].className.includes("completed"))) {
                    item.classList.add("hide")
                }
            }
        } else {
            for (let item of todoItems) {
                item.classList.remove("hide");
            }
        }
    })
}

let body = document.querySelector("body");
let modeToggles = document.querySelectorAll(".toggle");
let lightMode = document.querySelector(".light-mode");
let darkMode = document.querySelector(".dark-mode");

for (let toggle of modeToggles) {
    toggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        lightMode.classList.toggle("hide");
        darkMode.classList.toggle("hide");
    })
}

let clearCompleted = document.querySelector(".clear-all");
const completedArray = [];
clearCompleted.addEventListener("click", () => {    
    for (let item of todoItems) {                
        if (item.children[1].className.includes("completed")) {            
            completedArray.push(item)
        }
    }
    for(let element of completedArray) {
        element.remove();
    }
})