import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature.txt');

defineFeature(feature, test => {

    test('The app should display 32 events by default', ({ given, when, then }) => {
        let AppWrapper;
        given('a user hasn’t specified a number of events', () => {
            AppWrapper = mount(<App />);
        });

        when('they search for events', () => {
            AppWrapper.update();
        });

        then(/^(\d+) events should populate$/, (arg0) => {
            expect(AppWrapper.find('.event')).toHaveLength(15);
        });
    });

    test('When the user types a number into the textbox, the number of events displayed should match the input number', ({ given, when, then }) => {
        let AppWrapper;
        given('a user specifies a number of events', () => {       
            AppWrapper = mount(<App />);
        });

        when('they search for events', () => {
            AppWrapper.update();
            AppWrapper.find('#number-of-events_input').simulate('change', { target: { value: '1' } });
        });

        then('the specified number of events will populate', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(1);

        });
    });

});