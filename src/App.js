import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';

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
        );            
        this.updateEvents(this.state.currentLocation, value)
    };

    getData = () => {
        const {locations, events} = this.state;
        const data = locations.map((location)=>{
            const number = events.filter((event) => event.location === location).length
            const city = location.split(', ').shift()
            return {city, number};
        })
        return data;
      };

    render() {
        return (
            <div className="App">
                <h1>Meet App</h1>
                <h4>Chosoe your nearest city</h4> 
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <NumberOfEvents updateNumberOfEvents={(number) => {this.updateNumberOfEvents(number); }} />
                <h4>Events in each city</h4>

                <div className="data-vis-wrapper">
                    <EventGenre className="pie-chart" events={events} />
                    <ResponsiveContainer height={400} >
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20, }}>
                            <CartesianGrid />
                            <XAxis 
                                type="category" 
                                dataKey="city" 
                                name="city"  
                            />
                            <YAxis 
                                allowDecimals={false} 
                                type="number" 
                                dataKey="number" 
                                name="number of events"   
                            />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter data={this.getData()} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents} />
                
            </div>
        );
    };
};
export default App;
