export const API_URL =
    process.env.REACT_APP_NODE_ENV === "development "
        ? "http://localhost:5000"
        : "https://xedike-api-be.herokuapp.com";