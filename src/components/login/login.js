import React from 'react';
import axios from 'axios';
import { userAction } from '../../actions/user.action';
import { userService } from '../../services/user.service';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        userService.login(this.state.email, this.state.password).then(res => {
        });
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }
    render() {
        const { email, password } = this.state;
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="email">Email:{this.state.email}</label>
                        <input type="text" className="form-control" name="email" value={email} id="email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} id="password" />
                    </div>
                    <Button block bsSize="large" type="submit">
                        Login
                  </Button>
                </form>
            </div>
        )
    }
}

export default Login;