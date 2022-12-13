import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([{}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState([{}]);
  
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  
  const deletePerson = (id) => {
    let obj = persons.find((person) => person.id === id);
    if (window.confirm("Delete " + obj.name + " ?")) {
      personService.delPerson(id).then(() => {
        const updatedPersons = [...persons];
        const newPersons = updatedPersons.filter((person) => person.id !== id);
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
      });
    }
  };
  
  const addPerson = (event) => {
    event.preventDefault();
    let obj = persons.find((person) => person.name === newName);
    if (obj) {
      if (
        window.confirm(
          `${newName} is already added to phonebook ! Replace the old number with the new one ?`
          )
          ) {
            // return false;
            const personObj = {
              name: newName,
              number: newNumber,
            };
            personService.update(obj.id, personObj).then((returnedPerson) => {
              const updatedPersons = [...persons];
              const person = updatedPersons.find((a) => a.id === obj.id);
              person.number = returnedPerson.number;
              setPersons(updatedPersons);
              setNewName("");
              setNewNumber("");
            });
          }
          return;
        }
        const personObj = {
          name: newName,
          number: newNumber,
        };
        
        personService.create(personObj).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        });
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
          <PersonForm
          newName={newName}
          newNumber={newNumber}
          addPerson={addPerson}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          />
          <h2>Numbers</h2>
          <Person array={persons} deletePerson={deletePerson} />
          </div>
          );
        };
        
        const Person = (props) => {
          return (
            <div>
            {props.array.map((person, key) => (
              <div key={key}>
              {person.name} {person.number}{" "}
              {
                <button
                onClick={() => {
                  props.deletePerson(person.id);
                }}
                >
                delete
                </button>
              }
              </div>
              ))}
              </div>
              );
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
                    number:{" "}
                    <input value={props.newNumber} onChange={props.handleNumberChange} />
                    </div>
                    <div>
                    <button type="submit">add</button>
                    </div>
                    </form>
                    );
                  };
                  
                  export default App;
                  