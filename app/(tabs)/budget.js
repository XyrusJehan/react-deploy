import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const BUDGET_ACCOUNTS = [
  { code: '501-02-01-001', name: 'Honoraria', category: 'personnel' },
  { code: '501-02-01-002', name: 'Allowances', category: 'personnel' },
  { code: '502-01-01-001', name: 'Office Supplies', category: 'mooe' },
  { code: '502-02-01-002', name: 'Training Expenses', category: 'mooe' },
  { code: '502-04-01-001', name: 'Communication Expenses', category: 'mooe' },
  { code: '506-04-01-002', name: 'Sports Equipment', category: 'mooe' },
  { code: '502-06-01-001', name: 'Repair and Maintenance', category: 'mooe' },
  { code: '503-01-01-001', name: 'Office Equipment', category: 'capital_outlay' },
  { code: '503-02-01-001', name: 'IT Equipment', category: 'capital_outlay' },
];

export default function BudgetManagementScreen() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'dollar-sign' },
    { key: 'formulate', label: 'Formulate', icon: 'edit-2' },
    { key: 'scbaa', label: 'SCBAA', icon: 'file-text' },
    { key: 'submissions', label: 'Submissions', icon: 'send' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            >
              <Icon name={tab.icon} size={18} color={activeTab === tab.key ? '#1e3a5f' : '#94a3b8'} />
              <Text style={[styles.tabLabel, { color: activeTab === tab.key ? '#1e3a5f' : '#94a3b8' }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 'overview' && <BudgetOverview />}
        {activeTab === 'formulate' && <BudgetFormulation />}
        {activeTab === 'scbaa' && <SCBAATab />}
        {activeTab === 'submissions' && <SubmissionsTab />}
      </ScrollView>
    </View>
  );
}

function BudgetOverview() {
  const mockBudgets = [
    { sk_unit: 'SK Poblacion', barangay: 'Poblacion', fiscal_year: '2026', total_budget: 150000, utilized: 97500, status: 'approved' },
    { sk_unit: 'SK San Jose', barangay: 'San Jose', fiscal_year: '2026', total_budget: 120000, utilized: 48000, status: 'under_review' },
    { sk_unit: 'SK Mabini', barangay: 'Mabini', fiscal_year: '2026', total_budget: 100000, utilized: 100000, status: 'approved' },
    { sk_unit: 'SK Rizal', barangay: 'Rizal', fiscal_year: '2026', total_budget: 80000, utilized: 32000, status: 'draft' },
  ];

  const statusConfig = {
    draft: { label: 'Draft', color: '#6b7280', icon: 'clock' },
    submitted: { label: 'Submitted', color: '#3b82f6', icon: 'send' },
    under_review: { label: 'Under Review', color: '#8b5cf6', icon: 'eye' },
    approved: { label: 'Approved', color: '#10b981', icon: 'check-circle' },
    rejected: { label: 'Rejected', color: '#ef4444', icon: 'x-circle' },
  };

  const totalBudget = mockBudgets.reduce((sum, b) => sum + b.total_budget, 0);
  const totalUtilized = mockBudgets.reduce((sum, b) => sum + b.utilized, 0);

  return (
    <View style={styles.overviewContainer}>
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: '#10b98120' }]}>
            <Icon name="check-circle" size={24} color="#10b981" />
          </View>
          <View>
            <Text style={styles.summaryValue}>₱{totalBudget.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Total FY 2026 Budget</Text>
          </View>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: '#3b82f620' }]}>
            <Icon name="trending-up" size={24} color="#3b82f6" />
          </View>
          <View>
            <Text style={styles.summaryValue}>₱{totalUtilized.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Total Utilized</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>SK Unit Budgets</Text>
      {mockBudgets.map((budget, index) => {
        const status = statusConfig[budget.status];
        const utilization = (budget.utilized / budget.total_budget) * 100;

        return (
          <View key={index} style={styles.budgetCard}>
            <View style={styles.budgetCardHeader}>
              <View>
                <Text style={styles.budgetTitle}>{budget.sk_unit}</Text>
                <Text style={styles.budgetSubtitle}>{budget.barangay} • FY {budget.fiscal_year}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                <Icon name={status.icon} size={12} color={status.color} />
                <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
              </View>
            </View>
            <View style={styles.budgetDetails}>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetRowLabel}>Budget</Text>
                <Text style={styles.budgetRowValue}>₱{budget.total_budget.toLocaleString()}</Text>
              </View>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetRowLabel}>Utilized</Text>
                <Text style={styles.budgetRowValue}>₱{budget.utilized.toLocaleString()}</Text>
              </View>
              <View>
                <View style={styles.utilizationHeader}>
                  <Text style={styles.budgetRowLabel}>Utilization Rate</Text>
                  <Text style={[styles.utilizationText, utilization >= 80 ? styles.utilizationHigh : utilization >= 50 ? styles.utilizationMedium : styles.utilizationLow]}>
                    {utilization.toFixed(1)}%
                  </Text>
                </View>
                <Progress value={utilization} />
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
                <Icon name="chevron-right" size={14} color="#3b82f6" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function BudgetFormulation() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [appropriations, setAppropriations] = useState([
    { id: '1', account_code: '502-02-01-002', account_name: 'Training Expenses', approved_amount: 30000, utilized_amount: 15000, remaining_amount: 15000, utilization_rate: 50, quarter: 'Q1' },
    { id: '2', account_code: '506-04-01-002', account_name: 'Sports Equipment', approved_amount: 25000, utilized_amount: 25000, remaining_amount: 0, utilization_rate: 100, quarter: 'Q1' },
    { id: '3', account_code: '502-01-01-001', account_name: 'Office Supplies', approved_amount: 10000, utilized_amount: 3500, remaining_amount: 6500, utilization_rate: 35, quarter: 'Q2' },
    { id: '4', account_code: '502-04-01-001', account_name: 'Communication Expenses', approved_amount: 8000, utilized_amount: 2000, remaining_amount: 6000, utilization_rate: 25, quarter: 'Q2' },
  ]);

  const totalBudget = appropriations.reduce((sum, a) => sum + a.approved_amount, 0);
  const totalUtilized = appropriations.reduce((sum, a) => sum + a.utilized_amount, 0);

  const groupedAccounts = BUDGET_ACCOUNTS.reduce((acc, account) => {
    if (!acc[account.category]) acc[account.category] = [];
    acc[account.category].push(account);
    return acc;
  }, {});

  const categoryLabels = {
    personnel: { label: 'Personnel Services', color: '#3b82f6' },
    mooe: { label: 'MOOE', color: '#10b981' },
    capital_outlay: { label: 'Capital Outlay', color: '#8b5cf6' },
  };

  const handleAddAppropriation = (account) => {
    const newAppropriation = {
      id: Date.now().toString(),
      account_code: account.code,
      account_name: account.name,
      approved_amount: 0,
      utilized_amount: 0,
      remaining_amount: 0,
      utilization_rate: 0,
      quarter: 'Q1',
    };
    setAppropriations([...appropriations, newAppropriation]);
    setShowAddDialog(false);
  };

  return (
    <View style={styles.formulateContainer}>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.cardTitle}>Current Budget Draft</Text>
          <Text style={styles.cardSubtitle}>FY 2026 • SK Poblacion</Text>
        </View>
        <View style={styles.budgetSummary}>
          <View style={styles.budgetSummaryItem}>
            <Text style={styles.budgetSummaryLabel}>Total Appropriation</Text>
            <Text style={styles.budgetSummaryValue}>₱{totalBudget.toLocaleString()}</Text>
          </View>
          <View style={styles.budgetSummaryItem}>
            <Text style={styles.budgetSummaryLabel}>Utilized</Text>
            <Text style={[styles.budgetSummaryValue, { color: '#10b981' }]}>₱{totalUtilized.toLocaleString()}</Text>
          </View>
          <View style={styles.budgetSummaryItem}>
            <Text style={styles.budgetSummaryLabel}>Remaining</Text>
            <Text style={[styles.budgetSummaryValue, { color: '#3b82f6' }]}>₱{(totalBudget - totalUtilized).toLocaleString()}</Text>
          </View>
        </View>
        <Progress value={(totalUtilized / totalBudget) * 100} />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddDialog(true)}>
        <Icon name="plus" size={20} color="#ffffff" />
        <Text style={styles.addButtonText}>Add Appropriation</Text>
      </TouchableOpacity>

      <Modal visible={showAddDialog} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Budget Appropriation</Text>
              <TouchableOpacity onPress={() => setShowAddDialog(false)}>
                <Icon name="x-circle" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {Object.entries(groupedAccounts).map(([category, accounts]) => (
                <View key={category} style={styles.categorySection}>
                  <Text style={styles.categoryTitle}>{categoryLabels[category]?.label}</Text>
                  {accounts.map((account) => (
                    <TouchableOpacity
                      key={account.code}
                      style={styles.accountItem}
                      onPress={() => handleAddAppropriation(account)}
                    >
                      <Text style={styles.accountName}>{account.name}</Text>
                      <Text style={styles.accountCode}>{account.code}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Text style={styles.sectionTitle}>Appropriation Items</Text>
      {appropriations.map((item) => {
        const utilization = (item.utilized_amount / item.approved_amount) * 100;
        return (
          <View key={item.id} style={styles.appropriationCard}>
            <View style={styles.appropriationHeader}>
              <View style={styles.appropriationInfo}>
                <Text style={styles.appropriationName}>{item.account_name}</Text>
                <Text style={styles.appropriationCode}>{item.account_code}</Text>
              </View>
              <View style={styles.appropriationActions}>
                <View style={styles.quarterBadge}>
                  <Text style={styles.quarterText}>{item.quarter}</Text>
                </View>
                <TouchableOpacity>
                  <Icon name="edit-2" size={16} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.appropriationAmounts}>
              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>Approved</Text>
                <Text style={styles.amountValue}>₱{item.approved_amount.toLocaleString()}</Text>
              </View>
              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>Utilized</Text>
                <Text style={[styles.amountValue, { color: '#10b981' }]}>₱{item.utilized_amount.toLocaleString()}</Text>
              </View>
              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>Remaining</Text>
                <Text style={[styles.amountValue, { color: '#3b82f6' }]}>₱{item.remaining_amount.toLocaleString()}</Text>
              </View>
            </View>
            <Progress value={utilization} />
          </View>
        );
      })}
    </View>
  );
}

function SCBAATab() {
  const scbaaData = [
    { account_code: '502-02-01-002', account_name: 'Training Expenses', approved_budget: 30000, actual_amount: 28000, variance: 2000, variance_percentage: 6.67 },
    { account_code: '506-04-01-002', account_name: 'Sports Equipment', approved_budget: 25000, actual_amount: 25000, variance: 0, variance_percentage: 0 },
    { account_code: '502-01-01-001', account_name: 'Office Supplies', approved_budget: 10000, actual_amount: 8500, variance: 1500, variance_percentage: 15 },
    { account_code: '502-04-01-001', account_name: 'Communication Expenses', approved_budget: 8000, actual_amount: 4500, variance: 3500, variance_percentage: 43.75 },
    { account_code: '501-02-01-001', account_name: 'Honoraria', approved_budget: 40000, actual_amount: 40000, variance: 0, variance_percentage: 0 },
    { account_code: '502-06-01-001', account_name: 'Repair and Maintenance', approved_budget: 15000, actual_amount: 8500, variance: 6500, variance_percentage: 43.33 },
  ];

  const totalApproved = scbaaData.reduce((sum, item) => sum + item.approved_budget, 0);
  const totalActual = scbaaData.reduce((sum, item) => sum + item.actual_amount, 0);
  const totalVariance = totalApproved - totalActual;

  return (
    <View style={styles.scbaaContainer}>
      <View style={styles.summaryCard}>
        <View style={styles.scbaaHeader}>
          <View>
            <Text style={styles.cardTitle}>Statement of Comparison of Budget and Actual Amounts (SCBAA)</Text>
            <Text style={styles.cardSubtitle}>FY 2026 • SK Poblacion</Text>
          </View>
          <TouchableOpacity style={styles.exportButton}>
            <Icon name="file-text" size={16} color="#3b82f6" />
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scbaaSummary}>
          <View style={styles.scbaaSummaryItem}>
            <Text style={styles.scbaaSummaryLabel}>Total Approved Budget</Text>
            <Text style={styles.scbaaSummaryValue}>₱{totalApproved.toLocaleString()}</Text>
          </View>
          <View style={styles.scbaaSummaryItem}>
            <Text style={styles.scbaaSummaryLabel}>Total Actual Amount</Text>
            <Text style={[styles.scbaaSummaryValue, { color: '#10b981' }]}>₱{totalActual.toLocaleString()}</Text>
          </View>
          <View style={styles.scbaaSummaryItem}>
            <Text style={styles.scbaaSummaryLabel}>Total Variance</Text>
            <Text style={[styles.scbaaSummaryValue, { color: totalVariance >= 0 ? '#3b82f6' : '#ef4444' }]}>
              ₱{totalVariance.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tableCard}>
        <Text style={styles.tableTitle}>Detailed Comparison</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.tableAccountCell]}>Account</Text>
          <Text style={[styles.tableHeaderCell, styles.tableAmountCell]}>Approved</Text>
          <Text style={[styles.tableHeaderCell, styles.tableAmountCell]}>Actual</Text>
          <Text style={[styles.tableHeaderCell, styles.tableAmountCell]}>Variance</Text>
        </View>
        {scbaaData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableAccountCell}>
              <Text style={styles.tableAccountCode}>{item.account_code}</Text>
              <Text style={styles.tableAccountName}>{item.account_name}</Text>
            </View>
            <Text style={styles.tableAmountCell}>₱{item.approved_budget.toLocaleString()}</Text>
            <Text style={styles.tableAmountCell}>₱{item.actual_amount.toLocaleString()}</Text>
            <View style={styles.tableAmountCell}>
              <View style={styles.varianceContainer}>
                {item.variance > 0 && <Icon name="arrow-down-right" size={12} color="#10b981" />}
                {item.variance < 0 && <Icon name="arrow-up-right" size={12} color="#ef4444" />}
                <Text style={[styles.varianceValue, item.variance > 0 ? styles.variancePositive : item.variance < 0 ? styles.varianceNegative : null]}>
                  {item.variance > 0 ? '-' : ''}₱{Math.abs(item.variance).toLocaleString()}
                </Text>
              </View>
              <Text style={styles.variancePercent}>({item.variance_percentage.toFixed(1)}%)</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.notesCard}>
        <Text style={styles.notesTitle}>Notes</Text>
        <Text style={styles.notesText}>
          • Positive variance indicates under-utilization of funds.{'\n'}
          • Negative variance indicates over-expenditure requiring explanation.{'\n'}
          • All variances exceeding 10% must be explained in the AAR.
        </Text>
      </View>
    </View>
  );
}

function SubmissionsTab() {
  const submissions = [
    { id: '1', sk_unit: 'SK Poblacion', barangay: 'Poblacion', status: 'approved', submitted_at: '2026-03-15', reviewed_at: '2026-03-18' },
    { id: '2', sk_unit: 'SK San Jose', barangay: 'San Jose', status: 'under_review', submitted_at: '2026-04-10', reviewed_at: null },
    { id: '3', sk_unit: 'SK Mabini', barangay: 'Mabini', status: 'pending', submitted_at: '2026-04-12', reviewed_at: null },
    { id: '4', sk_unit: 'SK Rizal', barangay: 'Rizal', status: 'rejected', submitted_at: '2026-04-05', reviewed_at: '2026-04-08' },
  ];

  const statusConfig = {
    pending: { label: 'Pending', color: '#f59e0b', icon: 'clock' },
    under_review: { label: 'Under Review', color: '#8b5cf6', icon: 'eye' },
    approved: { label: 'Approved', color: '#10b981', icon: 'check-circle' },
    rejected: { label: 'Rejected', color: '#ef4444', icon: 'x-circle' },
  };

  return (
    <View style={styles.submissionsContainer}>
      {submissions.map((submission) => {
        const status = statusConfig[submission.status];

        return (
          <View key={submission.id} style={styles.submissionCard}>
            <View style={styles.submissionHeader}>
              <View>
                <Text style={styles.submissionTitle}>{submission.sk_unit}</Text>
                <Text style={styles.submissionSubtitle}>{submission.barangay}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                <Icon name={status.icon} size={12} color={status.color} />
                <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
              </View>
            </View>
            <View style={styles.submissionDates}>
              <View>
                <Text style={styles.dateLabel}>Submitted</Text>
                <Text style={styles.dateValue}>{submission.submitted_at}</Text>
              </View>
              {submission.reviewed_at && (
                <View>
                  <Text style={styles.dateLabel}>Reviewed</Text>
                  <Text style={styles.dateValue}>{submission.reviewed_at}</Text>
                </View>
              )}
            </View>
            <View style={styles.submissionActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="eye" size={14} color="#3b82f6" />
                <Text style={styles.actionButtonText}>View</Text>
              </TouchableOpacity>
              {submission.status === 'pending' && (
                <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                  <Icon name="check-circle" size={14} color="#ffffff" />
                  <Text style={[styles.actionButtonText, { color: '#ffffff' }]}>Review</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tabContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#1e3a5f',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  overviewContainer: {
    gap: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 12,
  },
  budgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  budgetSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  budgetDetails: {
    gap: 12,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetRowLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  budgetRowValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  utilizationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  utilizationText: {
    fontSize: 14,
    fontWeight: '500',
  },
  utilizationHigh: {
    color: '#10b981',
  },
  utilizationMedium: {
    color: '#f59e0b',
  },
  utilizationLow: {
    color: '#ef4444',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    marginTop: 4,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  formulateContainer: {
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  budgetSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  budgetSummaryItem: {
    alignItems: 'center',
  },
  budgetSummaryLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  budgetSummaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  accountItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 8,
  },
  accountName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  accountCode: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  appropriationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  appropriationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  appropriationInfo: {
    flex: 1,
  },
  appropriationName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  appropriationCode: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  appropriationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quarterBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quarterText: {
    fontSize: 11,
    color: '#6b7280',
  },
  appropriationAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountItem: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginTop: 4,
  },
  scbaaContainer: {
    gap: 12,
  },
  scbaaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 6,
  },
  exportButtonText: {
    fontSize: 12,
    color: '#3b82f6',
  },
  scbaaSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  scbaaSummaryItem: {
    alignItems: 'center',
  },
  scbaaSummaryLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  scbaaSummaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 4,
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tableTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tableHeaderCell: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
  },
  tableAccountCell: {
    flex: 2,
  },
  tableAmountCell: {
    flex: 1,
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tableAccountCode: {
    fontSize: 11,
    color: '#6b7280',
  },
  tableAccountName: {
    fontSize: 13,
    color: '#1e293b',
    marginTop: 2,
  },
  varianceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
  },
  varianceValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  variancePositive: {
    color: '#10b981',
  },
  varianceNegative: {
    color: '#ef4444',
  },
  variancePercent: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  notesCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 12,
    color: '#4b5563',
    lineHeight: 18,
  },
  submissionsContainer: {
    gap: 12,
  },
  submissionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  submissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  submissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  submissionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  submissionDates: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  dateValue: {
    fontSize: 13,
    color: '#1e293b',
    marginTop: 2,
  },
  submissionActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 6,
  },
  primaryAction: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  actionButtonText: {
    fontSize: 13,
    color: '#3b82f6',
  },
});