import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {
    state= {
        events: [],
        locations: [],
        numberOfEvents: 32,
        currentLocation: "all",
    };

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({
                    events: events.slice(0, this.state.numberOfEvents),
                    locations: extractLocations(events)
                });
            }
        });
    };

    componentWillUnmount(){
        this.mounted = false;
    };

    updateEvents = (location, eventCount = this.state.numberOfEvents) => {
        getEvents().then((events) => {
            const locationEvents = (location === 'all') 
                ? events
                : events.filter((event) => event.location === location);
            if (this.mounted) {
                this.setState({
                events: locationEvents.slice(0, eventCount),
                currentLocation: location,
                });
            }
        });
    };

    updateNumberOfEvents = (value) => {
        this.setState(
            {numberOfEvents: value},
            this.updateEvents(this.state.currentLocation, value)
        );
    };

    render() {
        return (
            <div className="App">
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <NumberOfEvents updateNumberOfEvents={(number) => {this.updateNumberOfEvents(number); }} />
                <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents} />
                
            </div>
        );
    };
};
export default App;
