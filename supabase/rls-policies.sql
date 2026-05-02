-- Enable RLS on all tables
ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors           ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_banks      ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_inventory  ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests   ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_matches  ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_badges     ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications    ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns        ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs       ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT role = 'national_admin' FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_blood_bank_admin()
RETURNS BOOLEAN AS $$
  SELECT role IN ('blood_bank_admin', 'national_admin') FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- PROFILES
CREATE POLICY "profiles_select_own"    ON profiles FOR SELECT USING (id = auth.uid() OR is_admin());
CREATE POLICY "profiles_update_own"    ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "profiles_insert_own"    ON profiles FOR INSERT WITH CHECK (id = auth.uid());

-- DONORS
CREATE POLICY "donors_select_all"      ON donors FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "donors_insert_own"      ON donors FOR INSERT WITH CHECK (profile_id = auth.uid());
CREATE POLICY "donors_update_own"      ON donors FOR UPDATE USING (profile_id = auth.uid() OR is_admin());
CREATE POLICY "donors_delete_admin"    ON donors FOR DELETE USING (is_admin());

-- BLOOD BANKS
CREATE POLICY "banks_select_verified"  ON blood_banks FOR SELECT USING (is_verified = TRUE OR admin_id = auth.uid() OR is_admin());
CREATE POLICY "banks_insert_admin"     ON blood_banks FOR INSERT WITH CHECK (admin_id = auth.uid() AND is_blood_bank_admin());
CREATE POLICY "banks_update_admin"     ON blood_banks FOR UPDATE USING (admin_id = auth.uid() OR is_admin());
CREATE POLICY "banks_delete_admin"     ON blood_banks FOR DELETE USING (is_admin());

-- BLOOD INVENTORY
CREATE POLICY "inventory_select_auth"  ON blood_inventory FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "inventory_insert_bank"  ON blood_inventory FOR INSERT WITH CHECK (blood_bank_id IN (SELECT id FROM blood_banks WHERE admin_id = auth.uid()) OR is_admin());
CREATE POLICY "inventory_update_bank"  ON blood_inventory FOR UPDATE USING (blood_bank_id IN (SELECT id FROM blood_banks WHERE admin_id = auth.uid()) OR is_admin());
CREATE POLICY "inventory_delete_bank"  ON blood_inventory FOR DELETE USING (blood_bank_id IN (SELECT id FROM blood_banks WHERE admin_id = auth.uid()) OR is_admin());

-- BLOOD REQUESTS
CREATE POLICY "requests_select_auth"   ON blood_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "requests_insert_own"    ON blood_requests FOR INSERT WITH CHECK (requester_id = auth.uid());
CREATE POLICY "requests_update_own"    ON blood_requests FOR UPDATE USING (requester_id = auth.uid() OR is_blood_bank_admin() OR is_admin());

-- REQUEST MATCHES
CREATE POLICY "matches_select_rel"     ON request_matches FOR SELECT USING (donor_id IN (SELECT id FROM donors WHERE profile_id = auth.uid()) OR request_id IN (SELECT id FROM blood_requests WHERE requester_id = auth.uid()) OR is_admin());
CREATE POLICY "matches_insert_admin"   ON request_matches FOR INSERT WITH CHECK (is_admin() OR is_blood_bank_admin());
CREATE POLICY "matches_update_donor"   ON request_matches FOR UPDATE USING (donor_id IN (SELECT id FROM donors WHERE profile_id = auth.uid()) OR is_admin());

-- APPOINTMENTS
CREATE POLICY "appt_select_own"        ON appointments FOR SELECT USING (donor_id IN (SELECT id FROM donors WHERE profile_id = auth.uid()) OR blood_bank_id IN (SELECT id FROM blood_banks WHERE admin_id = auth.uid()) OR is_admin());
CREATE POLICY "appt_insert_donor"      ON appointments FOR INSERT WITH CHECK (donor_id IN (SELECT id FROM donors WHERE profile_id = auth.uid()));
CREATE POLICY "appt_update_relevant"   ON appointments FOR UPDATE USING (donor_id IN (SELECT id FROM donors WHERE profile_id = auth.uid()) OR blood_bank_id IN (SELECT id FROM blood_banks WHERE admin_id = auth.uid()) OR is_admin());

-- DONATION HISTORY
CREATE POLICY "history_select_own"     ON donation_history FOR SELECT USING (donor_id IN (SELECT id FROM donors WHERE profile_id = auth.uid()) OR blood_bank_id IN (SELECT id FROM blood_banks WHERE admin_id = auth.uid()) OR is_admin());
CREATE POLICY "history_insert_bank"    ON donation_history FOR INSERT WITH CHECK (blood_bank_id IN (SELECT id FROM blood_banks WHERE admin_id = auth.uid()) OR is_admin());

-- DONOR BADGES
CREATE POLICY "badges_select_all"      ON donor_badges FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "badges_insert_system"   ON donor_badges FOR INSERT WITH CHECK (is_admin());

-- NOTIFICATIONS
CREATE POLICY "notifs_select_own"      ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "notifs_update_own"      ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "notifs_insert_system"   ON notifications FOR INSERT WITH CHECK (is_admin() OR is_blood_bank_admin());

-- CAMPAIGNS
CREATE POLICY "campaigns_select_pub"   ON campaigns FOR SELECT USING (is_active = TRUE OR is_admin());
CREATE POLICY "campaigns_manage_admin" ON campaigns FOR ALL USING (is_admin());

-- AUDIT LOGS
CREATE POLICY "audit_select_admin"     ON audit_logs FOR SELECT USING (is_admin());
CREATE POLICY "audit_insert_service"   ON audit_logs FOR INSERT WITH CHECK (is_admin());
