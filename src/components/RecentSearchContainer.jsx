import React from 'react';
import FlightLink from './Common/FlightLink.jsx';


export default class RecentSearchContainer extends React.Component {

    constructor(props)
    {
        super(props)
        this.addFav = this.addFav.bind(this)
        this.addRecent = this.addRecent.bind(this)
        this.recentLimit = 10;
        this.favLimit = 20;
        this._favContainer = null;
    }

    componentWillMount() {
        try {
            this.setState({'recentDataList' : JSON.parse(sessionStorage.recentItems)});
        } catch($e) {
            this.setState({'recentDataList' : []});
        }
    }

    render() {
        return <div className="posts">
            <h4>Recent Search</h4>
            <ul>
            {this.state.recentDataList.map((value, index) => {
                return <FlightLink key={index} flightPath={value} addFavCallback={this.addFav}></FlightLink>
            })}
            </ul>
        </div>;
    }

    addFav(airportCode)
    {
        var favDataList = JSON.parse(localStorage.fav);

        for(var listKey in favDataList)
        {
            if(favDataList[listKey] == airportCode)
            {
                return;
            }
        }

        if(favDataList.length < this.favLimit)
        {
            favDataList.push(airportCode)
        }
        else
        {
            favDataList.shift();
            favDataList.push(airportCode)
        }

        localStorage.setItem('fav',JSON.stringify(favDataList));
        this._favContainer.setState({'favDataList':favDataList});
    }

    addRecent(airportCode)
    {
        try {
            var recentDataList = JSON.parse(sessionStorage.recentDataList);
        }
        catch($e) {
            var recentDataList = [];
        }

        for(var listKey in recentDataList)
        {
            if(recentDataList[listKey] == airportCode)
            {
                return;
            }
        }

        if(recentDataList.length < this.recentLimit)
        {
            recentDataList.push(airportCode)
        }
        else
        {
            recentDataList.shift();
            recentDataList.push(airportCode)
        }

        sessionStorage.setItem('recentDataList',JSON.stringify(recentDataList));
        this.setState({'recentDataList' : recentDataList});
    }
}