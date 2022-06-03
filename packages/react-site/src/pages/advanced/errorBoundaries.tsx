import React, { Component } from 'react'

export default function Index() {
  return (
    <ErrorBoundaries>
      <NormalComponent/>
    </ErrorBoundaries>
  )
}
class ErrorBoundaries extends Component<{ children: React.ReactNode}> {

  state = {
    hasError: false
  }

  static getDerivedStateFromError(error: any) {
    //更新state,渲染显示降级的UI
    return {
      hasError: true
    }
  }

  componentDidCatch(error: any, info: any) {
    //捕获异常
    console.log(error, info)
  }

  render() {
    return (
      <div>
        {
          this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children
        }
      </div>
    )
  }
}


function NormalComponent() {
  return (
    <div>正常组件</div>
  )
}