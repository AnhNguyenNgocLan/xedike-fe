import * as Types from "./actionTypes";

var initialState = {
    isLoading: true,
    data: {
        registerDate: null,
        _id: "",
        email: "",
        password: "",
        fullName: "",
        userType: "",
        phoneNumber: "",
        dayOfBirth: null,
        avatar: "",
        rating: 0
    },
    vehicles: [
        {
            vehicleBrand: "",
            numOfSeats: "",
            vehicleName: "",
            vehicleLisence: "",
            driverID: ""
        }
    ]
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_USER_DETAILS:
            return {
                isLoading: false,
                ...action.payload
            };

        case Types.UPDATE_USER_DETAILS:
            let updateUser = { ...state };

            Object.keys(action.payload).forEach(field => {
                updateUser.data[field] = action.payload[field];
            });

            return updateUser;

        case Types.UPLOAD_USER_AVATAR:
            let uploadAvatar = { ...state };
            uploadAvatar.data.avatar = action.payload.avatar;

            return uploadAvatar;

        case Types.RATING:
            let dataRating = { ...state };
            dataRating.data.rating = action.payload.rating;

            return dataRating;

        default:
            return state;
    }
};

export default user;
