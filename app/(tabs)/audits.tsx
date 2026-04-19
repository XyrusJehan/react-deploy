import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  ClipboardList,
  FileSearch,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Plus,
  Shield,
  Users,
  Calendar,
  Building2,
  Download,
  Eye,
  Send,
  CheckSquare,
  Square,
  AlertCircle
} from 'lucide-react';
import {
  AuditEngagement,
  DocumentChecklist,
  AuditFinding,
  SAORItem,
  AnnualAuditReport,
  DOCUMENT_CATEGORIES,
  AUDIT_SEVERITY_CONFIG,
  AUDIT_STATUS_CONFIG,
  DocumentCategory,
} from '@/lib/audit-types';

type TabType = 'engagements' | 'checklist' | 'findings' | 'saor' | 'aar';

const tabs: { key: TabType; label: string; icon: typeof ClipboardList }[] = [
  { key: 'engagements', label: 'Engagements', icon: ClipboardList },
  { key: 'checklist', label: 'Checklist', icon: CheckSquare },
  { key: 'findings', label: 'Findings', icon: AlertTriangle },
  { key: 'saor', label: 'SAOR', icon: FileSearch },
  { key: 'aar', label: 'AAR', icon: FileText },
];

export default function AuditManagementScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<TabType>('engagements');

  return (
    <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tab,
                  activeTab === tab.key && styles.tabActive,
                ]}
              >
                <Icon size={18} style={activeTab === tab.key ? { color: colors.primary } : { color: colors.icon }} />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: activeTab === tab.key ? colors.primary : colors.icon },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Tab Content */}
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
  const engagements: AuditEngagement[] = [
    {
      id: '1',
      sk_unit: 'SK Poblacion',
      barangay: 'Poblacion',
      fiscal_year: '2026',
      audit_type: 'regular',
      status: 'completed',
      start_date: '2026-01-15',
      end_date: '2026-03-15',
      team_leader: 'Maria Santos',
      team_members: ['Juan Cruz', 'Ana Reyes'],
      scope: 'FY 2025 Financial Transactions',
      objectives: ['Verify compliance with COA regulations', 'Assess internal controls', 'Review budget utilization'],
      created_at: '2026-01-10',
      updated_at: '2026-03-15',
    },
    {
      id: '2',
      sk_unit: 'SK San Jose',
      barangay: 'San Jose',
      fiscal_year: '2026',
      audit_type: 'compliance',
      status: 'fieldwork',
      start_date: '2026-04-01',
      end_date: null,
      team_leader: 'Pedro Garcia',
      team_members: ['Lucia Mendoza'],
      scope: 'Compliance with SK Fund Guidelines',
      objectives: ['Verify document submission', 'Review disbursement procedures', 'Check budget compliance'],
      created_at: '2026-03-25',
      updated_at: '2026-04-05',
    },
    {
      id: '3',
      sk_unit: 'SK Mabini',
      barangay: 'Mabini',
      fiscal_year: '2026',
      audit_type: 'special',
      status: 'planned',
      start_date: '2026-05-01',
      end_date: null,
      team_leader: 'Maria Santos',
      team_members: [],
      scope: 'Special Audit on Honoraria',
      objectives: ['Review honoraria payments', 'Verify compliance with regulations'],
      created_at: '2026-04-01',
      updated_at: '2026-04-01',
    },
  ];

  const statusCfg = AUDIT_STATUS_CONFIG;

  return (
    <View style={styles.section}>
      {/* Summary */}
      <View style={styles.summaryRow}>
        <Card className="flex-1">
          <CardContent className="pt-4">
            <View className="flex flex-row items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <Text className="text-sm text-muted-foreground">Completed</Text>
            </View>
            <Text className="text-2xl font-bold mt-1">1</Text>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="pt-4">
            <View className="flex flex-row items-center gap-2">
              <Clock className="size-5 text-purple-600" />
              <Text className="text-sm text-muted-foreground">In Fieldwork</Text>
            </View>
            <Text className="text-2xl font-bold mt-1">1</Text>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="pt-4">
            <View className="flex flex-row items-center gap-2">
              <Calendar className="size-5 text-blue-600" />
              <Text className="text-sm text-muted-foreground">Planned</Text>
            </View>
            <Text className="text-2xl font-bold mt-1">1</Text>
          </CardContent>
        </Card>
      </View>

      {/* Engagements List */}
      <Text style={styles.sectionTitle}>Audit Engagements</Text>
      {engagements.map((engagement) => {
        const status = statusCfg[engagement.status];
        return (
          <Card key={engagement.id} className="mb-3">
            <CardContent className="pt-4">
              <View className="flex flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <View className="flex flex-row items-center gap-2 mb-1">
                    <Building2 className="size-4 text-muted-foreground" />
                    <Text className="font-medium">{engagement.sk_unit}</Text>
                    <Badge variant={status.variant as any}>{status.label}</Badge>
                  </View>
                  <Text className="text-sm text-muted-foreground">{engagement.barangay} • FY {engagement.fiscal_year}</Text>
                </View>
                <Badge variant="outline">{engagement.audit_type}</Badge>
              </View>

              <Separator className="my-3" />

              <View className="gap-2">
                <View className="flex flex-row items-center gap-2">
                  <FileText className="size-4 text-muted-foreground" />
                  <Text className="text-sm">{engagement.scope}</Text>
                </View>
                <View className="flex flex-row items-center gap-2">
                  <Users className="size-4 text-muted-foreground" />
                  <Text className="text-sm">Lead: {engagement.team_leader}</Text>
                </View>
                <View className="flex flex-row items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <Text className="text-sm">
                    {engagement.start_date} {engagement.end_date ? `→ ${engagement.end_date}` : '(Ongoing)'}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="size-3 mr-1" /> View
                </Button>
                {engagement.status === 'planned' && (
                  <Button size="sm" className="flex-1">
                    <Send className="size-3 mr-1" /> Start
                  </Button>
                )}
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
}

function ChecklistTab() {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('budget');
  const checklist: DocumentChecklist[] = [
    { id: '1', audit_id: 'a1', document_name: 'Annual/Special Budget Proposal', description: 'Approved budget document', category: 'budget', is_required: true, submitted: true, submitted_at: '2026-02-01', verified: true, verified_at: '2026-02-05', verified_by: 'Maria Santos', remarks: null },
    { id: '2', audit_id: 'a1', document_name: 'SCBAA', description: 'Statement of Comparison of Budget and Actual Amounts', category: 'budget', is_required: true, submitted: true, submitted_at: '2026-02-01', verified: true, verified_at: '2026-02-05', verified_by: 'Maria Santos', remarks: null },
    { id: '3', audit_id: 'a1', document_name: 'Official Receipts', description: 'All official receipts for the year', category: 'receipts', is_required: true, submitted: false, submitted_at: null, verified: false, verified_at: null, verified_by: null, remarks: null },
    { id: '4', audit_id: 'a1', document_name: 'Disbursement Vouchers', description: 'All DV with supporting documents', category: 'disbursements', is_required: true, submitted: true, submitted_at: '2026-02-10', verified: false, verified_at: null, verified_by: null, remarks: 'Pending review' },
    { id: '5', audit_id: 'a1', document_name: 'Bank Statements', description: 'All bank statements with reconciliation', category: 'bank', is_required: true, submitted: true, submitted_at: '2026-02-15', verified: true, verified_at: '2026-02-20', verified_by: 'Maria Santos', remarks: null },
    { id: '6', audit_id: 'a1', document_name: 'Property Acknowledgment Receipts', description: 'PAR for all equipment', category: 'property', is_required: false, submitted: true, submitted_at: '2026-02-15', verified: false, verified_at: null, verified_by: null, remarks: null },
  ];

  const categoryDocs = DOCUMENT_CATEGORIES[selectedCategory];
  const categoryItems = checklist.filter((item) => item.category === selectedCategory);

  const submittedCount = categoryItems.filter((i) => i.submitted).length;
  const verifiedCount = categoryItems.filter((i) => i.verified).length;
  const requiredCount = categoryItems.filter((i) => i.is_required).length;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Document Checklist</Text>
      <Text style={styles.sectionSubtitle}>Review required documents per COA guidelines</Text>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 mt-2">
        <View className="flex flex-row gap-2">
          {(Object.keys(DOCUMENT_CATEGORIES) as DocumentCategory[]).map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onPress={() => setSelectedCategory(cat)}
            >
              {DOCUMENT_CATEGORIES[cat].label}
            </Button>
          ))}
        </View>
      </ScrollView>

      {/* Progress */}
      <Card className="mb-4">
        <CardContent className="pt-4">
          <View className="flex flex-row justify-between mb-2">
            <Text className="text-sm font-medium">Submission Progress</Text>
            <Text className="text-sm text-muted-foreground">{submittedCount}/{categoryItems.length}</Text>
          </View>
          <Progress value={(submittedCount / categoryItems.length) * 100} className="h-2" />
          <View className="flex flex-row justify-between mb-2 mt-3">
            <Text className="text-sm font-medium">Verification Progress</Text>
            <Text className="text-sm text-muted-foreground">{verifiedCount}/{requiredCount} required</Text>
          </View>
          <Progress value={requiredCount > 0 ? (verifiedCount / requiredCount) * 100 : 0} className="h-2" />
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle>{categoryDocs.label}</CardTitle>
          <CardDescription>{categoryDocs.documents.length} documents</CardDescription>
        </CardHeader>
        <CardContent>
          {categoryDocs.documents.map((doc, idx) => {
            const checkItem = categoryItems.find((c) => c.document_name === doc.name);
            return (
              <View key={idx}>
                <View className="flex flex-row items-start gap-3 py-3">
                  {checkItem?.submitted ? (
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                  ) : (
                    <Square className="size-5 text-muted-foreground mt-0.5" />
                  )}
                  <View className="flex-1">
                    <View className="flex flex-row items-center gap-2">
                      <Text className="font-medium text-sm">{doc.name}</Text>
                      {checkItem?.is_required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                    </View>
                    <Text className="text-xs text-muted-foreground">Code: {doc.code}</Text>
                    {checkItem?.submitted && (
                      <View className="flex flex-row items-center gap-2 mt-1">
                        <Badge variant={checkItem.verified ? 'default' : 'secondary'} className="text-xs">
                          {checkItem.verified ? 'Verified' : 'Pending Verification'}
                        </Badge>
                        {checkItem.verified_by && (
                          <Text className="text-xs text-muted-foreground">by {checkItem.verified_by}</Text>
                        )}
                      </View>
                    )}
                    {!checkItem?.submitted && (
                      <Text className="text-xs text-orange-600 mt-1">Not yet submitted</Text>
                    )}
                  </View>
                </View>
                {idx < categoryDocs.documents.length - 1 && <Separator />}
              </View>
            );
          })}
        </CardContent>
      </Card>
    </View>
  );
}

function FindingsTab() {
  const findings: AuditFinding[] = [
    {
      id: '1',
      audit_id: 'a1',
      observation_number: 'OBS-2026-001',
      reference: 'COA Circular 2020-003',
      category: 'compliance',
      severity: 'critical',
      title: 'Missing Disbursement Vouchers',
      description: 'Three disbursement vouchers totaling ₱45,000 lack supporting documents (purchase orders, delivery receipts).',
      recommendation: 'SK Treasury should ensure all disbursements are properly supported before payment release.',
      response: 'We will coordinate with the SK Chairman to retrieve the missing documents.',
      response_date: '2026-03-20',
      status: 'addressed',
      target_date: '2026-04-15',
      actual_date: null,
      created_at: '2026-03-15',
    },
    {
      id: '2',
      audit_id: 'a1',
      observation_number: 'OBS-2026-002',
      reference: 'RA 10742',
      category: 'internal_control',
      severity: 'major',
      title: 'Delayed Bank Deposits',
      description: 'Collections were deposited 5-7 days after collection, contrary to the 24-hour deposit rule.',
      recommendation: 'Implement immediate deposit procedure for all collections.',
      response: null,
      response_date: null,
      status: 'open',
      target_date: null,
      actual_date: null,
      created_at: '2026-03-15',
    },
    {
      id: '3',
      audit_id: 'a1',
      observation_number: 'OBS-2026-003',
      reference: 'SK Handbook',
      category: 'operational',
      severity: 'minor',
      title: 'Incomplete Payroll DTRs',
      description: 'Daily Time Records for 3 SK members have erasures and alterations without proper authentication.',
      recommendation: 'All DTR entries should be authenticated and errors should be crossed out properly.',
      response: 'We will use digital DTR system going forward.',
      response_date: '2026-03-25',
      status: 'resolved',
      target_date: '2026-03-31',
      actual_date: '2026-03-28',
      created_at: '2026-03-15',
    },
  ];

  const severityCfg = AUDIT_SEVERITY_CONFIG;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Audit Findings</Text>
      <Text style={styles.sectionSubtitle}>Observations from completed audits</Text>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <Card className="flex-1">
          <CardContent className="pt-4">
            <View className="flex flex-row items-center gap-2">
              <AlertTriangle className="size-5 text-red-600" />
              <Text className="text-sm text-muted-foreground">Open</Text>
            </View>
            <Text className="text-2xl font-bold mt-1">
              {findings.filter((f) => f.status === 'open').length}
            </Text>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="pt-4">
            <View className="flex flex-row items-center gap-2">
              <Clock className="size-5 text-yellow-600" />
              <Text className="text-sm text-muted-foreground">Addressed</Text>
            </View>
            <Text className="text-2xl font-bold mt-1">
              {findings.filter((f) => f.status === 'addressed').length}
            </Text>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="pt-4">
            <View className="flex flex-row items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <Text className="text-sm text-muted-foreground">Resolved</Text>
            </View>
            <Text className="text-2xl font-bold mt-1">
              {findings.filter((f) => f.status === 'resolved').length}
            </Text>
          </CardContent>
        </Card>
      </View>

      {/* Findings List */}
      {findings.map((finding) => {
        const sev = severityCfg[finding.severity];
        return (
          <Card key={finding.id} className="mb-3">
            <CardContent className="pt-4">
              <View className="flex flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <View className="flex flex-row items-center gap-2 mb-1">
                    <Text className="font-medium">{finding.observation_number}</Text>
                    <Badge variant={sev.variant as any}>{sev.label}</Badge>
                    <Badge variant="outline">{finding.category}</Badge>
                  </View>
                  <Text className="text-sm font-medium">{finding.title}</Text>
                </View>
              </View>

              <Alert variant="outline" className="mt-2">
                <AlertCircle className="size-4" />
                <AlertTitle className="text-sm">Observation</AlertTitle>
                <AlertDescription className="text-xs">{finding.description}</AlertDescription>
              </Alert>

              <View className="mt-3 gap-2">
                <View className="flex flex-row items-start gap-2">
                  <Shield className="size-4 text-muted-foreground mt-0.5" />
                  <Text className="text-sm flex-1">{finding.recommendation}</Text>
                </View>
                {finding.response && (
                  <View className="flex flex-row items-start gap-2">
                    <FileText className="size-4 text-muted-foreground mt-0.5" />
                    <View className="flex-1">
                      <Text className="text-sm">SK Response:</Text>
                      <Text className="text-xs text-muted-foreground">{finding.response}</Text>
                    </View>
                  </View>
                )}
              </View>

              <Separator className="my-3" />

              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-2">
                  {finding.target_date && (
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="size-3 mr-1" />
                      Due: {finding.target_date}
                    </Badge>
                  )}
                  {finding.actual_date && (
                    <Badge variant="default" className="text-xs">
                      Resolved: {finding.actual_date}
                    </Badge>
                  )}
                </View>
                <View className="flex flex-row gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="size-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="size-3" />
                  </Button>
                </View>
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
}

function SAORTab() {
  const saorItems: SAORItem[] = [
    {
      id: '1',
      audit_id: 'a1',
      finding_id: '1',
      reference_number: 'SAOR-2026-001',
      subject: 'Missing Disbursement Vouchers - Immediate Action Required',
      nature: 'observation',
      status: 'addressed',
      date_issued: '2026-03-15',
      due_date: '2026-04-15',
      date_addressed: '2026-03-25',
      remarks: 'SK has submitted corrective action plan.',
    },
    {
      id: '2',
      audit_id: 'a1',
      finding_id: '2',
      reference_number: 'SAOR-2026-002',
      subject: 'Delayed Bank Deposits - Compliance Advisory',
      nature: 'recommendation',
      status: 'pending',
      date_issued: '2026-03-15',
      due_date: '2026-04-01',
      date_addressed: null,
      remarks: 'Awaiting SK response and action taken.',
    },
    {
      id: '3',
      audit_id: 'a1',
      finding_id: null,
      reference_number: 'SAOR-2026-003',
      subject: 'Proper Documentation of Financial Transactions',
      nature: 'compliance',
      status: 'resolved',
      date_issued: '2026-02-01',
      due_date: '2026-02-28',
      date_addressed: '2026-02-25',
      remarks: 'SK has implemented proper documentation procedures.',
    },
  ];

  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
    addressed: { label: 'Addressed', variant: 'default' as const, icon: CheckCircle2, color: 'text-blue-600' },
    resolved: { label: 'Resolved', variant: 'secondary' as const, icon: CheckCircle2, color: 'text-green-600' },
    cancelled: { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle, color: 'text-gray-500' },
  };

  return (
    <View style={styles.section}>
      <View className="flex flex-row justify-between items-center mb-4">
        <View>
          <Text style={styles.sectionTitle}>SAOR</Text>
          <Text style={styles.sectionSubtitle}>Summary of Audit Observations & Recommendations</Text>
        </View>
        <Button size="sm">
          <Plus className="size-3 mr-1" /> New SAOR
        </Button>
      </View>

      <Alert className="mb-4">
        <AlertTriangle className="size-4" />
        <AlertTitle className="text-sm">About SAOR</AlertTitle>
        <AlertDescription className="text-xs">
          SAOR documents audit observations and recommendations that require management response and corrective action.
        </AlertDescription>
      </Alert>

      {saorItems.map((item) => {
        const status = statusConfig[item.status];
        return (
          <Card key={item.id} className="mb-3">
            <CardContent className="pt-4">
              <View className="flex flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <View className="flex flex-row items-center gap-2 mb-1">
                    <FileText className="size-4 text-muted-foreground" />
                    <Text className="text-sm font-medium">{item.reference_number}</Text>
                    <Badge variant={status.variant as any}>{status.label}</Badge>
                    <Badge variant="outline" className="text-xs">{item.nature}</Badge>
                  </View>
                  <Text className="text-sm">{item.subject}</Text>
                </View>
              </View>

              <Separator className="my-3" />

              <View className="gap-2">
                <View className="flex flex-row items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <Text className="text-xs">Issued: {item.date_issued}</Text>
                  {item.due_date && (
                    <>
                      <Text className="text-muted-foreground">•</Text>
                      <Text className="text-xs">Due: {item.due_date}</Text>
                    </>
                  )}
                  {item.date_addressed && (
                    <>
                      <Text className="text-muted-foreground">•</Text>
                      <Text className="text-xs text-green-600">Addressed: {item.date_addressed}</Text>
                    </>
                  )}
                </View>
                <View className="flex flex-row items-start gap-2">
                  <FileText className="size-4 text-muted-foreground mt-0.5" />
                  <Text className="text-xs text-muted-foreground flex-1">{item.remarks}</Text>
                </View>
              </View>

              <View className="flex flex-row gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="size-3 mr-1" /> View
                </Button>
                {item.status === 'pending' && (
                  <Button size="sm" className="flex-1">
                    <CheckCircle2 className="size-3 mr-1" /> Mark Addressed
                  </Button>
                )}
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
}

function AARTab() {
  const aarReports: AnnualAuditReport[] = [
    {
      id: '1',
      audit_id: 'a1',
      sk_unit: 'SK Poblacion',
      barangay: 'Poblacion',
      fiscal_year: '2025',
      report_number: 'AAR-2025-POB',
      period_covered: 'January 1 - December 31, 2025',
      date_issued: '2026-03-30',
      auditor_name: 'Maria Santos',
      findings_summary: '3 findings identified: 1 critical, 1 major, 1 minor. Main issues relate to missing disbursement vouchers and delayed bank deposits.',
      recommendations_summary: 'SK should strengthen internal controls, implement proper documentation procedures, and ensure timely deposit of collections.',
      compliance_summary: 'Generally compliant with COA regulations except for minor lapses in documentation and deposit procedures.',
      overall_assessment: ' satisfactory with exceptions',
      status: 'published',
      created_at: '2026-03-15',
      published_at: '2026-03-30',
    },
    {
      id: '2',
      audit_id: 'a2',
      sk_unit: 'SK San Jose',
      barangay: 'San Jose',
      fiscal_year: '2025',
      report_number: 'AAR-2025-SJ',
      period_covered: 'January 1 - December 31, 2025',
      date_issued: null,
      auditor_name: 'Pedro Garcia',
      findings_summary: 'Audit in progress. Preliminary findings include incomplete financial records and missing bank reconciliations.',
      recommendations_summary: 'Pending completion of fieldwork.',
      compliance_summary: 'Under review.',
      overall_assessment: ' satisfactory',
      status: 'draft',
      created_at: '2026-04-01',
      published_at: null,
    },
  ];

  const statusConfig = {
    draft: { label: 'Draft', variant: 'secondary' as const },
    review: { label: 'Under Review', variant: 'default' as const },
    published: { label: 'Published', variant: 'default' as const },
    archived: { label: 'Archived', variant: 'outline' as const },
  };

  return (
    <View style={styles.section}>
      <View className="flex flex-row justify-between items-center mb-4">
        <View>
          <Text style={styles.sectionTitle}>Annual Audit Reports</Text>
          <Text style={styles.sectionSubtitle}>Final audit reports per SK Unit</Text>
        </View>
        <Button size="sm">
          <Plus className="size-3 mr-1" /> Generate AAR
        </Button>
      </View>

      {/* Published AAR */}
      {aarReports.filter((r) => r.status === 'published').map((report) => {
        const status = statusConfig[report.status];
        return (
          <Card key={report.id} className="mb-4">
            <CardHeader>
              <View className="flex flex-row justify-between items-start">
                <View>
                  <Badge variant={status.variant as any} className="mb-2">{status.label}</Badge>
                  <CardTitle>{report.sk_unit}</CardTitle>
                  <CardDescription>{report.barangay} • FY {report.fiscal_year}</CardDescription>
                </View>
                <View className="items-end">
                  <Text className="text-sm font-medium">{report.report_number}</Text>
                  <Text className="text-xs text-muted-foreground">{report.date_issued}</Text>
                </View>
              </View>
            </CardHeader>
            <CardContent>
              <View className="gap-3">
                <View>
                  <Text className="text-sm font-medium mb-1">Auditor</Text>
                  <Text className="text-sm text-muted-foreground">{report.auditor_name}</Text>
                </View>
                <View>
                  <Text className="text-sm font-medium mb-1">Period Covered</Text>
                  <Text className="text-sm text-muted-foreground">{report.period_covered}</Text>
                </View>
                <Separator />
                <View>
                  <Text className="text-sm font-medium mb-1">Findings Summary</Text>
                  <Text className="text-sm text-muted-foreground">{report.findings_summary}</Text>
                </View>
                <View>
                  <Text className="text-sm font-medium mb-1">Recommendations</Text>
                  <Text className="text-sm text-muted-foreground">{report.recommendations_summary}</Text>
                </View>
                <Separator />
                <View className="flex flex-row justify-between items-center">
                  <View>
                    <Text className="text-sm font-medium mb-1">Overall Assessment</Text>
                    <Badge variant="default">{report.overall_assessment}</Badge>
                  </View>
                  <View className="flex flex-row gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="size-3 mr-1" /> Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="size-3 mr-1" /> View
                    </Button>
                  </View>
                </View>
              </View>
            </CardContent>
          </Card>
        );
      })}

      {/* Draft AAR */}
      {aarReports.filter((r) => r.status === 'draft').map((report) => {
        const status = statusConfig[report.status];
        return (
          <Card key={report.id} className="mb-4 border-dashed">
            <CardContent className="pt-4">
              <View className="flex flex-row justify-between items-start mb-3">
                <View>
                  <Badge variant={status.variant as any} className="mb-2">{status.label}</Badge>
                  <Text className="font-medium">{report.sk_unit}</Text>
                  <Text className="text-sm text-muted-foreground">{report.barangay} • FY {report.fiscal_year}</Text>
                </View>
              </View>
              <Alert variant="outline">
                <AlertCircle className="size-4" />
                <AlertTitle className="text-sm">Audit Ongoing</AlertTitle>
                <AlertDescription className="text-xs">{report.findings_summary}</AlertDescription>
              </Alert>
              <View className="flex flex-row gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="size-3 mr-1" /> View Draft
                </Button>
                <Button size="sm" className="flex-1">
                  <Send className="size-3 mr-1" /> Submit for Review
                </Button>
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
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
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
});
