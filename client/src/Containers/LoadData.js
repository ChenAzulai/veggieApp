import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {updateToken, updateVeg} from "../StoreAcions/action";

class LoadData extends Component {
    componentDidMount = async () => {
        console.log('LoadData');

        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch('/api/getVeggies', options)
        // const data =
            .then(res => res.json())
            .then(res => {
                    console.log("got my call", res);
                    this.props.store.dispatch(updateVeg(res.veggies));
                    this.props.store.dispatch(updateToken(this.props.match.params.token));
                },
                (error) => {
                    console.log(error);
                }
            )


    };

    render() {
        return (
            <div></div>
        )
    }

}

export default withRouter(LoadData)