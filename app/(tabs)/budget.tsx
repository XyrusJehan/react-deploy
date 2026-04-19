import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Plus,
  ChevronRight,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Calculator,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  Send
} from 'lucide-react';
import { BUDGET_ACCOUNTS, BudgetAppropriation, SCBAAItem } from '@/lib/budget-types';

type TabType = 'overview' | 'formulate' | 'scbaa' | 'submissions';

export default function BudgetManagementScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs: { key: TabType; label: string; icon: typeof Calculator }[] = [
    { key: 'overview', label: 'Overview', icon: DollarSign },
    { key: 'formulate', label: 'Formulate', icon: Edit },
    { key: 'scbaa', label: 'SCBAA', icon: FileText },
    { key: 'submissions', label: 'Submissions', icon: Send },
  ];

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
    { sk_unit: 'SK Poblacion', barangay: 'Poblacion', fiscal_year: '2026', total_budget: 150000, utilized: 97500, status: 'approved' as const },
    { sk_unit: 'SK San Jose', barangay: 'San Jose', fiscal_year: '2026', total_budget: 120000, utilized: 48000, status: 'under_review' as const },
    { sk_unit: 'SK Mabini', barangay: 'Mabini', fiscal_year: '2026', total_budget: 100000, utilized: 100000, status: 'approved' as const },
    { sk_unit: 'SK Rizal', barangay: 'Rizal', fiscal_year: '2026', total_budget: 80000, utilized: 32000, status: 'draft' as const },
  ];

  const statusConfig = {
    draft: { label: 'Draft', variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
    submitted: { label: 'Submitted', variant: 'default' as const, icon: Send, color: 'text-blue-600' },
    under_review: { label: 'Under Review', variant: 'secondary' as const, icon: Eye, color: 'text-purple-600' },
    approved: { label: 'Approved', variant: 'default' as const, icon: CheckCircle2, color: 'text-green-600' },
    rejected: { label: 'Rejected', variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
  };

  return (
    <View style={styles.overviewContainer}>
      {/* Summary Cards */}
      <View style={styles.summaryGrid}>
        <Card>
          <CardContent className="pt-4">
            <View className="flex flex-row items-center gap-3">
              <View className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle2 className="size-6 text-green-500" />
              </View>
              <View>
                <Text className="text-2xl font-bold">₱450,000</Text>
                <Text className="text-sm text-muted-foreground">Total FY 2026 Budget</Text>
              </View>
            </View>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <View className="flex flex-row items-center gap-3">
              <View className="p-3 rounded-lg bg-blue-500/10">
                <TrendingUp className="size-6 text-blue-500" />
              </View>
              <View>
                <Text className="text-2xl font-bold">₱177,500</Text>
                <Text className="text-sm text-muted-foreground">Total Utilized (39.4%)</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Budget List */}
      <Text style={styles.sectionTitle}>SK Unit Budgets</Text>
      {mockBudgets.map((budget, index) => {
        const status = statusConfig[budget.status];
        const StatusIcon = status.icon;
        const utilization = (budget.utilized / budget.total_budget) * 100;

        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <View className="flex flex-row justify-between items-start">
                <View>
                  <CardTitle className="text-base">{budget.sk_unit}</CardTitle>
                  <CardDescription>{budget.barangay} • FY {budget.fiscal_year}</CardDescription>
                </View>
                <Badge variant={status.variant}>
                  <StatusIcon className={cn('size-3 mr-1', status.color)} />
                  {status.label}
                </Badge>
              </View>
            </CardHeader>
            <CardContent>
              <View className="space-y-3">
                <View className="flex justify-between">
                  <Text className="text-sm text-muted-foreground">Budget</Text>
                  <Text className="text-sm font-medium">₱{budget.total_budget.toLocaleString()}</Text>
                </View>
                <View className="flex justify-between">
                  <Text className="text-sm text-muted-foreground">Utilized</Text>
                  <Text className="text-sm font-medium">₱{budget.utilized.toLocaleString()}</Text>
                </View>
                <View>
                  <View className="flex justify-between mb-1">
                    <Text className="text-sm text-muted-foreground">Utilization Rate</Text>
                    <Text className={cn(
                      'text-sm font-medium',
                      utilization >= 80 ? 'text-green-600' : utilization >= 50 ? 'text-yellow-600' : 'text-red-600'
                    )}>
                      {utilization.toFixed(1)}%
                    </Text>
                  </View>
                  <Progress value={utilization} className="h-2" />
                </View>
                <Button variant="outline" size="sm" className="mt-2">
                  View Details <ChevronRight className="size-3 ml-1" />
                </Button>
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
}

function BudgetFormulation() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Mock appropriation data
  const appropriations: BudgetAppropriation[] = [
    { id: '1', budget_id: 'b1', account_code: '502-02-01-002', account_name: 'Training Expenses', approved_amount: 30000, utilized_amount: 15000, remaining_amount: 15000, utilization_rate: 50, quarter: 'Q1' },
    { id: '2', budget_id: 'b1', account_code: '506-04-01-002', account_name: 'Sports Equipment', approved_amount: 25000, utilized_amount: 25000, remaining_amount: 0, utilization_rate: 100, quarter: 'Q1' },
    { id: '3', budget_id: 'b1', account_code: '502-01-01-001', account_name: 'Office Supplies', approved_amount: 10000, utilized_amount: 3500, remaining_amount: 6500, utilization_rate: 35, quarter: 'Q2' },
    { id: '4', budget_id: 'b1', account_code: '502-04-01-001', account_name: 'Communication Expenses', approved_amount: 8000, utilized_amount: 2000, remaining_amount: 6000, utilization_rate: 25, quarter: 'Q2' },
  ];

  const totalBudget = appropriations.reduce((sum, a) => sum + a.approved_amount, 0);
  const totalUtilized = appropriations.reduce((sum, a) => sum + a.utilized_amount, 0);
  const totalRemaining = appropriations.reduce((sum, a) => sum + a.remaining_amount, 0);

  const groupedAccounts = BUDGET_ACCOUNTS.reduce((acc, account) => {
    if (!acc[account.category]) acc[account.category] = [];
    acc[account.category].push(account);
    return acc;
  }, {} as Record<string, typeof BUDGET_ACCOUNTS>);

  const categoryLabels: Record<string, { label: string; color: string }> = {
    personnel: { label: 'Personnel Services', color: 'bg-blue-500' },
    mooe: { label: 'MOOE', color: 'bg-green-500' },
    capital_outlay: { label: 'Capital Outlay', color: 'bg-purple-500' },
    financial_expense: { label: 'Financial Expenses', color: 'bg-orange-500' },
  };

  return (
    <View style={styles.formulateContainer}>
      {/* Current Budget Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Current Budget Draft</CardTitle>
          <CardDescription>FY 2026 • SK Poblacion</CardDescription>
        </CardHeader>
        <CardContent>
          <View style={styles.budgetSummaryRow}>
            <View style={styles.budgetSummaryItem}>
              <Text className="text-sm text-muted-foreground">Total Appropriation</Text>
              <Text className="text-xl font-bold">₱{totalBudget.toLocaleString()}</Text>
            </View>
            <View style={styles.budgetSummaryItem}>
              <Text className="text-sm text-muted-foreground">Utilized</Text>
              <Text className="text-xl font-bold text-green-600">₱{totalUtilized.toLocaleString()}</Text>
            </View>
            <View style={styles.budgetSummaryItem}>
              <Text className="text-sm text-muted-foreground">Remaining</Text>
              <Text className="text-xl font-bold text-blue-600">₱{totalRemaining.toLocaleString()}</Text>
            </View>
          </View>
          <Progress value={(totalUtilized / totalBudget) * 100} className="h-2 mt-3" />
        </CardContent>
      </Card>

      {/* Add Line Item Button */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogTrigger asChild>
          <Button className="w-full mt-4">
            <Plus className="size-4 mr-2" /> Add Appropriation
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Budget Appropriation</DialogTitle>
          </DialogHeader>
          <View className="space-y-4 py-4">
            {Object.entries(groupedAccounts).map(([category, accounts]) => (
              <View key={category}>
                <View className="flex items-center gap-2 mb-2">
                  <View className={cn('w-2 h-2 rounded-full', categoryLabels[category]?.color)} />
                  <Text className="text-sm font-medium">{categoryLabels[category]?.label}</Text>
                </View>
                <View className="space-y-2 ml-4">
                  {accounts.map((account) => (
                    <TouchableOpacity
                      key={account.code}
                      onPress={() => {
                        setSelectedAccount(account.code);
                        setShowAddDialog(false);
                      }}
                      className="p-3 rounded-lg border bg-muted/50 hover:bg-muted"
                    >
                      <Text className="text-sm font-medium">{account.name}</Text>
                      <Text className="text-xs text-muted-foreground">{account.code}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appropriation List */}
      <Text style={styles.sectionTitle}>Appropriation Items</Text>
      {appropriations.map((item) => {
        const utilization = (item.utilized_amount / item.approved_amount) * 100;
        return (
          <Card key={item.id}>
            <CardContent className="pt-4">
              <View className="flex flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="font-medium text-sm">{item.account_name}</Text>
                  <Text className="text-xs text-muted-foreground">{item.account_code}</Text>
                </View>
                <View className="flex items-center gap-2">
                  <Badge variant="outline">{item.quarter}</Badge>
                  <TouchableOpacity className="p-1">
                    <Edit className="size-4 text-muted-foreground" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="grid grid-cols-3 gap-2 mt-2">
                <View className="bg-muted/50 rounded-lg p-2">
                  <Text className="text-xs text-muted-foreground">Approved</Text>
                  <Text className="text-sm font-medium">₱{item.approved_amount.toLocaleString()}</Text>
                </View>
                <View className="bg-muted/50 rounded-lg p-2">
                  <Text className="text-xs text-muted-foreground">Utilized</Text>
                  <Text className="text-sm font-medium text-green-600">₱{item.utilized_amount.toLocaleString()}</Text>
                </View>
                <View className="bg-muted/50 rounded-lg p-2">
                  <Text className="text-xs text-muted-foreground">Remaining</Text>
                  <Text className="text-sm font-medium text-blue-600">₱{item.remaining_amount.toLocaleString()}</Text>
                </View>
              </View>
              <Progress value={utilization} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
}

function SCBAATab() {
  // Mock SCBAA data
  const scbaaData: SCBAAItem[] = [
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
      {/* SCBAA Header */}
      <Card>
        <CardHeader className="pb-2">
          <View className="flex flex-row justify-between items-center">
            <View>
              <CardTitle>Statement of Comparison of Budget and Actual Amounts (SCBAA)</CardTitle>
              <CardDescription>FY 2026 • SK Poblacion</CardDescription>
            </View>
            <Button variant="outline" size="sm">
              <FileText className="size-3 mr-2" /> Export
            </Button>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.scbaaSummary}>
            <View style={styles.scbaaSummaryItem}>
              <Text className="text-sm text-muted-foreground">Total Approved Budget</Text>
              <Text className="text-lg font-bold">₱{totalApproved.toLocaleString()}</Text>
            </View>
            <View style={styles.scbaaSummaryItem}>
              <Text className="text-sm text-muted-foreground">Total Actual Amount</Text>
              <Text className="text-lg font-bold text-green-600">₱{totalActual.toLocaleString()}</Text>
            </View>
            <View style={styles.scbaaSummaryItem}>
              <Text className="text-sm text-muted-foreground">Total Variance</Text>
              <Text className={cn(
                'text-lg font-bold',
                totalVariance >= 0 ? 'text-blue-600' : 'text-red-600'
              )}>
                ₱{totalVariance.toLocaleString()}
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* SCBAA Table */}
      <Card className="mt-4">
        <CardContent className="pt-4">
          <Text className="text-sm font-medium mb-3">Detailed Comparison</Text>
          <View style={styles.scbaaTable}>
            {/* Table Header */}
            <View style={styles.scbaaTableHeader}>
              <Text style={[styles.scbaaTableHeaderText, styles.scbaaTableAccount]}>Account</Text>
              <Text style={[styles.scbaaTableHeaderText, styles.scbaaTableAmount]}>Approved</Text>
              <Text style={[styles.scbaaTableHeaderText, styles.scbaaTableAmount]}>Actual</Text>
              <Text style={[styles.scbaaTableHeaderText, styles.scbaaTableAmount]}>Variance</Text>
            </View>
            {/* Table Rows */}
            {scbaaData.map((item, index) => (
              <View key={index} style={styles.scbaaTableRow}>
                <View style={styles.scbaaTableAccount}>
                  <Text className="text-xs text-muted-foreground">{item.account_code}</Text>
                  <Text className="text-sm">{item.account_name}</Text>
                </View>
                <Text style={styles.scbaaTableAmount}>₱{item.approved_budget.toLocaleString()}</Text>
                <Text style={styles.scbaaTableAmount}>₱{item.actual_amount.toLocaleString()}</Text>
                <View style={styles.scbaaTableAmount}>
                  <View className="flex flex-row items-center gap-1">
                    {item.variance > 0 && <ArrowDownRight className="size-3 text-green-500" />}
                    {item.variance < 0 && <ArrowUpRight className="size-3 text-red-500" />}
                    <Text className={cn(
                      'text-sm font-medium',
                      item.variance > 0 ? 'text-green-600' : item.variance < 0 ? 'text-red-600' : ''
                    )}>
                      {item.variance > 0 ? '-' : ''}₱{Math.abs(item.variance).toLocaleString()}
                    </Text>
                  </View>
                  <Text className="text-xs text-muted-foreground">({item.variance_percentage.toFixed(1)}%)</Text>
                </View>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="mt-4">
        <CardContent className="pt-4">
          <Text className="text-sm font-medium mb-2">Notes</Text>
          <Text className="text-sm text-muted-foreground">
            • Positive variance indicates under-utilization of funds.{'\n'}
            • Negative variance indicates over-expenditure requiring explanation.{'\n'}
            • All variances exceeding 10% must be explained in the AAR.
          </Text>
        </CardContent>
      </Card>
    </View>
  );
}

function SubmissionsTab() {
  const submissions = [
    { id: '1', sk_unit: 'SK Poblacion', barangay: 'Poblacion', status: 'approved' as const, submitted_at: '2026-03-15', reviewed_at: '2026-03-18' },
    { id: '2', sk_unit: 'SK San Jose', barangay: 'San Jose', status: 'under_review' as const, submitted_at: '2026-04-10', reviewed_at: null },
    { id: '3', sk_unit: 'SK Mabini', barangay: 'Mabini', status: 'pending' as const, submitted_at: '2026-04-12', reviewed_at: null },
    { id: '4', sk_unit: 'SK Rizal', barangay: 'Rizal', status: 'rejected' as const, submitted_at: '2026-04-05', reviewed_at: '2026-04-08' },
  ];

  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
    under_review: { label: 'Under Review', variant: 'default' as const, icon: Eye, color: 'text-purple-600' },
    approved: { label: 'Approved', variant: 'default' as const, icon: CheckCircle2, color: 'text-green-600' },
    rejected: { label: 'Rejected', variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
  };

  return (
    <View style={styles.submissionsContainer}>
      {submissions.map((submission) => {
        const status = statusConfig[submission.status];
        const StatusIcon = status.icon;

        return (
          <Card key={submission.id}>
            <CardContent className="pt-4">
              <View className="flex flex-row justify-between items-start">
                <View>
                  <Text className="font-medium">{submission.sk_unit}</Text>
                  <Text className="text-sm text-muted-foreground">{submission.barangay}</Text>
                </View>
                <Badge variant={status.variant}>
                  <StatusIcon className={cn('size-3 mr-1', status.color)} />
                  {status.label}
                </Badge>
              </View>
              <View className="flex flex-row gap-4 mt-3">
                <View>
                  <Text className="text-xs text-muted-foreground">Submitted</Text>
                  <Text className="text-sm">{submission.submitted_at}</Text>
                </View>
                {submission.reviewed_at && (
                  <View>
                    <Text className="text-xs text-muted-foreground">Reviewed</Text>
                    <Text className="text-sm">{submission.reviewed_at}</Text>
                  </View>
                )}
              </View>
              <View className="flex flex-row gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <Eye className="size-3 mr-1" /> View
                </Button>
                {submission.status === 'pending' && (
                  <Button size="sm">
                    <CheckCircle2 className="size-3 mr-1" /> Review
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
  overviewContainer: {
    gap: 12,
  },
  summaryGrid: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
    color: '#1e293b',
  },
  budgetSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetSummaryItem: {
    alignItems: 'center',
  },
  formulateContainer: {
    gap: 12,
  },
  scbaaContainer: {
    gap: 12,
  },
  scbaaSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scbaaSummaryItem: {
    alignItems: 'center',
  },
  scbaaTable: {
    gap: 8,
  },
  scbaaTableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  scbaaTableHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  scbaaTableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  scbaaTableAccount: {
    flex: 2,
  },
  scbaaTableAmount: {
    flex: 1,
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  submissionsContainer: {
    gap: 12,
  },
});
