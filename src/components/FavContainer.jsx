import React from 'react';
import FlightLink from "./Common/FlightLink.jsx";

export default class FavContainer extends React.Component {

    constructor(props)
    {
        super(props)
        this.removeFav = this.removeFav.bind(this)
        let favObj = ['YYZ/LAX','YYZ/HKG'];
        if(typeof localStorage.fav != 'undefined') {
            favObj = JSON.parse(localStorage.fav);
        } else {
            localStorage.setItem('fav',JSON.stringify(favObj));
        }

        this.state = {
            'favDataList': favObj
        }
    }

    render() {
        return <div className="post">
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
