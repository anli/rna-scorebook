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

  Scenario: Has game
    Given that there is a game
    When I am at Play Screen
    Then I should not see 'Start Button'
    And I should see 'Round 1'
    And I should see 'Next Round Button'
    And I should not see 'Previous Round Button'

  Scenario: Change round
    Given that there is a game
    And I am at Play Screen
    When I press the 'Next Round Button'
    Then I should see 'Round 2'
    When I press the 'Next Round Button'
    Then I should see 'Round 3'
    And I should not see 'Next Round Button'
    When I press the 'Previous Round Button'
    Then I should see 'Round 2'