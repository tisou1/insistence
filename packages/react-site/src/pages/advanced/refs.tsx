import React, { Component } from 'react'

const ref = React.createRef<HTMLDivElement>()
export default class Refs extends Component {
  render() {
    return (
      <div>
        <WrapTest name="siry" ref={ref}/>
      </div>
    )
  }
}



class Test extends React.Component{
 render() {
  return (
    <div>我是测试组件</div>
  )
 }
}

const WrapTest = logProps(Test)



//高阶组件中转发refs

function logProps(WrappedComponent: React.ComponentType<any>) {
  class LogProps extends React.Component<any> {
    componentDidUpdate(prevProps: any) {
      console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    render() {
      console.log(this.props);
      const { forwardedRef, ...rest } = this.props
      return <WrappedComponent ref={forwardedRef} {...rest} />
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref}/>
  })
}