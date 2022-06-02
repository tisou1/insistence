import React from 'react'


const numbers = [1, 2, 3, 4, 5, 6]

export default function List() {

  return (
    <div>
      {
        // 在 map() 方法中的元素需要设置 key 属性。
        numbers.map(number => (
          // 通常使用数据中的id来作为元素的key
         <ListItem key={number} id={number}/>
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
