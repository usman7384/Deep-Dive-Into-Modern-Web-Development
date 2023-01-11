import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const newAnecdote = {
        content : event.target.anecdote.value,
        votes :  0}
        event.target.anecdote.value = ''
        props.createAnecdote(newAnecdote)
        props.setNotification("You Added "+newAnecdote.content, 5)
    }

    return (
        <div>
            <h2>Add New Anecdote</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm