import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Building2,
  Plus,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Download,
  Landmark,
  Wallet,
  CreditCard,
  RefreshCw,
  LayoutGrid
} from 'lucide-react';
import { Receipt, Disbursement, BankDeposit, ASRPReport, COLLECTION_TYPES } from '@/lib/financial-types';

type TabType = 'summary' | 'receipts' | 'disbursements' | 'deposits' | 'asrp';

export default function FinancialTransactionsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const tabs: { key: TabType; label: string; icon: typeof LayoutGrid }[] = [
    { key: 'summary', label: 'Summary', icon: LayoutGrid },
    { key: 'receipts', label: 'Receipts', icon: ArrowDownCircle },
    { key: 'disbursements', label: 'Disbursements', icon: ArrowUpCircle },
    { key: 'deposits', label: 'Deposits', icon: Landmark },
    { key: 'asrp', label: 'ASRP', icon: FileText },
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
      {/* Cash Position */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Cash Position</CardTitle>
          <CardDescription>As of April 17, 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <View style={styles.cashPositionGrid}>
            <View style={styles.cashPositionItem}>
              <Text className="text-sm text-muted-foreground">Beginning Balance</Text>
              <Text className="text-lg font-medium">₱{summary.beginningBalance.toLocaleString()}</Text>
            </View>
            <View style={styles.cashPositionItem}>
              <Text className="text-sm text-muted-foreground">Receipts</Text>
              <Text className="text-lg font-medium text-green-600">+₱{summary.totalReceipts.toLocaleString()}</Text>
            </View>
            <View style={styles.cashPositionItem}>
              <Text className="text-sm text-muted-foreground">Disbursements</Text>
              <Text className="text-lg font-medium text-red-600">-₱{summary.totalDisbursements.toLocaleString()}</Text>
            </View>
            <View style={styles.cashPositionItem}>
              <Text className="text-sm text-muted-foreground">Ending Balance</Text>
              <Text className="text-xl font-bold">₱{summary.endingBalance.toLocaleString()}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Collections Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Collections Breakdown</CardTitle>
          <CardDescription>FY 2026 Total Receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <View style={styles.breakdownGrid}>
            <View style={styles.breakdownItem}>
              <View className="flex flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-blue-500" />
                <Text className="text-sm">National Government</Text>
              </View>
              <Text className="text-lg font-bold">₱{collections.national.toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownItem}>
              <View className="flex flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-green-500" />
                <Text className="text-sm">Local Government</Text>
              </View>
              <Text className="text-lg font-bold">₱{collections.local.toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownItem}>
              <View className="flex flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-purple-500" />
                <Text className="text-sm">Internal Revenue</Text>
              </View>
              <Text className="text-lg font-bold">₱{collections.internal.toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownItem}>
              <View className="flex flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-orange-500" />
                <Text className="text-sm">Other Collections</Text>
              </View>
              <Text className="text-lg font-bold">₱{collections.other.toLocaleString()}</Text>
            </View>
          </View>
          <View className="mt-4">
            <View className="flex justify-between mb-1">
              <Text className="text-sm text-muted-foreground">Total Collections</Text>
              <Text className="text-sm font-medium">₱{(collections.national + collections.local + collections.internal + collections.other).toLocaleString()}</Text>
            </View>
            <View className="h-3 bg-muted rounded-full overflow-hidden flex flex-row">
              <View className="h-full bg-blue-500" style={{ width: `${(collections.national / summary.totalReceipts) * 100}%` }} />
              <View className="h-full bg-green-500" style={{ width: `${(collections.local / summary.totalReceipts) * 100}%` }} />
              <View className="h-full bg-purple-500" style={{ width: `${(collections.internal / summary.totalReceipts) * 100}%` }} />
              <View className="h-full bg-orange-500" style={{ width: `${(collections.other / summary.totalReceipts) * 100}%` }} />
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Disbursements Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Disbursements Breakdown</CardTitle>
          <CardDescription>FY 2026 Total Disbursements</CardDescription>
        </CardHeader>
        <CardContent>
          <View style={styles.disbursementBreakdown}>
            <View className="flex flex-row justify-between items-center mb-2">
              <View className="flex items-center gap-2">
                <CreditCard className="size-4 text-blue-500" />
                <Text className="text-sm">Personnel Services</Text>
              </View>
              <Text className="text-sm font-medium">₱{disbursements.personnel.toLocaleString()}</Text>
            </View>
            <Progress value={(disbursements.personnel / summary.totalDisbursements) * 100} className="h-2 mb-3" />

            <View className="flex flex-row justify-between items-center mb-2">
              <View className="flex items-center gap-2">
                <Wallet className="size-4 text-green-500" />
                <Text className="text-sm">MOOE</Text>
              </View>
              <Text className="text-sm font-medium">₱{disbursements.mooe.toLocaleString()}</Text>
            </View>
            <Progress value={(disbursements.mooe / summary.totalDisbursements) * 100} className="h-2 mb-3" />

            <View className="flex flex-row justify-between items-center mb-2">
              <View className="flex items-center gap-2">
                <Building2 className="size-4 text-purple-500" />
                <Text className="text-sm">Capital Outlay</Text>
              </View>
              <Text className="text-sm font-medium">₱{disbursements.capital_outlay.toLocaleString()}</Text>
            </View>
            <Progress value={(disbursements.capital_outlay / summary.totalDisbursements) * 100} className="h-2 mb-3" />

            <View className="flex flex-row justify-between items-center mb-2">
              <View className="flex items-center gap-2">
                <DollarSign className="size-4 text-orange-500" />
                <Text className="text-sm">Financial Expenses</Text>
              </View>
              <Text className="text-sm font-medium">₱{disbursements.financial.toLocaleString()}</Text>
            </View>
            <Progress value={(disbursements.financial / summary.totalDisbursements) * 100} className="h-2" />
          </View>
        </CardContent>
      </Card>

      {/* Pending Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Pending Items</CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.pendingItems}>
            <View className="flex flex-row justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
              <View className="flex flex-row items-center gap-2">
                <Clock className="size-5 text-yellow-600" />
                <Text className="text-sm">Pending Receipts</Text>
              </View>
              <Text className="text-lg font-bold text-yellow-600">₱{summary.pendingReceipts.toLocaleString()}</Text>
            </View>
            <View className="flex flex-row justify-between items-center p-3 bg-red-500/10 rounded-lg mt-2">
              <View className="flex flex-row items-center gap-2">
                <AlertCircle className="size-5 text-red-600" />
                <Text className="text-sm">Pending Disbursements</Text>
              </View>
              <Text className="text-lg font-bold text-red-600">₱{summary.pendingDisbursements.toLocaleString()}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function ReceiptsTab() {
  const [showAddSheet, setShowAddSheet] = useState(false);

  const receipts: Receipt[] = [
    { id: '1', or_number: 'OR-2026-001', date: '2026-01-15', payor: 'Department of Interior and Local Government', nature_of_collection: 'IRA Allocation - Q1', account_code: '401-01-01-001', amount: 50000, collection_type: 'national', status: 'reconciled', sk_unit: 'SK Poblacion', barangay: 'Poblacion', received_by: 'Juan Dela Cruz', created_at: '2026-01-15' },
    { id: '2', or_number: 'OR-2026-002', date: '2026-01-20', payor: 'Municipality of San Jose', nature_of_collection: 'SK Fund Allocation', account_code: '401-01-01-002', amount: 75000, collection_type: 'local', status: 'reconciled', sk_unit: 'SK Poblacion', barangay: 'Poblacion', received_by: 'Juan Dela Cruz', created_at: '2026-01-20' },
    { id: '3', or_number: 'OR-2026-003', date: '2026-02-10', payor: 'Department of Budget and Management', nature_of_collection: 'Capacity Building Fund', account_code: '401-02-01-001', amount: 25000, collection_type: 'national', status: 'deposited', sk_unit: 'SK Poblacion', barangay: 'Poblacion', received_by: 'Maria Santos', created_at: '2026-02-10' },
    { id: '4', or_number: 'OR-2026-004', date: '2026-03-05', payor: 'Barangay Council', nature_of_collection: 'Youth Development Fund', account_code: '401-01-01-003', amount: 30000, collection_type: 'internal', status: 'validated', sk_unit: 'SK Poblacion', barangay: 'Poblacion', received_by: 'Juan Dela Cruz', created_at: '2026-03-05' },
    { id: '5', or_number: 'OR-2026-005', date: '2026-04-01', payor: 'Private Donor', nature_of_collection: 'Youth Sports Program Donation', account_code: '401-99-01-001', amount: 5000, collection_type: 'other', status: 'pending', sk_unit: 'SK Poblacion', barangay: 'Poblacion', received_by: 'Maria Santos', created_at: '2026-04-01' },
  ];

  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
    validated: { label: 'Validated', variant: 'default' as const, icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-500/10' },
    deposited: { label: 'Deposited', variant: 'default' as const, icon: Landmark, color: 'text-purple-600', bg: 'bg-purple-500/10' },
    reconciled: { label: 'Reconciled', variant: 'default' as const, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-500/10' },
  };

  const totalReceipts = receipts.reduce((sum, r) => sum + r.amount, 0);

  return (
    <View style={styles.receiptsContainer}>
      {/* Header Actions */}
      <View className="flex flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-lg font-medium">Total Receipts</Text>
          <Text className="text-2xl font-bold text-green-600">₱{totalReceipts.toLocaleString()}</Text>
        </View>
        <Sheet open={showAddSheet} onOpenChange={setShowAddSheet}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" /> Add Receipt
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>New Official Receipt</SheetTitle>
            </SheetHeader>
            <View className="py-4">
              <Text className="text-sm text-muted-foreground">Receipt entry form would go here</Text>
            </View>
          </SheetContent>
        </Sheet>
      </View>

      {/* Receipts List */}
      <View style={styles.receiptsList}>
        {receipts.map((receipt) => {
          const status = statusConfig[receipt.status];
          const StatusIcon = status.icon;

          return (
            <Card key={receipt.id}>
              <CardContent className="pt-4">
                <View className="flex flex-row justify-between items-start">
                  <View className="flex-1">
                    <View className="flex flex-row items-center gap-2 mb-1">
                      <Text className="font-medium">{receipt.or_number}</Text>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </View>
                    <Text className="text-sm text-muted-foreground">{receipt.payor}</Text>
                    <Text className="text-xs text-muted-foreground mt-1">{receipt.nature_of_collection}</Text>
                  </View>
                  <View className="text-right">
                    <Text className="text-lg font-bold">₱{receipt.amount.toLocaleString()}</Text>
                    <Text className="text-xs text-muted-foreground">{receipt.date}</Text>
                  </View>
                </View>
                <View className="flex flex-row items-center justify-between mt-3 pt-3 border-t">
                  <View className="flex flex-row items-center gap-4">
                    <View className={cn('flex flex-row items-center gap-1 px-2 py-1 rounded-full', status.bg)}>
                      <StatusIcon className={cn('size-3', status.color)} />
                      <Text className={cn('text-xs font-medium', status.color)}>{COLLECTION_TYPES[receipt.collection_type].label}</Text>
                    </View>
                  </View>
                  <Button variant="ghost" size="sm">
                    <Eye className="size-3 mr-1" /> View
                  </Button>
                </View>
              </CardContent>
            </Card>
          );
        })}
      </View>
    </View>
  );
}

function DisbursementsTab() {
  const disbursements: Disbursement[] = [
    { id: '1', dv_number: 'DV-2026-001', date: '2026-01-25', payee: 'ABC Office Supplies', explanation: 'Office supplies for SK youth center', account_code: '502-01-01-001', amount: 8500, check_number: 'CK-10234', status: 'cleared', sk_unit: 'SK Poblacion', barangay: 'Poblacion', approved_by: 'Juan Dela Cruz', approved_at: '2026-01-25', created_at: '2026-01-20' },
    { id: '2', dv_number: 'DV-2026-002', date: '2026-02-05', payee: 'SK Members - Honoraria', explanation: 'Q1 Honoraria for SK Kagawads', account_code: '501-02-01-001', amount: 45000, check_number: 'CK-10235', status: 'cleared', sk_unit: 'SK Poblacion', barangay: 'Poblacion', approved_by: 'Juan Dela Cruz', approved_at: '2026-02-05', created_at: '2026-02-01' },
    { id: '3', dv_number: 'DV-2026-003', date: '2026-02-20', payee: 'Sports World Inc.', explanation: 'Sports equipment for youth program', account_code: '506-04-01-002', amount: 25000, check_number: 'CK-10236', status: 'cleared', sk_unit: 'SK Poblacion', barangay: 'Poblacion', approved_by: 'Juan Dela Cruz', approved_at: '2026-02-20', created_at: '2026-02-15' },
    { id: '4', dv_number: 'DV-2026-004', date: '2026-03-15', payee: 'PLDT', explanation: 'Internet allowance for SK office', account_code: '502-04-01-001', amount: 3500, status: 'issued', sk_unit: 'SK Poblacion', barangay: 'Poblacion', approved_by: 'Juan Dela Cruz', approved_at: '2026-03-15', created_at: '2026-03-10' },
    { id: '5', dv_number: 'DV-2026-005', date: '2026-04-02', payee: 'Training Center Corp.', explanation: 'Capacity building seminar for SK officers', account_code: '502-02-01-002', amount: 15000, status: 'pending', sk_unit: 'SK Poblacion', barangay: 'Poblacion', approved_by: 'Juan Dela Cruz', created_at: '2026-04-01' },
  ];

  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
    approved: { label: 'Approved', variant: 'default' as const, icon: CheckCircle2, color: 'text-blue-600' },
    issued: { label: 'Issued', variant: 'default' as const, icon: CreditCard, color: 'text-purple-600' },
    cleared: { label: 'Cleared', variant: 'default' as const, icon: CheckCircle2, color: 'text-green-600' },
    cancelled: { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
  };

  const totalDisbursements = disbursements.reduce((sum, d) => sum + d.amount, 0);

  return (
    <View style={styles.disbursementsContainer}>
      {/* Header */}
      <View className="flex flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-lg font-medium">Total Disbursements</Text>
          <Text className="text-2xl font-bold text-red-600">₱{totalDisbursements.toLocaleString()}</Text>
        </View>
        <Button>
          <Plus className="size-4 mr-2" /> New Disbursement
        </Button>
      </View>

      {/* Disbursements List */}
      <View style={styles.disbursementsList}>
        {disbursements.map((disbursement) => {
          const status = statusConfig[disbursement.status];
          const StatusIcon = status.icon;

          return (
            <Card key={disbursement.id}>
              <CardContent className="pt-4">
                <View className="flex flex-row justify-between items-start">
                  <View className="flex-1">
                    <View className="flex flex-row items-center gap-2 mb-1">
                      <Text className="font-medium">{disbursement.dv_number}</Text>
                      <Badge variant={status.variant}>
                        <StatusIcon className={cn('size-3 mr-1', status.color)} />
                        {status.label}
                      </Badge>
                    </View>
                    <Text className="text-sm font-medium">{disbursement.payee}</Text>
                    <Text className="text-xs text-muted-foreground mt-1">{disbursement.explanation}</Text>
                    <View className="flex flex-row gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{disbursement.account_code}</Badge>
                      {disbursement.check_number && (
                        <Badge variant="outline" className="text-xs">{disbursement.check_number}</Badge>
                      )}
                    </View>
                  </View>
                  <View className="text-right">
                    <Text className="text-lg font-bold">₱{disbursement.amount.toLocaleString()}</Text>
                    <Text className="text-xs text-muted-foreground">{disbursement.date}</Text>
                  </View>
                </View>
                <View className="flex flex-row justify-between items-center mt-3 pt-3 border-t">
                  <Text className="text-xs text-muted-foreground">
                    Approved by: {disbursement.approved_by}
                  </Text>
                  <Button variant="ghost" size="sm">
                    <Eye className="size-3 mr-1" /> View
                  </Button>
                </View>
              </CardContent>
            </Card>
          );
        })}
      </View>
    </View>
  );
}

function DepositsTab() {
  const deposits: BankDeposit[] = [
    { id: '1', deposit_date: '2026-01-31', bank_name: 'Landbank of the Philippines', account_number: '1234-5678-90', or_numbers: ['OR-2026-001', 'OR-2026-002'], total_amount: 125000, deposit_slip_number: 'DS-2026-001', status: 'reconciled', verified_by: 'COA Auditor', verified_at: '2026-02-05', sk_unit: 'SK Poblacion', barangay: 'Poblacion', created_at: '2026-01-31' },
    { id: '2', deposit_date: '2026-02-28', bank_name: 'Landbank of the Philippines', account_number: '1234-5678-90', or_numbers: ['OR-2026-003', 'OR-2026-004'], total_amount: 55000, deposit_slip_number: 'DS-2026-002', status: 'reconciled', verified_by: 'COA Auditor', verified_at: '2026-03-05', sk_unit: 'SK Poblacion', barangay: 'Poblacion', created_at: '2026-02-28' },
    { id: '3', deposit_date: '2026-03-31', bank_name: 'Landbank of the Philippines', account_number: '1234-5678-90', or_numbers: ['OR-2026-005'], total_amount: 5000, deposit_slip_number: 'DS-2026-003', status: 'verified', verified_by: 'COA Auditor', sk_unit: 'SK Poblacion', barangay: 'Poblacion', created_at: '2026-03-31' },
  ];

  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
    verified: { label: 'Verified', variant: 'default' as const, icon: CheckCircle2, color: 'text-blue-600' },
    reconciled: { label: 'Reconciled', variant: 'default' as const, icon: CheckCircle2, color: 'text-green-600' },
  };

  const totalDeposits = deposits.reduce((sum, d) => sum + d.total_amount, 0);

  return (
    <View style={styles.depositsContainer}>
      {/* Header */}
      <Card className="mb-4">
        <CardContent className="pt-4">
          <View className="flex flex-row justify-between items-center">
            <View>
              <Text className="text-sm text-muted-foreground">Total Deposited (FY 2026)</Text>
              <Text className="text-2xl font-bold text-green-600">₱{totalDeposits.toLocaleString()}</Text>
            </View>
            <View className="text-right">
              <Text className="text-sm text-muted-foreground">Bank</Text>
              <Text className="text-sm font-medium">Landbank</Text>
              <Text className="text-xs text-muted-foreground">Account: 1234-5678-90</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Deposits List */}
      <View style={styles.depositsList}>
        {deposits.map((deposit) => {
          const status = statusConfig[deposit.status];

          return (
            <Card key={deposit.id}>
              <CardContent className="pt-4">
                <View className="flex flex-row justify-between items-start">
                  <View className="flex-1">
                    <View className="flex flex-row items-center gap-2 mb-1">
                      <Landmark className="size-4 text-muted-foreground" />
                      <Text className="font-medium">{deposit.deposit_slip_number}</Text>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </View>
                    <Text className="text-sm text-muted-foreground">{deposit.bank_name}</Text>
                    <Text className="text-xs text-muted-foreground mt-1">OR Numbers: {deposit.or_numbers.join(', ')}</Text>
                  </View>
                  <View className="text-right">
                    <Text className="text-lg font-bold">₱{deposit.total_amount.toLocaleString()}</Text>
                    <Text className="text-xs text-muted-foreground">{deposit.deposit_date}</Text>
                  </View>
                </View>
                {deposit.verified_by && (
                  <View className="flex flex-row justify-between items-center mt-3 pt-3 border-t">
                    <Text className="text-xs text-muted-foreground">
                      Verified by: {deposit.verified_by} {deposit.verified_at && `on ${deposit.verified_at}`}
                    </Text>
                    <Button variant="ghost" size="sm">
                      <Eye className="size-3 mr-1" /> View
                    </Button>
                  </View>
                )}
              </CardContent>
            </Card>
          );
        })}
      </View>
    </View>
  );
}

function ASRPTab() {
  const asrpData: ASRPReport = {
    id: 'asrp-2026-q1',
    sk_unit: 'SK Poblacion',
    barangay: 'Poblacion',
    fiscal_year: '2026',
    period: 'quarterly',
    generated_at: '2026-04-01',
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
      {/* ASRP Header */}
      <Card>
        <CardHeader className="pb-2">
          <View className="flex flex-row justify-between items-center">
            <View>
              <CardTitle>Annual Statement of Receipts and Payments</CardTitle>
              <CardDescription>FY {asrpData.fiscal_year} • {asrpData.period === 'quarterly' ? 'Q1' : 'Annual'}</CardDescription>
            </View>
            <Badge variant="default">Verified</Badge>
          </View>
        </CardHeader>
        <CardContent>
          {/* Cash Position Summary */}
          <View style={styles.asrpCashSummary}>
            <View style={styles.asrpCashItem}>
              <Text className="text-sm text-muted-foreground">Beginning Balance</Text>
              <Text className="text-lg font-bold">₱{asrpData.beginning_balance.toLocaleString()}</Text>
            </View>
            <View style={styles.asrpCashItem}>
              <Text className="text-sm text-muted-foreground">Add: Receipts</Text>
              <Text className="text-lg font-bold text-green-600">₱{asrpData.total_receipts.toLocaleString()}</Text>
            </View>
            <View style={styles.asrpCashItem}>
              <Text className="text-sm text-muted-foreground">Less: Disbursements</Text>
              <Text className="text-lg font-bold text-red-600">₱{asrpData.total_disbursements.toLocaleString()}</Text>
            </View>
            <View className="h-px bg-border my-3" />
            <View style={styles.asrpCashItem}>
              <Text className="text-sm text-muted-foreground">Ending Balance</Text>
              <Text className="text-xl font-bold">₱{asrpData.ending_balance.toLocaleString()}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Receipts Breakdown */}
      <Card className="mt-4">
        <CardHeader className="pb-2">
          <CardTitle>Receipts Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="space-y-3">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm">National Government</Text>
              <Text className="text-sm font-medium">₱{asrpData.receipts_breakdown.national.toLocaleString()}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm">Local Government</Text>
              <Text className="text-sm font-medium">₱{asrpData.receipts_breakdown.local.toLocaleString()}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm">Internal Revenue</Text>
              <Text className="text-sm font-medium">₱{asrpData.receipts_breakdown.internal.toLocaleString()}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm">Other Collections</Text>
              <Text className="text-sm font-medium">₱{asrpData.receipts_breakdown.other.toLocaleString()}</Text>
            </View>
            <View className="h-px bg-border my-2" />
            <View className="flex flex-row justify-between items-center">
              <Text className="font-medium">Total Receipts</Text>
              <Text className="font-bold">₱{asrpData.total_receipts.toLocaleString()}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Disbursements Breakdown */}
      <Card className="mt-4">
        <CardHeader className="pb-2">
          <CardTitle>Disbursements Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="space-y-3">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm">Personnel Services</Text>
              <Text className="text-sm font-medium">₱{asrpData.disbursements_breakdown.personnel.toLocaleString()}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm">MOOE</Text>
              <Text className="text-sm font-medium">₱{asrpData.disbursements_breakdown.mooe.toLocaleString()}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm">Capital Outlay</Text>
              <Text className="text-sm font-medium">₱{asrpData.disbursements_breakdown.capital_outlay.toLocaleString()}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm">Financial Expenses</Text>
              <Text className="text-sm font-medium">₱{asrpData.disbursements_breakdown.financial.toLocaleString()}</Text>
            </View>
            <View className="h-px bg-border my-2" />
            <View className="flex flex-row justify-between items-center">
              <Text className="font-medium">Total Disbursements</Text>
              <Text className="font-bold">₱{asrpData.total_disbursements.toLocaleString()}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Cash Composition */}
      <Card className="mt-4">
        <CardHeader className="pb-2">
          <CardTitle>Cash Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="flex flex-row justify-between items-center mb-3">
            <View className="flex items-center gap-2">
              <Wallet className="size-4 text-muted-foreground" />
              <Text className="text-sm">Cash on Hand</Text>
            </View>
            <Text className="text-sm font-medium">₱{asrpData.cash_on_hand.toLocaleString()}</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <View className="flex items-center gap-2">
              <Landmark className="size-4 text-muted-foreground" />
              <Text className="text-sm">Cash in Bank</Text>
            </View>
            <Text className="text-sm font-medium">₱{asrpData.cash_in_bank.toLocaleString()}</Text>
          </View>
          <View className="h-px bg-border my-3" />
          <View className="flex flex-row justify-between items-center">
            <Text className="font-medium">Total Cash Balance</Text>
            <Text className="font-bold">₱{(asrpData.cash_on_hand + asrpData.cash_in_bank).toLocaleString()}</Text>
          </View>
        </CardContent>
      </Card>

      {/* Actions */}
      <View className="flex flex-row gap-2 mt-4">
        <Button variant="outline" className="flex-1">
          <Download className="size-4 mr-2" /> Export PDF
        </Button>
        <Button variant="outline" className="flex-1">
          <RefreshCw className="size-4 mr-2" /> Submit for Review
        </Button>
      </View>
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
  summaryContainer: {
    gap: 12,
  },
  cashPositionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cashPositionItem: {
    width: '47%',
  },
  breakdownGrid: {
    gap: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disbursementBreakdown: {
    gap: 4,
  },
  pendingItems: {
    gap: 8,
  },
  receiptsContainer: {
    gap: 12,
  },
  receiptsList: {
    gap: 12,
  },
  disbursementsContainer: {
    gap: 12,
  },
  disbursementsList: {
    gap: 12,
  },
  depositsContainer: {
    gap: 12,
  },
  depositsList: {
    gap: 12,
  },
  asrpContainer: {
    gap: 12,
  },
  asrpCashSummary: {
    gap: 4,
  },
  asrpCashItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
