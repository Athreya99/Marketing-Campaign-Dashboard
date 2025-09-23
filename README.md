📊 Marketing Campaign Dashboard

An end-to-end data pipeline and dashboard to analyze marketing campaign performance.

This project integrates:

Snowflake – cloud data warehouse

Fivetran – ELT pipeline for ingestion

dbt Cloud – transformations, testing, and modeling

FastAPI – Python backend serving REST APIs

React (Vite) – frontend dashboard with charts and tables

⚙️ Setup Instructions
1. 🔑 Prerequisites

Snowflake account

Fivetran account

dbt Cloud account

Python 3.10+ (with venv)

Node.js 18+ (with npm or yarn)

GitHub repo 

2. 🗄️ Snowflake Setup

Create a database:

CREATE DATABASE MARKETING_DB;


Create a schema for raw campaigns:

CREATE SCHEMA MARKETING_DB.MARKETING_CAMPAIGN;


Create a role and warehouse:

CREATE ROLE FIVETRAN_ROLE;
CREATE WAREHOUSE FIVETRAN_WH WITH WAREHOUSE_SIZE = 'XSMALL' AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;


Grant permissions:

GRANT USAGE ON WAREHOUSE FIVETRAN_WH TO ROLE FIVETRAN_ROLE;
GRANT USAGE, CREATE SCHEMA ON DATABASE MARKETING_DB TO ROLE FIVETRAN_ROLE;

3. 🔄 Fivetran Setup

Login to Fivetran dashboard.

Create a new connector (CSV, Google Sheets, HubSpot, or any marketing data source).

Choose Snowflake as the destination.

Enter Snowflake credentials:

Account: your-account-id

User: FIVETRAN_USER

Warehouse: FIVETRAN_WH

Database: MARKETING_DB

Schema: MARKETING_CAMPAIGN

Run the sync → data should now flow into Snowflake.

4. 📦 dbt Cloud Setup

Create a new dbt Cloud project.

Configure connection to Snowflake:

Account, User, Role, Warehouse, Database, Schema (same as above).

Add profiles.yml in dbt Cloud.

Create models under models/:

stg_marketing.sql – staging model

marketing_performance.sql – aggregated KPIs

Add tests in schema.yml:

tests:
  - not_null
  - unique
  - dbt_utils.accepted_range


Run:

dbt run
dbt test

5. ⚡ Backend (FastAPI)

Create a virtual environment:

python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate # Mac/Linux


Install dependencies:

pip install fastapi uvicorn snowflake-connector-python python-dotenv


Add .env:

SNOWFLAKE_USER=FIVETRAN_USER
SNOWFLAKE_PASSWORD=YOUR_PASSWORD
SNOWFLAKE_ACCOUNT=xxxxxxx
SNOWFLAKE_ROLE=FIVETRAN_ROLE
SNOWFLAKE_WAREHOUSE=FIVETRAN_WH
SNOWFLAKE_DATABASE=MARKETING_DB
SNOWFLAKE_SCHEMA=YOUR_CLOUDBT_ENV


Run server:

uvicorn main:app --reload


Open Swagger docs at: http://127.0.0.1:8000/docs

6. 🎨 Frontend (React + Vite)

Create React app:

npm create vite@latest dashboard --template react
cd dashboard
npm install
npm install axios recharts


Add components:

CampaignTable.jsx – table view

CampaignChart.jsx – bar chart with tooltips

Dashboard.jsx – main dashboard page

Run frontend:

npm run dev


Open: http://localhost:5173

7. 🚀 Deployment (Optional)

Backend → Deploy FastAPI.

Frontend → Deploy React app.

dbt → Runs in dbt Cloud jobs.

Fivetran → Auto-sync keeps Snowflake fresh.


│   ├── models/
│   │   ├── stg_marketing.sql
│   │   ├── marketing_performance.sql
│   │   └── schema.yml
│   └── dbt_project.yml
│
└── README.md
