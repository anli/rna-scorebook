Feature: Player Add Screen

  Scenario: See UI
    Given I have not added any player previously
    When I am at Player Add Screen
    Then I should see 'Who is playing?'
    And I should see 'Name Input'
    And I should see 'Cancel Button'
    And I should see 'Confirm Button'

  Scenario: Cancel
    Given that I am at Player Add Screen
    When I press 'Cancel Button'
    Then I should go back to previous screen

  Scenario: Enter name of player
    Given that I am at Player Add Screen
    When I enter 'John' to 'Name Input'
    Then I should see 'John' in 'Name Input'
    And I press 'Confirm Button'
    And I should see 'Game Screen'
    And I should see 'John'

  Scenario: Did not enter name of player Button
    Given that I am at Player Add Screen
    When I press 'Confirm Button'
    Then I should see 'Error Message' 'Please enter your name first'

