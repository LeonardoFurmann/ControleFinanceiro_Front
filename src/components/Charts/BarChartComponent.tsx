import React from "react";
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
        className="flex items-center justify-center text-sm text-gray-500 border rounded-md"
      >
        {emptyMessage}
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="5 5" />}

        <XAxis dataKey={xKey as string} />

        <YAxis tickFormatter={formatYAxis} />

        <Tooltip
          formatter={(value) =>
            (value as number).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }
        />

        {showLegend && <Legend />}

        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey as string}
            fill={bar.fill || "#45BBA5"}
            stroke={bar.stroke || "#006B55"}
            name={bar.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
