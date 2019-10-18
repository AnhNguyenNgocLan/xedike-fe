import React from "react";
import "./App.css";
import HomePage from "./container/Home";
//import NotFound from "./container/NotFound";
import Header from "./components/Header"
import Profile from "./container/Profile";
import TripSearchResult from "./container/Trips/TripSearchResult";
import BookingTripDetail from "./container/BookingDetails";
import MyTrip  from "./container/Profile/MyTrip"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import setHeader from "./utils/setHeader";
import { connect } from "react-redux";
import validateToken from "./utils/validateToken";

// Call protected services : profiles, pages after login
const token = localStorage.getItem("token");
if (validateToken().status) setHeader({ token });

function App(props) {
    const { auth } = props;
    const isAuthenticated = auth;

    return (
        <div className="App">
            <BrowserRouter>  
            <Header/>              
                <Switch>
                    <Route path="/" exact component={HomePage}></Route>
                    <Route path="/profile" exact component={ isAuthenticated ? Profile : HomePage}></Route> 
                    <Route path="/trips/search" exact component={TripSearchResult}></Route> 
                    <Route path="/my-trip" exact component={MyTrip}></Route> 
                    <Route path="/book-trip/:id" exact component={BookingTripDetail}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    };
};

export default connect(
    mapStateToProps,
    null
)(App);
