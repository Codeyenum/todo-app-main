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
    e.preventDefault();
    if (todoInput.value != "") {
        counter++;
        counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
        createTodoElements(todoInput.value)
        todoInput.value = "";
        if (counter > 0) {
            counterContainer.classList.remove("hide");
        } else {
            counterContainer.classList.add("hide");
        }
    }
})

// permanently sets header checkbox to unchecked
checkBox.addEventListener("click", () => {
    checkBox.checked = false;
})

function removeTodo(e) {
    this.parentElement.remove();
    if (this.previousElementSibling.classList.includes("completed")) {
        counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
        if (counter > 0) {
            counterContainer.classList.remove("hide");
        } else {
            counterContainer.classList.add("hide");
        }
    } else {
        counter--;
        counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
        if (counter > 0) {
            counterContainer.classList.remove("hide");
        } else {
            counterContainer.classList.add("hide");
        }
    }
}

function addCompletedStyle(e) {
    if (e.target.checked == true) {
        this.parentElement.nextElementSibling.classList.add("completed");
        counter--;
        counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
    }
    if (e.target.checked == false) {
        this.parentElement.nextElementSibling.classList.classList.remove("completed");
        counter++;
        counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
    }
}

function createTodoElements(todo) {
    let checkImg = document.createElement("img");
    let spanTag = document.createElement("span");
    let checkBox = document.createElement("input");
    let labelTag = document.createElement("label");
    let todoItem = document.createElement("div");
    let pTag = document.createElement("p");
    let crossImg = document.createElement("img");
    // let itemCounter = 0;

    checkImg.src = "./images/icon-check.svg";
    spanTag.className = "checkmark";
    checkBox.type = "checkbox";
    labelTag.className = "custom-checkbox"
    todoItem.className = "todo-item container"
    todoItem.id = "todo" + `${counter}`
    todoItem.draggable = "true"
    pTag.innerHTML = `${todo}`
    crossImg.className = "cross-icon";
    crossImg.src = "./images/icon-cross.svg";

    spanTag.append(checkImg);
    labelTag.append(checkBox, spanTag);
    todoItem.append(labelTag, pTag, crossImg)
    todoList.append(todoItem);

    checkBox.addEventListener("click", addCompletedStyle)
    crossImg.addEventListener("click", removeTodo)
    todoItem.addEventListener('dragstart', dragStart);

    let dragIndex = 0;
    let clone = "";
    // handle the dragstart    
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    todoItem.addEventListener('dragenter', dragEnter)
    todoItem.addEventListener('dragover', dragOver);
    todoItem.addEventListener('dragleave', dragLeave);
    todoItem.addEventListener('drop', drop);

    function dragEnter(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    function dragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    function dragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
    }

    function drop(e) {
        e.currentTarget.classList.remove('drag-over');

        e.preventDefault();
        clone = e.currentTarget.cloneNode(true);
        clone.addEventListener('dragstart', dragStart);
        clone.addEventListener('dragenter', dragEnter)
        clone.addEventListener('dragover', dragOver);
        clone.addEventListener('dragleave', dragLeave);
        clone.addEventListener('drop', drop);

        clone.children[0].children[0].addEventListener("click", addCompletedStyle);
        clone.children[2].addEventListener("click", removeTodo)
        let dragStartId = e.dataTransfer.getData("text");

        if (clone.id !== dragStartId) {
            let nodeList = e.currentTarget.parentElement.children;
            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].id === dragStartId) {
                    dragIndex = i;
                }
            }
            e.currentTarget.parentElement.insertBefore(clone, e.currentTarget.parentElement.children[dragIndex]);
            e.currentTarget.parentElement.insertBefore(document.getElementById(dragStartId), e.currentTarget.nextSibling);
            e.currentTarget.remove()
        }
    }
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
const completedTodoItems = [];
clearCompleted.addEventListener("click", () => {
    for (let item of todoItems) {
        console.log(item)
        if (item.children[1].className.includes("completed")) {
            completedTodoItems.push(item)
        }
    }
    for (let completedItem of completedTodoItems) {
        completedItem.remove();
    }
})