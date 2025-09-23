from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from db import get_connection

app = FastAPI(title="📊 Marketing Analytics API")

# ---------------------------------------------------------
# ✅ CORS (so React frontend can connect without issues)
# ---------------------------------------------------------
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# ✅ Pydantic models (for auto docs & type safety)
# ---------------------------------------------------------
# class CampaignPerformance(BaseModel):
#     company: Optional[str]
#     channel_used: Optional[str]
#     campaign_type: Optional[str]
#     customer_segment: Optional[str]
#     total_impressions: Optional[int]
#     total_clicks: Optional[int]
#     avg_conversion_rate: Optional[float]
#     avg_roi: Optional[float]
#     total_engagement: Optional[int]
#     total_acquisition_cost: Optional[float]

# class DailyCampaign(BaseModel):
#     campaign_id: int
#     company: str
#     channel_used: str
#     impressions: int
#     clicks: int
#     roi: float
#     conversion_rate: float
#     date: str

# ---------------------------------------------------------
# ✅ Routes
# ---------------------------------------------------------

@app.get("/")
def root():
    return {"message": "🚀 Marketing Analytics API is running!"}

@app.get("/campaigns/performance")#, response_model=List[CampaignPerformance]
@app.get("/campaigns/performance")
def get_campaign_performance():
    """
    Returns aggregated marketing performance metrics
    from DBT_MH_DEV_ENV.MARKETING_PERFORMANCE (dbt model).
    """
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM DBT_MH_DEV_ENV.MARKETING_PERFORMANCE LIMIT 100;")
        rows = cur.fetchall()
        colnames = [desc[0] for desc in cur.description]
        return [dict(zip(colnames, row)) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cur.close()
        conn.close()

@app.get("/campaigns/daily")#, response_model=List[DailyCampaign]
def get_daily_campaigns():
    """
    Returns daily campaign performance metrics
    from DAILY_CAMPAIGN_PERFORMANCE (dbt model).
    """
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM DBT_MH_DEV_ENV.DAILY_CAMPAIGN_PERFORMANCE LIMIT 100;")
        rows = cur.fetchall()
        colnames = [desc[0] for desc in cur.description]
        return [dict(zip(colnames, row)) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cur.close()
        conn.close()

@app.get("/campaigns/history")
def get_history():
    """
    Returns raw historical campaigns from the
    base Snowflake table MARKETING_DB.MARKETING_CAMPAIGN.MARKETING
    """
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM MARKETING_DB.MARKETING_CAMPAIGN.MARKETING LIMIT 200;")
        rows = cur.fetchall()
        colnames = [desc[0] for desc in cur.description]
        return [dict(zip(colnames, row)) for row in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cur.close()
        conn.close()
