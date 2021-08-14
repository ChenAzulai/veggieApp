import {deleteNutrition, editNutrition, toggleFavourite} from "../StoreAcions/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import VegDetailsScreen from '../Screens/VegDetailsScreen'

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    // console.log(ownProps);
    let idx = state.veggies.findIndex(elem => {
        return elem.name === ownProps.match.params.vegName;
    });
    if (idx === -1) {
        return {
            name: '',
            img: '',
            nutrition: [],
            userName:state.userName,
        }
    } else {
        return {
            name: state.veggies[idx].name,
            img: state.veggies[idx].img,
            nutrition: state.veggies[idx].nutrition,
            userName:state.userName,

        }
    }
};

const saveNutritionWithSideEffect = (vegName, nutritions, token) => {
    return function (dispatch) {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nutritions: nutritions, vegName: vegName}),
        };
        fetch("http://localhost:3001/api/veggies/" + vegName + "/updateNutrition", options)
            .then(res => res.json())
            .then(res => {
                    dispatch(editNutrition(vegName, res.nutritions))
                },
                err => {
                    console.log('err detected: ', err);
                })
    }

};

const mapDispatchToProps = (dispatch, ownProps) => {
    const TOKEN = ownProps.match.params.token;
    const NAME = ownProps.match.params.name;

    return {
        onPlus: (vegName, nutritions) => {
            nutritions.push({title: "undefined", value: "undefined"});
            dispatch(saveNutritionWithSideEffect(vegName, nutritions, TOKEN));
        },
        addToFav: (vegName) => {
            dispatch(toggleFavourite(vegName));
        },
        onDelete: (idx) => {
            dispatch(deleteNutrition(idx, NAME));
        },
        onSave: (vegName, newNutritions) => {
            dispatch(saveNutritionWithSideEffect(vegName, newNutritions, TOKEN))
        }

    }
};

const vegDetails = connect(mapStateToProps, mapDispatchToProps)(VegDetailsScreen)

export default withRouter(vegDetails)