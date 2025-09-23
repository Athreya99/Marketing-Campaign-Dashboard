import React from "react";

function CampaignTable({ campaigns }) {
  return (
    <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Company</th>
          <th>Channel</th>
          <th>Impressions</th>
          <th>Clicks</th>
          <th>ROI</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((c, idx) => (
          <tr key={`${c.company}-${idx}`}>
            <td>{c.company}</td>
            <td>{c.channel_used}</td>
            <td>{c.impressions}</td>
            <td>{c.clicks}</td>
            <td>{c.roi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CampaignTable;
