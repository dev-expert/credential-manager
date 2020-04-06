import React from 'react';
import axios from 'axios';
import { userAction } from '../../actions/user.action';
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
        debugger;
        e.preventDefault();
        const apiUrl = 'https://5j90ullg.myhook.io/CredentialManager/public/api/auth/login'
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };
        const dataToSend = JSON.stringify({ email: this.state.email, Password: this.state.password });
        axios.post(apiUrl + "Account/CreateToken", dataToSend, axiosConfig)
            .then(user => {
                debugger;
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