let index = 0
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-button')
const toDoList = document.getElementById('todo-list')
const deleteBtns = document.getElementsByClassName('delete-button')
const editBtns = document.getElementsByClassName('edit-button')
const updateBtn = document.getElementById('update-button')
addBtn.disabled = true
class Todo {
  constructor(value, index) {
    ;(this.id = index), (this.value = value)
  }
}
let ToDoList = []
let currentEdited
input.addEventListener('keyup', function () {
  if (this.value == '') {
    addBtn.disabled = true
  } else {
    addBtn.disabled = false
  }
})
addBtn.addEventListener('click', function () {
  let todo = new Todo(input.value, index)
  ToDoList.push(todo)
  index++
  renderList(ToDoList)
  input.value = ''
  addBtn.disabled = true
})

function renderList(array) {
  let str = ''
  if (array.length == 0) {
    toDoList.innerHTML = ''
  }
  for (let i = 0; i < array.length; i++) {
    str += `
    <li id="${array[i].id}">${array[i].value} <button class="delete-button">X</button><button class="edit-button">Edit</button></li>
    `
    toDoList.innerHTML = str
    deleteBtns[i].addEventListener('click', function (e) {
      if (updateBtn.style.display == 'inline') {
        input.value = ''
        addBtn.style.display = 'inline'
        updateBtn.style.display = 'none'
        currentEdited = undefined
      }
      deleteToDo(e.target.parentElement.id)
    })
    editBtns[i].addEventListener('click', function (e) {
      editToDo(e.target.parentElement.id)
    })
  }
}
function deleteToDo(id) {
  let target = ToDoList.find((x) => x.id == id)
  let targetIndex = ToDoList.indexOf(target)
  ToDoList.splice(targetIndex, 1)
  renderList(ToDoList)
}
function editToDo(id) {
  let target = ToDoList.find((x) => x.id == id)
  currentEdited = target
  input.value = target.value
  updateBtn.style.display = 'inline'
  updateBtn.addEventListener('click', function (e) {
    updateToDo(target.id, input.value)
  })
  addBtn.style.display = 'none'
}
function updateToDo(id, newVal) {
  updateBtn.style.display = 'none'
  let target = ToDoList.find((x) => x.id == id)
  target.value = newVal
  renderList(ToDoList)
  addBtn.style.display = 'inline'
  addBtn.disabled = true
  input.value = ''
  currentEdited = undefined
}
