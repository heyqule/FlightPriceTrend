import React from 'react';
import FlightLink from "./Common/FlightLink.jsx";

export default class FavContainer extends React.Component {

    constructor(props)
    {
        super(props)
        this.removeFav = this.removeFav.bind(this)
    }

    componentWillMount() {
        try {
            this.setState({'favDataList' : JSON.parse(localStorage.fav)});
        } catch($e) {
            this.setState({'favDataList' : ['YYZ/LAX','YYZ/HKG']});
        }
    }

    render() {
        return <div className="posts">
            <h4>Fav Container</h4>
            <ul>
            {this.state.favDataList.map((value, index) => {
                return <FlightLink key={index} flightPath={value} removeCallback={this.removeFav}></FlightLink>
            })}
            </ul>
        </div>;
    }

    removeFav(airportCode)
    {
        var favDataList = JSON.parse(localStorage.fav);
        var targetIndex = favDataList.indexOf(airportCode);
        favDataList.splice(targetIndex, 1);

        localStorage.setItem('fav',JSON.stringify(favDataList));
        this.setState({'favDataList':favDataList});
    }
}
