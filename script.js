const url = "http://localhost:3000/users";

const fetchData = async () => {
  const response = await fetch(url);

  const dataFromServer = await response.json();

  const users = () => {
    const UserDivTag = document.getElementById("show-users");
    UserDivTag.innerHTML = "";
    for (i = 0; i < dataFromServer.length; i++) {
      const user = document.createElement("div");

      user.innerHTML = `
      <div class="user">
        <span class="user-name"><b>User name:</b>${dataFromServer[i].name}</span><br>
        <span class="user-email"><b>Email:</b>${dataFromServer[i].email}</span><br>
        <span class="password"><b>Pass:${dataFromServer[i].password}</span><br>
        <span >CreateAt:${dataFromServer[i].createAt}</span><br>
        <span >CreateAt:${dataFromServer[i].updateAt}</span><br>
        <button type="button" class="btn btn-primary update" onclick="updateInput(
          '${dataFromServer[i].name}','${dataFromServer[i].email}','${dataFromServer[i].password}')">Update</button>
        <button type="button" class="btn btn-danger deleteBtnForDelete" onclick="deleteHandler
        ('${dataFromServer[i].name}','${dataFromServer[i].email}','${dataFromServer[i].password}')"id="delete">Delete</button>
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

  const responseE = await fetch(url);
  const dataFromServer = await responseE.json();
  const isHasEmail = dataFromServer.some((user) => {
    console.log(user.email === email, user.email, email);
    return user.email === email;
  });
  console.log(isHasEmail);
  const check = async () => {
    if (isHasEmail) {
      alert("user already exist..");
      return;
    } else {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
    }
  };
  await check();

  //console.log(await response.json());
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
const updateInput = async (name, email, password) => {
  console.log("update user name");
  const nameTag = document.querySelector(".userName"); //user1sfsdj
  const emailTag = document.querySelector(".email"); //same as user 1
  const passwordTag = document.querySelector(".password"); //optinal
  nameTag.value = name;
  emailTag.value = email;
  passwordTag.value = password;

  // console.log(await response.json());
};
const updateHandler = async () => {
  const nameTag = document.querySelector(".userName");
  const emailTag = document.querySelector(".email");
  const passwordTag = document.querySelector(".password");
  emailTag.ariaDisabled;
  let nameC = nameTag.value;
  let emailC = emailTag.value;
  let passwordC = passwordTag.value;
  let date = new Date();

  const response = await fetch("http://localhost:3000/users", {
    method: "PUT",
    body: JSON.stringify({
      name: nameC,
      email: emailC,
      password: passwordC,
      updateAt: date,
    }),
  });
  const checker = () => {
    if (!response.ok) {
      alert("error");
      clearInput();
    }
  };

  await checker();
  await fetchData();
  await clearInput();
};
const deleteHandler = async (name, email, password) => {
  const emailTag = document.querySelector(".email");
  emailTag.value = email;
  console.log(emailTag.value, email);
  const response = fetch(url, {
    method: "DELETE",
    body: JSON.stringify({ email }),
  });
  await fetchData();
  await clearInput();

  //   await fetchData();
  //   const deleteBtn = Array.from(
  //     document.querySelectorAll(".deleteBtnForDelete")
  //   );
  //   console.log(deleteBtn[0]);
  //   for (j = 0; j < deleteBtn.length; j++) {
  //     deleteBtn[j].addEventListener("click", async function (event) {
  //       const deleteDiv = event.target.parentElement.parentElement;
  //       const span = deleteDiv.getElementsByClassName("user-email");
  //       console.log(span.innerHTML);
  //       // the button that was clicked
  //       // const response = await fetch(url,{
  //       //   method:"DELETE",
  //       //   body:JSON.stringify(name:name )
  //       // });
  //     });
  //   }
};
