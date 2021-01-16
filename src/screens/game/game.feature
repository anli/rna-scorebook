Feature: Game Screen

  Scenario: See No Game UI
    Given that I have no game
    When I am at 'Game screen'
    Then I should see 'You have not started any game yet'

  Scenario: See has game UI
    Given that I have a game
    When I am at 'Game Screen'
    Then I should see 'Sushi Go Party!'
    And I should see 'Add Player Button'
    And I should see 'ME'
    And I should see 'Round 1 Tab'
    And I should see 'Round 2 Tab'
    And I should see 'Round 3 Tab'

  Scenario: Add Player
    Given that I have a game
    And I am at 'Game Screen'
    When I press 'Add Player Button'
    Then I should see 'Player Add Screen'

  Scenario: Select Player
    Given that I have a game
    And that I have players 'ME', 'John'
    And that I have 'John' Selected
    And that I am at 'Game Screen'
    When I press 'ME Button'
    Then I should see 'ME' selected

  Scenario: Select Menu Item Option
    Given that I have a game
    And I press
    When I press 'Pudding Button'
    Then I should see 'Pudding Options'
    When I press 'N/A'
    Then I want to see 'Pudding' with score '0'

  Scenario: Select Menu Item Option with no config
    Given that I have a game
    And I press
    When I press 'Spoon Button'
    Then I should not see 'Spoon Options'