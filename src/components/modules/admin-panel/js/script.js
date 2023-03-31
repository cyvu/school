const button = {
  users: {
    get: document.querySelector("#user-handle").getElementsByTagName("button")[
      "getUsers"
    ],
  },
  user: {
    get: document.querySelector("#user-handle").getElementsByTagName("button")[
      "getUser"
    ],
    post: document.querySelector("#user-handle").getElementsByTagName("button")[
      "postUser"
    ],
    update: document
      .querySelector("#user-handle")
      .getElementsByTagName("button")["updateUser"],
    // delete: document.querySelector("#user-list").getElementsByTagName("button")["deleteUser"]
  },
};

// Text fields for the user
const user = {
  id: document.querySelector("#user-modifier").getElementsByTagName("input")[
    "id"
  ],
  firstname: document
    .querySelector("#user-modifier")
    .getElementsByTagName("input")["firstname"],
  lastname: document
    .querySelector("#user-modifier")
    .getElementsByTagName("input")["lastname"],
  email: document.querySelector("#user-modifier").getElementsByTagName("input")[
    "email"
  ],
};

button.users.get.addEventListener("click", getUsers, false);
button.user.get.addEventListener("click", getUser, false);
button.user.post.addEventListener("click", postUser, false);
button.user.update.addEventListener("click", updateUser, false);
// button.user.delete.addEventListener("click", deleteUser, false);

// TODO move to helper functions
function createElement(element, options, appendTo = false) {
  const _element = document.createElement(element);

  if (!!options)
    if (!!options.innerHTML) _element.innerHTML = options.innerHTML;

  if (!!options)
    if (!!options.attributes)
      for (const entry in options.attributes)
        _element.setAttribute(entry, options.attributes[entry]);

  if (!!appendTo) appendTo.appendChild(_element);

  return _element;
}

async function getUsers() {
  const query = new Data("http://localhost:8000/users").get();

  query.then((response) => {
    const user_list_target = document.querySelector("#user_list");
    user_list_target.replaceChildren()

    // Header
    const table = createElement("table", {}, user_list_target);
    const tr = createElement("tr", {}, table);

    createElement("th", { innerHTML: "Id" }, tr);
    createElement("th", { innerHTML: "Firstname" }, tr);
    createElement("th", { innerHTML: "Lastname" }, tr);
    createElement("th", { innerHTML: "Email" }, tr);
    createElement("th", { innerHTML: "Last online" }, tr);
    createElement("th", { innerHTML: "Date created" }, tr);

    // Content
    for (const user in response) {
      const _tr = createElement("tr", {}, table);

      for (const entry in response[user]) {
        const td = createElement("td", null, _tr);
        td.innerHTML = response[user][entry];
        table.appendChild(_tr);
      }
    }
  });
}

// Only takes id at the time of writing
async function getUser() {
  const query = new Data(`http://localhost:8000/user/${user.id.value}`).get();
  query.then((response) => {
    user.id.value = response[0].id;
    user.firstname.value = response[0].firstname;
    user.lastname.value = response[0].lastname;
    user.email.value = response[0].email;
  });
}

// Only takes id at the time of writing
async function postUser() {
  const query = new Data(`http://localhost:8000/user/add`).post({
    firstname: user.firstname.value,
    lastname: user.lastname.value,
    email: user.email.value,
  });
  query.then((response) => {
    document.querySelector("#alert").innerHTML = "<p>User added!</p>";
    setTimeout((res) => {
      document.querySelector("#alert").innerHTML = "";
    }, 5000);
  });
}

// Only takes id at the time of writing
async function updateUser() {
  const firstname = user.firstname.value;
  const lastname = user.lastname.value;
  const email = user.email.value;

  if (!user.id.value || user.id.value === "") return false;

  const query = new Data(
    `http://localhost:8000/user/${user.id.value}/update`
  ).post({
    id: user.id.value,
    firstname: user.firstname.value,
    lastname: user.lastname.value,
    email: user.email.value,
  });
  query.then((response) => {
    document.querySelector("#alert").innerHTML = "<p>User updated!</p>";
    setTimeout((res) => {
      document.querySelector("#alert").innerHTML = "";
      getUsers()
    }, 5000);
  });
}
