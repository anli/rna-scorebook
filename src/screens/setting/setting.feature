Feature: Setting Screen

  Scenario: See Setting Screen
    Given any
    And App Version is '1.0.0'
    When I am at Setting Screen
    Then I should see 'Settings'
    And I should see 'Version'
    And I should see '1.0.0'

  Scenario: Set default name
    Given that I have no default name set
    When I am at Setting Screen
    Then I should see 'Default Name'
    And I should see 'Setup one now'
    When I press 'Default name'
    Then I should see 'Default Name Dialog' 'Name Input'
    When I enter 'John'
    And I press 'Confirm Button'
    Then I should see 'John'
    When I press 'Default name'
    And I press 'Clear Button'
    Then I should see 'Setup one now'