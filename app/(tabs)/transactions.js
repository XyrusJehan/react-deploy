import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const COLLECTION_TYPES = {
  national: { label: 'National Gov', color: '#3b82f6' },
  local: { label: 'Local Gov', color: '#10b981' },
  internal: { label: 'Internal Revenue', color: '#8b5cf6' },
  other: { label: 'Other', color: '#f59e0b' },
};

export default function FinancialTransactionsScreen() {
  const [activeTab, setActiveTab] = useState('summary');

  const tabs = [
    { key: 'summary', label: 'Summary', icon: 'grid' },
    { key: 'receipts', label: 'Receipts', icon: 'arrow-down-circle' },
    { key: 'disbursements', label: 'Disbursements', icon: 'arrow-up-circle' },
    { key: 'deposits', label: 'Deposits', icon: 'home' },
    { key: 'asrp', label: 'ASRP', icon: 'file-text' },
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
        {activeTab === 'summary' && <SummaryTab />}
        {activeTab === 'receipts' && <ReceiptsTab />}
        {activeTab === 'disbursements' && <DisbursementsTab />}
        {activeTab === 'deposits' && <DepositsTab />}
        {activeTab === 'asrp' && <ASRPTab />}
      </ScrollView>
    </View>
  );
}

function SummaryTab() {
  const summary = {
    beginningBalance: 125000,
    totalReceipts: 450000,
    totalDisbursements: 372500,
    endingBalance: 202500,
    pendingReceipts: 15000,
    pendingDisbursements: 8500,
  };

  const collections = {
    national: 250000,
    local: 150000,
    internal: 45000,
    other: 5000,
  };

  const disbursements = {
    personnel: 180000,
    mooe: 142500,
    capital_outlay: 40000,
    financial: 10000,
  };

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.cashCard}>
        <Text style={styles.cardTitle}>Cash Position</Text>
        <Text style={styles.cardSubtitle}>As of April 17, 2026</Text>
        <View style={styles.cashPositionGrid}>
          <View style={styles.cashPositionItem}>
            <Text style={styles.cashLabel}>Beginning Balance</Text>
            <Text style={styles.cashValue}>₱{summary.beginningBalance.toLocaleString()}</Text>
          </View>
          <View style={styles.cashPositionItem}>
            <Text style={styles.cashLabel}>Receipts</Text>
            <Text style={[styles.cashValue, { color: '#10b981' }]}>+₱{summary.totalReceipts.toLocaleString()}</Text>
          </View>
          <View style={styles.cashPositionItem}>
            <Text style={styles.cashLabel}>Disbursements</Text>
            <Text style={[styles.cashValue, { color: '#ef4444' }]}>-₱{summary.totalDisbursements.toLocaleString()}</Text>
          </View>
          <View style={styles.cashPositionItem}>
            <Text style={styles.cashLabel}>Ending Balance</Text>
            <Text style={[styles.cashValue, styles.cashValueLarge]}>₱{summary.endingBalance.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.breakdownCard}>
        <Text style={styles.cardTitle}>Collections Breakdown</Text>
        <Text style={styles.cardSubtitle}>FY 2026 Total Receipts</Text>
        {Object.entries(collections).map(([key, value]) => (
          <View key={key} style={styles.breakdownItem}>
            <View style={styles.breakdownLabel}>
              <View style={[styles.colorDot, { backgroundColor: COLLECTION_TYPES[key]?.color || '#6b7280' }]} />
              <Text style={styles.breakdownText}>{COLLECTION_TYPES[key]?.label || key}</Text>
            </View>
            <Text style={styles.breakdownAmount}>₱{value.toLocaleString()}</Text>
          </View>
        ))}
        <View style={styles.breakdownTotal}>
          <Text style={styles.breakdownTotalLabel}>Total Collections</Text>
          <Text style={styles.breakdownTotalAmount}>₱{(collections.national + collections.local + collections.internal + collections.other).toLocaleString()}</Text>
        </View>
        <View style={styles.progressStack}>
          <View style={[styles.progressSegment, { width: `${(collections.national / summary.totalReceipts) * 100}%`, backgroundColor: '#3b82f6' }]} />
          <View style={[styles.progressSegment, { width: `${(collections.local / summary.totalReceipts) * 100}%`, backgroundColor: '#10b981' }]} />
          <View style={[styles.progressSegment, { width: `${(collections.internal / summary.totalReceipts) * 100}%`, backgroundColor: '#8b5cf6' }]} />
          <View style={[styles.progressSegment, { width: `${(collections.other / summary.totalReceipts) * 100}%`, backgroundColor: '#f59e0b' }]} />
        </View>
      </View>

      <View style={styles.breakdownCard}>
        <Text style={styles.cardTitle}>Disbursements Breakdown</Text>
        <Text style={styles.cardSubtitle}>FY 2026 Total Disbursements</Text>
        <View style={styles.disbursementItem}>
          <View style={styles.disbursementLabel}>
            <Icon name="credit-card" size={16} color="#3b82f6" />
            <Text style={styles.disbursementText}>Personnel Services</Text>
          </View>
          <Text style={styles.disbursementAmount}>₱{disbursements.personnel.toLocaleString()}</Text>
        </View>
        <Progress value={(disbursements.personnel / summary.totalDisbursements) * 100} />
        <View style={styles.disbursementItem}>
          <View style={styles.disbursementLabel}>
            <Icon name="wallet" size={16} color="#10b981" />
            <Text style={styles.disbursementText}>MOOE</Text>
          </View>
          <Text style={styles.disbursementAmount}>₱{disbursements.mooe.toLocaleString()}</Text>
        </View>
        <Progress value={(disbursements.mooe / summary.totalDisbursements) * 100} />
        <View style={styles.disbursementItem}>
          <View style={styles.disbursementLabel}>
            <Icon name="home" size={16} color="#8b5cf6" />
            <Text style={styles.disbursementText}>Capital Outlay</Text>
          </View>
          <Text style={styles.disbursementAmount}>₱{disbursements.capital_outlay.toLocaleString()}</Text>
        </View>
        <Progress value={(disbursements.capital_outlay / summary.totalDisbursements) * 100} />
        <View style={styles.disbursementItem}>
          <View style={styles.disbursementLabel}>
            <Icon name="dollar-sign" size={16} color="#f59e0b" />
            <Text style={styles.disbursementText}>Financial Expenses</Text>
          </View>
          <Text style={styles.disbursementAmount}>₱{disbursements.financial.toLocaleString()}</Text>
        </View>
        <Progress value={(disbursements.financial / summary.totalDisbursements) * 100} />
      </View>

      <View style={styles.pendingCard}>
        <Text style={styles.cardTitle}>Pending Items</Text>
        <View style={styles.pendingItem}>
          <View style={styles.pendingIcon}>
            <Icon name="clock" size={20} color="#f59e0b" />
            <Text style={styles.pendingText}>Pending Receipts</Text>
          </View>
          <Text style={[styles.pendingAmount, { color: '#f59e0b' }]}>₱{summary.pendingReceipts.toLocaleString()}</Text>
        </View>
        <View style={styles.pendingItem}>
          <View style={styles.pendingIcon}>
            <Icon name="alert-circle" size={20} color="#ef4444" />
            <Text style={styles.pendingText}>Pending Disbursements</Text>
          </View>
          <Text style={[styles.pendingAmount, { color: '#ef4444' }]}>₱{summary.pendingDisbursements.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
}

function ReceiptsTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReceipt, setNewReceipt] = useState({
    or_number: '',
    date: '',
    payor: '',
    nature_of_collection: '',
    amount: '',
    collection_type: 'national'
  });

  const [receipts, setReceipts] = useState([
    { id: '1', or_number: 'OR-2026-001', date: '2026-01-15', payor: 'Department of Interior and Local Government', nature_of_collection: 'IRA Allocation - Q1', amount: 50000, collection_type: 'national', status: 'reconciled' },
    { id: '2', or_number: 'OR-2026-002', date: '2026-01-20', payor: 'Municipality of San Jose', nature_of_collection: 'SK Fund Allocation', amount: 75000, collection_type: 'local', status: 'reconciled' },
    { id: '3', or_number: 'OR-2026-003', date: '2026-02-10', payor: 'Department of Budget and Management', nature_of_collection: 'Capacity Building Fund', amount: 25000, collection_type: 'national', status: 'deposited' },
    { id: '4', or_number: 'OR-2026-004', date: '2026-03-05', payor: 'Barangay Council', nature_of_collection: 'Youth Development Fund', amount: 30000, collection_type: 'internal', status: 'validated' },
    { id: '5', or_number: 'OR-2026-005', date: '2026-04-01', payor: 'Private Donor', nature_of_collection: 'Youth Sports Program Donation', amount: 5000, collection_type: 'other', status: 'pending' },
  ]);

  const statusConfig = {
    pending: { label: 'Pending', color: '#f59e0b', icon: 'clock' },
    validated: { label: 'Validated', color: '#3b82f6', icon: 'check-circle' },
    deposited: { label: 'Deposited', color: '#8b5cf6', icon: 'home' },
    reconciled: { label: 'Reconciled', color: '#10b981', icon: 'check-circle' },
  };

  const totalReceipts = receipts.reduce((sum, r) => sum + r.amount, 0);

  const handleAddReceipt = () => {
    if (newReceipt.or_number && newReceipt.payor && newReceipt.amount) {
      const receipt = {
        id: Date.now().toString(),
        ...newReceipt,
        amount: parseFloat(newReceipt.amount),
        status: 'pending',
        date: newReceipt.date || new Date().toISOString().split('T')[0],
      };
      setReceipts([receipt, ...receipts]);
      setNewReceipt({ or_number: '', date: '', payor: '', nature_of_collection: '', amount: '', collection_type: 'national' });
      setShowAddModal(false);
    }
  };

  return (
    <View style={styles.receiptsContainer}>
      <View style={styles.receiptsHeader}>
        <View>
          <Text style={styles.headerLabel}>Total Receipts</Text>
          <Text style={styles.headerValue}>₱{totalReceipts.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Icon name="plus" size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Receipt</Text>
        </TouchableOpacity>
      </View>

      {receipts.map((receipt) => {
        const status = statusConfig[receipt.status];
        const collection = COLLECTION_TYPES[receipt.collection_type];

        return (
          <View key={receipt.id} style={styles.receiptCard}>
            <View style={styles.receiptHeader}>
              <View style={styles.receiptInfo}>
                <View style={styles.receiptNumberContainer}>
                  <Text style={styles.receiptNumber}>{receipt.or_number}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                    <Icon name={status.icon} size={12} color={status.color} />
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                </View>
                <Text style={styles.receiptPayor}>{receipt.payor}</Text>
                <Text style={styles.receiptNature}>{receipt.nature_of_collection}</Text>
              </View>
              <View style={styles.receiptAmount}>
                <Text style={styles.amountValue}>₱{receipt.amount.toLocaleString()}</Text>
                <Text style={styles.receiptDate}>{receipt.date}</Text>
              </View>
            </View>
            <View style={styles.receiptFooter}>
              <View style={[styles.collectionBadge, { backgroundColor: collection.color + '20' }]}>
                <Text style={[styles.collectionText, { color: collection.color }]}>{collection.label}</Text>
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Icon name="eye" size={14} color="#3b82f6" />
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Official Receipt</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Icon name="x" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>OR Number</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="OR-2026-XXX"
                  value={newReceipt.or_number}
                  onChangeText={(text) => setNewReceipt({ ...newReceipt, or_number: text })}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Date</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="YYYY-MM-DD"
                  value={newReceipt.date}
                  onChangeText={(text) => setNewReceipt({ ...newReceipt, date: text })}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Payor</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Name of payer"
                  value={newReceipt.payor}
                  onChangeText={(text) => setNewReceipt({ ...newReceipt, payor: text })}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nature of Collection</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Description"
                  value={newReceipt.nature_of_collection}
                  onChangeText={(text) => setNewReceipt({ ...newReceipt, nature_of_collection: text })}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Amount</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={newReceipt.amount}
                  onChangeText={(text) => setNewReceipt({ ...newReceipt, amount: text })}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Collection Type</Text>
                <View style={styles.typeButtons}>
                  {Object.entries(COLLECTION_TYPES).map(([key, value]) => (
                    <TouchableOpacity
                      key={key}
                      style={[styles.typeButton, newReceipt.collection_type === key && { backgroundColor: value.color }]}
                      onPress={() => setNewReceipt({ ...newReceipt, collection_type: key })}
                    >
                      <Text style={[styles.typeButtonText, newReceipt.collection_type === key && { color: '#ffffff' }]}>
                        {value.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddReceipt}>
                <Text style={styles.submitButtonText}>Create Receipt</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function DisbursementsTab() {
  const [disbursements] = useState([
    { id: '1', dv_number: 'DV-2026-001', date: '2026-01-25', payee: 'ABC Office Supplies', explanation: 'Office supplies for SK youth center', amount: 8500, check_number: 'CK-10234', status: 'cleared', approved_by: 'Juan Dela Cruz' },
    { id: '2', dv_number: 'DV-2026-002', date: '2026-02-05', payee: 'SK Members - Honoraria', explanation: 'Q1 Honoraria for SK Kagawads', amount: 45000, check_number: 'CK-10235', status: 'cleared', approved_by: 'Juan Dela Cruz' },
    { id: '3', dv_number: 'DV-2026-003', date: '2026-02-20', payee: 'Sports World Inc.', explanation: 'Sports equipment for youth program', amount: 25000, check_number: 'CK-10236', status: 'cleared', approved_by: 'Juan Dela Cruz' },
    { id: '4', dv_number: 'DV-2026-004', date: '2026-03-15', payee: 'PLDT', explanation: 'Internet allowance for SK office', amount: 3500, status: 'issued', approved_by: 'Juan Dela Cruz' },
    { id: '5', dv_number: 'DV-2026-005', date: '2026-04-02', payee: 'Training Center Corp.', explanation: 'Capacity building seminar for SK officers', amount: 15000, status: 'pending', approved_by: 'Juan Dela Cruz' },
  ]);

  const statusConfig = {
    pending: { label: 'Pending', color: '#f59e0b', icon: 'clock' },
    approved: { label: 'Approved', color: '#3b82f6', icon: 'check-circle' },
    issued: { label: 'Issued', color: '#8b5cf6', icon: 'credit-card' },
    cleared: { label: 'Cleared', color: '#10b981', icon: 'check-circle' },
    cancelled: { label: 'Cancelled', color: '#ef4444', icon: 'x-circle' },
  };

  const totalDisbursements = disbursements.reduce((sum, d) => sum + d.amount, 0);

  return (
    <View style={styles.disbursementsContainer}>
      <View style={styles.receiptsHeader}>
        <View>
          <Text style={styles.headerLabel}>Total Disbursements</Text>
          <Text style={[styles.headerValue, { color: '#ef4444' }]}>₱{totalDisbursements.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>New Disbursement</Text>
        </TouchableOpacity>
      </View>

      {disbursements.map((disbursement) => {
        const status = statusConfig[disbursement.status];

        return (
          <View key={disbursement.id} style={styles.disbursementCard}>
            <View style={styles.disbursementHeader}>
              <View style={styles.disbursementInfo}>
                <View style={styles.disbursementNumberContainer}>
                  <Text style={styles.disbursementNumber}>{disbursement.dv_number}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                    <Icon name={status.icon} size={12} color={status.color} />
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                </View>
                <Text style={styles.disbursementPayee}>{disbursement.payee}</Text>
                <Text style={styles.disbursementExplanation}>{disbursement.explanation}</Text>
                <View style={styles.disbursementMeta}>
                  <View style={styles.metaBadge}>
                    <Text style={styles.metaText}>502-01-01-001</Text>
                  </View>
                  {disbursement.check_number && (
                    <View style={styles.metaBadge}>
                      <Text style={styles.metaText}>{disbursement.check_number}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.disbursementAmount}>
                <Text style={styles.amountValue}>₱{disbursement.amount.toLocaleString()}</Text>
                <Text style={styles.disbursementDate}>{disbursement.date}</Text>
              </View>
            </View>
            <View style={styles.disbursementFooter}>
              <Text style={styles.approvedBy}>Approved by: {disbursement.approved_by}</Text>
              <TouchableOpacity style={styles.viewButton}>
                <Icon name="eye" size={14} color="#3b82f6" />
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function DepositsTab() {
  const [deposits] = useState([
    { id: '1', deposit_date: '2026-01-31', bank_name: 'Landbank of the Philippines', total_amount: 125000, deposit_slip_number: 'DS-2026-001', status: 'reconciled', verified_by: 'COA Auditor', verified_at: '2026-02-05', or_count: 2 },
    { id: '2', deposit_date: '2026-02-28', bank_name: 'Landbank of the Philippines', total_amount: 55000, deposit_slip_number: 'DS-2026-002', status: 'reconciled', verified_by: 'COA Auditor', verified_at: '2026-03-05', or_count: 2 },
    { id: '3', deposit_date: '2026-03-31', bank_name: 'Landbank of the Philippines', total_amount: 5000, deposit_slip_number: 'DS-2026-003', status: 'verified', verified_by: 'COA Auditor', or_count: 1 },
  ]);

  const statusConfig = {
    pending: { label: 'Pending', color: '#f59e0b' },
    verified: { label: 'Verified', color: '#3b82f6' },
    reconciled: { label: 'Reconciled', color: '#10b981' },
  };

  const totalDeposits = deposits.reduce((sum, d) => sum + d.total_amount, 0);

  return (
    <View style={styles.depositsContainer}>
      <View style={styles.bankSummaryCard}>
        <View>
          <Text style={styles.bankSummaryLabel}>Total Deposited (FY 2026)</Text>
          <Text style={styles.bankSummaryValue}>₱{totalDeposits.toLocaleString()}</Text>
        </View>
        <View style={styles.bankInfo}>
          <Text style={styles.bankName}>Landbank</Text>
          <Text style={styles.bankAccount}>Account: 1234-5678-90</Text>
        </View>
      </View>

      {deposits.map((deposit) => {
        const status = statusConfig[deposit.status];

        return (
          <View key={deposit.id} style={styles.depositCard}>
            <View style={styles.depositHeader}>
              <View style={styles.depositInfo}>
                <View style={styles.depositNumberContainer}>
                  <Icon name="home" size={16} color="#6b7280" />
                  <Text style={styles.depositNumber}>{deposit.deposit_slip_number}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                </View>
                <Text style={styles.depositBank}>{deposit.bank_name}</Text>
                <Text style={styles.depositOrCount}>{deposit.or_count} receipt(s) included</Text>
              </View>
              <View style={styles.depositAmount}>
                <Text style={styles.amountValue}>₱{deposit.total_amount.toLocaleString()}</Text>
                <Text style={styles.depositDate}>{deposit.deposit_date}</Text>
              </View>
            </View>
            {deposit.verified_by && (
              <View style={styles.depositFooter}>
                <Text style={styles.verifiedBy}>
                  Verified by: {deposit.verified_by} {deposit.verified_at && `on ${deposit.verified_at}`}
                </Text>
                <TouchableOpacity style={styles.viewButton}>
                  <Icon name="eye" size={14} color="#3b82f6" />
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

function ASRPTab() {
  const asrpData = {
    fiscal_year: '2026',
    period: 'quarterly',
    beginning_balance: 125000,
    total_receipts: 180000,
    total_disbursements: 127500,
    ending_balance: 177500,
    receipts_breakdown: { national: 75000, local: 75000, internal: 25000, other: 5000 },
    disbursements_breakdown: { personnel: 60000, mooe: 52500, capital_outlay: 15000, financial: 0 },
    cash_on_hand: 27500,
    cash_in_bank: 150000,
    status: 'verified',
  };

  return (
    <View style={styles.asrpContainer}>
      <View style={styles.asrpCard}>
        <View style={styles.asrpHeader}>
          <View>
            <Text style={styles.cardTitle}>Annual Statement of Receipts and Payments</Text>
            <Text style={styles.cardSubtitle}>FY {asrpData.fiscal_year} • Q1 2026</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>
        <View style={styles.asrpCashSummary}>
          <View style={styles.asrpCashItem}>
            <Text style={styles.asrpCashLabel}>Beginning Balance</Text>
            <Text style={styles.asrpCashValue}>₱{asrpData.beginning_balance.toLocaleString()}</Text>
          </View>
          <View style={styles.asrpCashItem}>
            <Text style={styles.asrpCashLabel}>Add: Receipts</Text>
            <Text style={[styles.asrpCashValue, { color: '#10b981' }]}>₱{asrpData.total_receipts.toLocaleString()}</Text>
          </View>
          <View style={styles.asrpCashItem}>
            <Text style={styles.asrpCashLabel}>Less: Disbursements</Text>
            <Text style={[styles.asrpCashValue, { color: '#ef4444' }]}>₱{asrpData.total_disbursements.toLocaleString()}</Text>
          </View>
          <View style={styles.asrpDivider} />
          <View style={styles.asrpCashItem}>
            <Text style={styles.asrpCashLabel}>Ending Balance</Text>
            <Text style={[styles.asrpCashValue, styles.asrpCashValueLarge]}>₱{asrpData.ending_balance.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.asrpCard}>
        <Text style={styles.cardTitle}>Receipts Breakdown</Text>
        {Object.entries(asrpData.receipts_breakdown).map(([key, value]) => (
          <View key={key} style={styles.asrpBreakdownItem}>
            <Text style={styles.asrpBreakdownLabel}>{COLLECTION_TYPES[key]?.label || key}</Text>
            <Text style={styles.asrpBreakdownValue}>₱{value.toLocaleString()}</Text>
          </View>
        ))}
        <View style={styles.asrpDivider} />
        <View style={styles.asrpTotalItem}>
          <Text style={styles.asrpTotalLabel}>Total Receipts</Text>
          <Text style={styles.asrpTotalValue}>₱{asrpData.total_receipts.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.asrpCard}>
        <Text style={styles.cardTitle}>Disbursements Breakdown</Text>
        <View style={styles.asrpBreakdownItem}>
          <Text style={styles.asrpBreakdownLabel}>Personnel Services</Text>
          <Text style={styles.asrpBreakdownValue}>₱{asrpData.disbursements_breakdown.personnel.toLocaleString()}</Text>
        </View>
        <View style={styles.asrpBreakdownItem}>
          <Text style={styles.asrpBreakdownLabel}>MOOE</Text>
          <Text style={styles.asrpBreakdownValue}>₱{asrpData.disbursements_breakdown.mooe.toLocaleString()}</Text>
        </View>
        <View style={styles.asrpBreakdownItem}>
          <Text style={styles.asrpBreakdownLabel}>Capital Outlay</Text>
          <Text style={styles.asrpBreakdownValue}>₱{asrpData.disbursements_breakdown.capital_outlay.toLocaleString()}</Text>
        </View>
        <View style={styles.asrpBreakdownItem}>
          <Text style={styles.asrpBreakdownLabel}>Financial Expenses</Text>
          <Text style={styles.asrpBreakdownValue}>₱{asrpData.disbursements_breakdown.financial.toLocaleString()}</Text>
        </View>
        <View style={styles.asrpDivider} />
        <View style={styles.asrpTotalItem}>
          <Text style={styles.asrpTotalLabel}>Total Disbursements</Text>
          <Text style={styles.asrpTotalValue}>₱{asrpData.total_disbursements.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.asrpCard}>
        <Text style={styles.cardTitle}>Cash Composition</Text>
        <View style={styles.asrpBreakdownItem}>
          <View style={styles.cashCompositionIcon}>
            <Icon name="wallet" size={16} color="#6b7280" />
            <Text style={styles.asrpBreakdownLabel}>Cash on Hand</Text>
          </View>
          <Text style={styles.asrpBreakdownValue}>₱{asrpData.cash_on_hand.toLocaleString()}</Text>
        </View>
        <View style={styles.asrpBreakdownItem}>
          <View style={styles.cashCompositionIcon}>
            <Icon name="home" size={16} color="#6b7280" />
            <Text style={styles.asrpBreakdownLabel}>Cash in Bank</Text>
          </View>
          <Text style={styles.asrpBreakdownValue}>₱{asrpData.cash_in_bank.toLocaleString()}</Text>
        </View>
        <View style={styles.asrpDivider} />
        <View style={styles.asrpTotalItem}>
          <Text style={styles.asrpTotalLabel}>Total Cash Balance</Text>
          <Text style={styles.asrpTotalValue}>₱{(asrpData.cash_on_hand + asrpData.cash_in_bank).toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.asrpActions}>
        <TouchableOpacity style={styles.asrpActionButton}>
          <Icon name="download" size={16} color="#3b82f6" />
          <Text style={styles.asrpActionText}>Export PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.asrpActionButton}>
          <Icon name="refresh-cw" size={16} color="#3b82f6" />
          <Text style={styles.asrpActionText}>Submit for Review</Text>
        </TouchableOpacity>
      </View>
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
  summaryContainer: {
    gap: 12,
  },
  cashCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  cashPositionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cashPositionItem: {
    width: '47%',
  },
  cashLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  cashValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 4,
  },
  cashValueLarge: {
    fontSize: 18,
  },
  breakdownCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  breakdownLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownText: {
    fontSize: 14,
    color: '#4b5563',
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  breakdownTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  breakdownTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  breakdownTotalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  progressStack: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 12,
  },
  progressSegment: {
    height: '100%',
  },
  disbursementItem: {
    marginBottom: 12,
  },
  disbursementLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  disbursementText: {
    fontSize: 14,
    color: '#4b5563',
  },
  disbursementAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  pendingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  pendingIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pendingText: {
    fontSize: 14,
    color: '#4b5563',
  },
  pendingAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  receiptsContainer: {
    gap: 12,
  },
  receiptsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  headerValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10b981',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  receiptCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  receiptInfo: {
    flex: 1,
  },
  receiptNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  receiptNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
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
  receiptPayor: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  receiptNature: {
    fontSize: 12,
    color: '#6b7280',
  },
  receiptAmount: {
    alignItems: 'flex-end',
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  receiptDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  receiptFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  collectionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  collectionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: {
    fontSize: 13,
    color: '#3b82f6',
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
    maxHeight: '90%',
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
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1e293b',
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  typeButtonText: {
    fontSize: 12,
    color: '#4b5563',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  disbursementsContainer: {
    gap: 12,
  },
  disbursementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  disbursementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disbursementInfo: {
    flex: 1,
  },
  disbursementNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  disbursementNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  disbursementPayee: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  disbursementExplanation: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  disbursementMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  metaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  metaText: {
    fontSize: 11,
  },
  disbursementAmount: {
    alignItems: 'flex-end',
  },
  disbursementDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  disbursementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  approvedBy: {
    fontSize: 12,
    color: '#6b7280',
  },
  depositsContainer: {
    gap: 12,
  },
  bankSummaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bankSummaryLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  bankSummaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
    marginTop: 4,
  },
  bankInfo: {
    alignItems: 'flex-end',
  },
  bankName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  bankAccount: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  depositCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  depositHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  depositInfo: {
    flex: 1,
  },
  depositNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  depositNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  depositBank: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  depositOrCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  depositAmount: {
    alignItems: 'flex-end',
  },
  depositDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  depositFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  verifiedBy: {
    fontSize: 12,
    color: '#6b7280',
  },
  asrpContainer: {
    gap: 12,
  },
  asrpCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  asrpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  verifiedBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#ffffff',
  },
  asrpCashSummary: {
    gap: 12,
  },
  asrpCashItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  asrpCashLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  asrpCashValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  asrpCashValueLarge: {
    fontSize: 20,
    fontWeight: '700',
  },
  asrpDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  asrpBreakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  asrpBreakdownLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  asrpBreakdownValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  asrpTotalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  asrpTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  asrpTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  cashCompositionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  asrpActions: {
    flexDirection: 'row',
    gap: 12,
  },
  asrpActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
  },
  asrpActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3b82f6',
  },
});