import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(setNotification("You Voted for "+anecdote.content, 5))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes 
                        <button onClick={() => vote(anecdote)}>Vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList