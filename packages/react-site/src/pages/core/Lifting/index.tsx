import React, { Component } from 'react'

export default class Lifting extends Component {
  render() {
    return (
      <div>
        <Calculator />
      </div>
    )
  }
}


function BoilingVerdict(props: { celsius: number }) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>
  }
  return <p>The water would not boil.</p>
}

function toCelsius(fahrenheit: number) {
  return (fahrenheit - 32) * 5 / 9
}

function toFaherheit(celsius: number) {
  return (celsius * 9 / 5) + 32
}

function tryConvert(temparature: string, convert: (x: number) => number) {
  const input = parseFloat(temparature)
  if (Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}
class Calculator extends Component {
  state:{ temperature: string, scale: 'c' | 'f'} = { temperature: '', scale: 'c'}
  handleChange = (temparature: string, type: 'c' | 'f') => {
    this.setState({ temperature: temparature, scale: type })
  }
  render() {
    const temperature = this.state.temperature
    const scale = this.state.scale
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFaherheit) : temperature
    return (
      <div>
        <TemperatureInput scale='c' temperature={celsius} onTemperatureChange={(temparature) => this.handleChange(temparature, 'c')}/>
        <TemperatureInput scale='f' temperature={fahrenheit} onTemperatureChange={(temparature) => this.handleChange(temparature, 'f')}/>
      </div>
    )
  }
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends Component<
{ scale: 'c' | 'f' ,temperature: string, onTemperatureChange: (temperature: string) => void }
> {

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onTemperatureChange(event.target.value)
  }
  render() {
    const temperature = this.props.temperature
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    )
  }
}

