export const updateToken = (token) => {
    return {
        type: 'UPDATE_TOKEN',
        token
    };
};
export const updateVeg = (value) => {
    return {
        type: 'UPDATE_VEG',
        value
    };
};

export const toggleFavourite = (vegName) => {
    return {
        type: 'TOGGLE_VEG_FAV',
        vegName
    };
};


export const deleteNutrition = (index, vegName) => {
    return {
        type: 'DEL_NUTRITION',
        index,
        vegName
    };
};


export const editNutrition = (vegName,newNutritions) => {
    return {
        type: 'EDIT_NUTRITION',
        vegName,
        newNutritions
    };
};