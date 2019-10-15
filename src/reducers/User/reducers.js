import * as Types from "./actionTypes";

var initialState = {
    isLoading: true,
    data: {
        "registerDate": null,
        "_id": "",
        "email": "",
        "password": "",
        "fullName": "",
        "userType": "",
        "phoneNumber": "",
        "dayOfBirth": null
    }
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_USER_DETAILS:           
            
            return {
                isLoading: false,
                data: {...action.payload}
            };

        case Types.UPDATE_USER_DETAILS:
            let updateUser = {...state};
           
            Object.keys(action.payload).forEach(field => {
                updateUser.data[field] = action.payload[field];
            });


            return updateUser;

        default:
            return state;
    }
};

export default user;
