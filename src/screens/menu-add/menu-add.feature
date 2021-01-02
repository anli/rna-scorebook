Feature: Menu Add Screen

  Scenario: See UI
    Given I have not added any menu item previously
    When I am at 'Menu Add Screen'
    Then I should see 'What is on the menu?'
    And I should see 'Choose 1 rolls'
    And I should see 'TEMAKI'
    And I should see 'URAMAKI'
    And I should see 'MAKI'
    And I should see 'Next Button'

  Scenario: Back
    Given that I am at 'Menu Add Screen'
    When I press 'Back Button'
    Then I should go back to previous screen

  Scenario: Select Menu Item
    Given that I am at 'Menu Add Screen'
    And that 'TEMAKI' is 'unselected'
    When I press 'TEMAKI'
    Then I should see 'TEMAKI' 'selected'

  Scenario: Next with correct items is selected
    Given that I am at 'Menu Add Screen'
    And that items is correctly selected
    When I press 'Next Button'
    Then I should see 'Play Screen'
    And I should see 'items'

  Scenario: Next with no items selected
    Given that I am at 'Menu Add Screen'
    And that items is incorrectly selected
    When I press 'Next Button'
    Then I should not see 'Play Screen'
    And I should see 'Error Message' 'Please choose exactly 1 rolls'
    And I should see 'Error Message' 'Please choose exactly 2 specials'
    And I should see 'Error Message' 'Please choose exactly 3 appetizers'
    And I should see 'Error Message' 'Please choose exactly 1 desserts'
