import React, { useState, useRef, useContext } from 'react'
import { nanoid } from 'nanoid'

interface Item {
  name: string
  id: string
}

let count = 1

function InputValue(props: { onChange: (value: string) => void }) {
  const ref = useRef<string>('')
  const [value, setValue] = useState('')

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e);
    const value = ref.current
    props.onChange(value)

    setValue('')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current = e.target.value
    setValue(e.target.value)
  }
  return (
    <div className='flex gap-4 my-3 justify-between'>
      <input type='text' value={value} onChange={onChange} className="px-3 grow border-solid border-gray-400/50 rounded-12px h-42px outline-none focus:border-orange-500/30 text-18px text-gray-300"/>
      <button onClick={onClick} className="btn px-8 rounded-20px">增加</button>
    </div>
  )
}

// function Item(props: { item: Item, onDelete: (idx: number) => void,idx: number}) {
//   // const onDelete = useContext()
//   const onDelete = () => {
//     console.log('delete')
//     props.onDelete(props.idx)
//   }

//   return (
//     <div className='flex pa-3 hover:bg-gray-200/30 justify-between'>
//       <span>{props.item?.name}</span>
//       <button onClick={() => onDelete()} className="i-carbon-close text-red-700/30 hover:text-red-700/90 cursor-pointer w-24px h-24px" />
//     </div>
//   )
// }

function List(props: { list: Item[], onDelete: (idx: number) => void}) {

  return (
    <div className='flex flex-col overflow-hidden bg-gray-300/10 rounded-xl'>
      {
        props.list.map((item: Item, idx: number) => (
          <div key={item.id} className='flex pa-3 hover:bg-gray-200/30 justify-between'>
            <span>{item?.name}</span>
            <button onClick={() => props.onDelete(idx)} className="i-carbon-close text-red-700/30 hover:text-red-700/90 cursor-pointer w-24px h-24px" />
          </div>
          // <Item item={item} key={item.id} idx={idx} onDelete={props.onDelete}/>
        ))
      }
      {
        props.list.length === 0 &&
        <div className='h-200px flex items-center justify-center text-20px text-orange-400/60'>空无数据</div>
      }
    </div>
  )
}

export default function Todolist() {
  const [list, setList] = useState<Item[]>([])

  const onDelete = (idx: number) => {
    console.log(idx);
    setList([...list.slice(0,idx), ...list.slice(idx + 1)])
  }

  const DelContext = React.createContext({
    onDelete
  })

  const onChange = (value: string) => {
    setList([...list, { name: `${value}`, id: `${count++}` }])
  }

  return (
    <div className='flex justify-center flex-col max-w-500px mx-auto'>
      <InputValue onChange={onChange}/>
      {/* <DelContext.Provider value={{
        onDeleta
      }}> */}
       <List list={list} onDelete={onDelete}/>
      {/* </DelContext.Provider> */}
    </div>
  )
}
