const todoForm = document.querySelector("#todo-form");
const mainInput = document.querySelector("#mainInput");
const todoList = document.querySelector("#todos");
const remainingTask = document.querySelector("#remainingTask");
const completedTask = document.querySelector("#completedTask");
const totalTask = document.querySelector("#totalTask");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const time = document.querySelector(".time");
const realTime = new Date();
time.textContent = realTime.toDateString();

if (tasks.length > 0) {
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = mainInput.value.trim();
    if (!inputValue) {
        console.error("Please type a task");
        return;
    }
    mainInput.value = "";

    const task = {
        id: new Date().getTime(),
        taskName: inputValue,
        isCompleted: false
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    createTaskElement(task);
});

function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.classList.add("todolistItem", "flex", "justify-between", "items-center", "bg-white", "even:bg-gray-100", "w-[410px]", "mb-2", "p-4", "rounded-md");
    taskElement.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.isCompleted;
    checkbox.classList.add("align-middle", "accent-orange-400", "scale-110");
    checkbox.addEventListener('change', () => {
        task.isCompleted = checkbox.checked;
        if (task.isCompleted) {
            taskName.classList.add('completed');
        } else {
            taskName.classList.remove('completed');
        }
        updateLocalStorage();
        countTasks()   
    });
    

    const taskName = document.createElement('span');
    taskName.textContent = task.taskName;
    taskName.classList.add("font-semibold", "text-slate-700", "capitalize", "text-xl");
    if (task.isCompleted) {
        taskName.classList.add('completed');
    }

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-solid fa-xmark text-slate-600"></i>';
    removeButton.classList.add("removeTask", "text-lg");
    removeButton.addEventListener('click', () => {
        taskElement.remove();
        tasks = tasks.filter(item => item.id !== task.id);
        updateLocalStorage();
        countTasks()
    });

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskName);
    taskElement.appendChild(removeButton);

    todoList.appendChild(taskElement);
    countTasks()
}

function countTasks(){
    const completedtaskArray = tasks.filter(task => task.isCompleted);

    remainingTask.textContent = tasks.length - completedtaskArray.length;
    completedTask.textContent = completedtaskArray.length;
    totalTask.textContent = tasks.length;
    updateLocalStorage(); 
}


function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
