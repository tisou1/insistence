import React, { useState } from 'react'

export default function Condition() {
  return (
    <div>
      <LoginControl />
    </div>
  )
}

function UserGreeting(props: any) {
  return <h1>Welcome back</h1>
}

function GuestGreeting(props: any) {
  return <h1>Please sign up</h1>
}

function LoginButton(props: {onClick :() => void}) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props: {onClick :() => void}) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

function Greeting(props: any) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
class LoginControl extends React.Component<any, { isLoggedIn: boolean }> {
  constructor(props: any) {
    super(props)
    
    this.state = { isLoggedIn: false }
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false })
  }

  render(): React.ReactNode {
    const isLoggedIn = this.state.isLoggedIn
    let button
    if(isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick}/>
    } else {
      button = <LoginButton onClick={this.handleLoginClick}/>
    }
    return(
      <div>
        <Greeting isLoggedIn={this.state.isLoggedIn} />
      </div>
    )
  }
}