let draggedCard = null;
let rightClickCard = null;

function getCurrentDate(now) {
  const formattedDateTime = `${String(now.getDate()).padStart(2, "0")}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${now.getFullYear()} ${(now.getHours() % 12 || 12)
    .toString()
    .padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
  return formattedDateTime;
}

function addTask(bordId) {
  const input = document.querySelector(`#${bordId} input`);
  const taskText = input.value.trim();

  if (taskText === "") return;
  const now = new Date();
  const formattedDateTime = getCurrentDate(now);
  const taskElement = CreateNewElement(taskText, formattedDateTime);
  const bordDiv = document.querySelector(`#${bordId}`);
  bordDiv.appendChild(taskElement);
  input.value = "";
}

// create new task i.e. new element

function CreateNewElement(newTask, newDate) {
  const Element = document.createElement("div");
  const span = document.createElement("span");
  span.classList.add("font-bold");
  span.innerText = newTask;
  const small = document.createElement("small");
  small.classList.add("text-end", "block", "font-semibold");
  small.innerText = newDate;
  Element.classList.add(
    "task",
    "w-full",
    "h-auto",
    "bg-sky-500",
    "text-gray-900",
    "mt-3",
    "rounded",
    "text-justify",
    "p-4",
    "cursor-pointer"
  );
  Element.appendChild(span);
  Element.appendChild(small);
  Element.setAttribute("title", "right click to edit.");
  Element.draggable = true;
  Element.addEventListener("dragstart", drageStart);
  Element.addEventListener("dragend", dragEnd);

  Element.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    rightClickCard = this;
    showContextMenu(event.pageX, event.pageY);
  });
  return Element;
}

function drageStart() {
  this.classList.add("dragging");
  draggedCard = this;
}

function dragEnd() {
  this.classList.remove("dragging");
  draggedCard = null;
}

function dragOver(event) {
  event.preventDefault();
  if (draggedCard) {
    event.currentTarget.appendChild(draggedCard);
  }
}

["todo", "doing", "done"].forEach((id) => {
  const bord = document.getElementById(id);
  bord.addEventListener("dragover", dragOver);
});

const menu = document.querySelector(".context-menu");
function showContextMenu(x, y) {
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
  menu.style.display = "block";
}

document.addEventListener("click", () => {
  menu.style.display = "none";
});

// Edit and Delete tasks

function editTask() {
  if (rightClickCard !== null) {
    console.log(rightClickCard);

    const spanElement = rightClickCard.querySelector("span");
    const now = new Date();
    const newDate = getCurrentDate(now);
    const dateElement = rightClickCard.querySelector("small");
    if (spanElement) {
      const newEditedTask = prompt("Edit task-", spanElement.textContent);
      if (newEditedTask !== null && newEditedTask.trim() !== "") {
        spanElement.textContent = newEditedTask.trim();
        dateElement.textContent = `Updated At:-${newDate}`;
      }
    }
  }
  updateTask();
}

// delet task

function deleteTask() {
  if (rightClickCard !== null) {
    rightClickCard.remove();
  }
  updateTask();
}
