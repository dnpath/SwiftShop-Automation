# SwiftShop Automation Framework 🚀

A scalable, type-safe end-to-end test automation framework built using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern. This repository completely isolates our testing architecture from the main application development workspace.

---

## 📊 Live Test Reports & Execution Status

| Metric / Asset | Status & Links |
| :--- | :--- |
| **Latest Regression Run** | ![Reporting Regression Suite](https://github.com/dnpath/SwiftShop-Automation/actions/workflows/playwright.yml/badge.svg) |
| **Allure Analytics Dashboard** | [📈 View Interactive Trends (Root)](https://dnpath.github.io/SwiftShop-Automation/) |
| **Playwright Native HTML Report** | [🔍 View Detailed Traces & Logs (/playwright)](https://dnpath.github.io/SwiftShop-Automation/playwright/) |

> **Note on Allure Trends:** Historical charts (Duration, Trend Maps, Flaky Tests Tracking) update dynamically with every consecutive execution run.

---

## 🛠️ Tech Stack & Framework Architecture

* **Language:** TypeScript (Strict Mode)
* **Runner:** Playwright Test
* **Pattern:** Page Object Model (POM)
* **Reporting:** Integrated Allure HTML Engine + Playwright HTML Reporter
* **CI/CD Lifecycle:** Self-monitoring GitHub Actions Runner (Polls `SwiftShop` deployment endpoints without cross-repo workflow mutations | also SwiftShop page deployment trigger a dispatch to run regresson suite).

```text
├── .github/workflows/   # CI schedules and polling pipelines
├── config/              # Environment management (Base URLs, timeouts)
├── data/                # Test data injection matrices (users, states)
├── pages/               # Page Object Classes (BasePage, LoginPage, ShopPage)
└── tests/               # Functional regression specs (.spec.ts files)

```

---

## 🚀 Local Setup & Onboarding

### 1. Prerequisites

Ensure you have **Node.js (v20 or higher)** installed on your machine.

### 2. Installation

Clone this repository and spin up dependencies along with the system-level headless browsers:

```bash
# Clone the repository
git clone [https://github.com/dnpath/SwiftShop-Automation.git](https://github.com/dnpath/SwiftShop-Automation.git)
cd SwiftShop-Automation

# Install NPM dependency packages
npm install

# Download Playwright explicit platform dependencies
npx playwright install --with-deps

```

### 3. Execution Command Line Interface (CLI)

```bash
# Run all tests headlessly across your configured browsers
npx playwright test

# Run a single specific test file
npx playwright test tests/functional.spec.ts

# Run tests in UI mode (Interactive local development sandbox)
npx playwright test --ui

# Debug tests step-by-step
npx playwright test --debug

```

### 4. Compiling Reports Locally

```bash
# Open native Playwright HTML trace summaries
npx playwright show-report

# Generate and serve the Allure dashboard locally
allure generate allure-results --clean -o allure-report
allure open allure-report

```

---

## 🤖 Continuous Integration Pipeline (CI/CD)

Our test suite runs completely untethered from adjustments inside the core `SwiftShop` application repo. The pipeline operates under the following criteria:

1. **Autonomous Polling Layer:** The workflow triggers on an automated cron hourly sequence or manual `workflow_dispatch`.
2. **Environment Validation Loop:** It checks the public GitHub Deployments API endpoint for `dnpath/SwiftShop`.
3. **Execution Guardrails:** Tests execute *only* when the environment reflects a stable state status string of `"success"`.
4. **Unified Deployment:** The static files compile into unified directories, seamlessly publishing to the repository's hosted `gh-pages` branch.

```

```
