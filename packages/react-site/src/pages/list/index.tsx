import React from 'react'
import { nanoid } from 'nanoid'
/**
 * list的key选择
 * 1. 看看列表中的项有没有可以作为唯一id的属性
 * 2. 使用全局的索引
 */
interface Item {
  val: number,
  id: string
}

const numbers: Item[] = Array.from({ length: 10 }, (v: number, i) => i + 1).map(v => ({val:v, id: nanoid()}))
export default function List() {
  const [list, setList] = React.useState<Item[]>(numbers)
  console.log('列表',list);
  const addItem = () => {
    let newItem = {
      val: list.length + 1,
      id: nanoid()
    }
    setList([newItem, ...list])
  }
  return (
    <div>
      <button onClick={addItem}>添加</button>
      {
        // 在 map() 方法中的元素需要设置 key 属性。
        list.map(v => (
          // 通常使用数据中的id来作为元素的key
         <ListItem key={v.id} id={v.val}/>
        ))
      }
    </div>
  )
}


function ListItem(props: {
  id: number,
}) {
  return (
    <div>
      {props.id} 
    </div>
  )
}
