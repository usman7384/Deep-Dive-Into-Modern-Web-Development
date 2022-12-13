const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('build'))


morgan.token(function (req, res) { 
  return `${JSON.stringify(req.body)}` })
app.use(morgan(':method :url :status :res[content-length] :response-time :req[header]'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token('ob', function (req, res) { 
  console.log("ob", req.body)
  return `${JSON.stringify(req.body)}` })

app.use(morgan(':method :url :status :response-time :req[header] :ob'))

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const timestamp = new Date(Date.now());
  response.send(
    `<p> Phonebook has info for ${
      persons.length
    } people </p> <p> ${timestamp.toUTCString()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id != id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name Is Missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Number Is Missing",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "Name Must Be Unique",
    });
  }

  let person = {
    id: Math.floor(Math.random() * (100 - 0) + 0),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
