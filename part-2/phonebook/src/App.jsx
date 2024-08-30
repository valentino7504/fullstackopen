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
  };

  const showNotif = (error, message) => {
    setNotif({
      error: error, message: message
    });
    setTimeout(() => setNotif({ error: null, message: null }), 5000);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const searchPerson = persons.find(person => person.name === newName);
    let update = false;
    if (searchPerson)
      update = window.confirm(
        `${searchPerson.name} is already added to phonebook, replace the old number with a new one`
      )
    if (searchPerson) {
      if (!update) return;
      const updatedPerson = {
        ...searchPerson,
        number: newNumber
      };
      phoneService.updatePerson(searchPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(p => p.id === returnedPerson.id ? returnedPerson : p)
          );
        }
        )
        .catch((error) => {
          let errorMsg;
          if (error.status === 400)
            errorMsg = error.response.data.server;
          else
            errorMsg = `Information of ${searchPerson.name} has
            already been removed from the server`
          showNotif(true, errorMsg, errorMsg);
          setPersons(persons.filter(p => p.id !== searchPerson.id));
          resetAddForm();
        });
    } else {
      phoneService.createPerson(
        {
          name: newName,
          number: newNumber
        }
      ).then(newPerson => {
        setPersons(persons.concat(newPerson));
        resetAddForm();
        showNotif(false, `Added ${newPerson.name}`);
      }).catch(error => {
        showNotif(true, error.response.data.error);
        resetAddForm();
      });
    }
  };

  const deletePerson = (id) => {
    const toDelete = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${toDelete.name}?`)) {
      phoneService.deletePerson(id)
        .then(setPersons(persons.filter(p => id !== p.id)));
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
