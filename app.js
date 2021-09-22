// querySelector
const formButton = document.querySelector(".todo-button");
const formInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

//event listeners
formButton.addEventListener("click", addItemTodo);
todoList.addEventListener("click", ItemTodoAction);

//functions
function addItemTodo(e, itemName) {
  if (e != null) e.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newItem = document.createElement("li");
  newItem.classList.add("todo-item");

  todoDiv.appendChild(newItem); //add li to div

  // Create input
  const newInput = document.createElement("input");
  newInput.type = "text";
  if (!itemName) newInput.value = formInput.value;
  else newInput.value = itemName;
  newInput.readOnly = true;

  newItem.appendChild(newInput);

  // Create done Button
  const doneButton = document.createElement("button");
  doneButton.classList.add("todo-done");
  doneButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';

  todoDiv.appendChild(doneButton); //add edit button to div

  // Create edit Button
  const editButton = document.createElement("button");
  editButton.classList.add("todo-edit");
  editButton.innerHTML = '<i class="fa fa-edit"></i>';

  todoDiv.appendChild(editButton); //add edit button to div

  // Create Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("todo-delete");
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

  todoDiv.appendChild(deleteButton); //add delete button to div

  formInput.value = "";
  todoList.appendChild(todoDiv);
}

function ItemTodoAction(e) {
  e.preventDefault();
  e.stopPropagation();

  const item = e.target;
  //console.log(e.target);

  if (item.classList[0] === "todo-delete") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  } else if (item.classList[0] === "todo-edit") {
    editItemTodo(e);
  } else if (item.classList[0] === "todo-done") {
    e.target.parentElement.classList.toggle("todo-check");
  }
}

function editItemTodo(e) {
  const editButton = e.target;
  const input = e.target.parentElement.children[0].children[0];

  //console.log(input);
  //console.log(editButton);

  if (editButton.innerHTML == '<i class="fa fa-edit"></i>') {
    //console.log(e.path[2].children[0].children[0]);
    editButton.innerHTML = '<i class="fas fa-check"></i>';

    input.readOnly = false;
    input.classList.add("todoInputFocus");
    input.focus();
  } else {
    editButton.innerHTML = '<i class="fa fa-edit"></i>';

    input.readOnly = true;
    input.classList.remove("todoInputFocus");
    input.focus();
  }
}
