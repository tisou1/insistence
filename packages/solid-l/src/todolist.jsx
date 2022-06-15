import { 
  createSignal,
  createEffect, 
  createMemo, 
  For, 
  Show, 
  splitProps
} from 'solid-js'
let count = 1

function InputValue(props) {
  const [value, setValue] = createSignal('')

  const onClick = (e) => {
    props.onChange(value())

    setValue('')
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className='flex gap-4 my-3 justify-between'>
      <input type='text' value={value()} onInput={onChange} className="px-3 grow border-solid border-gray-400/50 rounded-12px h-42px outline-none focus:border-orange-500/30 text-18px text-gray-300"/>
      <button onClick={onClick} className="btn px-8 rounded-20px">增加</button>
    </div>
  )
}


function List(props) {
  const [local, others] = splitProps(props, ['list', 'onDelete'])

  return (
    <div className='flex flex-col overflow-hidden bg-gray-300/10 rounded-xl'>
      <For each={local.list}>
        {
          (item,idx) => (
            <div className='flex pa-3 hover:bg-gray-200/30 justify-between'>
            <span>{item?.name}</span>
            <button onClick={() => local.onDelete(idx())} className="i-carbon-close text-red-700/30 hover:text-red-700/90 cursor-pointer w-24px h-24px" />
          </div>
          )
        }
      </For>
      <Show
        when={props.list.length === 0}
        fallback={null}
      >
        <div className='h-200px flex items-center justify-center text-20px text-orange-400/60'>空无数据</div>
      </Show>

    </div>
  )
}

export default function Todolist() {
  // const [list, setList] = useState([])
  const [list, setList] = createSignal([])

  createEffect(() => {
    console.log('依赖项改变...', list());
  })

  const onDelete = (idx) => {
    setList([...list().slice(0,idx), ...list().slice(idx + 1)])
  }

  const onChange = (value) => {
    setList([...list(), { name: `${value}`, id: `${count++}` }])
  }

  return (
    <div className='flex justify-center flex-col max-w-500px mx-auto'>
      <InputValue onChange={onChange}/>
       <List list={list()} onDelete={onDelete}/>
    </div>
  )
}
