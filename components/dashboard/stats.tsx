import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, AlertTriangle, Clock, FileText } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
}

export function StatCard({ title, value, change, changeLabel, icon: Icon, iconColor = 'text-primary', description }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn('p-2 rounded-lg bg-muted', iconColor)}>
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change !== undefined || description) && (
          <p className="text-xs text-muted-foreground mt-1">
            {change !== undefined && (
              <span className={cn(
                'inline-flex items-center gap-0.5',
                isPositive && 'text-green-600 dark:text-green-400',
                isNegative && 'text-red-600 dark:text-red-400',
                !isPositive && !isNegative && 'text-muted-foreground'
              )}>
                {isPositive ? <TrendingUp className="size-3" /> : isNegative ? <TrendingDown className="size-3" /> : null}
                {isPositive ? '+' : ''}{change}%
              </span>
            )}
            {changeLabel && <span className="ml-1">{changeLabel}</span>}
            {description && <span>{description}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface ComplianceCardProps {
  skUnit: string;
  barangay: string;
  complianceRate: number;
  status: 'compliant' | 'non_compliant' | 'under_review';
  lastAuditDate: string;
}

export function ComplianceCard({ skUnit, barangay, complianceRate, status, lastAuditDate }: ComplianceCardProps) {
  const statusConfig = {
    compliant: { label: 'Compliant', variant: 'default' as const, color: 'text-green-600 dark:text-green-400' },
    non_compliant: { label: 'Non-Compliant', variant: 'destructive' as const, color: 'text-red-600 dark:text-red-400' },
    under_review: { label: 'Under Review', variant: 'secondary' as const, color: 'text-yellow-600 dark:text-yellow-400' },
  };

  const config = statusConfig[status];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{skUnit}</CardTitle>
            <CardDescription>{barangay}</CardDescription>
          </div>
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Compliance Rate</span>
              <span className={cn('font-medium', config.color)}>{complianceRate}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  complianceRate >= 80 ? 'bg-green-500' : complianceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                )}
                style={{ width: `${complianceRate}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Last Audit: {lastAuditDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface FindingCardProps {
  finding: {
    sk_unit: string;
    barangay: string;
    observation: string;
    severity: 'critical' | 'major' | 'minor';
    status: 'pending' | 'addressed' | 'resolved';
    date_observed: string;
  };
}

export function FindingCard({ finding }: FindingCardProps) {
  const severityConfig = {
    critical: { label: 'Critical', color: 'bg-red-500', icon: AlertTriangle },
    major: { label: 'Major', color: 'bg-yellow-500', icon: Clock },
    minor: { label: 'Minor', color: 'bg-blue-500', icon: FileText },
  };

  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const },
    addressed: { label: 'Addressed', variant: 'default' as const },
    resolved: { label: 'Resolved', variant: 'outline' as const },
  };

  const severity = severityConfig[finding.severity];
  const status = statusConfig[finding.status];
  const SeverityIcon = severity.icon;

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div className={cn('p-2 rounded-lg', `${finding.severity === 'critical' ? 'bg-red-500/10' : finding.severity === 'major' ? 'bg-yellow-500/10' : 'bg-blue-500/10'}`)}>
            <SeverityIcon className={cn('size-4', finding.severity === 'critical' ? 'text-red-500' : finding.severity === 'major' ? 'text-yellow-500' : 'text-blue-500')} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{finding.sk_unit}</span>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{finding.observation}</p>
            <p className="text-xs text-muted-foreground mt-1">{finding.barangay} • {finding.date_observed}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onPress: () => void;
}

export function QuickAction({ title, description, icon: Icon, onPress }: QuickActionProps) {
  return (
    <button
      onClick={onPress}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left w-full"
    >
      <div className="p-3 rounded-lg bg-background">
        <Icon className="size-5" />
      </div>
      <div className="text-center">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
