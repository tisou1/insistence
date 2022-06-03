import React, { Component } from 'react'

export default class Composition extends Component {
  render() {
    return (
      <div>
        <Dialog left={'hello'} message={'siry'}/>
      </div>
    )
  }
}

function Dialog(props: {left: React.ReactNode, message: React.ReactNode}) {
  return (
    <div className='Dialog-title'>
     <h1> {props.left}</h1>
     <p className='Dialog-message'>
       {props.message}
     </p>
    </div>
  )
}