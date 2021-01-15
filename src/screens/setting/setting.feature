Feature: Setting Screen

  Scenario: See Setting Screen
    Given any
    And App Version is '1.0.0'
    When I am at Setting Screen
    Then I should see 'Settings'
    And I should see 'Version'
    And I should see '1.0.0'
