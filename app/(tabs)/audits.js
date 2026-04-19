import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const DOCUMENT_CATEGORIES = {
  budget: { label: 'Budget Documents', documents: [{ name: 'Annual/Special Budget Proposal', code: 'BGT-001' }, { name: 'SCBAA', code: 'BGT-002' }] },
  receipts: { label: 'Receipts', documents: [{ name: 'Official Receipts', code: 'RCP-001' }, { name: 'Collection Reports', code: 'RCP-002' }] },
  disbursements: { label: 'Disbursements', documents: [{ name: 'Disbursement Vouchers', code: 'DBV-001' }, { name: 'Supporting Documents', code: 'DBV-002' }] },
  bank: { label: 'Bank Documents', documents: [{ name: 'Bank Statements', code: 'BNK-001' }, { name: 'Bank Reconciliation', code: 'BNK-002' }] },
  property: { label: 'Property', documents: [{ name: 'Property Acknowledgment Receipts', code: 'PRP-001' }, { name: 'Inventory Reports', code: 'PRP-002' }] },
};

const AUDIT_SEVERITY_CONFIG = {
  critical: { label: 'Critical', color: '#dc2626', variant: 'destructive' },
  major: { label: 'Major', color: '#f59e0b', variant: 'default' },
  minor: { label: 'Minor', color: '#3b82f6', variant: 'secondary' },
};

const AUDIT_STATUS_CONFIG = {
  planned: { label: 'Planned', color: '#3b82f6', variant: 'secondary' },
  fieldwork: { label: 'Fieldwork', color: '#8b5cf6', variant: 'default' },
  completed: { label: 'Completed', color: '#10b981', variant: 'default' },
};

export default function AuditManagementScreen() {
  const [activeTab, setActiveTab] = useState('engagements');

  const tabs = [
    { key: 'engagements', label: 'Engagements', icon: 'clipboard' },
    { key: 'checklist', label: 'Checklist', icon: 'check-square' },
    { key: 'findings', label: 'Findings', icon: 'alert-triangle' },
    { key: 'saor', label: 'SAOR', icon: 'search' },
    { key: 'aar', label: 'AAR', icon: 'file-text' },
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
        {activeTab === 'engagements' && <EngagementsTab />}
        {activeTab === 'checklist' && <ChecklistTab />}
        {activeTab === 'findings' && <FindingsTab />}
        {activeTab === 'saor' && <SAORTab />}
        {activeTab === 'aar' && <AARTab />}
      </ScrollView>
    </View>
  );
}

function EngagementsTab() {
  const engagements = [
    { id: '1', sk_unit: 'SK Poblacion', barangay: 'Poblacion', fiscal_year: '2026', audit_type: 'regular', status: 'completed', start_date: '2026-01-15', end_date: '2026-03-15', team_leader: 'Maria Santos', team_members: ['Juan Cruz', 'Ana Reyes'], scope: 'FY 2025 Financial Transactions' },
    { id: '2', sk_unit: 'SK San Jose', barangay: 'San Jose', fiscal_year: '2026', audit_type: 'compliance', status: 'fieldwork', start_date: '2026-04-01', end_date: null, team_leader: 'Pedro Garcia', team_members: ['Lucia Mendoza'], scope: 'Compliance with SK Fund Guidelines' },
    { id: '3', sk_unit: 'SK Mabini', barangay: 'Mabini', fiscal_year: '2026', audit_type: 'special', status: 'planned', start_date: '2026-05-01', end_date: null, team_leader: 'Maria Santos', team_members: [], scope: 'Special Audit on Honoraria' },
  ];

  const completedCount = engagements.filter(e => e.status === 'completed').length;
  const fieldworkCount = engagements.filter(e => e.status === 'fieldwork').length;
  const plannedCount = engagements.filter(e => e.status === 'planned').length;

  return (
    <View style={styles.section}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: '#10b98120' }]}>
            <Icon name="check-circle" size={20} color="#10b981" />
          </View>
          <Text style={styles.summaryCount}>{completedCount}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: '#8b5cf620' }]}>
            <Icon name="clock" size={20} color="#8b5cf6" />
          </View>
          <Text style={styles.summaryCount}>{fieldworkCount}</Text>
          <Text style={styles.summaryLabel}>In Fieldwork</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: '#3b82f620' }]}>
            <Icon name="calendar" size={20} color="#3b82f6" />
          </View>
          <Text style={styles.summaryCount}>{plannedCount}</Text>
          <Text style={styles.summaryLabel}>Planned</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Audit Engagements</Text>
      {engagements.map((engagement) => {
        const status = AUDIT_STATUS_CONFIG[engagement.status];
        return (
          <View key={engagement.id} style={styles.engagementCard}>
            <View style={styles.engagementHeader}>
              <View>
                <View style={styles.engagementTitleRow}>
                  <Icon name="home" size={16} color="#6b7280" />
                  <Text style={styles.engagementTitle}>{engagement.sk_unit}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                </View>
                <Text style={styles.engagementSubtitle}>{engagement.barangay} • FY {engagement.fiscal_year}</Text>
              </View>
              <View style={styles.auditTypeBadge}>
                <Text style={styles.auditTypeText}>{engagement.audit_type}</Text>
              </View>
            </View>
            <View style={styles.engagementDetails}>
              <View style={styles.detailRow}>
                <Icon name="file-text" size={14} color="#6b7280" />
                <Text style={styles.detailText}>{engagement.scope}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="users" size={14} color="#6b7280" />
                <Text style={styles.detailText}>Lead: {engagement.team_leader}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="calendar" size={14} color="#6b7280" />
                <Text style={styles.detailText}>
                  {engagement.start_date} {engagement.end_date ? `→ ${engagement.end_date}` : '(Ongoing)'}
                </Text>
              </View>
            </View>
            <View style={styles.engagementActions}>
              <TouchableOpacity style={styles.actionOutlineButton}>
                <Icon name="eye" size={14} color="#3b82f6" />
                <Text style={styles.actionOutlineText}>View</Text>
              </TouchableOpacity>
              {engagement.status === 'planned' && (
                <TouchableOpacity style={styles.actionPrimaryButton}>
                  <Icon name="send" size={14} color="#ffffff" />
                  <Text style={styles.actionPrimaryText}>Start</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function ChecklistTab() {
  const [selectedCategory, setSelectedCategory] = useState('budget');
  const [checklist, setChecklist] = useState([
    { id: '1', document_name: 'Annual/Special Budget Proposal', category: 'budget', is_required: true, submitted: true, verified: true, verified_by: 'Maria Santos' },
    { id: '2', document_name: 'SCBAA', category: 'budget', is_required: true, submitted: true, verified: true, verified_by: 'Maria Santos' },
    { id: '3', document_name: 'Official Receipts', category: 'receipts', is_required: true, submitted: false, verified: false },
    { id: '4', document_name: 'Disbursement Vouchers', category: 'disbursements', is_required: true, submitted: true, verified: false, remarks: 'Pending review' },
    { id: '5', document_name: 'Bank Statements', category: 'bank', is_required: true, submitted: true, verified: true, verified_by: 'Maria Santos' },
    { id: '6', document_name: 'Property Acknowledgment Receipts', category: 'property', is_required: false, submitted: true, verified: false },
  ]);

  const categoryDocs = DOCUMENT_CATEGORIES[selectedCategory];
  const categoryItems = checklist.filter((item) => item.category === selectedCategory);
  const submittedCount = categoryItems.filter((i) => i.submitted).length;
  const verifiedCount = categoryItems.filter((i) => i.verified).length;

  const toggleSubmit = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, submitted: !item.submitted } : item
    ));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Document Checklist</Text>
      <Text style={styles.sectionSubtitle}>Review required documents per COA guidelines</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categoryButtons}>
          {Object.entries(DOCUMENT_CATEGORIES).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              style={[styles.categoryButton, selectedCategory === key && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(key)}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === key && styles.categoryButtonTextActive]}>
                {value.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.progressCard}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Submission Progress</Text>
          <Text style={styles.progressValue}>{submittedCount}/{categoryItems.length}</Text>
        </View>
        <Progress value={(submittedCount / categoryItems.length) * 100} />
        <View style={[styles.progressRow, { marginTop: 12 }]}>
          <Text style={styles.progressLabel}>Verification Progress</Text>
          <Text style={styles.progressValue}>{verifiedCount}/{categoryItems.filter(i => i.is_required).length} required</Text>
        </View>
        <Progress value={categoryItems.filter(i => i.is_required).length > 0 ? (verifiedCount / categoryItems.filter(i => i.is_required).length) * 100 : 0} />
      </View>

      <View style={styles.documentCard}>
        <Text style={styles.documentCardTitle}>{categoryDocs.label}</Text>
        <Text style={styles.documentCardSubtitle}>{categoryDocs.documents.length} documents</Text>
        {categoryDocs.documents.map((doc, idx) => {
          const checkItem = categoryItems.find((c) => c.document_name === doc.name);
          return (
            <View key={idx}>
              <View style={styles.documentItem}>
                <TouchableOpacity onPress={() => toggleSubmit(checkItem?.id)}>
                  {checkItem?.submitted ? (
                    <Icon name="check-circle" size={20} color="#10b981" />
                  ) : (
                    <Icon name="square" size={20} color="#94a3b8" />
                  )}
                </TouchableOpacity>
                <View style={styles.documentInfo}>
                  <View style={styles.documentHeader}>
                    <Text style={styles.documentName}>{doc.name}</Text>
                    {checkItem?.is_required && (
                      <View style={styles.requiredBadge}>
                        <Text style={styles.requiredText}>Required</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.documentCode}>Code: {doc.code}</Text>
                  {checkItem?.submitted && (
                    <View style={styles.documentStatus}>
                      <View style={[styles.statusBadgeSmall, { backgroundColor: checkItem.verified ? '#10b98120' : '#f59e0b20' }]}>
                        <Text style={[styles.statusTextSmall, { color: checkItem.verified ? '#10b981' : '#f59e0b' }]}>
                          {checkItem.verified ? 'Verified' : 'Pending Verification'}
                        </Text>
                      </View>
                      {checkItem.verified_by && (
                        <Text style={styles.verifiedBy}>by {checkItem.verified_by}</Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
              {idx < categoryDocs.documents.length - 1 && <View style={styles.documentDivider} />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

function FindingsTab() {
  const findings = [
    { id: '1', observation_number: 'OBS-2026-001', severity: 'critical', title: 'Missing Disbursement Vouchers', description: 'Three disbursement vouchers totaling ₱45,000 lack supporting documents.', recommendation: 'SK Treasury should ensure all disbursements are properly supported.', response: 'We will coordinate to retrieve the missing documents.', status: 'addressed', target_date: '2026-04-15' },
    { id: '2', observation_number: 'OBS-2026-002', severity: 'major', title: 'Delayed Bank Deposits', description: 'Collections were deposited 5-7 days after collection.', recommendation: 'Implement immediate deposit procedure for all collections.', response: null, status: 'open', target_date: null },
    { id: '3', observation_number: 'OBS-2026-003', severity: 'minor', title: 'Incomplete Payroll DTRs', description: 'Daily Time Records have erasures without proper authentication.', recommendation: 'All DTR entries should be authenticated properly.', response: 'We will use digital DTR system.', status: 'resolved', target_date: '2026-03-31', actual_date: '2026-03-28' },
  ];

  const openCount = findings.filter(f => f.status === 'open').length;
  const addressedCount = findings.filter(f => f.status === 'addressed').length;
  const resolvedCount = findings.filter(f => f.status === 'resolved').length;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Audit Findings</Text>
      <Text style={styles.sectionSubtitle}>Observations from completed audits</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: '#dc262620' }]}>
            <Icon name="alert-triangle" size={20} color="#dc2626" />
          </View>
          <Text style={styles.summaryCount}>{openCount}</Text>
          <Text style={styles.summaryLabel}>Open</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: '#f59e0b20' }]}>
            <Icon name="clock" size={20} color="#f59e0b" />
          </View>
          <Text style={styles.summaryCount}>{addressedCount}</Text>
          <Text style={styles.summaryLabel}>Addressed</Text>
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryIcon, { backgroundColor: '#10b98120' }]}>
            <Icon name="check-circle" size={20} color="#10b981" />
          </View>
          <Text style={styles.summaryCount}>{resolvedCount}</Text>
          <Text style={styles.summaryLabel}>Resolved</Text>
        </View>
      </View>

      {findings.map((finding) => {
        const severity = AUDIT_SEVERITY_CONFIG[finding.severity];
        return (
          <View key={finding.id} style={styles.findingCard}>
            <View style={styles.findingHeader}>
              <View>
                <View style={styles.findingTitleRow}>
                  <Text style={styles.findingNumber}>{finding.observation_number}</Text>
                  <View style={[styles.severityBadge, { backgroundColor: severity.color + '20' }]}>
                    <Text style={[styles.severityText, { color: severity.color }]}>{severity.label}</Text>
                  </View>
                </View>
                <Text style={styles.findingTitle}>{finding.title}</Text>
              </View>
            </View>
            <View style={styles.findingObservation}>
              <Icon name="alert-circle" size={14} color="#dc2626" />
              <Text style={styles.findingDescription}>{finding.description}</Text>
            </View>
            <View style={styles.findingRecommendation}>
              <Icon name="shield" size={14} color="#0369a1" />
              <Text style={styles.recommendationText}>{finding.recommendation}</Text>
            </View>
            {finding.response && (
              <View style={styles.findingResponse}>
                <Icon name="file-text" size={14} color="#166534" />
                <View>
                  <Text style={styles.responseLabel}>SK Response:</Text>
                  <Text style={styles.responseText}>{finding.response}</Text>
                </View>
              </View>
            )}
            <View style={styles.findingFooter}>
              <View style={styles.findingDates}>
                {finding.target_date && (
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>Due: {finding.target_date}</Text>
                  </View>
                )}
                {finding.actual_date && (
                  <View style={styles.resolvedBadge}>
                    <Text style={styles.resolvedText}>Resolved: {finding.actual_date}</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={styles.findingAction}>
                <Icon name="eye" size={14} color="#3b82f6" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function SAORTab() {
  const saorItems = [
    { id: '1', reference_number: 'SAOR-2026-001', subject: 'Missing Disbursement Vouchers - Immediate Action Required', nature: 'observation', status: 'addressed', date_issued: '2026-03-15', due_date: '2026-04-15', date_addressed: '2026-03-25', remarks: 'SK has submitted corrective action plan.' },
    { id: '2', reference_number: 'SAOR-2026-002', subject: 'Delayed Bank Deposits - Compliance Advisory', nature: 'recommendation', status: 'pending', date_issued: '2026-03-15', due_date: '2026-04-01', date_addressed: null, remarks: 'Awaiting SK response and action taken.' },
    { id: '3', reference_number: 'SAOR-2026-003', subject: 'Proper Documentation of Financial Transactions', nature: 'compliance', status: 'resolved', date_issued: '2026-02-01', due_date: '2026-02-28', date_addressed: '2026-02-25', remarks: 'SK has implemented proper documentation procedures.' },
  ];

  const statusConfig = {
    pending: { label: 'Pending', color: '#f59e0b' },
    addressed: { label: 'Addressed', color: '#3b82f6' },
    resolved: { label: 'Resolved', color: '#10b981' },
  };

  return (
    <View style={styles.section}>
      <View style={styles.saorHeader}>
        <View>
          <Text style={styles.sectionTitle}>SAOR</Text>
          <Text style={styles.sectionSubtitle}>Summary of Audit Observations & Recommendations</Text>
        </View>
        <TouchableOpacity style={styles.newButton}>
          <Icon name="plus" size={16} color="#ffffff" />
          <Text style={styles.newButtonText}>New SAOR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoAlert}>
        <Icon name="alert-triangle" size={16} color="#f59e0b" />
        <View>
          <Text style={styles.alertTitle}>About SAOR</Text>
          <Text style={styles.alertText}>
            SAOR documents audit observations and recommendations that require management response and corrective action.
          </Text>
        </View>
      </View>

      {saorItems.map((item) => {
        const status = statusConfig[item.status];
        return (
          <View key={item.id} style={styles.saorCard}>
            <View style={styles.saorCardHeader}>
              <View style={styles.saorNumberRow}>
                <Icon name="file-text" size={16} color="#6b7280" />
                <Text style={styles.saorNumber}>{item.reference_number}</Text>
                <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                  <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                </View>
                <View style={styles.natureBadge}>
                  <Text style={styles.natureText}>{item.nature}</Text>
                </View>
              </View>
              <Text style={styles.saorSubject}>{item.subject}</Text>
            </View>
            <View style={styles.saorDates}>
              <Icon name="calendar" size={14} color="#6b7280" />
              <Text style={styles.saorDateText}>Issued: {item.date_issued}</Text>
              {item.due_date && <Text style={styles.saorDateText}>• Due: {item.due_date}</Text>}
              {item.date_addressed && <Text style={[styles.saorDateText, styles.dateAddressed]}>• Addressed: {item.date_addressed}</Text>}
            </View>
            <View style={styles.saorRemarks}>
              <Icon name="file-text" size={14} color="#6b7280" />
              <Text style={styles.remarksText}>{item.remarks}</Text>
            </View>
            <View style={styles.saorActions}>
              <TouchableOpacity style={styles.actionOutlineButton}>
                <Icon name="eye" size={14} color="#3b82f6" />
                <Text style={styles.actionOutlineText}>View</Text>
              </TouchableOpacity>
              {item.status === 'pending' && (
                <TouchableOpacity style={styles.actionPrimaryButton}>
                  <Icon name="check-circle" size={14} color="#ffffff" />
                  <Text style={styles.actionPrimaryText}>Mark Addressed</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function AARTab() {
  const aarReports = [
    { id: '1', sk_unit: 'SK Poblacion', barangay: 'Poblacion', fiscal_year: '2025', report_number: 'AAR-2025-POB', date_issued: '2026-03-30', auditor_name: 'Maria Santos', findings_summary: '3 findings identified: 1 critical, 1 major, 1 minor.', recommendations_summary: 'SK should strengthen internal controls.', overall_assessment: 'satisfactory with exceptions', status: 'published' },
    { id: '2', sk_unit: 'SK San Jose', barangay: 'San Jose', fiscal_year: '2025', report_number: 'AAR-2025-SJ', date_issued: null, auditor_name: 'Pedro Garcia', findings_summary: 'Audit in progress. Preliminary findings include incomplete financial records.', recommendations_summary: 'Pending completion of fieldwork.', overall_assessment: 'satisfactory', status: 'draft' },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.saorHeader}>
        <View>
          <Text style={styles.sectionTitle}>Annual Audit Reports</Text>
          <Text style={styles.sectionSubtitle}>Final audit reports per SK Unit</Text>
        </View>
        <TouchableOpacity style={styles.newButton}>
          <Icon name="plus" size={16} color="#ffffff" />
          <Text style={styles.newButtonText}>Generate AAR</Text>
        </TouchableOpacity>
      </View>

      {aarReports.filter(r => r.status === 'published').map((report) => (
        <View key={report.id} style={styles.aarCard}>
          <View style={styles.aarHeader}>
            <View>
              <View style={styles.publishedBadge}>
                <Text style={styles.publishedText}>Published</Text>
              </View>
              <Text style={styles.aarTitle}>{report.sk_unit}</Text>
              <Text style={styles.aarSubtitle}>{report.barangay} • FY {report.fiscal_year}</Text>
            </View>
            <View style={styles.aarMeta}>
              <Text style={styles.aarNumber}>{report.report_number}</Text>
              <Text style={styles.aarDate}>{report.date_issued}</Text>
            </View>
          </View>
          <View style={styles.aarContent}>
            <View>
              <Text style={styles.aarLabel}>Auditor</Text>
              <Text style={styles.aarText}>{report.auditor_name}</Text>
            </View>
            <View>
              <Text style={styles.aarLabel}>Findings Summary</Text>
              <Text style={styles.aarText}>{report.findings_summary}</Text>
            </View>
            <View>
              <Text style={styles.aarLabel}>Recommendations</Text>
              <Text style={styles.aarText}>{report.recommendations_summary}</Text>
            </View>
            <View style={styles.aarFooter}>
              <View>
                <Text style={styles.aarLabel}>Overall Assessment</Text>
                <View style={styles.assessmentBadge}>
                  <Text style={styles.assessmentText}>{report.overall_assessment}</Text>
                </View>
              </View>
              <View style={styles.aarActions}>
                <TouchableOpacity style={styles.actionOutlineButton}>
                  <Icon name="download" size={14} color="#3b82f6" />
                  <Text style={styles.actionOutlineText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionOutlineButton}>
                  <Icon name="eye" size={14} color="#3b82f6" />
                  <Text style={styles.actionOutlineText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}

      {aarReports.filter(r => r.status === 'draft').map((report) => (
        <View key={report.id} style={[styles.aarCard, styles.draftCard]}>
          <View style={styles.aarHeader}>
            <View>
              <View style={styles.draftBadge}>
                <Text style={styles.draftText}>Draft</Text>
              </View>
              <Text style={styles.aarTitle}>{report.sk_unit}</Text>
              <Text style={styles.aarSubtitle}>{report.barangay} • FY {report.fiscal_year}</Text>
            </View>
          </View>
          <View style={styles.draftAlert}>
            <Icon name="alert-circle" size={16} color="#f59e0b" />
            <View>
              <Text style={styles.alertTitle}>Audit Ongoing</Text>
              <Text style={styles.alertText}>{report.findings_summary}</Text>
            </View>
          </View>
          <View style={styles.draftActions}>
            <TouchableOpacity style={styles.actionOutlineButton}>
              <Icon name="eye" size={14} color="#3b82f6" />
              <Text style={styles.actionOutlineText}>View Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionPrimaryButton}>
              <Icon name="send" size={14} color="#ffffff" />
              <Text style={styles.actionPrimaryText}>Submit for Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  engagementCard: {
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
  engagementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  engagementTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  engagementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  engagementSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  auditTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  auditTypeText: {
    fontSize: 11,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  engagementDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#4b5563',
  },
  engagementActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  actionOutlineButton: {
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
  actionOutlineText: {
    fontSize: 13,
    color: '#3b82f6',
  },
  actionPrimaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
  },
  actionPrimaryText: {
    fontSize: 13,
    color: '#ffffff',
  },
  categoryScroll: {
    marginBottom: 12,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  categoryButtonActive: {
    backgroundColor: '#3b82f6',
  },
  categoryButtonText: {
    fontSize: 13,
    color: '#4b5563',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  progressCard: {
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
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#4b5563',
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1e293b',
  },
  documentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  documentCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  documentCardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  documentItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  requiredBadge: {
    backgroundColor: '#dc262620',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  requiredText: {
    fontSize: 10,
    color: '#dc2626',
  },
  documentCode: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  documentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadgeSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusTextSmall: {
    fontSize: 10,
    fontWeight: '500',
  },
  verifiedBy: {
    fontSize: 11,
    color: '#6b7280',
  },
  documentDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  findingCard: {
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
  findingHeader: {
    marginBottom: 12,
  },
  findingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  findingNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  findingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  findingObservation: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
  },
  findingDescription: {
    flex: 1,
    fontSize: 13,
    color: '#dc2626',
  },
  findingRecommendation: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 13,
    color: '#0369a1',
  },
  findingResponse: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
  },
  responseLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#166534',
  },
  responseText: {
    fontSize: 12,
    color: '#166534',
  },
  findingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  findingDates: {
    flexDirection: 'row',
    gap: 8,
  },
  dateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dateText: {
    fontSize: 11,
  },
  resolvedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  resolvedText: {
    fontSize: 11,
    color: '#ffffff',
  },
  findingAction: {
    padding: 4,
  },
  saorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  newButtonText: {
    fontSize: 13,
    color: '#ffffff',
  },
  infoAlert: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    marginBottom: 16,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#92400e',
  },
  alertText: {
    fontSize: 12,
    color: '#92400e',
    marginTop: 2,
  },
  saorCard: {
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
  saorCardHeader: {
    marginBottom: 12,
  },
  saorNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  saorNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  natureBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  natureText: {
    fontSize: 11,
    color: '#6b7280',
  },
  saorSubject: {
    fontSize: 14,
    color: '#1e293b',
  },
  saorDates: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  saorDateText: {
    fontSize: 12,
    color: '#6b7280',
  },
  dateAddressed: {
    color: '#10b981',
  },
  saorRemarks: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  remarksText: {
    flex: 1,
    fontSize: 12,
    color: '#4b5563',
  },
  saorActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  aarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  draftCard: {
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderStyle: 'dashed',
  },
  aarHeader: {
    padding: 16,
    backgroundColor: '#f8fafc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  publishedBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  publishedText: {
    fontSize: 11,
    color: '#ffffff',
  },
  draftBadge: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  draftText: {
    fontSize: 11,
    color: '#ffffff',
  },
  aarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
  },
  aarSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  aarMeta: {
    alignItems: 'flex-end',
  },
  aarNumber: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1e293b',
  },
  aarDate: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  aarContent: {
    padding: 16,
    gap: 12,
  },
  aarLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  aarText: {
    fontSize: 13,
    color: '#1e293b',
  },
  aarFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  assessmentBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  assessmentText: {
    fontSize: 12,
    color: '#ffffff',
  },
  aarActions: {
    flexDirection: 'row',
    gap: 8,
  },
  draftAlert: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#fef3c7',
  },
  draftActions: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
});