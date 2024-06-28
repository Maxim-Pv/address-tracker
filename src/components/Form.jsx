import React from 'react'

const Form = ({ input, setInput, handleSearch, error, setError }) => {
  return (
    <form className='form' onSubmit={handleSearch}>
        <input
            type='text'
            placeholder='Search for any IP address'
            className={`input ${error ? 'input-error' : ''}`}
            value={error ? error : input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => { setError(''); setInput(''); }}
        />
        <button className='btn' type='submit'></button>
    </form>
  )
}

export default Form