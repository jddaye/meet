Feature: Show/Hide an event's details

Scenario: When the user has not clicked on an event, each event element should be collapsed
Given the user hasn’t clicked on event details
When the user searches for an event
Then the event details should be collapsed

Scenario: When the user clicks on a collapsed event element, the element should expand
Given a user has click to show the event details
When the event details are collapsed
Then the event details should expand

Scenario: When the user clicks on an expanded event element, the element should collapse
Given a user has clicked to hide the event details
When the event details are expanded
Then the event details should collapse
