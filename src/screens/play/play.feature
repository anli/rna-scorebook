Feature: Play Screen

  Scenario: No game
    Given that there is no game
    When I am at Play Screen
    Then I should see 'Start Button'

  Scenario: Start game
    Given that there is no game
    And I am at Play Screen
    When I press 'Start Button'
    Then I should see 'Player Add Screen'
