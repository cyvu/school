finalForm();

async function addTodoListItem(index) {

  /* Layout */
  const list = document.createElement("ul");
  const entry1 = document.createElement("li");
  const entry2 = document.createElement("li");
  const entry3 = document.createElement("li");
  const entry4 = document.createElement("li");

  /* Inputs */
  const input_checkbox = document.createElement("input");
  input_checkbox.setAttribute("type", "checkbox");
  input_checkbox.setAttribute("id", "item" + index);
  input_checkbox.setAttribute("name", "check" + index);

  const input_text = document.createElement("input");
  input_text.setAttribute("type", "text");
  input_text.setAttribute("id", "text" + index);
  input_text.setAttribute("name", "text" + index);

  const input_date_add = document.createElement("input");
  input_date_add.setAttribute("type", "date");
  input_date_add.setAttribute("id", "date_add" + index);
  input_date_add.setAttribute("name", "date_add" + index);
  input_date_add.setAttribute("disabled", "");

  const input_date_check = document.createElement("input");
  input_date_check.setAttribute("type", "date");
  input_date_check.setAttribute("id", "date_check" + index);
  input_date_check.setAttribute("name", "date_check" + index);
  input_date_check.setAttribute("disabled", "");

  /* Labels */
  const label_text = document.createElement("label");
  label_text.setAttribute("for", "text" + index);
  label_text.innerText = "Item" + index;

  const label_date_add = document.createElement("label");
  label_date_add.setAttribute("for", "date_add" + index);
  label_date_add.innerText = "Date added: ";

  const label_date_check = document.createElement("label");
  label_date_check.setAttribute("for", "date_check" + index);
  label_date_check.innerText = "Date checked: ";

  /* Construct the form item */
  const target = document.querySelector("#form-todo");
  target.appendChild(list);

  list.appendChild(entry1);
  entry1.appendChild(input_checkbox);

  list.appendChild(entry2);
  entry2.appendChild(label_text);
  entry2.appendChild(input_text);

  list.appendChild(entry3);
  entry3.appendChild(label_date_add);
  entry3.appendChild(input_date_add);

  list.appendChild(entry4);
  entry4.appendChild(label_date_check);
  entry4.appendChild(input_date_check);
}

async function constructToDoList(nrOfItems) {
  for (let i = 0; i < nrOfItems; i++) {
    await addTodoListItem(i);
  }
}

async function finalForm() {
  await constructToDoList(5);
}
