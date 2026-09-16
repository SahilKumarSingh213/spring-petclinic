const XLSX = require('xlsx');
const fs = require('node:fs');
const path = require('node:path');

const outputPath = path.resolve(process.env.TEST_DATA_OUTPUT_PATH || 'specs/test-data/test-data.xlsx');

const workbook = XLSX.utils.book_new();

// Sheet 1: Auth Data
const authData = [
  ['Data ID', 'Test Case ID', 'Scenario Type', 'Route', 'Expected Redirection / Target'],
  ['TD-AUTH-001', 'TC-001', 'Protected Deals Redirect', '/deals', 'Login page'],
  ['TD-AUTH-002', 'TC-001', 'Protected Invoices Redirect', '/invoices', 'Login page'],
  ['TD-AUTH-003', 'TC-002', 'Authenticated Dashboard', '/deals', 'Authenticated Shell']
];
const wsAuth = XLSX.utils.aoa_to_sheet(authData);
wsAuth['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 30 }, { wch: 15 }, { wch: 25 }];
XLSX.utils.book_append_sheet(workbook, wsAuth, 'Auth Data');

// Sheet 2: Deals Data
const dealsData = [
  ['Data ID', 'Test Case ID', 'Scenario Type', 'Title', 'Identifier', 'Close Date', 'Stage', 'Status', 'Type', 'Source', 'Expected Outcome'],
  ['TD-DEAL-001', 'TC-009', 'Positive Valid Deal', 'Enterprise License Q4', 'AUTO-ID-001', '2026-12-31', 'Prospect', 'Active', 'Opportunity', 'Online', 'Deal saved successfully'],
  ['TD-DEAL-002', 'TC-008', 'Negative Missing Title', '', 'AUTO-ID-002', '2026-12-31', 'Prospect', 'Active', 'Opportunity', 'Online', 'Validation error shown'],
  ['TD-DEAL-003', 'TC-009', 'Positive Growth Deal', 'Global Expansion Plan', 'AUTO-ID-003', '2027-03-15', 'Qualified', 'Active', 'New Business', 'Referral', 'Deal saved successfully'],
  ['TD-DEAL-004', 'TC-008', 'Negative Special Chars Invalid', '', 'AUTO-ID-004', '2026-11-30', 'Prospect', 'Active', 'Opportunity', 'Partner', 'Validation error shown']
];
const wsDeals = XLSX.utils.aoa_to_sheet(dealsData);
wsDeals['!cols'] = [
  { wch: 15 },
  { wch: 15 },
  { wch: 30 },
  { wch: 30 },
  { wch: 15 },
  { wch: 15 },
  { wch: 15 },
  { wch: 12 },
  { wch: 15 },
  { wch: 12 },
  { wch: 25 }
];
XLSX.utils.book_append_sheet(workbook, wsDeals, 'Deals Data');

// Sheet 3: Invoices Data
const invoicesData = [
  ['Data ID', 'Test Case ID', 'Scenario Type', 'Invoice Number', 'Deal Name', 'Company', 'Issue Date', 'Due Date', 'Amount', 'Expected Outcome'],
  ['TD-INV-001', 'TC-010', 'Positive Smoke Invoices', 'INV-1001', 'Enterprise License', 'Acme Corp', '2026-09-01', '2026-09-30', '5000.00', 'Invoice displayed in table'],
  ['TD-INV-002', 'TC-011', 'Positive Create Flow', 'INV-1002', 'Global Expansion', 'Global Tech', '2026-10-01', '2026-10-31', '12000.00', 'Create workflow opens']
];
const wsInvoices = XLSX.utils.aoa_to_sheet(invoicesData);
wsInvoices['!cols'] = [
  { wch: 15 },
  { wch: 15 },
  { wch: 25 },
  { wch: 18 },
  { wch: 25 },
  { wch: 20 },
  { wch: 15 },
  { wch: 15 },
  { wch: 12 },
  { wch: 30 }
];
XLSX.utils.book_append_sheet(workbook, wsInvoices, 'Invoices Data');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
XLSX.writeFile(workbook, outputPath);
console.log(`Successfully created test data workbook at ${outputPath}`);
