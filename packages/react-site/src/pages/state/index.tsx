import React from 'react'
export default function Index() {
  return (
    <div>
      <Tick />
    </div>
  )
}

interface State {
  date: Date
}
interface Props {
  [args: string]: unknown
}
class Tick extends React.Component<Props, State>{
  constructor(props: Props){
    super(props)
    this.state = {date: new Date()}
  }
  timerID: any

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }
  componentDidUnMount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }
  render(){
    return (
      <div>
        <h1>hello, world</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}
