import React, { useState } from 'react'

function Form( props: any) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    // alert('hello, word')
    if(name === '') return alert('please enter a task')
    props.addTask(name)
    setName('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

   return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        value={name}
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
