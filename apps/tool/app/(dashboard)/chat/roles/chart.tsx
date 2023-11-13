import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getChatRoleAnalytics } from "@lib/data/analytics";

type RoleChartProps = {
  period: string;
  role: {
    id: number;
  };
};

export default async function RoleChart(props: RoleChartProps) {
  const data = await getChatRoleAnalytics(props.role.id, props.period);

  return (
    <ResponsiveContainer style={{ width: "100%", aspectRatio: "16 / 9" }}>
      <AreaChart data={data} height={9} width={16}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip labelClassName="text-slate-800" wrapperClassName="rounded-xl" />
        <Area dataKey="like" fill="#10B981" stroke="#10B981" type="monotone" />
        <Area dataKey="dislike" fill="#EA580C" stroke="#EA580C" type="monotone" />
        <Area dataKey="generate" fill="#1D4ED8" stroke="#1D4ED8" type="monotone" />
        <Area dataKey="regenerate" fill="#FBBF24" stroke="#FBBF24" type="monotone" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
