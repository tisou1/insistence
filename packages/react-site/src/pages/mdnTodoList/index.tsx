import React from 'react'
import './index.css'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'

export default function App(props: any) {

  const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        <FilterButton />
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >

        {
          DATA.map(item => (
            <Todo key={item.id} name={item.name} completed={item.completed} id={item.id}/>
          ))
        }
      </ul>
    </div>
  );
}
