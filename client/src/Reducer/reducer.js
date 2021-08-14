const init_state = {veggies: [], favVeggies: []};

function vegReducer(veggies, action) {
    console.log('vegReducer');
    let newVeg = [];
    let vegIndex = veggies.findIndex((veggies) => {
        return veggies.name === action.vegName
    });
    newVeg = Object.assign([], veggies, {})
    switch (action.type) {
        case "ADD_NUTRITION":
            newVeg[vegIndex].nutrition = [
                ...veggies[vegIndex].nutrition,
                {title: "undefine", value: "undefine"}
            ];
            return newVeg;
        case "DELETE_NUTRITION":
            let newNutrition = newVeg[vegIndex].nutrition.map((value) => {
                return value
            });
            newNutrition.splice(action.index, 1);
            newVeg[vegIndex].nutrition = newNutrition;
            return newVeg;
        case "EDIT_NUTRITION":
            newVeg[vegIndex].nutrition = action.newNutritions;
            return newVeg;
        default:
            return veggies
    }
}

const reducer = (state=init_state, action) => {
    console.log(state);
    console.log(action);
    switch(action.type){
        case "SIGN_IN":
            return true;
        case "ADD_NUTRITION":
        case "DELETE_NUTRITION":
        case "EDIT_NUTRITION":
            return Object.assign({}, state, {
                veggies: vegReducer(state.veggies,action)
            });
        case "UPDATE_TOKEN":
            return Object.assign({}, state, {
                userName: action.token
            });
        case "UPDATE_VEG":
            // console.log("UPDATE VEG");
            // console.log(action.value);
            return Object.assign({}, state, {
                veggies: action.value
            });
        default:
            return state
    }
};

export default reducer;