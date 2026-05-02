-- ============================================================
-- Pakistan Bloodcare Official — Supabase Schema
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ─── ENUMS ──────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('donor', 'patient', 'blood_bank_admin', 'national_admin');
CREATE TYPE blood_group AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE blood_component AS ENUM (
  'Whole Blood', 'Red Blood Cells', 'Platelets',
  'Fresh Frozen Plasma', 'Cryoprecipitate'
);
CREATE TYPE urgency_level AS ENUM ('critical', 'urgent', 'normal');
CREATE TYPE request_status AS ENUM ('pending', 'matched', 'fulfilled', 'cancelled', 'expired');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'declined');
CREATE TYPE bank_type AS ENUM ('blood_bank', 'hospital', 'both');
CREATE TYPE notification_type AS ENUM (
  'blood_request', 'request_matched', 'appointment_reminder',
  'appointment_confirmed', 'donation_complete', 'badge_earned',
  'inventory_low', 'system'
);

-- ─── PROFILES ───────────────────────────────────────────────
CREATE TABLE profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT NOT NULL UNIQUE,
  full_name    TEXT NOT NULL,
  phone        TEXT,
  avatar_url   TEXT,
  role         user_role NOT NULL DEFAULT 'donor',
  city         TEXT,
  cnic         TEXT UNIQUE,
  is_verified  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── DONORS ──────────────────────────────────────────────────
CREATE TABLE donors (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id         UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  blood_group        blood_group NOT NULL,
  weight_kg          NUMERIC(5,1) NOT NULL CHECK (weight_kg >= 45),
  date_of_birth      DATE NOT NULL,
  gender             TEXT NOT NULL CHECK (gender IN ('male','female','other')),
  is_available       BOOLEAN NOT NULL DEFAULT TRUE,
  is_eligible        BOOLEAN NOT NULL DEFAULT TRUE,
  last_donation_date DATE,
  total_donations    INTEGER NOT NULL DEFAULT 0 CHECK (total_donations >= 0),
  city               TEXT NOT NULL,
  address            TEXT,
  medical_conditions TEXT[] NOT NULL DEFAULT '{}',
  medications        TEXT[] NOT NULL DEFAULT '{}',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── BLOOD BANKS / HOSPITALS ─────────────────────────────────
CREATE TABLE blood_banks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id    UUID NOT NULL REFERENCES profiles(id),
  name        TEXT NOT NULL,
  type        bank_type NOT NULL DEFAULT 'blood_bank',
  city        TEXT NOT NULL,
  address     TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  latitude    NUMERIC(10,7),
  longitude   NUMERIC(10,7),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── BLOOD INVENTORY ─────────────────────────────────────────
CREATE TABLE blood_inventory (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blood_bank_id UUID NOT NULL REFERENCES blood_banks(id) ON DELETE CASCADE,
  blood_group   blood_group NOT NULL,
  component     blood_component NOT NULL DEFAULT 'Whole Blood',
  units         INTEGER NOT NULL DEFAULT 0 CHECK (units >= 0),
  expiry_date   DATE,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (blood_bank_id, blood_group, component)
);

-- ─── BLOOD REQUESTS ──────────────────────────────────────────
CREATE TABLE blood_requests (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blood_group   blood_group NOT NULL,
  component     blood_component NOT NULL DEFAULT 'Whole Blood',
  units_needed  INTEGER NOT NULL DEFAULT 1 CHECK (units_needed > 0),
  urgency       urgency_level NOT NULL DEFAULT 'normal',
  status        request_status NOT NULL DEFAULT 'pending',
  hospital_name TEXT NOT NULL,
  city          TEXT NOT NULL,
  patient_name  TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  notes         TEXT,
  expires_at    TIMESTAMPTZ,
  fulfilled_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── REQUEST MATCHES ─────────────────────────────────────────
CREATE TABLE request_matches (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES blood_requests(id) ON DELETE CASCADE,
  donor_id   UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
  status     match_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (request_id, donor_id)
);

-- ─── APPOINTMENTS ────────────────────────────────────────────
CREATE TABLE appointments (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id      UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
  blood_bank_id UUID NOT NULL REFERENCES blood_banks(id) ON DELETE CASCADE,
  scheduled_at  TIMESTAMPTZ NOT NULL,
  status        appointment_status NOT NULL DEFAULT 'scheduled',
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── DONATION HISTORY ────────────────────────────────────────
CREATE TABLE donation_history (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id        UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
  blood_bank_id   UUID NOT NULL REFERENCES blood_banks(id),
  blood_group     blood_group NOT NULL,
  component       blood_component NOT NULL DEFAULT 'Whole Blood',
  units           INTEGER NOT NULL DEFAULT 1,
  donated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  certificate_url TEXT
);

-- ─── DONOR BADGES ────────────────────────────────────────────
CREATE TABLE donor_badges (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id  UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
  badge_id  TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (donor_id, badge_id)
);

-- ─── NOTIFICATIONS ───────────────────────────────────────────
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type       notification_type NOT NULL DEFAULT 'system',
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT FALSE,
  data       JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CAMPAIGNS ───────────────────────────────────────────────
CREATE TABLE campaigns (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  blood_group blood_group,
  city        TEXT,
  starts_at   TIMESTAMPTZ NOT NULL,
  ends_at     TIMESTAMPTZ NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_by  UUID NOT NULL REFERENCES profiles(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── AUDIT LOGS ──────────────────────────────────────────────
CREATE TABLE audit_logs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id   UUID NOT NULL REFERENCES profiles(id),
  action     TEXT NOT NULL,
  entity     TEXT NOT NULL,
  entity_id  UUID,
  metadata   JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── INDEXES ─────────────────────────────────────────────────
CREATE INDEX idx_donors_blood_group   ON donors(blood_group);
CREATE INDEX idx_donors_city          ON donors(city);
CREATE INDEX idx_donors_available     ON donors(is_available, is_eligible);
CREATE INDEX idx_requests_status      ON blood_requests(status);
CREATE INDEX idx_requests_blood_group ON blood_requests(blood_group);
CREATE INDEX idx_requests_city        ON blood_requests(city);
CREATE INDEX idx_requests_urgency     ON blood_requests(urgency);
CREATE INDEX idx_inventory_bank       ON blood_inventory(blood_bank_id);
CREATE INDEX idx_notifications_user   ON notifications(user_id, is_read);
CREATE INDEX idx_audit_actor          ON audit_logs(actor_id);
CREATE INDEX idx_audit_created        ON audit_logs(created_at DESC);

-- Full-text search on blood banks
CREATE INDEX idx_blood_banks_name     ON blood_banks USING gin(name gin_trgm_ops);

-- ─── UPDATED_AT TRIGGERS ─────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at    BEFORE UPDATE ON profiles        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER donors_updated_at      BEFORE UPDATE ON donors          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER requests_updated_at    BEFORE UPDATE ON blood_requests  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER inventory_updated_at   BEFORE UPDATE ON blood_inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── AUTO-CREATE PROFILE ON SIGNUP ──────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, phone, city, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'city',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'donor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── DONOR STATS UPDATE TRIGGER ──────────────────────────────
CREATE OR REPLACE FUNCTION update_donor_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE donors SET
    total_donations    = total_donations + 1,
    last_donation_date = NOW()::DATE,
    is_eligible        = FALSE,
    updated_at         = NOW()
  WHERE id = NEW.donor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_donation_recorded
  AFTER INSERT ON donation_history
  FOR EACH ROW EXECUTE FUNCTION update_donor_stats();

-- ─── DONOR ELIGIBILITY RESTORE TRIGGER ───────────────────────
CREATE OR REPLACE FUNCTION check_donor_eligibility()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE donors SET
    is_eligible = TRUE,
    updated_at  = NOW()
  WHERE id = NEW.id
    AND last_donation_date IS NOT NULL
    AND (NOW()::DATE - last_donation_date) >= 90
    AND is_eligible = FALSE;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── BADGE AWARD FUNCTION ─────────────────────────────────────
CREATE OR REPLACE FUNCTION award_badges()
RETURNS TRIGGER AS $$
DECLARE
  donation_count INTEGER;
BEGIN
  SELECT total_donations INTO donation_count FROM donors WHERE id = NEW.donor_id;
  -- First Drop
  IF donation_count >= 1 THEN
    INSERT INTO donor_badges (donor_id, badge_id) VALUES (NEW.donor_id, 'first_drop') ON CONFLICT DO NOTHING;
  END IF;
  -- Life Saver
  IF donation_count >= 3 THEN
    INSERT INTO donor_badges (donor_id, badge_id) VALUES (NEW.donor_id, 'life_saver') ON CONFLICT DO NOTHING;
  END IF;
  -- Blood Hero
  IF donation_count >= 5 THEN
    INSERT INTO donor_badges (donor_id, badge_id) VALUES (NEW.donor_id, 'hero') ON CONFLICT DO NOTHING;
  END IF;
  -- Champion
  IF donation_count >= 10 THEN
    INSERT INTO donor_badges (donor_id, badge_id) VALUES (NEW.donor_id, 'champion') ON CONFLICT DO NOTHING;
  END IF;
  -- Legend
  IF donation_count >= 20 THEN
    INSERT INTO donor_badges (donor_id, badge_id) VALUES (NEW.donor_id, 'legend') ON CONFLICT DO NOTHING;
  END IF;
  -- Guardian Angel
  IF donation_count >= 50 THEN
    INSERT INTO donor_badges (donor_id, badge_id) VALUES (NEW.donor_id, 'guardian') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_donor_stats_updated
  AFTER UPDATE OF total_donations ON donors
  FOR EACH ROW EXECUTE FUNCTION award_badges();

-- ─── MATCH DONORS FUNCTION ────────────────────────────────────
CREATE OR REPLACE FUNCTION match_donors_for_request(request_id UUID)
RETURNS TABLE(donor_id UUID, donor_name TEXT, city TEXT, phone TEXT) AS $$
DECLARE
  req blood_requests%ROWTYPE;
  compatible_groups blood_group[];
BEGIN
  SELECT * INTO req FROM blood_requests WHERE id = request_id;

  -- Determine compatible blood groups (who can donate to this request)
  compatible_groups := CASE req.blood_group
    WHEN 'AB+' THEN ARRAY['O-','O+','A-','A+','B-','B+','AB-','AB+']::blood_group[]
    WHEN 'AB-' THEN ARRAY['O-','A-','B-','AB-']::blood_group[]
    WHEN 'A+'  THEN ARRAY['O-','O+','A-','A+']::blood_group[]
    WHEN 'A-'  THEN ARRAY['O-','A-']::blood_group[]
    WHEN 'B+'  THEN ARRAY['O-','O+','B-','B+']::blood_group[]
    WHEN 'B-'  THEN ARRAY['O-','B-']::blood_group[]
    WHEN 'O+'  THEN ARRAY['O-','O+']::blood_group[]
    WHEN 'O-'  THEN ARRAY['O-']::blood_group[]
  END;

  RETURN QUERY
  SELECT d.id, p.full_name, d.city, p.phone
  FROM donors d
  JOIN profiles p ON p.id = d.profile_id
  WHERE d.blood_group = ANY(compatible_groups)
    AND d.city = req.city
    AND d.is_available = TRUE
    AND d.is_eligible = TRUE
    AND d.id NOT IN (
      SELECT rm.donor_id FROM request_matches rm WHERE rm.request_id = request_id
    )
  ORDER BY d.total_donations DESC;
END;
$$ LANGUAGE plpgsql;
