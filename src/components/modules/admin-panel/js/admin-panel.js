const users = new Data("http://localhost:8000/users").get();

users.then((response) => {
  const user_list_target = document.querySelector("#user_list");

  const user_ul = document.createElement("ul");
  user_list_target.appendChild(user_ul);

  for (const user in response) {
    const user_ol = document.createElement("ol");
    user_ul.appendChild(user_ol);
    
    for (const entry in response[user]) {
      const li = document.createElement("li");
      li.innerHTML = response[user][entry];;
      user_ol.appendChild(li);
    }
  }
});
