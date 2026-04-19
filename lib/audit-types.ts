// Audit Process & Document Management Types for SK COA

export interface AuditEngagement {
  id: string;
  sk_unit: string;
  barangay: string;
  fiscal_year: string;
  audit_type: 'regular' | 'special' | 'compliance' | 'performance';
  status: 'planned' | 'in_progress' | 'fieldwork' | 'reporting' | 'completed' | 'cancelled';
  start_date: string;
  end_date: string | null;
  team_leader: string;
  team_members: string[];
  scope: string;
  objectives: string[];
  created_at: string;
  updated_at: string;
}

export interface DocumentChecklist {
  id: string;
  audit_id: string;
  document_name: string;
  description: string;
  category: 'budget' | 'receipts' | 'disbursements' | 'bank' | 'property' | 'payroll' | 'reports' | 'others';
  is_required: boolean;
  submitted: boolean;
  submitted_at: string | null;
  verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  remarks: string | null;
}

export interface AuditFinding {
  id: string;
  audit_id: string;
  observation_number: string;
  reference: string;
  category: 'compliance' | 'internal_control' | 'financial' | 'operational' | 'legal';
  severity: 'critical' | 'major' | 'minor';
  title: string;
  description: string;
  recommendation: string;
  response: string | null;
  response_date: string | null;
  status: 'open' | 'addressed' | 'resolved' | 'partially_resolved';
  target_date: string | null;
  actual_date: string | null;
  created_at: string;
}

export interface SAORItem {
  id: string;
  audit_id: string;
  finding_id: string | null;
  reference_number: string;
  subject: string;
  nature: 'observation' | 'recommendation' | 'compliance' | 'internal_control';
  status: 'pending' | 'addressed' | 'resolved' | 'cancelled';
  date_issued: string;
  due_date: string | null;
  date_addressed: string | null;
  remarks: string;
}

export interface AnnualAuditReport {
  id: string;
  audit_id: string;
  sk_unit: string;
  barangay: string;
  fiscal_year: string;
  report_number: string;
  period_covered: string;
  date_issued: string;
  auditor_name: string;
  findings_summary: string;
  recommendations_summary: string;
  compliance_summary: string;
  overall_assessment: ' satisfactory' | ' satisfactory with exceptions' | 'unsatisfactory';
  status: 'draft' | 'review' | 'published' | 'archived';
  created_at: string;
  published_at: string | null;
}

// Document categories with COA required documents
export const DOCUMENT_CATEGORIES = {
  budget: {
    label: 'Budget Documents',
    documents: [
      { name: 'Annual/Special Budget Proposal', code: 'BDG-001' },
      { name: 'Budget Utilization Request', code: 'BDG-002' },
      { name: 'Appropriation Ordinance', code: 'BDG-003' },
      { name: 'SCBAA (Statement of Comparison)', code: 'BDG-004' },
    ],
  },
  receipts: {
    label: 'Receipts & Collections',
    documents: [
      { name: 'Official Receipts (ORs)', code: 'RCP-001' },
      { name: 'Collection Reports', code: 'RCP-002' },
      { name: 'Deposit Slips', code: 'RCP-003' },
      { name: 'Bank Reconciliation Statement', code: 'RCP-004' },
    ],
  },
  disbursements: {
    label: 'Disbursements',
    documents: [
      { name: 'Disbursement Vouchers', code: 'DSB-001' },
      { name: 'Purchase Orders', code: 'DSB-002' },
      { name: 'Administrative Office Orders', code: 'DSB-003' },
      { name: 'Payroll Register', code: 'DSB-004' },
      { name: 'Check Vouchers', code: 'DSB-005' },
    ],
  },
  bank: {
    label: 'Bank Documents',
    documents: [
      { name: 'Bank Statements', code: 'BNK-001' },
      { name: 'Bank Deposit Slips', code: 'BNK-002' },
      { name: 'Check Images/Cancelled Checks', code: 'BNK-003' },
      { name: 'Bank Reconciliation', code: 'BNK-004' },
    ],
  },
  property: {
    label: 'Property & Equipment',
    documents: [
      { name: 'Property Acknowledgment Receipts', code: 'PRP-001' },
      { name: 'Inventory Report (ICR)', code: 'PRP-002' },
      { name: 'Property Transfer Report', code: 'PRP-003' },
      { name: 'Physical Count Sheet', code: 'PRP-004' },
    ],
  },
  payroll: {
    label: 'Payroll & Honoraria',
    documents: [
      { name: 'DTR (Daily Time Records)', code: 'PAY-001' },
      { name: 'Payroll Summary', code: 'PAY-002' },
      { name: 'Remittance Reports (PAG-IBIG, PhilHealth, etc.)', code: 'PAY-003' },
    ],
  },
  reports: {
    label: 'Financial Reports',
    documents: [
      { name: 'Monthly Financial Report (MFR)', code: 'RPT-001' },
      { name: 'Quarterly Report', code: 'RPT-002' },
      { name: 'Annual Report', code: 'RPT-003' },
      { name: 'Trial Balance', code: 'RPT-004' },
    ],
  },
} as const;

export type DocumentCategory = keyof typeof DOCUMENT_CATEGORIES;

export const AUDIT_SEVERITY_CONFIG = {
  critical: { label: 'Critical', variant: 'destructive' as const, color: 'text-red-600' },
  major: { label: 'Major', variant: 'default' as const, color: 'text-orange-600' },
  minor: { label: 'Minor', variant: 'secondary' as const, color: 'text-yellow-600' },
} as const;

export const AUDIT_STATUS_CONFIG = {
  planned: { label: 'Planned', variant: 'outline' as const, color: 'text-gray-600' },
  in_progress: { label: 'In Progress', variant: 'default' as const, color: 'text-blue-600' },
  fieldwork: { label: 'Fieldwork', variant: 'default' as const, color: 'text-purple-600' },
  reporting: { label: 'Reporting', variant: 'default' as const, color: 'text-indigo-600' },
  completed: { label: 'Completed', variant: 'secondary' as const, color: 'text-green-600' },
  cancelled: { label: 'Cancelled', variant: 'destructive' as const, color: 'text-gray-500' },
} as const;
