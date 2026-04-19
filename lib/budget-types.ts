// Budget Management Types for SK COA

export interface SKBudget {
  id: string;
  sk_unit: string;
  barangay: string;
  fiscal_year: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface BudgetAppropriation {
  id: string;
  budget_id: string;
  account_code: string;
  account_name: string;
  approved_amount: number;
  utilized_amount: number;
  remaining_amount: number;
  utilization_rate: number;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
}

export interface BudgetAccount {
  code: string;
  name: string;
  category: 'personnel' | 'mooe' | 'capital_outlay' | 'financial_expense';
  description: string;
  max_amount?: number;
}

// Standard SK Budget Account Codes per COA Handbook
export const BUDGET_ACCOUNTS: BudgetAccount[] = [
  // Personnel Services
  { code: '501-01-01-001', name: 'Salaries and Wages - Regular', category: 'personnel', description: 'SK Chairman and Secretary salaries', max_amount: 120000 },
  { code: '501-02-01-001', name: 'Honoraria', category: 'personnel', description: 'SK Members honoraria per RA 10742' },
  { code: '501-02-01-002', name: 'Per Diems', category: 'personnel', description: 'Per diems for SK activities' },
  { code: '501-03-01-001', name: 'PAG-IBIG Contributions', category: 'personnel', description: 'Government share' },
  { code: '501-03-01-002', name: 'PhilHealth Contributions', category: 'personnel', description: 'Government share' },
  { code: '501-03-01-003', name: 'Pag-IBIG Contributions', category: 'personnel', description: 'Government share' },

  // Maintenance and Other Operating Expenses
  { code: '502-01-01-001', name: 'Office Supplies', category: 'mooe', description: 'Pens, papers, folders, etc.' },
  { code: '502-01-01-002', name: 'Accountable Forms', category: 'mooe', description: 'Official receipts, vouchers, etc.' },
  { code: '502-02-01-001', name: 'Traveling Expenses', category: 'mooe', description: 'For COA seminars and activities' },
  { code: '502-02-01-002', name: 'Training Expenses', category: 'mooe', description: 'SK Capacity Building activities' },
  { code: '502-03-01-001', name: 'Electricity', category: 'mooe', description: 'Barangay SK office electricity' },
  { code: '502-03-01-002', name: 'Water', category: 'mooe', description: 'Barangay SK office water' },
  { code: '502-04-01-001', name: 'Communication Expenses', category: 'mooe', description: 'Phone, internet allowance' },
  { code: '502-05-01-001', name: 'Representation Expenses', category: 'mooe', description: 'Meeting representations' },
  { code: '502-05-01-002', name: 'Transportation and Delivery', category: 'mooe', description: 'Travel to workshops' },
  { code: '502-06-01-001', name: 'Repair and Maintenance - Office Equipment', category: 'mooe', description: 'Computers, printers' },
  { code: '502-06-01-002', name: 'Repair and Maintenance - Motor Vehicles', category: 'mooe', description: 'Service vehicle maintenance' },
  { code: '502-07-01-001', name: 'Insurance', category: 'mooe', description: 'Property and vehicle insurance' },
  { code: '502-99-01-001', name: 'Other MOOE', category: 'mooe', description: 'Miscellaneous operating expenses' },

  // Capital Outlay
  { code: '506-01-01-001', name: 'Office Equipment', category: 'capital_outlay', description: 'Computers, printers, furniture' },
  { code: '506-01-01-002', name: 'Motor Vehicles', category: 'capital_outlay', description: 'Service vehicle for SK' },
  { code: '506-04-01-001', name: 'Books', category: 'capital_outlay', description: 'Reference books, manuals' },
  { code: '506-04-01-002', name: 'Sports Equipment', category: 'capital_outlay', description: 'For youth sports programs' },
  { code: '506-04-01-003', name: 'Audio-Visual Equipment', category: 'capital_outlay', description: 'For training and activities' },

  // Financial Expenses
  { code: '503-01-01-001', name: 'Bank Charges', category: 'financial_expense', description: 'Transaction fees' },
  { code: '503-02-01-001', name: 'Interest on Loans', category: 'financial_expense', description: 'Loan interest payments' },
];

export interface SCBAAReport {
  id: string;
  budget_id: string;
  sk_unit: string;
  barangay: string;
  fiscal_year: string;
  period: 'annual' | 'quarterly';
  generated_at: string;
  items: SCBAAItem[];
  total_approved: number;
  total_actual: number;
  total_variance: number;
}

export interface SCBAAItem {
  account_code: string;
  account_name: string;
  approved_budget: number;
  actual_amount: number;
  variance: number;
  variance_percentage: number;
}

export interface BudgetSubmission {
  id: string;
  budget_id: string;
  sk_unit: string;
  barangay: string;
  submitted_by: string;
  submitted_at: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  reviewer_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
}

export interface BudgetApprovalWorkflow {
  id: string;
  budget_id: string;
  stage: 'sk_chairman' | 'barangay_captain' | 'coa_review' | 'coa_approval';
  status: 'pending' | 'approved' | 'rejected';
  acted_by?: string;
  acted_at?: string;
  comments?: string;
}
