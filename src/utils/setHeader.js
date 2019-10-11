import axios from "axios";

const setHeader = params => {
    //params = {token, fingerPrint}
    const token = params.token;
    if (token) {
        axios.defaults.headers.common["token"] = token;
    } else {
        delete axios.defaults.headers.common["token"];
    }
};

export default setHeader;
