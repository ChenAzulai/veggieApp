import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import VeggiesScreen from '../Screens/VeggiesScreen'
const FAVORITES = 'fav';

class Veggies extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromStore();
        this.bindVeg();
    }

    getStateFromStore() {
        let data = this.props.store.getState();
        let vegNames = [];
        // console.log('this.props',this.props);
        if (this.props.favorite === false) {
            vegNames = data.veggies.map((veg) => {
                return veg.name
            })
        } else {
            const favorites = localStorage.getItem(FAVORITES) != null ?
                JSON.parse(localStorage.getItem(FAVORITES)) : [];
            // const iter = favorites.find(obj => obj.token === this.props.match.params.token);
            vegNames = favorites["veggies"];
        }
        return {veggiesNames: vegNames};
    }

    bindVeg() {
        this.subscription = this.props.store.subscribe(() => {
            this.setState(this.getStateFromStore());
        })
    }

    render() {
        return (
            <VeggiesScreen url= {this.props.location.pathname} veggies={this.state.veggiesNames} userName={this.props.match.params.token}/>
        )
    }
}

export default withRouter(Veggies)