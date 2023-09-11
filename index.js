const { randomUUID } = require("crypto");
const express = require("express");

const app = express();

const PORT = 3333;

const users = [];

app.use(express.json());

//POST
app.post("/users", (request, response) => {
  const { name, password, email } = request.body;

  const emailExists = users.find((user) => user.email === email);

  if (emailExists) {
    return response.status(400).json({ message: "Email em uso" });
  }

  users.push({ id: randomUUID(), name, password, email });

  response.json(users);

  return response.status(201).json();
});

//GET
app.get("/users", (request, response) => {
  response.json(users);
  return response.status(200).json();
});

//PUT
app.put("/users/:id", (request, response) => {
  const userID = request.params.id;
  const { name, password, email } = request.body;
  const userIndex = users.findIndex((user) => user.id === userID);
  const userExists = users.find((user) => user.id === userID);

  if (!userExists) {
    return response.status(404).json({ message: "Usuário não encontrado!" });
  }

  users[userIndex] = {
    id: userID,
    name,
    password,
    email,
  };
  response.json(users);
});

//DELETE
app.delete("/users/:id", (request, response) => {
  const userID = request.params.id;
  const userIndex = users.findIndex((user) => user.id === userID);
  const userExists = users.find((user) => user.id === userID);

  if (!userExists) {
    return response.status(404).json({ message: "Usuário não encontrado!" });
  }

  users.splice(userIndex, 1);
  response.json(users);
});

// ligando o server
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
