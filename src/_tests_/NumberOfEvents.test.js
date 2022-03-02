import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
    });

    test('change state when text input changes', () => {
        const numberOfEventObject = {target: {value: '3'}};
        NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', numberOfEventObject);
        expect(NumberOfEventsWrapper.state('.numberOfEvents')).toBe(numberOfEventObject.target.value);
    });

});