@TC-001
Feature: Protected route access control

  Scenario Outline: Unauthenticated user opening protected route "<route>" is redirected to login
    Given I open the protected "<route>" route as an unauthenticated user
    Then I should be redirected to the login page

    Examples:
      | dataId       | route     | description              |
      | TD-AUTH-001  | /deals    | Deals protected route    |
      | TD-AUTH-002  | /invoices | Invoices protected route |