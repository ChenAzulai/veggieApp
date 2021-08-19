import React, {Component} from 'react'
import {updateToken} from "../StoreAcions/action";
import {withRouter} from "react-router-dom";

const OK = 'OK';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    LoginSubmit = async () => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.email, password: this.state.password}),
        };

        await fetch(`http://localhost:3001/api/login`, options)
            .then(res => res.json())
            .then((res) => {
                    // console.log('LoginSubmit ', res);
                    // console.log('LoginSubmit ', this.props);
                    if (res.status === OK) {
                        this.props.history.push('/' + res.token + '/veggies');
                        this.props.store.dispatch(updateToken(this.state.email, res.token));
                    } else {
                        window.alert("user not found :(");
                    }

                },
                (err) => {
                    console.log('LoginSubmit err detected: ', err);
                })

    };


    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        })
    };


    render() {
        return (
            <div className='login-page'>
                <div>
                    <div className="img-login">
                        <img src="https://www.cdc.gov/foodsafety/images/comms/features/GettyImages-1247930626-500px.jpg"
                             alt=""/>
                    </div>
                    <h2>Login to Veggies Dictionary</h2>
                    <p>Email address</p>
                    <input defaultValue={this.state.email} type="text" name='email'
                           onChange={(e) => this.handleChange(e)}/>
                    <p>password</p>
                    <input defaultValue={this.state.password} type="password" name='password'
                           onChange={(e) => this.handleChange(e)}/>

                    </div>
                <button className="btn" onClick={this.LoginSubmit.bind(this)}>login</button>
            </div>
        )
    }
}

//
export default withRouter(Login);