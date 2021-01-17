Feature: Summary Screen

  Scenario: See Summary Screen
    Given any
    When I am at Summary Screen
    Then I should see 'Top Sushi Go-ers!'

  Scenario: 3 Players
    Given that I have 3 players 'ME', 'John' 'Mary'
    When I am at Summary Screen
    Then I should see 'Top Three Player' 'ME' 'John' 'Mary'