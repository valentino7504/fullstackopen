const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
morgan.token('reqbody', (req) => JSON.stringify(req.body));

const requestLogger = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT')
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :reqbody'
    )(req, res, next);
  else if (req.method === 'GET' || req.method === 'DELETE')
    morgan(
      ':method :url :status :res[content-length] - :response-time ms'
    )(req, res, next);
  else
    next();
};

app.use(requestLogger);

app.get('/info', (req, res, next) => {
  const now = new Date();
  Person.find({})
    .then(people => {
      const noPeople = people.length;
      const peopleNames = people.map((p, index) => `${index + 1}. ${p.name}<br />`).join('');
      res.send(`Phonebook has info for ${noPeople} people:<br />` + peopleNames + `<br/>${now}`);
    })
    .catch(error => next(error));
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(
      people => res.json(people)
    )
    .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(res.status(204).end())
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number
  };
  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson)
        res.json(updatedPerson);
      else
        res.status(404).send({ error: 'Person no longer exists in database' });
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number
  });
  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' });
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError')
    return res.status(400).send({ error: 'malformatted id' });
  else if (error.name === 'ValidationError')
    return res.status(400).send({ error: error.message });
  else
    next(error);
};


app.use(unknownEndpoint);

app.use(errorHandler);

app.listen(PORT, () => console.log('Server is running on port', PORT));
