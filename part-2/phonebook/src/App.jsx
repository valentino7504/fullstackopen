import { useState, useEffect } from 'react';
import phoneService from './services/persons';
import ContactBook from './components/Contact';
import AddPersonForm from './components/AddPersonForm';
import Search from './components/Search';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [notif, setNotif] = useState({
    error: null,
    message: null
  });

  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleSearchChange = e => setSearchVal(e.target.value);

  const hook = () => {
    phoneService.getAll().then(persons => {
      setPersons(persons);
    });
  };

  useEffect(hook, []);

  if (!persons) return null;

  const resetAddForm = () => {
    setNewName('');
    setNewNumber('');
  }

  const addPerson = (event) => {
    event.preventDefault();
    const searchPerson = persons.find(person => person.name === newName);
    if (searchPerson && window.confirm(
      `${searchPerson.name} is already added to phonebook, replace the old number with a new one`
    )) {
      const updatedPerson = {
        ...searchPerson,
        number: newNumber
      };
      phoneService.updatePerson(searchPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(p => p.id === returnedPerson.id ? returnedPerson : p)
          )
        }
        )
        .catch(() => {
          setNotif({error: true, message: `Information of ${searchPerson.name} has
            already been removed from the server`});
          setPersons(persons.filter(p => p.id !== searchPerson.id));
          resetAddForm();
          setTimeout(() => setNotif({ ...notif, message: null }), 5000);
        });
    } else {
      phoneService.createPerson(
        {
          name: newName,
          number: newNumber
        }
      ).then(newPerson => {
        setPersons(persons.concat(newPerson))
        resetAddForm();
        setNotif({ ...notif, message: `Added ${newPerson.name}` });
        setTimeout(() => setNotif({ ...notif, message: null }), 5000);
      });
    }
  };

  const deletePerson = (id) => {
    const toDelete = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${toDelete.name}?`)) {
      phoneService.deletePerson(id)
        .then(deletedPerson => setPersons(
          persons.filter(p => p.id !== deletedPerson.id)
        ));
    }
  };

  const namesToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification {...notif} />
      <Search searchVal={searchVal} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <AddPersonForm
        addPerson={addPerson} newName={newName}
        newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ContactBook persons={namesToShow} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
