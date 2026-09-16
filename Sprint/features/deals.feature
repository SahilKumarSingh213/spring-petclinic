Feature: Deal creation validation and persistence

  @TC-008
  Scenario Outline: Deal creation validation rejects invalid inputs
    Given I am logged into FreeCRM with valid credentials
    And I open the New Deal form
    When I submit the New Deal form with data id "<dataId>"
    Then I should see deal validation feedback
    And the New Deal form should remain open without a successful save

    Examples:
      | dataId       | scenarioDescription          |
      | TD-DEAL-002  | Missing title validation     |
      | TD-DEAL-004  | Empty title and custom stage |

  @TC-009
  Scenario Outline: Valid deal is saved and persisted from test data
    Given I am logged into FreeCRM with valid credentials
    And I open the New Deal form
    When I create a valid deal with data id "<dataId>"
    Then the deal should be saved and visible in the Deals list

    Examples:
      | dataId       | scenarioDescription     |
      | TD-DEAL-001  | Standard enterprise deal |
      | TD-DEAL-003  | Global expansion deal    |