Feature: App

  Scenario: Can see Home Screen on App load
    Given any
    When App load
    Then I should see "Home"