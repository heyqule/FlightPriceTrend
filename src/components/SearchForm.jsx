import React from 'react';
import Select from 'react-select';
import FlightDataManager from './Common/FlightDataManager.js';

export default class SearchForm extends React.Component {
    constructor(props)
    {
        super(props);
        this._departureAirport = null;
        this._arrivalAirport = null;
        this._recentSearchContainer = null;
    }

    render() {
        var flightData = FlightDataManager.getData();
        return <div className="posts">
            <h4>Custom Search</h4>
            <span className="control">
                <img src="/pub/images/departure.png" alt="Departure Airport" title="Departure Airport"/>
                <Select id="departure" options={flightData.Airports} ref={(child) => { this._departureAirport = child; }}/>
            </span>
            <span className="control">
                <span id="exchange" className="fa fa-exchange" title="Swap Airport" onClick={this.swapAirport.bind(this)}>
                </span>
             </span>
            <span className="control">
                <img src="/pub/images/arrival.png" alt="Arrival Airport" title="Arrival Airport"/>
                <Select id="arrival" options={flightData.Airports} ref={(child) => { this._arrivalAirport = child; }}/>
            </span>
            <span className="control">
                <button id="search" onClick={this.fetchUrl.bind(this)}>Search</button>
            </span>
        </div>;
    }

    swapAirport() {
        var departureValue = this._departureAirport.select.commonProps.getValue();
        var arrivalValue = this._arrivalAirport.select.commonProps.getValue();

        this._departureAirport.select.commonProps.setValue(arrivalValue);
        this._arrivalAirport.select.commonProps.setValue(departureValue);
    }

    fetchUrl() {
        var flightPath = this._departureAirport.select.commonProps.getValue()[0].value+'/'+this._arrivalAirport.select.commonProps.getValue()[0].value;

        if(!this.validatePath(flightPath))
        {
            alert('Not Supported Flight Path: '+flightPath);
            return this;
        }

        var targetUrl = FlightDataManager.getKayakUrl(flightPath)+flightPath;
        var newWindow = window.open(targetUrl, '_blank');

        this._recentSearchContainer.addRecent(flightPath);

        if(newWindow)
        {
            newWindow.focus();
        }
        else
        {
            alert('Unable to open a new window/tab. Probably blocked by popup blocker. Use this URL to view your result: '+targetUrl);
        }
    }

    validatePath(flightPath)
    {
        var flightData = FlightDataManager.getData();
        var tokens = flightPath.split('/');
        if(typeof(flightData.AirportObj[tokens[0]]) == "undefined" ||
            typeof(flightData.AirportObj[tokens[1]]) == "undefined")
        {
            return false;
        }

        return true;
    }
}