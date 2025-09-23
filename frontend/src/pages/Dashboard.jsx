import React, { useEffect, useState } from "react";
import { getCampaigns, getPerformance } from "../api";
import CampaignTable from "../components/CampaignTable";
import CampaignChart from "../components/CampaignChart";

function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // --- Campaigns (daily/raw history) ---
        const campaignRes = await getCampaigns();
        const normalizedCampaigns = campaignRes.data.map((item, idx) => ({
          id: idx, // fallback unique key
          campaign_id: item.CAMPAIGN_ID ?? null,
          company: item.COMPANY ?? null,
          channel_used: item.CHANNEL_USED ?? null,
          impressions: Number(item.IMPRESSIONS ?? item.TOTAL_IMPRESSIONS ?? 0),
          clicks: Number(item.CLICKS ?? item.TOTAL_CLICKS ?? 0),
          roi: Number(item.ROI ?? item.AVG_ROI ?? 0),
        }));
        setCampaigns(normalizedCampaigns);

        // --- Performance (aggregated metrics) ---
        const perfRes = await getPerformance();
        const normalizedPerf = perfRes.data.map((item, idx) => ({
   id: idx,
  campaign_id: item.CAMPAIGN_ID,
  date: item.DATE,
  impressions: Number(item.IMPRESSIONS),
  clicks: Number(item.CLICKS),
  avg_conversion_rate: Number(item.AVG_CONVERSION_RATE),
  avg_roi: Number(item.AVG_ROI),
}));


        setPerformance(normalizedPerf);

        console.log("📊 Campaigns:", normalizedCampaigns);
        console.log("📈 Performance:", normalizedPerf);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Marketing Campaign Dashboard</h1>

      <h2>Daily Campaigns</h2>
      <CampaignTable campaigns={campaigns} />

      <h2 style={{ marginTop: "40px" }}>Performance Metrics</h2>
      <CampaignChart data={performance} />
    </div>
  );
}

export default Dashboard;
