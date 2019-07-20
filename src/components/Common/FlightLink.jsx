import React from "react";
import FlightDataManager from './FlightDataManager.js';

export default class FlightLink extends React.Component {

    render() {
        return <li>{
            this.renderFlightPath(
                this.props.flightPath,
                this.props.addFavCallback,
                this.props.removeCallback)
        }</li>;
    }

    renderFlightPath(flightPath, addFavCallback = null, removeCallback = null)
    {
        var tokens = flightPath.split('/');
        var flightData = FlightDataManager.getData();

        var renderItems = [];

        renderItems.push(
            <a href={FlightDataManager.getKayakUrl(flightPath)+flightPath} target="_blank">{flightData.AirportObj[tokens[0]].label}
            <span className="fa fa-plane fa-2x"></span>{flightData.AirportObj[tokens[1]].label}</a>
        );

        if(addFavCallback)
        {
            renderItems.push(<a className="addFav favAction fa fa-star" onClick={() => { addFavCallback(flightPath)}}>Fav</a>);
        }


        if(removeCallback) {
            renderItems.push(<a className="removeFav favAction fa fa-trash" onClick={() => { removeCallback(flightPath)}}>Remove</a>);
        }


        return <React.Fragment>
            {renderItems}
            </React.Fragment>;

    }
}