import React, { Component } from 'react';
import Booking from "../../components/Booking";
import RecentTrips from "../../components/RecentTrips";
import Introduction from "../../components/Introduction";
import Why from "../../components/Why";
import Summary from "../../components/Summary";
 
class Home extends Component {
    render() { 
        return (
            <>                
                <Booking isHomepage />
                <RecentTrips isHomepage/>
                <Introduction />
                <Why />
                <Summary />
            </>
        );
    }
}
 
export default Home;