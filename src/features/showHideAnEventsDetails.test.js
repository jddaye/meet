import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';

import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('When the user has not clicked on an event, each event element should be collapsed', ({ given, when, then }) => {
        let AppWrapper;
        given('the user hasn’t clicked on event details', () => {
            AppWrapper = mount(<App />);
            AppWrapper.update();
        });

        when('the user searches for an event', () => {

        });

        then('the event details should be collapsed', () => {
            expect(AppWrapper.find('.event .details-view')).toHaveLength(0);
        });
    });

    test('When the user clicks on a collapsed event element, the element should expand', ({ given, when, then }) => {
        let AppWrapper;
        given('a user has click to show the event details', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the event details are collapsed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .details-view')).toHaveLength(0);
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
        });

        then('the event details should expand', () => {
            expect(AppWrapper.find('.event .details-view')).toHaveLength(1);
        });
    });

    test('When the user clicks on an expanded event element, the element should collapse', ({ given, when, then }) => {
        let AppWrapper;
        given('a user has clicked to hide the event details', async () => {
            AppWrapper = await mount (<App />);
            AppWrapper.update();
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
        });

        when('the event details are expanded', () => {
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
            expect(AppWrapper.find('.event .details-view')).toHaveLength(0);
        });

        then('the event details should collapse', () => {
            expect(AppWrapper.find('.event .details-view')).toHaveLength(0);
        });
    });

});