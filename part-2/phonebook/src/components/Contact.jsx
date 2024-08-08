const Contact = ({ person, handleDelete }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>delete</button>
      </p>
    </div>
  );
};

const ContactBook = ({ persons, handleDelete }) => (
  persons.map(person =>
    <Contact key={person.id} person={person} handleDelete={handleDelete} />
  )
);

export default ContactBook;
