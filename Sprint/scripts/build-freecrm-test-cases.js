const XLSX = require('xlsx');
const fs = require('node:fs');
const path = require('node:path');

const outputPath = path.resolve(process.env.TEST_CASE_OUTPUT_PATH || 'specs/test-cases/test-cases.xlsx');

const workbook = XLSX.utils.book_new();

// Sheet 1: User story
const userStoriesData = [
  ['Issue Type', 'Summary', 'Priority'],
  ['Epic 1', 'FreeCRM Access Control & Navigation', 'High'],
  ['Story 1', 'As a user, I want unauthenticated access to protected routes redirected to login so that application data remains secure.', 'High'],
  ['Story 2', 'As a user, I want to log into FreeCRM with valid credentials and handle transient overlays so that I can access the system.', 'High'],
  ['Story 3', 'As a user, I want session continuity across page navigation and refresh so that I stay authenticated during work.', 'High'],
  [],
  ['Epic 2', 'Deals Management', 'High'],
  ['Story 1', 'As a sales user, I want to view the Deals landing page and controls with an empty state when no deals exist.', 'High'],
  ['Story 2', 'As a sales user, I want to search and filter deals so that I can quickly locate specific deal records.', 'High'],
  ['Story 3', 'As a sales user, I want access to Deals primary actions (Refresh, Export, List/Board view, Create) to manage deal workflows.', 'Medium'],
  ['Story 4', 'As a sales user, I want the Deal Create form to enforce required field validation (Title) before saving.', 'High'],
  ['Story 5', 'As a sales user, I want to persist valid deals once without unintended duplicates.', 'High'],
  [],
  ['Epic 3', 'Invoices Management', 'High'],
  ['Story 1', 'As a finance user, I want to view the Invoices landing page, documented columns, empty state, and pagination boundaries.', 'High'],
  ['Story 2', 'As a finance user, I want to access the Invoice Create workflow if permitted.', 'High'],
  ['Story 3', 'As a QA engineer, I want live Invoice form rules documented and confirmed before detailed validation/persistence testing.', 'High'],
  [],
  ['Epic 4', 'Security & Quality Governance', 'High'],
  ['Story 1', 'As a security auditor, I want credentials managed via environment secrets and excluded from all reports/artifacts.', 'High'],
  ['Story 2', 'As a QA engineer, I want suspected issues classified with reproducible evidence, separating product bugs from environment issues.', 'High']
];

const wsUserStory = XLSX.utils.aoa_to_sheet(userStoriesData);
wsUserStory['!cols'] = [{ wch: 16 }, { wch: 100 }, { wch: 12 }];
XLSX.utils.book_append_sheet(workbook, wsUserStory, 'User story');

// Sheet 2: Test Scenarios
const testScenariosData = [
  ['TestScenarioID', 'Requirement ID', 'Test Scenario Description', 'Type of Testing', 'Possible No. of TestCases', 'Test Case Details'],
  [
    'TS_01',
    'REQ-001',
    'Verify protected page redirection for unauthenticated users across /deals and /invoices',
    'Security / Functional',
    1,
    '1. Open /deals while unauthenticated and verify redirect to login.\n2. Open /invoices while unauthenticated and verify redirect to login.'
  ],
  [
    'TS_02',
    'REQ-002, REQ-005',
    'Verify login functionality with valid credentials and transient overlay handling',
    'Functional',
    1,
    '1. Open login page.\n2. Submit valid credentials from environment variables.\n3. Handle transient onboarding dialogs and notifications.\n4. Verify authenticated shell.'
  ],
  [
    'TS_03',
    'REQ-003, REQ-004, REQ-005',
    'Verify authenticated navigation between Deals and Invoices, including active-session refresh',
    'Functional',
    1,
    '1. Navigate from Deals to Invoices.\n2. Refresh the protected Invoices page.\n3. Verify session remains authenticated.\n4. Return to Deals.'
  ],
  [
    'TS_04',
    'REQ-006, REQ-007',
    'Verify Deals landing page display, primary controls, and empty-state usability',
    'Functional / Smoke',
    1,
    '1. Open Deals page.\n2. Verify Deals heading and controls (Refresh, Export, List view, Board view, Create).\n3. Verify empty-state text "No records found" in zero-record state.'
  ],
  [
    'TS_05',
    'REQ-008',
    'Verify Deals search and filter functionality and list view restoration',
    'Functional',
    1,
    '1. Open Deals page with existing data.\n2. Apply search/filter query.\n3. Verify matching records.\n4. Clear search and verify default list is restored.'
  ],
  [
    'TS_06',
    'REQ-009',
    'Verify Deals primary actions provide observable outcomes',
    'Functional',
    1,
    '1. Select Refresh, Export, List/Board view, and Create actions.\n2. Verify each produces observable UI response or navigation without breaking page.'
  ],
  [
    'TS_07',
    'REQ-010',
    'Verify Deal Create flow exposes all observed fields and marks Title as required',
    'Functional',
    1,
    '1. Open Deal Create flow.\n2. Confirm presence of Title and observed fields (Close Date, Tags, Stage, Status, Type, Source, Identifier, etc.).'
  ],
  [
    'TS_08',
    'REQ-011',
    'Verify Deal Create validation prevents saving without mandatory Title',
    'Negative / Functional',
    1,
    '1. Open Deal Create form.\n2. Submit form without Title.\n3. Verify invalid validation feedback and confirm no record is saved.'
  ],
  [
    'TS_09',
    'REQ-012',
    'Verify valid Deal creation persists single record without unintended duplication',
    'Functional',
    1,
    '1. Open Deal Create form.\n2. Submit unique valid deal payload.\n3. Verify deal is saved in list and duplicate submission is prevented.'
  ],
  [
    'TS_10',
    'REQ-013, REQ-014, REQ-015, REQ-016',
    'Verify Invoices landing smoke, observed table columns, empty state, and pagination boundaries',
    'Functional / Smoke',
    1,
    '1. Open Invoices page.\n2. Verify heading, Settings, Create, table, and pagination.\n3. Verify 7 columns, empty state, and disabled pagination on single page.'
  ],
  [
    'TS_11',
    'REQ-017',
    'Verify Invoice Create entry point access for permitted users',
    'Functional / Authorization',
    1,
    '1. Open Invoices page.\n2. Select Create button.\n3. Verify Invoice Create workflow opens successfully.'
  ],
  [
    'TS_12',
    'REQ-018, REQ-019',
    'Verify Invoice form-rule confirmation gate before detailed validation and persistence testing',
    'Process / Quality Gate',
    1,
    '1. Open Invoice Create form.\n2. Document live form rules.\n3. Hold detailed execution as blocked until form rules are approved.'
  ],
  [
    'TS_13',
    'REQ-020, REQ-021',
    'Verify secure secret management and evidence-based defect classification',
    'Security / Process',
    1,
    '1. Verify zero credentials leak in logs/artifacts.\n2. Ensure any defect report is supported by reproducible evidence.'
  ]
];

const wsTestScenarios = XLSX.utils.aoa_to_sheet(testScenariosData);
wsTestScenarios['!cols'] = [{ wch: 16 }, { wch: 25 }, { wch: 45 }, { wch: 22 }, { wch: 25 }, { wch: 60 }];
XLSX.utils.book_append_sheet(workbook, wsTestScenarios, 'Test Scenarios');

// Sheet 3: Test cases
const testCasesHeaders = [
  'Test Case ID',
  'Test Scenario',
  'Precondition',
  'Test Condition',
  'Test Case Steps',
  'Test Data',
  'Expected Result',
  'Actual Result Iteration 1',
  'Status Iteration 1',
  'Actual Result Iteration 2',
  'Status Iteration 2',
  'Comments',
  'Req Reference',
  'Priority',
  'Automation Suitable',
  'Automation Recommended',
  'Automate'
];

const testCasesRows = [
  [
    'TC-001',
    'Protected Deals and Invoices route redirects for unauthenticated users',
    'Browser is open and the user is not authenticated in FreeCRM.',
    'Direct unauthenticated navigation to /deals and /invoices.',
    '1. Navigate directly to /deals while unauthenticated.\n2. Confirm redirection to the FreeCRM login page.\n3. Navigate directly to /invoices while unauthenticated.\n4. Confirm redirection to the FreeCRM login page.',
    'Unauthenticated browser session; target routes /deals and /invoices.',
    'Unauthenticated navigation to either protected route redirects the user to the FreeCRM login page and does not reveal protected content.',
    'Redirected to login page for both /deals and /invoices.',
    'Passed',
    '',
    '',
    'Covered in automated suite',
    'REQ-001',
    'High',
    'Yes',
    'Yes',
    'Yes'
  ],
  [
    'TC-002',
    'Valid login into authenticated FreeCRM area with overlay handling',
    'The FreeCRM login page is displayed and valid account credentials are available.',
    'Submit valid credentials and dismiss any blocking onboarding or notification overlays.',
    '1. Open the login page.\n2. Enter the valid email from the secure environment.\n3. Enter the valid password from the secure environment.\n4. Submit the login form.\n5. If onboarding or notification overlays appear, dismiss them before asserting the page.\n6. Confirm the authenticated FreeCRM area is visible.',
    'Valid FREECRM_EMAIL and FREECRM_PASSWORD from .env.',
    'The user successfully logs in, transient overlays do not block navigation, and the authenticated FreeCRM shell is displayed.',
    'Login succeeded, overlays dismissed, authenticated shell displayed.',
    'Passed',
    '',
    '',
    'Covered in automated suite',
    'REQ-002, REQ-005',
    'High',
    'Yes',
    'Yes',
    'Yes'
  ],
  [
    'TC-003',
    'Authenticated navigation between Deals and Invoices with active-session refresh',
    'The user is logged in, transient overlays are dismissed, and the authenticated shell is active.',
    'Navigate between Deals and Invoices, refresh a protected page, and return without losing authentication.',
    '1. Open the Deals page in an authenticated session.\n2. Navigate to Invoices.\n3. Refresh the protected Invoices page during the active session.\n4. Confirm the user remains authenticated on Invoices.\n5. Navigate back to Deals.\n6. Confirm the user remains authenticated on Deals.',
    'Authenticated user session.',
    'The user can move between Deals and Invoices, page refresh retains the active session, and the user is not redirected to the login page.',
    'Navigated to Invoices, refreshed page, retained session, returned to Deals.',
    'Passed',
    '',
    '',
    'Covered in automated suite',
    'REQ-003, REQ-004, REQ-005',
    'High',
    'Yes',
    'Yes',
    'Yes'
  ],
  [
    'TC-004',
    'Deals landing smoke and empty-state usability',
    'The user is signed in and the account is in a zero-record Deals state.',
    'Open Deals and verify the heading, primary controls, and empty-state presentation.',
    '1. Open the Deals page.\n2. Verify the Deals heading is displayed.\n3. Verify primary controls including Refresh, Export, List view, Board view, and Create are present.\n4. In the zero-record state, confirm the empty-state message No records found is displayed and the page remains usable.',
    'Authenticated account with zero Deal records.',
    'The Deals page renders its heading, primary controls, and No records found empty state without broken layout, remaining usable.',
    'Deals heading, primary controls, and empty state verified.',
    'Passed',
    '',
    '',
    'Covered in automated suite',
    'REQ-006, REQ-007',
    'High',
    'Yes',
    'Yes',
    'Yes'
  ],
  [
    'TC-005',
    'Deals search and filter against controlled data with reset',
    'The user is signed in and a controlled dataset of matching and non-matching Deals exists.',
    'Apply search or filter criteria, observe matching results, and clear the filter to restore the default view.',
    '1. Open the Deals page.\n2. Apply a supported search or filter condition using known deal data.\n3. Confirm matching records are displayed.\n4. Clear the search or filter.\n5. Confirm the default Deals list is restored.',
    'Controlled Deal dataset with matching and non-matching values.',
    'Supported search or filter behavior returns matching results, and clearing the applied search or filter restores the default Deals view.',
    '',
    '',
    '',
    '',
    '',
    'REQ-008',
    'High',
    'Yes',
    'No',
    'No'
  ],
  [
    'TC-006',
    'Deals primary actions provide observable outcomes',
    'The user is signed in on the Deals page and the documented actions are available in the current account state.',
    'Use the documented Deals actions and check for an observable outcome without inventing message text.',
    '1. Open the Deals page.\n2. Select Refresh and observe the result.\n3. Use Export if available and observe the result.\n4. Switch between List view and Board view if both are available.\n5. Use target or create actions when available and observe the resulting navigation, dialog, form, or message.',
    'Authenticated account with access to the available Deals actions.',
    'Each available Deals action produces an observable result such as a reload, download prompt, view change, navigation, dialog, form, or system message without breaking the page.',
    '',
    '',
    '',
    '',
    '',
    'REQ-009',
    'Medium',
    'No',
    'No',
    'No'
  ],
  [
    'TC-007',
    'Deal Create flow exposes the observed fields',
    'The user is signed in and can open the Deal Create flow from a verified Create entry point.',
    'Open the Deal Create flow and confirm the observed fields are present.',
    '1. Open the Deal Create flow from Deals.\n2. Verify the Title field is present.\n3. Verify the observed fields Close Date, Tags, Description, Probability, Amount, Commission, Stage, Closed, Status, Next Steps, Type, Source, and Identifier are available.\n4. Record any additional required indicators that appear on the live form.',
    'Authenticated account with access to the Deal Create flow.',
    'The Deal Create flow exposes the observed fields needed for a valid Deal, and Title is confirmed as a required field on the live form.',
    '',
    '',
    '',
    '',
    '',
    'REQ-010',
    'High',
    'Yes',
    'No',
    'No'
  ],
  [
    'TC-008',
    'Deal validation blocks missing Title or incomplete submission',
    'The Deal Create form is open and the user can attempt to save a record.',
    'Submit the Deal form without the required Title and with incomplete data as permitted by the live form.',
    '1. Open the Deal Create form.\n2. Leave the Title field empty.\n3. Enter only the minimum additional data needed to trigger validation if the form requires interaction.\n4. Select Save.\n5. Observe the validation feedback and verify no Deal is created.',
    'Empty Title; any additional placeholder values only as needed to trigger validation.',
    'The form rejects the invalid submission, shows validation feedback for the missing or incomplete required data, and does not save a new Deal.',
    '',
    '',
    '',
    '',
    '',
    'REQ-011',
    'High',
    'Yes',
    'Yes',
    'No'
  ],
  [
    'TC-009',
    'Deal valid save persists once without unintended duplicate',
    'The user is signed in, the Deal Create flow is available, and unique valid Deal data is prepared.',
    'Create one valid Deal, find it again, and confirm repeated submission does not create an unintended duplicate.',
    '1. Open the Deal Create form.\n2. Enter a unique Title and other valid required values.\n3. Select Save once.\n4. Search for the newly created Deal and confirm it exists.\n5. Repeat the submission with the same payload or attempt an immediate second save as supported by the UI.\n6. Confirm no unintended duplicate Deal is created.',
    'Unique Deal title and valid field values captured from the live form.',
    'Exactly one valid Deal is saved and can be found again, and repeated submission does not create an unintended duplicate record.',
    '',
    '',
    '',
    '',
    '',
    'REQ-012',
    'High',
    'Yes',
    'Yes',
    'No'
  ],
  [
    'TC-010',
    'Invoices landing smoke with columns, empty state, and pagination boundary',
    'The user is signed in and the account is in a zero-record or single-page Invoice state.',
    'Open Invoices and verify the page layout, observed columns, empty state, and disabled single-page pagination behavior.',
    '1. Open the Invoices page.\n2. Verify the Invoices heading, Settings, Create, table, and pagination controls are visible.\n3. Verify the observed columns Number, Deal, Company, Issue date, Due date, Paid at, and Total.\n4. When no Invoice records exist, verify the table shows No records found.\n5. Verify Previous and Next are disabled when there is no second page.',
    'Authenticated account with zero-record or single-page Invoice data.',
    'The Invoices page renders without a broken layout, shows the documented columns, displays No records found when applicable, and keeps Previous and Next disabled when no second page exists.',
    '',
    '',
    '',
    '',
    '',
    'REQ-013, REQ-014, REQ-015, REQ-016',
    'High',
    'Yes',
    'Yes',
    'No'
  ],
  [
    'TC-011',
    'Invoice Create access for a permitted user',
    'The user is signed in with an account that has the required permission to open Invoice Create.',
    'Open the Invoice Create flow from the Invoices page.',
    '1. Open the Invoices page.\n2. Select Create.\n3. Confirm the Invoice Create workflow opens successfully.',
    'Authorized Invoice user account.',
    'A user with the required permission can open the Invoice Create flow from the Invoices page.',
    '',
    '',
    '',
    '',
    '',
    'REQ-017',
    'High',
    'Yes',
    'No',
    'No'
  ],
  [
    'TC-012',
    'Invoice form-rule confirmation gate for detailed entry coverage',
    'The user is signed in and can access the Invoice Create flow.',
    'Document the live Invoice form rules before any detailed Invoice validation or persistence coverage is attempted.',
    '1. Open the Invoice Create flow.\n2. Record the visible fields, required indicators, defaults, allowed values, relationship fields, date rules, amount rules, and any validation messages available from the live form.\n3. Compare the observed rules with the current approved requirements.\n4. If the rules are not fully confirmed, mark detailed Invoice invalid and valid save coverage as blocked and stop without inventing data or results.',
    'Authorized Invoice user account; live Invoice Create form.',
    'The live Invoice form rules are documented from the application, and detailed Invoice validation or persistence coverage remains blocked until those rules are confirmed and approved.',
    '',
    '',
    '',
    '',
    '',
    'REQ-018, REQ-019',
    'High',
    'No',
    'No',
    'No'
  ],
  [
    'TC-013',
    'Secret handling and evidence-based defect classification',
    'The secure execution environment is configured and representative cases can be run without exposing secrets.',
    'Confirm secret handling controls and classify any suspected failures only when supported by reproducible evidence.',
    '1. Confirm credentials are loaded from .env or an approved secret store rather than from the workbook or source-controlled artifacts.\n2. Review generated screenshots, logs, reports, and workbook fields for accidental secret exposure.\n3. If unexpected behavior is observed during execution, capture reproducible evidence such as URL, screenshot, console output, network evidence, or repeatable steps.\n4. Classify environment, locator, timeout, or missing-data issues separately from product defects unless reproducible product evidence exists.',
    'Environment-managed credentials; representative execution artifacts and evidence.',
    'Credentials do not appear in the workbook or execution artifacts, and only reproducible behavior with clear evidence is treated as a product bug.',
    '',
    '',
    '',
    '',
    '',
    'REQ-020, REQ-021',
    'High',
    'No',
    'No',
    'No'
  ]
];

const wsTestCases = XLSX.utils.aoa_to_sheet([testCasesHeaders, ...testCasesRows]);
wsTestCases['!cols'] = [
  { wch: 12 },
  { wch: 45 },
  { wch: 35 },
  { wch: 35 },
  { wch: 55 },
  { wch: 30 },
  { wch: 45 },
  { wch: 25 },
  { wch: 12 },
  { wch: 25 },
  { wch: 12 },
  { wch: 25 },
  { wch: 25 },
  { wch: 10 },
  { wch: 15 },
  { wch: 18 },
  { wch: 10 }
];
XLSX.utils.book_append_sheet(workbook, wsTestCases, 'Test cases');

// Sheet 4: Defect Report
const defectReportData = [
  ['Defect Id.', 'Module name', 'Defect Summary', 'Defect Priority', 'Assigned To', 'Status']
];
const wsDefectReport = XLSX.utils.aoa_to_sheet(defectReportData);
wsDefectReport['!cols'] = [{ wch: 15 }, { wch: 20 }, { wch: 50 }, { wch: 15 }, { wch: 25 }, { wch: 15 }];
XLSX.utils.book_append_sheet(workbook, wsDefectReport, 'Defect Report');

// Sheet 5: RTM
const rtmData = [
  ['BR_ID', 'TR_ID', 'TS_ID', 'TC_ID', 'STATUS', 'DR_ID'],
  ['REQ-001', 'TR-001', 'TS_01', 'TC-001', 'Passed', 'NA'],
  ['REQ-002', 'TR-002', 'TS_02', 'TC-002', 'Passed', 'NA'],
  ['REQ-003', 'TR-003', 'TS_03', 'TC-003', 'Passed', 'NA'],
  ['REQ-004', 'TR-004', 'TS_03', 'TC-003', 'Passed', 'NA'],
  ['REQ-005', 'TR-005', 'TS_02, TS_03', 'TC-002, TC-003', 'Passed', 'NA'],
  ['REQ-006', 'TR-006', 'TS_04', 'TC-004', 'Passed', 'NA'],
  ['REQ-007', 'TR-007', 'TS_04', 'TC-004', 'Passed', 'NA'],
  ['REQ-008', 'TR-008', 'TS_05', 'TC-005', 'Not Executed', 'NA'],
  ['REQ-009', 'TR-009', 'TS_06', 'TC-006', 'Not Executed', 'NA'],
  ['REQ-010', 'TR-010', 'TS_07', 'TC-007', 'Not Executed', 'NA'],
  ['REQ-011', 'TR-011', 'TS_08', 'TC-008', 'Not Executed', 'NA'],
  ['REQ-012', 'TR-012', 'TS_09', 'TC-009', 'Not Executed', 'NA'],
  ['REQ-013', 'TR-013', 'TS_10', 'TC-010', 'Not Executed', 'NA'],
  ['REQ-014', 'TR-014', 'TS_10', 'TC-010', 'Not Executed', 'NA'],
  ['REQ-015', 'TR-015', 'TS_10', 'TC-010', 'Not Executed', 'NA'],
  ['REQ-016', 'TR-016', 'TS_10', 'TC-010', 'Not Executed', 'NA'],
  ['REQ-017', 'TR-017', 'TS_11', 'TC-011', 'Not Executed', 'NA'],
  ['REQ-018', 'TR-018', 'TS_12', 'TC-012', 'Blocked', 'NA'],
  ['REQ-019', 'TR-019', 'TS_12', 'TC-012', 'Blocked', 'NA'],
  ['REQ-020', 'TR-020', 'TS_13', 'TC-013', 'Not Executed', 'NA'],
  ['REQ-021', 'TR-021', 'TS_13', 'TC-013', 'Not Executed', 'NA']
];
const wsRtm = XLSX.utils.aoa_to_sheet(rtmData);
wsRtm['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 18 }, { wch: 20 }, { wch: 16 }, { wch: 12 }];
XLSX.utils.book_append_sheet(workbook, wsRtm, 'RTM');

// Sheet 6: Summary
const summaryData = [
  ['TEST EXECUTION SUMMARY'],
  ['Project Name', 'Module Name', 'Total Cases', 'Total Passed', 'Total Failed', 'Total Executed', 'Pass Percentage', 'Fail Percentage', 'Completion Percentage'],
  ['FreeCRM', 'Access Control & Authentication', 3, 3, 0, 3, '100%', '0%', '100%'],
  ['FreeCRM', 'Deals Module', 6, 1, 0, 1, '100%', '0%', '16.7%'],
  ['FreeCRM', 'Invoices Module', 3, 0, 0, 0, '0%', '0%', '0%'],
  ['FreeCRM', 'Security & Quality Governance', 1, 0, 0, 0, '0%', '0%', '0%'],
  ['FreeCRM', 'Total Suite', 13, 4, 0, 4, '100%', '0%', '30.8%']
];
const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
wsSummary['!cols'] = [
  { wch: 15 },
  { wch: 32 },
  { wch: 14 },
  { wch: 14 },
  { wch: 14 },
  { wch: 16 },
  { wch: 18 },
  { wch: 18 },
  { wch: 22 }
];
XLSX.utils.book_append_sheet(workbook, wsSummary, 'Summary');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
XLSX.writeFile(workbook, outputPath);
console.log(`Successfully generated workbook with ${workbook.SheetNames.length} sheets at ${outputPath}`);
