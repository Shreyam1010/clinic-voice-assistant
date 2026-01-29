import { cn } from "@/lib/utils";

interface DepartmentStat {
  name: string;
  calls: number;
  percentage: number;
  color: string;
}

interface DepartmentStatsProps {
  departments: DepartmentStat[];
}

export function DepartmentStats({ departments }: DepartmentStatsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-semibold text-foreground">Calls by Department</h3>
      <p className="text-sm text-muted-foreground">Today's distribution</p>

      <div className="mt-5 space-y-4">
        {departments.map((dept, index) => (
          <div key={dept.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{dept.name}</span>
              <span className="text-muted-foreground">{dept.calls} calls</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${dept.percentage}%`,
                  background: dept.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
