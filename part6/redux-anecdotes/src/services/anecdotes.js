import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post(baseUrl, content)
    return response.data
}

const vote = async (id) => {
    const getAnecdote = await axios.get(`${baseUrl}/${id}`)
    let postAnecdote = { ...getAnecdote.data, votes: getAnecdote.data.votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, postAnecdote)
    return response.data
}

export default { getAll, createNew, vote }