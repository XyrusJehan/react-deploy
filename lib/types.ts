// SK COA Dashboard Types

export interface AuditFinding {
  id: string;
  sk_unit: string;
  barangay: string;
  observation: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'pending' | 'addressed' | 'resolved';
  date_observed: string;
  recommendation: string;
}

export interface ComplianceStatus {
  id: string;
  sk_unit: string;
  barangay: string;
  compliance_rate: number;
  last_audit_date: string;
  documents_submitted: number;
  documents_required: number;
  status: 'compliant' | 'non_compliant' | 'under_review';
}

export interface SKBudget {
  id: string;
  sk_unit: string;
  barangay: string;
  fiscal_year: string;
  approved_budget: number;
  utilized_budget: number;
  remaining_budget: number;
  utilization_rate: number;
}

export interface RecentActivity {
  id: string;
  type: 'audit' | 'submission' | 'compliance' | 'report';
  title: string;
  description: string;
  sk_unit: string;
  timestamp: string;
}

export interface DashboardStats {
  total_sk_units: number;
  compliant_units: number;
  pending_audits: number;
  total_findings: number;
  average_compliance: number;
  total_budget_allocated: number;
  budget_utilization: number;
}
