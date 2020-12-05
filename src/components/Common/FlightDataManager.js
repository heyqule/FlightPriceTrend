var FlightData = {};
FlightData.Airports = require('../data/airports.json');
FlightData.Countries = require('../data/kayak.json');
FlightData.AirportObj = {};

FlightData.Airports.forEach(function( element ) {
    var item = {};
    item.label = element.label;
    item.c2 = element.c2;

    FlightData.AirportObj[element.value] = item;
});

export default class FlightDataManager {
    static getData()
    {
        return FlightData;
    }

    static getKayakUrl(flightPath) {
        var tokens = flightPath.split('/');
        var countryCode = '';
        if(typeof(FlightData.AirportObj[tokens[0]].c2) != "undefined")
        {
            countryCode = FlightData.AirportObj[tokens[0]].c2;
        }

        if(typeof(FlightData.Countries[countryCode]) != "undefined")
        {
            return FlightData.Countries[countryCode].kayakurl;
        }

        return 'https://www.ca.kayak.com/flight-routes/';
    }
}




            

    
