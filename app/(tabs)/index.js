import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function DashboardScreen() {
  const stats = {
    total_sk_units: 45,
    compliant_units: 38,
    pending_audits: 7,
    total_findings: 23,
    total_budget_allocated: 4500000,
    budget_utilization: 67,
  };

  const recentFindings = [
    {
      id: '1',
      sk_unit: 'SK Barangay Poblacion',
      barangay: 'Poblacion',
      observation: 'Missing disbursement vouchers for community projects totaling ₱50,000',
      severity: 'critical',
      status: 'pending',
      date_observed: '2026-04-10',
    },
    {
      id: '2',
      sk_unit: 'SK Barangay San Jose',
      barangay: 'San Jose',
      observation: 'Incomplete documentation for honoraria payments to SK members',
      severity: 'major',
      status: 'addressed',
      date_observed: '2026-04-08',
    },
    {
      id: '3',
      sk_unit: 'SK Barangay Mabini',
      barangay: 'Mabini',
      observation: 'Delay in submission of monthly financial reports (2 months overdue)',
      severity: 'minor',
      status: 'pending',
      date_observed: '2026-04-05',
    },
  ];

  const complianceOverview = [
    { skUnit: 'SK Poblacion', barangay: 'Poblacion', complianceRate: 95, status: 'compliant', lastAuditDate: '2026-03-15' },
    { skUnit: 'SK San Jose', barangay: 'San Jose', complianceRate: 78, status: 'under_review', lastAuditDate: '2026-03-20' },
    { skUnit: 'SK Mabini', barangay: 'Mabini', complianceRate: 62, status: 'non_compliant', lastAuditDate: '2026-02-28' },
    { skUnit: 'SK Rizal', barangay: 'Rizal', complianceRate: 88, status: 'compliant', lastAuditDate: '2026-03-10' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'compliant': return '#10b981';
      case 'non_compliant': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return '#dc2626';
      case 'major': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#3b82f620' }]}>
              <Icon name="home" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.statValue}>{stats.total_sk_units}</Text>
            <Text style={styles.statLabel}>Total SK Units</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#10b98120' }]}>
              <Icon name="check-circle" size={24} color="#10b981" />
            </View>
            <Text style={styles.statValue}>{stats.compliant_units}</Text>
            <Text style={styles.statLabel}>Compliant Units</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#f59e0b20' }]}>
              <Icon name="clock" size={24} color="#f59e0b" />
            </View>
            <Text style={styles.statValue}>{stats.pending_audits}</Text>
            <Text style={styles.statLabel}>Pending Audits</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#ef444420' }]}>
              <Icon name="alert-triangle" size={24} color="#ef4444" />
            </View>
            <Text style={styles.statValue}>{stats.total_findings}</Text>
            <Text style={styles.statLabel}>Open Findings</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Compliance Overview</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All <Icon name="arrow-right" size={14} /></Text>
          </TouchableOpacity>
        </View>
        {complianceOverview.map((item, index) => (
          <View key={index} style={styles.complianceCard}>
            <View style={styles.complianceHeader}>
              <View>
                <Text style={styles.complianceTitle}>{item.skUnit}</Text>
                <Text style={styles.complianceSubtitle}>{item.barangay}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status), textTransform: 'capitalize' }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View style={styles.complianceProgress}>
              <View style={styles.complianceProgressBar}>
                <View style={[styles.complianceProgressFill, { width: `${item.complianceRate}%`, backgroundColor: getStatusColor(item.status) }]} />
              </View>
              <Text style={styles.complianceRate}>{item.complianceRate}% Compliant</Text>
            </View>
            <Text style={styles.complianceDate}>Last Audit: {item.lastAuditDate}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Audit Findings</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All <Icon name="arrow-right" size={14} /></Text>
          </TouchableOpacity>
        </View>
        {recentFindings.map((finding) => (
          <View key={finding.id} style={styles.findingCard}>
            <View style={styles.findingHeader}>
              <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(finding.severity) + '20' }]}>
                <Text style={[styles.severityText, { color: getSeverityColor(finding.severity) }]}>
                  {finding.severity.toUpperCase()}
                </Text>
              </View>
              <View style={styles.statusBadgeOutline}>
                <Text style={styles.statusTextOutline}>
                  {finding.status === 'pending' ? 'Pending' : 'Addressed'}
                </Text>
              </View>
            </View>
            <Text style={styles.findingTitle}>{finding.sk_unit}</Text>
            <Text style={styles.findingDescription}>{finding.observation}</Text>
            <Text style={styles.findingDate}>Observed: {finding.date_observed}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Utilization</Text>
        <View style={styles.budgetCard}>
          <View style={styles.budgetStats}>
            <View style={styles.budgetStat}>
              <Icon name="dollar-sign" size={20} color="#6b7280" />
              <View>
                <Text style={styles.budgetStatLabel}>Allocated</Text>
                <Text style={styles.budgetStatValue}>₱{stats.total_budget_allocated.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.budgetStat}>
              <Icon name="trending-up" size={20} color="#10b981" />
              <View>
                <Text style={styles.budgetStatLabel}>Utilized</Text>
                <Text style={styles.budgetStatValue}>₱{(stats.total_budget_allocated * stats.budget_utilization / 100).toLocaleString()}</Text>
              </View>
            </View>
          </View>
          <View style={styles.budgetProgress}>
            <View style={styles.budgetProgressBar}>
              <View style={[styles.budgetProgressFill, { width: `${stats.budget_utilization}%` }]} />
            </View>
            <View style={styles.budgetProgressLabels}>
              <Text style={styles.budgetProgressLabel}>Utilization Rate</Text>
              <Text style={styles.budgetProgressPercent}>{stats.budget_utilization}%</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <View style={styles.legalCard}>
          <Icon name="shield" size={20} color="#6b7280" />
          <View style={styles.legalContent}>
            <Text style={styles.legalTitle}>Legal Basis</Text>
            <Text style={styles.legalText}>RA 10742 (SK Reform Act) • COA Circular No. 2020-003</Text>
            <Text style={styles.legalSubtext}>Based on the COA Handbook on Financial Transactions of the SK</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  complianceCard: {
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
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  complianceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  complianceSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
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
  complianceProgress: {
    marginBottom: 8,
  },
  complianceProgressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  complianceProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  complianceRate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginTop: 8,
  },
  complianceDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadgeOutline: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statusTextOutline: {
    fontSize: 12,
    color: '#6b7280',
  },
  findingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  findingDescription: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  findingDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  budgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  budgetStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  budgetStatLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  budgetStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  budgetProgress: {
    marginTop: 8,
  },
  budgetProgressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  budgetProgressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  budgetProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  budgetProgressLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  budgetProgressPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  legalCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  legalContent: {
    flex: 1,
  },
  legalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  legalText: {
    fontSize: 12,
    color: '#4b5563',
  },
  legalSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  lastSection: {
    paddingBottom: 100,
  },
});