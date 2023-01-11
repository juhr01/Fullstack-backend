import React from 'react'

const AddPerson = (props) => {
    return (
      <form onSubmit={props.addPerson}>
        <h2>Add number</h2>
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
    )
}

export default AddPerson