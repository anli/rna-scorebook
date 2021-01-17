Feature: Player Update Screen

  Scenario: See UI
    Given that selected player is 'John'
    When I am at Player Update Screen
    Then I should see 'Change John to?'
    And I should see 'Name Input'
    And I should see 'Cancel Button'
    And I should see 'Confirm Button'

  Scenario: Cancel
    Given that I am at Player Update Screen
    When I press 'Cancel Button'
    Then I should go back to previous screen

  Scenario: Enter name of player
    Given that I am at Player Update Screen
    When I enter 'Mary' to 'Name Input'
    Then I should see 'Mary' in 'Name Input'
    And I press 'Confirm Button'
    And I should see 'Game Screen'
    And I should see 'Mary'

  Scenario: Did not enter name of player Button
    Given that I am at Player Update Screen
    When I enter '' to 'Name Input'
    And I press 'Confirm Button'
    Then I should see 'Error Message' 'Please enter your name first'

