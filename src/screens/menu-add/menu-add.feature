Feature: Menu Add Screen

  Scenario: See UI
    Given I have not added any menu item previously
    When I am at 'Menu Add Screen'
    Then I should see 'What is on the menu?'
    And I should see 'Choose 1 Roll'
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
