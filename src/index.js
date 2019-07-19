import React from 'react';
import ReactDOM from 'react-dom';
import FavContainer from './components/FavContainer.jsx'
import RecentSearchContainer from './components/RecentSearchContainer.jsx';
import SearchForm from './components/SearchForm.jsx'

export default class FlightApp extends React.Component {

    constructor(props)
    {
        super(props);
        this._favContainer = null;
        this._recentSearchContainer = null;
        this._searchForm = null;
    }

    componentDidMount() {
        this._recentSearchContainer._favContainer = this._favContainer;
        this._searchForm._recentSearchContainer = this._recentSearchContainer;
    }

    render()
    {
        return <React.Fragment>
            <SearchForm ref={(child) => { this._searchForm = child; }} />
            <RecentSearchContainer ref={(child) => { this._recentSearchContainer = child; }} />
            <FavContainer ref={(child) => { this._favContainer = child; }} />
        </React.Fragment>
    }
}

ReactDOM.render(
    <FlightApp />,
    document.getElementById('flight-container')
);

