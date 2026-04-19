import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard, ComplianceCard, FindingCard, QuickAction } from '@/components/dashboard';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  DollarSign,
  TrendingUp,
  ArrowRight,
  ClipboardList,
  Upload,
  BarChart3,
  Shield
} from 'lucide-react';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Mock data - will be replaced with Supabase queries
  const stats = {
    total_sk_units: 45,
    compliant_units: 38,
    pending_audits: 7,
    total_findings: 23,
    average_compliance: 84,
    total_budget_allocated: 4500000,
    budget_utilization: 67,
  };

  const recentFindings = [
    {
      id: '1',
      sk_unit: 'SK Barangay Poblacion',
      barangay: 'Poblacion',
      observation: 'Missing disbursement vouchers for community projects totaling ₱50,000',
      severity: 'critical' as const,
      status: 'pending' as const,
      date_observed: '2026-04-10',
    },
    {
      id: '2',
      sk_unit: 'SK Barangay San Jose',
      barangay: 'San Jose',
      observation: 'Incomplete documentation for honoraria payments to SK members',
      severity: 'major' as const,
      status: 'addressed' as const,
      date_observed: '2026-04-08',
    },
    {
      id: '3',
      sk_unit: 'SK Barangay Mabini',
      barangay: 'Mabini',
      observation: 'Delay in submission of monthly financial reports (2 months overdue)',
      severity: 'minor' as const,
      status: 'pending' as const,
      date_observed: '2026-04-05',
    },
  ];

  const complianceOverview = [
    { skUnit: 'SK Poblacion', barangay: 'Poblacion', complianceRate: 95, status: 'compliant' as const, lastAuditDate: '2026-03-15' },
    { skUnit: 'SK San Jose', barangay: 'San Jose', complianceRate: 78, status: 'under_review' as const, lastAuditDate: '2026-03-20' },
    { skUnit: 'SK Mabini', barangay: 'Mabini', complianceRate: 62, status: 'non_compliant' as const, lastAuditDate: '2026-02-28' },
    { skUnit: 'SK Rizal', barangay: 'Rizal', complianceRate: 88, status: 'compliant' as const, lastAuditDate: '2026-03-10' },
  ];

  const quickActions = [
    { title: 'New Audit', description: 'Start audit session', icon: ClipboardList, onPress: () => {} },
    { title: 'Submit Report', description: 'Upload documents', icon: Upload, onPress: () => {} },
    { title: 'View Analytics', description: 'Compliance insights', icon: BarChart3, onPress: () => {} },
    { title: 'Audit Checklist', description: 'Required documents', icon: Shield, onPress: () => {} },
  ];

  const recentActivities = [
    { id: '1', type: 'audit', title: 'AAR Published', description: 'Annual Audit Report for FY 2025 released', sk_unit: 'SK Poblacion', timestamp: '2 hours ago' },
    { id: '2', type: 'submission', title: 'Documents Received', description: 'ASRP and SCBAA submitted for review', sk_unit: 'SK San Jose', timestamp: '5 hours ago' },
    { id: '3', type: 'compliance', title: 'Compliance Update', description: 'SK Mabini submitted corrective action plan', sk_unit: 'SK Mabini', timestamp: '1 day ago' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#ffffff' }]}>
      {/* Stats Grid */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#1e293b' }]}>Overview</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Total SK Units"
            value={stats.total_sk_units}
            icon={Building2}
            change={12}
            changeLabel="from last year"
          />
          <StatCard
            title="Compliant"
            value={stats.compliant_units}
            icon={CheckCircle2}
            iconColor="text-green-500"
            change={8}
            changeLabel="from last quarter"
          />
          <StatCard
            title="Pending Audits"
            value={stats.pending_audits}
            icon={Clock}
            iconColor="text-yellow-500"
            change={-3}
            changeLabel="from last month"
          />
          <StatCard
            title="Open Findings"
            value={stats.total_findings}
            icon={AlertTriangle}
            iconColor="text-red-500"
            description="23 total, 5 critical"
          />
        </View>
      </View>

      {/* Compliance Overview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Compliance Overview</Text>
          <Button variant="ghost" size="sm">
            View All <ArrowRight className="size-3 ml-1" />
          </Button>
        </View>
        <View style={styles.complianceList}>
          {complianceOverview.map((item, index) => (
            <ComplianceCard key={index} {...item} />
          ))}
        </View>
      </View>

      {/* Recent Findings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Audit Findings</Text>
          <Button variant="ghost" size="sm">
            View All <ArrowRight className="size-3 ml-1" />
          </Button>
        </View>
        <View style={styles.findingsList}>
          {recentFindings.map((finding) => (
            <FindingCard key={finding.id} finding={finding} />
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <QuickAction key={index} {...action} />
          ))}
        </View>
      </View>

      {/* Budget Utilization */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Budget Utilization</Text>
        <Card>
          <CardContent className="pt-4">
            <View style={styles.budgetStats}>
              <View style={styles.budgetItem}>
                <DollarSign className="size-5 text-muted-foreground" />
                <View>
                  <Text className="text-sm text-muted-foreground">Allocated</Text>
                  <Text className="text-lg font-bold">₱{stats.total_budget_allocated.toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.budgetItem}>
                <TrendingUp className="size-5 text-green-500" />
                <View>
                  <Text className="text-sm text-muted-foreground">Utilized</Text>
                  <Text className="text-lg font-bold">₱{(stats.total_budget_allocated * stats.budget_utilization / 100).toLocaleString()}</Text>
                </View>
              </View>
            </View>
            <View className="mt-4">
              <View className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Overall Utilization</span>
                <span className="font-medium">{stats.budget_utilization}%</span>
              </View>
              <View className="h-3 bg-muted rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${stats.budget_utilization}%` }}
                />
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        <Card>
          <CardContent className="pt-4">
            <View style={styles.activityList}>
              {recentActivities.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View className={styles.activityIcon}>
                    {activity.type === 'audit' && <FileText className="size-4" />}
                    {activity.type === 'submission' && <Upload className="size-4" />}
                    {activity.type === 'compliance' && <CheckCircle2 className="size-4" />}
                  </View>
                  <View style={styles.activityContent}>
                    <Text className="text-sm font-medium">{activity.title}</Text>
                    <Text className="text-xs text-muted-foreground">{activity.description}</Text>
                    <View className="flex flex-row items-center gap-2 mt-1">
                      <Badge variant="outline">{activity.sk_unit}</Badge>
                      <Text className="text-xs text-muted-foreground">{activity.timestamp}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Legal Reference */}
      <View style={[styles.section, styles.lastSection]}>
        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <View style={styles.legalRef}>
              <Shield className="size-5 text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-sm font-medium">Legal Basis</Text>
                <Text className="text-xs text-muted-foreground">
                  RA 10742 (SK Reform Act) • COA Circular No. 2020-003
                </Text>
                <Text className="text-xs text-muted-foreground mt-1">
                  Based on the COA Handbook on Financial Transactions of the SK
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
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
    marginBottom: 12,
  },
  statsGrid: {
    gap: 12,
  },
  complianceList: {
    gap: 12,
  },
  findingsList: {
    gap: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  budgetStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  budgetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  legalRef: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  lastSection: {
    paddingBottom: 100,
  },
});
