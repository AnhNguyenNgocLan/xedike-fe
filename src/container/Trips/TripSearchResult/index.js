import React, { Component } from "react";
import Booking from "../../../components/Booking";
import RecentTrips from "../../../components/RecentTrips";
import Footer from "../../Footer";

class TripSearchResult extends Component {
    render() {
        return (
            <>               
                <Booking />
                <RecentTrips />                
                <Footer />
            </>
        );
    }
}

export default TripSearchResult;
