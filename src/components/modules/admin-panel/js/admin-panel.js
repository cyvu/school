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
  id: document
    .querySelector("#user-modifier")
    .getElementsByTagName("input")["id"],
  firstname: document
    .querySelector("#user-modifier")
    .getElementsByTagName("input")["firstname"],
  lastname: document
    .querySelector("#user-modifier")
    .getElementsByTagName("input")["lastname"],
  email: document
    .querySelector("#user-modifier")
    .getElementsByTagName("input")["email"],
};


button.users.get.addEventListener("click", getUsers, false);
button.user.get.addEventListener("click", getUser, false);
button.user.post.addEventListener("click", postUser, false);
button.user.update.addEventListener("click", updateUser, false);
// button.user.delete.addEventListener("click", deleteUser, false);

async function getUsers() {
  const query = new Data("http://localhost:8000/users").get();

  query.then((response) => {
    const user_list_target = document.querySelector("#user_list");

    const user_ul = document.createElement("ul");
    user_list_target.appendChild(user_ul);

    for (const user in response) {
      const user_ol = document.createElement("ol");
      user_ul.appendChild(user_ol);

      for (const entry in response[user]) {
        const li = document.createElement("li");
        li.innerHTML = response[user][entry];
        user_ol.appendChild(li);
      }
    }
  });
}

// Only takes id at the time of writing
async function getUser() {
  const query = new Data(`http://localhost:8000/user/${user.id.value}`).get();
  query.then((response) => {
    user.id.value = response[0].id
    user.firstname.value = response[0].firstname
    user.lastname.value = response[0].lastname
    user.email.value = response[0].email
  });
}

// Only takes id at the time of writing
async function postUser() {
  const query = new Data(`http://localhost:8000/user/add`).post({
    firstname: user.firstname.value,
    lastname: user.lastname.value,
    email: user.email.value
  });
  query.then((response) => {
    document.querySelector("#alert").innerHTML = "<p>User added!</p>"
    setTimeout(res => {
      document.querySelector("#alert").innerHTML = ""
    }, 5000)
  });
}

// Only takes id at the time of writing
async function updateUser() {
  const firstname = user.firstname.value
  const lastname = user.lastname.value
  const email = user.email.value

  if (!user.id.value || user.id.value === "") return false;
  
  const query = new Data(`http://localhost:8000/user/${user.id.value}/update`).post({
    id: user.id.value,
    firstname: user.firstname.value,
    lastname: user.lastname.value,
    email: user.email.value
  });
  query.then((response) => {
    document.querySelector("#alert").innerHTML = "<p>User updated!</p>"
    setTimeout(res => {
      document.querySelector("#alert").innerHTML = ""
    }, 5000)
  });
}