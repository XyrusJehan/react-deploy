// Financial Transactions Types for SK COA

export interface Receipt {
  id: string;
  or_number: string;
  date: string;
  payor: string;
  nature_of_collection: string;
  account_code: string;
  amount: number;
  collection_type: 'national' | 'local' | 'internal' | 'other';
  status: 'pending' | 'validated' | 'deposited' | 'reconciled';
  sk_unit: string;
  barangay: string;
  received_by: string;
  created_at: string;
}

export interface Disbursement {
  id: string;
  dv_number: string;
  date: string;
  payee: string;
  explanation: string;
  account_code: string;
  amount: number;
  check_number?: string;
  or_number?: string;
  status: 'pending' | 'approved' | 'issued' | 'cleared' | 'cancelled';
  sk_unit: string;
  barangay: string;
  approved_by: string;
  approved_at?: string;
  created_at: string;
}

export interface BankDeposit {
  id: string;
  deposit_date: string;
  bank_name: string;
  account_number: string;
  or_numbers: string[];
  total_amount: number;
  deposit_slip_number: string;
  status: 'pending' | 'verified' | 'reconciled';
  verified_by?: string;
  verified_at?: string;
  sk_unit: string;
  barangay: string;
  created_at: string;
}

export interface CollectionSummary {
  id: string;
  period: string;
  sk_unit: string;
  barangay: string;
  total_collections: number;
  breakdown: {
    national: number;
    local: number;
    internal: number;
    other: number;
  };
  remitted_to_barangay: boolean;
  remittance_date?: string;
  status: 'pending' | 'submitted' | 'verified';
}

export interface BankReconciliation {
  id: string;
  bank_name: string;
  account_number: string;
  statement_date: string;
  statement_balance: number;
  book_balance: number;
  outstanding_checks: number;
  deposits_in_transit: number;
  adjusted_bank_balance: number;
  adjusted_book_balance: number;
  status: 'pending' | 'reconciled';
  prepared_by: string;
  prepared_at: string;
}

export interface ASRPReport {
  id: string;
  sk_unit: string;
  barangay: string;
  fiscal_year: string;
  period: 'annual' | 'quarterly';
  generated_at: string;
  beginning_balance: number;
  total_receipts: number;
  total_disbursements: number;
  ending_balance: number;
  receipts_breakdown: {
    national: number;
    local: number;
    internal: number;
    other: number;
  };
  disbursements_breakdown: {
    personnel: number;
    mooe: number;
    capital_outlay: number;
    financial: number;
  };
  cash_on_hand: number;
  cash_in_bank: number;
  status: 'draft' | 'submitted' | 'verified' | ' certified';
}

// Collection Types based on COA SK Handbook
export const COLLECTION_TYPES = {
  national: {
    label: 'National Government Funds',
    description: 'IRA downloads, national agency allocations',
  },
  local: {
    label: 'Local Government Funds',
    description: 'Barangay allocation, municipal funds',
  },
  internal: {
    label: 'Internal Revenue',
    description: 'SK share from local revenue',
  },
  other: {
    label: 'Other Collections',
    description: 'Miscellaneous collections',
  },
} as const;

// Standard Account Codes for Disbursements
export const DISBURSEMENT_ACCOUNTS = {
  personnel: [
    { code: '501-01-01-001', name: 'Salaries and Wages - Regular' },
    { code: '501-02-01-001', name: 'Honoraria' },
    { code: '501-02-01-002', name: 'Per Diems' },
    { code: '501-03-01-001', name: 'PAG-IBIG Contributions' },
    { code: '501-03-01-002', name: 'PhilHealth Contributions' },
    { code: '501-03-01-003', name: 'Pag-IBIG Contributions' },
  ],
  mooe: [
    { code: '502-01-01-001', name: 'Office Supplies' },
    { code: '502-02-01-001', name: 'Traveling Expenses' },
    { code: '502-02-01-002', name: 'Training Expenses' },
    { code: '502-04-01-001', name: 'Communication Expenses' },
    { code: '502-05-01-001', name: 'Representation Expenses' },
    { code: '502-06-01-001', name: 'Repair and Maintenance - OE' },
    { code: '502-99-01-001', name: 'Other MOOE' },
  ],
  capital_outlay: [
    { code: '506-01-01-001', name: 'Office Equipment' },
    { code: '506-01-01-002', name: 'Motor Vehicles' },
    { code: '506-04-01-001', name: 'Books' },
    { code: '506-04-01-002', name: 'Sports Equipment' },
  ],
  financial: [
    { code: '503-01-01-001', name: 'Bank Charges' },
    { code: '503-02-01-001', name: 'Interest on Loans' },
  ],
} as const;

export interface TransactionSummary {
  totalReceipts: number;
  totalDisbursements: number;
  netChange: number;
  beginningBalance: number;
  endingBalance: number;
  pendingReceipts: number;
  pendingDisbursements: number;
}
