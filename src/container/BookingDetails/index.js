import React, { Component } from "react";
import BookingInfo from "./BookingInfo";
import { Wrapper } from "./styled";

class BookingDetails extends Component {
    

    render() {        
        return (
            <div className="container">
                <Wrapper>
                    <BookingInfo />
                </Wrapper>
                
            </div>
        );
    }
}

export default BookingDetails;
