function  addTask() {
	const  input  =  document.getElementById("taskInput");
	const  taskText  =  input.value.trim();
	if (taskText  ===  "") return;

	const  li  =  document.createElement("li");

	const  span  =  document.createElement("span");
	span.textContent  =  taskText;
	span.onclick  =  ()  =>  li.classList.toggle("done");

	const  delBtn  =  document.createElement("button");
	delBtn.textContent  =  "❌";
	delBtn.onclick  =  ()  =>  li.remove();

	li.appendChild(span);
	li.appendChild(delBtn);

	document.getElementById("taskList").appendChild(li);
	input.value  =  "";
}
// Prompt: Add functionality to save tasks to localStorage and load them on page refresh
function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById("taskList").children;
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i].querySelector("span").textContent;
        tasks.push({ text: task, done: taskList[i].classList.contains("done") });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.done) span.classList.add("done");
        span.onclick = () => li.classList.toggle("done");
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = () => li.remove();
        li.appendChild(span);
        li.appendChild(delBtn);
        document.getElementById("taskList").appendChild(li);
    });
}

window.onload = loadTasks;
window.onbeforeunload = saveTasks;
document.getElementById("addTaskBtn").onclick = addTask;
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});
document.getElementById("taskList").addEventListener("click", saveTasks);
