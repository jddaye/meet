Feature: Specify Number Of Events

Scenario: The app should display 32 events by default
Given a user hasn’t specified a number of events
When they search for events
Then 32 events should populate

Scenario: When the user types a number into the textbox, the number of events displayed should match the input number
Given a user specifies a number of events
When they search for events
Then the specified number of events will populate
