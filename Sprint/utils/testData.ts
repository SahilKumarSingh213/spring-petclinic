import fs from 'node:fs';
import path from 'node:path';
import * as XLSX from 'xlsx';

export interface DealFormData {
  title: string;
  identifier: string;
  closeDate?: string;
  stage?: string;
  status?: string;
  type?: string;
  source?: string;
}

export interface AuthTestData {
  dataId: string;
  testCaseId: string;
  scenarioType: string;
  route: string;
  expectedRedirection: string;
}

export interface DealTestDataRow {
  dataId: string;
  testCaseId: string;
  scenarioType: string;
  title: string;
  identifier: string;
  closeDate?: string;
  stage?: string;
  status?: string;
  type?: string;
  source?: string;
  expectedOutcome?: string;
}

const TEST_DATA_PATH = path.resolve(process.cwd(), 'specs/test-data/test-data.xlsx');

function nowToken(): string {
  return new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
}

export function loadSheetRows<T = Record<string, string>>(sheetName: string): T[] {
  if (!fs.existsSync(TEST_DATA_PATH)) {
    return [];
  }

  const workbook = XLSX.readFile(TEST_DATA_PATH);
  if (!workbook.SheetNames.includes(sheetName)) {
    return [];
  }

  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json<T>(worksheet, { defval: '' });
}

export function getAuthTestData(): AuthTestData[] {
  const rows = loadSheetRows<Record<string, string>>('Auth Data');
  return rows.map((r) => ({
    dataId: r['Data ID'] || '',
    testCaseId: r['Test Case ID'] || '',
    scenarioType: r['Scenario Type'] || '',
    route: r['Route'] || '',
    expectedRedirection: r['Expected Redirection / Target'] || ''
  }));
}

export function getDealTestDataById(dataId: string): Partial<DealFormData> {
  const rows = loadSheetRows<Record<string, string>>('Deals Data');
  const match = rows.find((r) => r['Data ID'] === dataId);
  const token = nowToken();

  if (match) {
    const baseTitle = match['Title'] ? `${match['Title']}-${token}` : '';
    const baseIdentifier = match['Identifier'] ? `${match['Identifier']}-${token}` : `ID-${token}`;
    return {
      title: baseTitle,
      identifier: baseIdentifier,
      closeDate: match['Close Date'] || '2026-12-31',
      stage: match['Stage'] || 'Prospect',
      status: match['Status'] || 'Active',
      type: match['Type'] || 'Opportunity',
      source: match['Source'] || 'Online'
    };
  }

  return buildValidDealData();
}

export function buildValidDealData(): DealFormData {
  const token = nowToken();

  return {
    title: `AUTO-DEAL-${token}`,
    identifier: `AUTO-ID-${token}`,
    stage: 'Prospect',
    status: 'Active',
    type: 'Opportunity',
    source: 'Online'
  };
}

export function buildInvalidDealData(): Omit<DealFormData, 'title'> {
  const token = nowToken();

  return {
    identifier: `AUTO-INVALID-${token}`,
    stage: 'Prospect',
    status: 'Active',
    type: 'Opportunity',
    source: 'Online'
  };
}