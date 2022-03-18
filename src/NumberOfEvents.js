import React, { Component } from 'react';
import {ErrorAlert} from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: '32',
    }

    handleInputChange = (event) => {
      const value = event.target.value;
      this.setState({
          numberOfEvents: event.target.value,
      });
      this.props.updateNumberOfEvents(value)
      if (value.length === 0) {
          this.setState({
              query: value,
              infoText: 'Please search for any number of events greater than one'
          });
      } else {
          return this.setState({
              query: value,
              infoText: ''
          });
      }
    }

    render() {
        return(
            <div className="NumberOfEvents">
                <ErrorAlert text={this.state.infoText} />
                <input 
                    id="number-of-events_input"
                    type="number" 
                    className="numberOfEvents"
                    value={this.state.numberOfEvents} 
                    onChange={this.handleInputChange}
                />
            </div>
        )
 }};
export default NumberOfEvents;