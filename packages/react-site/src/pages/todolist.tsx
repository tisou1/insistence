import React, { useState, useRef } from 'react'
import { nanoid } from 'nanoid'

interface Item {
  name: string
  id: string
}


function InputValue(props: { onChange: (value: string) => void }) {
  const ref = useRef<string>('')

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    const value = ref.current
    props.onChange(value)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current = e.target.value
  }
  return (
    <div>
      <input type='text' onChange={onChange}/>
      <button onClick={onClick}>增加</button>
    </div>
  )
}

function Item(props: { item: Item}) {
  return (
    <div>{props.item?.name}</div>
  )
}

function List(props: { list: Item[]}) {
  return (
    <div>
      {
        props.list.map((item: Item) => (
          <Item item={item} key={item.id}/>
        ))
      }
    </div>
  )
}

export default function Todolist() {
  const [list, setList] = useState<Item[]>([])

  const onChange = (value: string) => {
    // setList([...list, { name: `${value}`, id: nanoid() }])
    // console.log(value);
  }

  return (
    <div>asdas
      <InputValue onChange={onChange}/>
      <List list={list}/>
    </div>
  )
}
