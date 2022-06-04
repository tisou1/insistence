import React, { Component } from 'react'

export default class Hoc extends Component {
  render() {
    return (
      <div>Hoc
        <Test message1='&lt;3' message2={'&lt;3'}/>
      </div>
    )
  }
}

//hoc

function Test(props: any) {
  // message2不会进行转义的
  return (
    <div>{props.message1} |  {props.message2}</div>
  )
}

