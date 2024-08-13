const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
morgan.token('reqbody', (req) => JSON.stringify(req.body));

const postRequestLogger = (req, res, next) => {
  if (req.method === 'POST')
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :reqbody'
    )(req, res, next);
  else
    next();
};

app.use(postRequestLogger);

let persons = [
  {
    'id': '1',
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': '2',
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': '3',
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': '4',
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  },
  {
    'id': '5',
    'name': 'James Bond',
    'number': '007'
  }
];

const validatePerson = (req) => {
  const body = req.body;
  if (!body.name)
    return { error: 'name missing' };
  else if (!body.number)
    return { error: 'number missing' };
  return null;
}

app.get('/info', (req, res) => {
  const noPeople = persons.length;
  const now = new Date();
  res.send(
    `Phonebook has info for ${noPeople} people <br />\
    ${now}`
  );
});

app.get('/api/persons', (req, res) => res.json(persons));

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);
  if (!person) res.status(404).send('Not Found- Person ID does not exist');
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const generateId = () => Math.round(Math.random() * 1000);

app.post('/api/persons', (req, res) => {
  const validationError = validatePerson(req);
  if (validationError)
    return res.status(400).json(validationError);
  if (persons.some(person => person.name === body.name))
    return res.status(400).json({ error: 'name must be unique' });
  const person = {
    name: body.name,
    number: body.number,
    id: String(generateId())
  };
  persons = persons.concat(person);
  res.json(person);
});

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' });

app.use(unknownEndpoint);

app.listen(PORT, () => console.log('Server is running on port', PORT));
