import { useState } from 'react';
import ContactBook from './components/Contact';
import AddPersonForm from './components/AddPersonForm';
import Search from './components/Search';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleSearchChange = e => setSearchVal(e.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) { window.alert(`${newName} already exists in phonebook`); } else {
      setPersons(persons.concat(
        {
          name: newName,
          number: newNumber,
          id: persons.length + 1
        }
      ));
    }
    setNewName('');
    setNewNumber('');
  };

  const namesToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchVal={searchVal} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <AddPersonForm
        addPerson={addPerson} newName={newName}
        newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ContactBook persons={namesToShow} />
    </div>
  );
};

export default App;
