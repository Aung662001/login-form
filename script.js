const fetchData = async () => {
  const url = "http://localhost:3000/users";
  const response = await fetch(url);

  const dataFromServer = await response.json();
  console.log("data from server:", dataFromServer);

  const users = () => {
    const UserDivTag = document.getElementById("show-users");
    UserDivTag.innerHTML = "";
    for (i = 0; i < dataFromServer.length; i++) {
      const user = document.createElement("div");

      user.innerHTML = `
      <div class="user">
        <span class="user-name"><b>User name:</b>${dataFromServer[i].name}</span><br>
        <span class="user-email"><b>Email:</b>${dataFromServer[i].email}</span><br>
        <span class="password"><b>Pass:${dataFromServer[i].password}</span>
        <button type="button" class="btn btn-primary update" onclick="updateHandler()">Update</button>
        <button type="button" class="btn btn-danger delete">Delete</button>
      </div>
      
  `;
      UserDivTag.append(user);
    }
  };
  users();
};
fetchData();
const registerHandler = async (e) => {
  const nameTag = document.querySelector(".userName");
  const emailTag = document.querySelector(".email");
  const passwordTag = document.querySelector(".password");

  let name = nameTag.value;
  let email = emailTag.value;
  let password = passwordTag.value;

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({ name: name, email: email, password: password }),
  });
  console.log(await response.json());
  await fetchData();
  await clearInput();
};

const clearInput = () => {
  const nameTag = document.querySelector(".userName");
  const emailTag = document.querySelector(".email");
  const passwordTag = document.querySelector(".password");
  nameTag.value = "";
  emailTag.value = "";
  passwordTag.value = "";
};
const updateHandler = async (e) => {
  console.log("update user name");
  const nameTag = document.querySelector(".userName");
  const emailTag = document.querySelector(".email");
  const passwordTag = document.querySelector(".password");

  let name = nameTag.value;
  let email = emailTag.value;
  let password = passwordTag.value;

  const response = await fetch("http://localhost:3000/users", {
    method: "PUT",
    body: JSON.stringify({ name: name, email: email, password: password }),
  });
  console.log(await response.json(), "thidkdslfdsk;fj");
};
