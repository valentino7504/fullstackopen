const Contact = ({ person }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  );
};

const ContactBook = ({ persons }) => (
  persons.map(person =>
    <Contact key={person.id} person={person} />
  )
);

export default ContactBook;
