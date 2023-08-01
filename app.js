const form = document.querySelector("form");
const todoInput = document.querySelector(".input-box");
const todoList = document.querySelector(".todo-list");
const checkBoxes = document.querySelectorAll("input[type='checkbox']");
const counterContainer = document.querySelector(".counter");
const statusLists = document.querySelectorAll(".todo-status p");
const todoItems = todoList.children;
let counter = 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (todoInput.value != "") {
        counter++;
        counterContainer.children[0].firstElementChild.innerHTML = `${counter}`
        createTodoElements(todoInput.value)
        todoInput.value = "";
        counterContainer.classList.toggle("hide", counter <= 0);
    }
})

// permanently sets header checkbox to unchecked
checkBoxes[0].addEventListener("click", () => {
    checkBoxes[0].checked = false;
})

function removeTodo(e) {
    const taskElement = e.target;
    const taskContainer = e.target.parentElement
    const isTaskCompleted = taskElement.previousElementSibling.classList.contains("completed");

    taskContainer.remove();
    updateCounter(isTaskCompleted);
}

function updateCounter(isTaskCompleted) {
    const counterDisplay = counterContainer.children[0].firstElementChild;

    if (isTaskCompleted) {
        counterDisplay.innerHTML = counter;
    } else {
        counter--;
        counterDisplay.innerHTML = counter;
    }
    counterContainer.classList.toggle("hide", counter <= 0);
}

function toggleTaskCompletion(e) {
    const taskContainer = e.target.parentElement.nextElementSibling;
    const isTaskCompleted = e.target.checked;

    if (isTaskCompleted) {
        taskContainer.classList.add("completed");
        counter--;
    } else {
        taskContainer.classList.remove("completed");
        counter++;
    }
    updateCounterDisplay();
}

function updateCounterDisplay() {
    const counterDisplay = counterContainer.children[0].firstElementChild;
    counterDisplay.textContent = counter;
}


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
    todoItem.id = "todo" + `${counter}`
    todoItem.draggable = "true"
    pTag.innerHTML = `${todo}`
    crossImg.className = "cross-icon";
    crossImg.src = "./images/icon-cross.svg";

    spanTag.append(checkImg);
    labelTag.append(checkBox, spanTag);
    todoItem.append(labelTag, pTag, crossImg)
    todoList.append(todoItem);

    checkBox.addEventListener("click", toggleTaskCompletion)
    crossImg.addEventListener("click", removeTodo)
    todoItem.addEventListener('dragstart', dragStart);

    let dragIndex = 0;
    let clone = "";

    // Handle the dragstart    
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    // Add event listeners for drag and drop events
    todoItem.addEventListener('dragenter', dragEnter);
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

        // Add event listeners for the cloned element
        clone.addEventListener('dragstart', dragStart);
        clone.addEventListener('dragenter', dragEnter);
        clone.addEventListener('dragover', dragOver);
        clone.addEventListener('dragleave', dragLeave);
        clone.addEventListener('drop', drop);

        // Add event listeners for checkbox click and cross icon click
        clone.children[0].children[0].addEventListener("click", toggleTaskCompletion);
        clone.children[2].addEventListener("click", removeTodo);

        const dragStartId = e.dataTransfer.getData("text");

        if (clone.id !== dragStartId) {
            const nodeList = e.currentTarget.parentElement.children;

            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].id === dragStartId) {
                    dragIndex = i;
                    break;
                }
            }

            // Reorder the elements based on the drag-and-drop action
            e.currentTarget.parentElement.insertBefore(clone, nodeList[dragIndex]);
            e.currentTarget.parentElement.insertBefore(document.getElementById(dragStartId), e.currentTarget.nextSibling);
            e.currentTarget.remove();
        }
    }

}

for (let list of statusLists) {
    list.addEventListener("click", () => {
        statusLists.forEach((list) => list.classList.remove("active"));
        list.classList.add("active");

        Array.from(todoItems).forEach((item) => item.classList.remove("hide"));

        if (list.classList.contains("filter-active")) {
            Array.from(todoItems).forEach((item) => {
                if (item.children[1].classList.contains("completed")) {
                    item.classList.add("hide");
                }
            });
        } else if (list.classList.contains("filter-completed")) {
            Array.from(todoItems).forEach((item) => {
                if (!item.children[1].classList.contains("completed")) {
                    item.classList.add("hide");
                }
            });
        }
    });
}

const body = document.querySelector("body");
const modeToggles = document.querySelectorAll(".toggle");
const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");

for (const toggle of modeToggles) {
    toggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        lightMode.classList.toggle("hide");
        darkMode.classList.toggle("hide");
    });
}

const clearCompleted = document.querySelector(".clear-all");
const completedTodoItems = [];

clearCompleted.addEventListener("click", function () {
    for (let item of todoItems) {
        if (item.children[1].classList.contains("completed")) {
            completedTodoItems.push(item);
        }
    }

    completedTodoItems.forEach(function (completedItem) {
        completedItem.remove();
    });
});
