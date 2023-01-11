import React from 'react'

const Person = (props, deletePerson) => {
    return (
        <p>{props.name} {props.number} <button onClick={props.deletePerson}>delete</button></p>
    )
}

export default Person