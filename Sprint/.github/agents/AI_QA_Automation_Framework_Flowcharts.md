# AI QA Automation Framework Flowcharts

## 1. Complete QA Agent Flow

```text
                         ┌─────────────────────────┐
                         │    QA ORCHESTRATOR      │
                         │   Controls Full Flow    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │  Requirement Analysis   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Test Plan         │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Test Cases        │
                         │   (Dual-Page Checks)    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Test Data         │
                         │  (Data-Driven Testing)  │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │  Locator Intelligence   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Correction        │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       Automation        │
                         │  BDD + Cucumber + POM   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Code Review        │
                         └────────────┬────────────┘
                                      │
                               ┌──────┴──────┐
                               │             │
                            Issues        Approved
                               │             │
                               ▼             ▼
                         ┌───────────┐  ┌───────────────┐
                         │ Fix Code  │  │Test Execution │
                         └─────┬─────┘  │   Cucumber    │
                               │        └───────┬───────┘
                               └──────► Code    │
                                        Review  ▼
                                      ┌─────────────────┐
                                      │ Failure Analysis│
                                      └───────┬─────────┘
                                              │
                              ┌───────────────┴───────────────┐
                              │                               │
                              ▼                               ▼
                      Automation Issue                    App Defect
                              │                               │
                              ▼                               ▼
                    ┌──────────────────┐               ┌────────────┐
                    │ Playwright Test  │               │ Bug Report │
                    │     Healer       │               └─────┬──────┘
                    └─────────┬────────┘                     │
                              │                              │
                              ▼                              │
                        Re-run Tests                         │
                              │                              │
                              └───────────────┬──────────────┘
                                              │
                                              ▼
                                 ┌─────────────────────────┐
                                 │       RTM (Excel)       │
                                 │     specs/rtm/rtm.xlsx  │
                                 └────────────┬────────────┘
                                              │
                                              ▼
                                 ┌─────────────────────────┐
                                 │      Test Summary       │
                                 │ specs/reports/summary.md│
                                 └────────────┬────────────┘
                                              │
                                              ▼
                                           ┌──────┐
                                           │ DONE │
                                           └──────┘
```

## 2. Directory & Artifact Mapping

```text
Sprint/
├── 🤖 .github/agents/
│   ├── qa-orchestrator.agent.md
│   ├── requirement-analysis.agent.md
│   ├── correction.agent.md
│   ├── test-plan.agent.md
│   ├── test-case.agent.md
│   ├── test-data.agent.md
│   ├── locator-intelligence.agent.md
│   ├── automation.agent.md
│   ├── code-review.agent.md
│   ├── test-execution.agent.md
│   ├── failure-analysis.agent.md
│   ├── playwright-test-healer.agent.md
│   ├── bug-report.agent.md
│   ├── rtm.agent.md
│   └── test-summary.agent.md
│
├── 📋 specs/
│   ├── requirement-analysis/
│   │   └── requirement-analysis.md
│   ├── test-plans/
│   │   └── test-plan.md
│   ├── test-cases/
│   │   └── test-cases.xlsx
│   ├── test-data/
│   │   └── test-data.xlsx
│   ├── locators/
│   │   └── locator-specification.xlsx
│   ├── execution/
│   │   └── execution-report.md
│   ├── failures/
│   │   ├── failure-analysis.md
│   │   └── self-healing-report.md
│   ├── bugs/
│   │   └── bug-report.md
│   ├── rtm/
│   │   └── rtm.xlsx
│   └── reports/
│       ├── code-review.md
│       └── test-summary.md
│
├── 🥒 features/
│   ├── *.feature
│   └── stepDefinitions/
│       └── *.steps.ts
│
├── 📄 pages/
│   └── *.page.ts
│
├── 🔧 hooks/
│   └── hooks.ts
│
├── 🌍 support/
│   └── world.ts
│
├── 🛠️ utils/
│   └── *.ts
│
├── ⚙️ cucumber.js
├── ⚙️ playwright.config.ts
├── ⚙️ tsconfig.json
└── 📦 package.json
```
