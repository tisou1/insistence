import React from 'react'

export default function Form() {
  return (
    <div>
      <NameForm />
      <EssayForm />
      <FlavorForm />
      <Reservation />
      <NameFormUnContrplledCommponents />
    </div>
  )
}

//input
class NameForm extends React.Component<any, { value: string }>{
  constructor(porps: any) {
    super(porps)

    this.state = { value: '' }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event: React.FormEvent) => {
    alert('提交的名字' + this.state.value)
    event.preventDefault()
  }

  render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>

        <input type='submit' value='提交' />
      </form>
    )
  }
}

//
class EssayForm extends React.Component<any, { value: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'
    };
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert('提交的文章: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          文章:
          <textarea value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}


function FlavorForm() {
  const [value, setValue] = React.useState('coconut')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert('你选择了' + value)
    event.preventDefault()
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        选择你喜欢的风味:
        <select value={value} onChange={handleChange}>
          <option value="grapefruit">葡萄柚</option>
          <option value="lime">酸橙</option>
          <option value="coconut">椰子</option>
          <option value="mango">芒果</option>
        </select>
      </label>

      <input type="submit" value="提交" />
    </form>
  )
}


//处理多个输入

function Reservation() {
  const [isGoing, setIsGoing] = React.useState(true)
  const [numberOfGuests, setNumberOfGuests] = React.useState(2)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (name === 'isGoing') {
      setIsGoing(value as boolean)
    } else if (name === 'numberOfGuests') {
      setNumberOfGuests(value as any as number)
    }
  }

  return (
    <form>
      <label>
        参与:
        <input
          name="isGoing"
          type="checkbox"
          checked={isGoing}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        来宾人数:
        <input
          name="numberOfGuests"
          type="number"
          value={numberOfGuests}
          onChange={handleInputChange} />
      </label>
    </form>
  )
}


//简单的非受控组件

class NameFormUnContrplledCommponents extends React.Component {
  input = React.createRef<HTMLInputElement>()

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert('提交的名字' + this.input.current!.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}