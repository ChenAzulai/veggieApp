import React, {Component} from 'react'
import './App.css'

import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Login from './Screens/Login'
import LoadData from "./Containers/LoadData";
import Veggies from "./Containers/Veggies";
import reducer from './Reducer/reducer'
import vegDetails from "./Containers/vegDetails";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

class App extends Component {


    render() {
        return (
            <div>
                <Provider store={store}>
                    <HashRouter>
                        <Switch>
                            <Route exact path='/'>
                                <Login store={store}/>
                            </Route>
                            <Route path='/:token'>
                                <LoadData store={store}/>
                                <Route exact path="/:token/veggies">
                                    <Veggies store={store} favorite={false}/>
                                </Route>
                                <Route exact path="/:token/veggies/fav">
                                    <Veggies store={store} favorite={true}/>
                                </Route>
                                <Route exact path="/:token/veggies/vegDetails/:vegName" component={vegDetails}/>
                                <Route exact path="/:token/veggies/fav/vegDetails/:vegName" component={vegDetails}/>
                            </Route>
                        </Switch>
                    </HashRouter>
                </Provider>
            </div>
        );
    }


}

export default App;