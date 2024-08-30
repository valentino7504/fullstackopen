const mongoose = require('mongoose');

const argv = process.argv;

const personName = argv[2];
const personNumber = argv[3];

const dbUrl = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(dbUrl)
  .then(console.log('successfully connected to mongodb database'))
  .catch(error => console.log('error:', error.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (!personName || !personNumber) {
  Person.find({}).then(persons => {
    persons.forEach(p => console.log(`${p.name} ${p.number}`));
    mongoose.connection.close();
  });
}
else {
  const person = new Person({
    name: personName,
    number: personNumber
  });
  person.save().then(() => {
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
}
