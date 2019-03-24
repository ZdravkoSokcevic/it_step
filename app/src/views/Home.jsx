import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user: {}
    }
    this.username = this.username.bind(this);
    this.password = this.password.bind(this);
    this.submit = this.submit.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  username(e) {
    this.setState({
      username: e.target.value
    })
  }

  password(e) {
    this.setState({
      password: e.target.value
    })
  }

  setUser(e) {
    this.setState({
      user: e
    })
  }

  submit() {
    var payload = {
      username: this.state.username,
      password: this.state.password
    }

    this.setUser(
      fetch('http://localhost:8000/controller/login.php', {
        method: 'post',
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json()
        })
        .then(function (json) {
          return json
        })
    )

  }

  render() {
    return (
      <div>
        <input value={this.state.username} onChange={e => this.username(e)} />
        <input value={this.state.password} onChange={e => this.password(e)} />
        <button onClick={this.submit}>submit</button>
        {JSON.stringify(this.state.user)}
      </div>
    )
  }
}
