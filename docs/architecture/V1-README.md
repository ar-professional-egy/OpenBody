# OpenBody V1 Architecture

## Scope

OpenBody V1 converts the current web prototype into a production-oriented platform while preserving the existing React interface as the initial web client.

## Target components

- `web/`: React + Vite web client and dashboards.
- `mobile/`: Flutter Android/iOS client.
- `backend/`: FastAPI API layer.
- `ai/`: image preprocessing, inference, model schemas, and evaluation.
- `database/`: Supabase/PostgreSQL migrations, policies, and seed data.
- `infrastructure/`: Docker and deployment configuration.
- `tests/`: cross-component integration and acceptance tests.

## Core flow

1. Client captures or uploads vehicle images.
2. Images are stored in object storage.
3. An analysis session is created through the API.
4. The AI service detects vehicle parts and visible damage.
5. The cost engine calculates a configurable estimate.
6. Results are persisted in PostgreSQL.
7. The report service creates a shareable report.
8. Web and mobile clients retrieve the same analysis state.

## V1 boundaries

V1 must provide a real end-to-end analysis workflow, persistent reports, authentication, role-aware access, cost estimation, and automated build verification.

The current simulated analysis in the web prototype is not considered an AI implementation.

## Migration rule

Existing UI components should be preserved where practical. Firebase/localStorage dependencies are migrated incrementally only after equivalent Supabase/API paths exist and are verified.
