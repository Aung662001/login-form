const fs = require("fs");
const http = require("http");

const users = [
  { name: "user1", email: "user1@gmail.com", password: "dsdddfsf" },
  { name: "user2", email: "user2@gmail.com", password: "dergfg" },
  { name: "user3", email: "user3@gmail.com", password: "dsddsf" },
  { name: "user4", email: "user4@gmail.com", password: "dsdsf" },
];

const server = http.createServer((req, res) => {
  const isRootUrl = req.url === "/";
  if (isRootUrl) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/users") {
    const method = req.method;
    if (method === "GET") {
      console.log(method, "this is get method"); //which method
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      res.end();
    } else if (method === "POST") {
      console.log("this is ", method); //which methods

      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const newUser = JSON.parse(data);
        users.push(newUser);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ users }));
        console.log(users);
        res.end();
      });
    } else if (method === "PUT") {
      console.log("this is ", method); //which methods
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const changeUser = JSON.parse(data);
        console.log(changeUser);
        const newName = JSON.parse(data).name;
        const isHasEmail = users.find(
          (user) => user.email === changeUser.email
        );
        if (isHasEmail) {
          isHasEmail.name = newName;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(users));
          console.log(users);
          res.end();
        } else {
          console.log(" user is not found...");
          res.end();
        }
      });
    } else if (method === "DELETE") {
      console.log("this is ", method);
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const email = JSON.parse(data).email;
        const index = users.findIndex((user) => user.email === email);
        if (index !== -1) {
          users.splice(index, 1);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ users }));
          console.log(users);
          res.end();
        } else {
          res.writeHead(404);
          res.write("user not found");
          res.end();
        }
      });
    }
  }
});

server.listen(3000, () => {
  console.log("Server started: Listening on port 3000");
});
