import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState([{}]);


  
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return false;
    }
    const newObj = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newObj));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const searchPerson = (event) => {
    const persontoSearch = event.target.value;
    var copyPersons = [...persons];
    copyPersons = copyPersons.filter(
      (item) =>
        item.name.toLowerCase().indexOf(persontoSearch.toLowerCase()) !== -1
    );
    setShowAll(copyPersons);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter array={showAll} searchPerson={searchPerson} />
      <h2>add new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Person array={persons}/>
    </div>
  );
};

const Person = (props) => {
return(
  <div>
    {props.array.map((person, key) => (
      <div key={key}>
        {person.name} {person.number}
      </div>
    ))}
  </div>)
};

const Filter = (props) => {
  return (
    <div>
      <form>
        <div>

          filter shown with <input onChange={props.searchPerson} />
        </div>
      </form>
      <div>
        <div>
          {props.array.map((person, key) => (
            <div key={key}>
              {person.name} {person.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default App;
