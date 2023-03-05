finalForm()


function addTodoListItem(index) {

  /* Inputs */
  const input_checkbox = document.createElement("input")
  input_checkbox.setAttribute("type", "checkbox")
  input_checkbox.setAttribute("id",   "item" + index)
  input_checkbox.setAttribute("name", "check" + index)

  const input_text = document.createElement("input")
  input_text.setAttribute("type", "text")
  input_text.setAttribute("id",   "text" + index)
  input_text.setAttribute("name", "text" + index)

  const input_date_add = document.createElement("input")
  input_date_add.setAttribute("type", "date")
  input_date_add.setAttribute("id",   "date_add" + index)
  input_date_add.setAttribute("name", "date_add" + index)
  input_date_add.setAttribute("disabled",  "")

  const input_date_check = document.createElement("input")
  input_date_check.setAttribute("type", "date")
  input_date_check.setAttribute("id",   "date_check" + index)
  input_date_check.setAttribute("name", "date_check" + index)
  input_date_check.setAttribute("disabled",  "")

  /* Labels */
  const label_text = document.createElement("label")
  label_text.setAttribute("for",  "text" + index)
  label_text.innerText = "Item" + index

  const label_date_add = document.createElement("label")
  label_date_add.setAttribute("for",  "date_add" + index)
  label_date_add.innerText = "Date added: "

  const label_date_check = document.createElement("label")
  label_date_check.setAttribute("for",  "date_check" + index)
  label_date_check.innerText = "Date checked: "

  /* Construct the form item */
  const target = document.querySelector("#form-todo")
  target.appendChild(input_checkbox)
  target.appendChild(label_text)
  target.appendChild(input_text)
  target.appendChild(label_date_add)
  target.appendChild(input_date_add)
  target.appendChild(label_date_check)
  target.appendChild(input_date_check)

  return (label)
}

function constructToDoList(nrOfItems) {
  const item = addTodoListItem(1)
  
  //document.createElement("input")
  console.log(item)

  const target = document.querySelector("#form-todo")
  target.appendChild(item)
}

function finalForm() {
  constructToDoList(1)
}