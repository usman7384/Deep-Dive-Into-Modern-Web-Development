import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = { setFilter }

const connectedFilter = connect(null, mapDispatchToProps)(Filter)

export default connectedFilter