import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

type BarConfig<T> = {
  dataKey: keyof T;
  fill?: string;
  stroke?: string;
  name?: string;
};

type Props<T> = {
  data: T[];
  xKey: keyof T;
  bars: BarConfig<T>[];

  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  emptyMessage?: string;

  formatYAxis?: (value: number) => string;
  formatTooltip?: (value: number) => string;
};

function BarChartComponent<T extends Record<string, any>>({
  data,
  xKey,
  bars,
  height = 300,
  showGrid = true,
  showLegend = true,
  emptyMessage = "Sem dados disponíveis",
  formatYAxis,
  formatTooltip,
}: Props<T>) {
  const hasData = Array.isArray(data) && data.length > 0;

  if (!hasData) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center text-sm text-muted-foreground border border-border rounded-md"
      >
        {emptyMessage}
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="var(--border)" />}

        <XAxis dataKey={xKey as string} tick={{ fill: "var(--muted-foreground)" }} />

        <YAxis tickFormatter={formatYAxis} tick={{ fill: "var(--muted-foreground)" }} />

        <Tooltip
          cursor={{ fill: "var(--foreground)", fillOpacity: 0.06 }}
          contentStyle={{
            backgroundColor: "var(--popover)",
            borderColor: "var(--border)",
            borderRadius: "8px",
            color: "var(--foreground)",
          }}
          labelStyle={{ color: "var(--foreground)" }}
          itemStyle={{ color: "var(--foreground)" }}
          formatter={(value) => {
            if (formatTooltip) {
              return formatTooltip(value as number);
            }
            return (value as number).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
          }}
        />

        {showLegend && <Legend wrapperStyle={{ color: "var(--foreground)" }} />}

        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey as string}
            fill={bar.fill || "#45BBA5"}
            stroke={bar.stroke || "#006B55"}
            activeBar={{ fillOpacity: 0.85, strokeWidth: 2 }}
            name={bar.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
