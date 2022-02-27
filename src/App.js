import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
    state= {
        events: [],
        locations: [],
        numberOfEvents: 7,
    }

    render() {
        return (
            <div className="App">
                <CitySearch />
                <EventList />
            </div>
        );
    }
}
export default App;
