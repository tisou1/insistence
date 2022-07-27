import React, { useState } from 'react'
import './index.css'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'

// import { nanoid } from 'nanoid'

export interface Task {
  id: string
  name: string
  completed: boolean
} 
let count = 1
export default function App(props: any) {
  const [tasks,setTasks] = useState<Task[]>([])

  const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];


  const addTask = (name: any) => {
  const newTask = {
    id: 'id' + (count++),
    name: name,
    completed: false
  }
  setTasks([...tasks, newTask]) 
  }

  const deleteTask = (id: string) => {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }

  const toggleTaskCompleted = (id: any) => {
    console.log(tasks[0]);
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }

      return task
    })

    setTasks(updatedTasks)
  }

  const taskList = tasks.map(task => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ))

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task' 
  const headingTest = `${taskList.length} ${tasksNoun} remaining`
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton />
      </div>
      <h2 id="list-heading">
       { headingTest }
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {
          taskList
        }
        {/* {
          DATA.map(item => (
            <Todo key={item.id} name={item.name} completed={item.completed} id={item.id}/>
          ))
        } */}
        
      </ul>
    </div>
  );
}
