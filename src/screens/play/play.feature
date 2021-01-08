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

  Scenario: Adjust Score
    Given that there is a game
    And I am at Play Screen
    When I press the 'WASABI Add Button'
    And I press the 'WASABI Add Button'
    Then I should see 'Round 1 (2)'
    When I press the 'WASABI Minus Button'
    Then I should see 'Round 1 (1)'
    When I press the 'Next Round Button'
    Then I should see 'Round 2 (0)'
    When I press the 'URAMAKI Add Button' 'x4'
    Then I should see 'Round 2 (8)'
    When I press the 'URAMAKI Minus Button' 'x4'
    Then I should see 'Round 2 (0)'

  Scenario: Reset Button
    Given that there is a game
    And I am at Play Screen
    When I press the 'Reset Button'
    And I see 'Alert'
    And I press 'Cancel'
    And I press the 'Reset Button'
    And I see 'Alert'
    And I press 'OK'
    Then I should see 'Start Button'

  Scenario: Add Player to existing play
    Given that there is an existing play
    And I am at Play Screen
    When I press the 'Add Player Button'
    Then I should see 'Player Add Screen'

  Scenario: Select another existing player
    Given that there is an existing play
    And that there is two players, 'John' 'Mary'
    And that score of round1 'John' is 1
    And that score of round1 'Mary' is 0
    And that player selected is 'John'
    And I am at Play Screen
    When I press the 'Mary Player Button'
    And that player selected is 'Mary'
    And that round score is 0

  Scenario: Delete existing player
    Given that there is an existing play
    And that there is two players, 'John' 'Mary'
    And I am at Play Screen
    When I press the 'Mary Player Button'
    And I press the 'Player Delete Button'
    And I see 'Alert'
    And I press 'Cancel'
    And I press the 'Player Delete Button'
    And I see 'Alert'
    And I press 'OK'
    Then I should see the player selected is 'John'
    And I should not see 'Mary'