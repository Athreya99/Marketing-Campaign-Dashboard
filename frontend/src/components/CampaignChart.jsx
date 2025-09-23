import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p><strong>{d.date}</strong></p>
        <p>ROI: {d.avg_roi}</p>
        <p>Conversion Rate: {d.avg_conversion_rate}</p>
        <p>Clicks: {d.clicks}</p>
        <p>Impressions: {d.impressions}</p>
      </div>
    );
  }
  return null;
};

function CampaignChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        
        <XAxis dataKey="date" />
        <YAxis />

        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Bar dataKey="avg_roi" fill="#8884d8" name="Average ROI" />
        <Bar dataKey="avg_conversion_rate" fill="#82ca9d" name="Avg Conversion Rate" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CampaignChart;
