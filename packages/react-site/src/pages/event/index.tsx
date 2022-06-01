import React, { ReactEventHandler } from 'react'

export default function Event() {
  const handleClick = () => {
    alert('点击事件');
  }
  return (
    <div className='grid grid-cols-2 text-center'>
      <button onClick={handleClick} className="btn">点击</button>
      <a href="https://www.baidu.com" onClick={(e) => { e.preventDefault() }}>百度</a>
      <Toggle />
    </div>
  )
}


class Toggle extends React.Component<any, { isToggleOn: boolean }>{
  constructor(props: any) {
    super(props);
    this.state = { isToggleOn: true };

    //绑定this
    this.handleClick = this.handleClick.bind(this)
  }
  //1.使用bind进行绑定
  handleClick() {
    this.setState(preState => ({
      isToggleOn: !preState.isToggleOn
    }))
  }

  //2.class fields语法
//  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  handleClick2 = () => {
    alert('点击2')
  }

  //3.使用箭头函数
  handleClick3(name: string, e: React.MouseEvent<HTMLButtonElement>) {
    console.log(`点击三${name}${e}`)
  }


  handleClick4(name: string) {
    console.log(name);
  }

  render(): React.ReactNode {
    return (
      <div className='grid grid-cols-5'>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <button onClick={this.handleClick2}>
          点击二
        </button>
        {/* 传递参数 */}
        <button onClick={(e) => this.handleClick3('siry', e)}>
          点击三
        </button>
        <button onClick={this.handleClick4.bind(this, 'siry')}>
          点击四
        </button>
      </div>
    )
  }
}
