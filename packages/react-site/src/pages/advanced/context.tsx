import React from 'react'

const ThemeContext = React.createContext('light')

export default class ContextI extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value='dark'>
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

function Toolbar(props: any) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}


class ThemedButton extends React.Component<any> {
  //制定contextype读取当前的theme context
  static contextType = ThemeContext
  render() {
    return (
     <div>
        <button>{this.context as string} </button>
        <ThemeContext.Consumer>
        {value => <button>{value}</button>}
      </ThemeContext.Consumer>
     </div>
    )
  }
}


//本来是 A -> B -> C -> D,A组件中传递参数到D组件,一共嵌套了3层

//直接传递组件,将D组件直接在A组件中作为参数传递, 这样B和C中就看不到A给D传递的参数