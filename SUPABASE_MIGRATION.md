# Firebase to Supabase Migration Roadmap

## Phase 1: Authentication Migration
- [x] Install `@supabase/supabase-js`.
- [x] Create `src/lib/supabaseClient.ts` to initialize the Supabase client.
- [x] Update `AuthContext.tsx` to listen to Supabase Auth state changes instead of Firebase.
- [x] Adapt `user` object in Context to map Supabase's `.id` to `.uid` for backward compatibility.
- [ ] **Pending:** Update `LoginForm.tsx` (and other auth components) to use `supabase.auth.signInWithOtp` or `supabase.auth.signInWithOAuth` instead of Firebase Auth methods.
- [ ] **Pending:** Remove `firebase` dependencies from `package.json` after full auth migration.

## Phase 2: Database Migration (Firestore to PostgreSQL)
- [x] Create `analysis_reports` table in Supabase PostgreSQL database to store AI damage reports.
- [x] Update `Analysis.tsx` to push new reports directly to Supabase using `supabase.from('analysis_reports').insert(...)`.
- [ ] **Pending:** Migrate `ClientDashboard.tsx` to pull data from Supabase instead of local storage.
- [ ] **Pending:** Migrate Workshop Request logic to use Supabase instead of mock data.
- [x] Create `profiles` table to manage user roles for RBAC.
- [x] Update `AuthGate.tsx` to query `profiles` table and enforce Role-Based Access Control (RBAC).

## Phase 3: File Storage Migration (Firebase Storage to Supabase Storage)
- [ ] **Pending:** Replace Firebase Storage uploads (e.g., car images) with `supabase.storage.from('images').upload(...)`.
- [ ] **Pending:** Update database records to use public Supabase storage URLs instead of Firebase URLs.

## Phase 4: API Backend (FastAPI Integration)
- [x] Create `/backend/main.py` skeleton with basic routes.
- [x] Create `backend/schemas/analysis.py` and `backend/models/ai.py`.
- [x] Create `src/services/api.ts` frontend client to connect to FastAPI.
- [ ] **Pending:** Offload AI analysis logic entirely from frontend to FastAPI backend, calling `api.ts`.

## Phase 5: Environment & Project Config
- [x] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` placeholders to `.env.example`.
- [ ] **Pending:** Delete `src/lib/firebase.ts` once no files import it.
