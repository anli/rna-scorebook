Feature: Setting Screen

  Scenario: See Setting Screen
    Given any
    And App Version is '1.0.0'
    When I am at Setting Screen
    Then I should see 'Settings'
    And I should see 'Version'
    And I should see '1.0.0'
    And I should see 'Send a feedback or review'
    And I should see 'Thank you for your support!'

  Scenario: Send feedback
    Given that I am at Setting Screen
    When I press 'Send a feedback or review'
    Then I should see 'In App Review'
