import type { BloodGroup, UserRole, UrgencyLevel, BloodComponent, PakistanCity } from '../config/constants'

// ─── Auth / Profile ──────────────────────────────────────────
export interface Profile {
  id:           string
  email:        string
  full_name:    string
  phone:        string | null
  avatar_url:   string | null
  role:         UserRole
  city:         PakistanCity | null
  cnic:         string | null
  is_verified:  boolean
  created_at:   string
  updated_at:   string
}

// ─── Donor ────────────────────────────────────────────────────
export interface Donor {
  id:                   string
  profile_id:           string
  blood_group:          BloodGroup
  weight_kg:            number
  date_of_birth:        string
  gender:               'male' | 'female' | 'other'
  is_available:         boolean
  is_eligible:          boolean
  last_donation_date:   string | null
  total_donations:      number
  city:                 PakistanCity
  address:              string | null
  medical_conditions:   string[]
  medications:          string[]
  profile:              Profile
  badges:               DonorBadge[]
  created_at:           string
  updated_at:           string
}

export interface DonorBadge {
  id:          string
  donor_id:    string
  badge_id:    string
  earned_at:   string
}

export interface DonationHistory {
  id:              string
  donor_id:        string
  blood_bank_id:   string
  blood_group:     BloodGroup
  component:       BloodComponent
  units:           number
  donated_at:      string
  certificate_url: string | null
  blood_bank:      BloodBank
}

// ─── Blood Request ────────────────────────────────────────────
export interface BloodRequest {
  id:              string
  requester_id:    string
  blood_group:     BloodGroup
  component:       BloodComponent
  units_needed:    number
  urgency:         UrgencyLevel
  status:          RequestStatus
  hospital_name:   string
  city:            PakistanCity
  patient_name:    string
  contact_phone:   string
  notes:           string | null
  expires_at:      string | null
  fulfilled_at:    string | null
  matches:         RequestMatch[]
  requester:       Profile
  created_at:      string
  updated_at:      string
}

export type RequestStatus = 'pending' | 'matched' | 'fulfilled' | 'cancelled' | 'expired'

export interface RequestMatch {
  id:         string
  request_id: string
  donor_id:   string
  status:     'pending' | 'accepted' | 'declined'
  donor:      Donor
  created_at: string
}

// ─── Blood Bank / Hospital ────────────────────────────────────
export interface BloodBank {
  id:           string
  admin_id:     string
  name:         string
  type:         'blood_bank' | 'hospital' | 'both'
  city:         PakistanCity
  address:      string
  phone:        string
  email:        string | null
  is_verified:  boolean
  is_active:    boolean
  latitude:     number | null
  longitude:    number | null
  inventory:    BloodInventory[]
  created_at:   string
}

// ─── Inventory ────────────────────────────────────────────────
export interface BloodInventory {
  id:            string
  blood_bank_id: string
  blood_group:   BloodGroup
  component:     BloodComponent
  units:         number
  expiry_date:   string | null
  updated_at:    string
}

// ─── Appointment ──────────────────────────────────────────────
export interface Appointment {
  id:            string
  donor_id:      string
  blood_bank_id: string
  scheduled_at:  string
  status:        'scheduled' | 'completed' | 'cancelled' | 'no_show'
  notes:         string | null
  donor:         Donor
  blood_bank:    BloodBank
  created_at:    string
}

// ─── Notification ─────────────────────────────────────────────
export interface Notification {
  id:         string
  user_id:    string
  type:       NotificationType
  title:      string
  message:    string
  is_read:    boolean
  data:       Record<string, unknown> | null
  created_at: string
}

export type NotificationType =
  | 'blood_request'
  | 'request_matched'
  | 'appointment_reminder'
  | 'appointment_confirmed'
  | 'donation_complete'
  | 'badge_earned'
  | 'inventory_low'
  | 'system'

// ─── Campaign ─────────────────────────────────────────────────
export interface Campaign {
  id:          string
  title:       string
  description: string
  blood_group: BloodGroup | null
  city:        PakistanCity | null
  starts_at:   string
  ends_at:     string
  is_active:   boolean
  created_by:  string
  created_at:  string
}

// ─── Audit Log ───────────────────────────────────────────────
export interface AuditLog {
  id:         string
  actor_id:   string
  action:     string
  entity:     string
  entity_id:  string | null
  metadata:   Record<string, unknown> | null
  created_at: string
  actor:      Profile
}

// ─── API Response Wrappers ────────────────────────────────────
export interface ApiResponse<T> {
  data:    T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data:       T[]
  total:      number
  page:       number
  pageSize:   number
  totalPages: number
}

// ─── Form Types ───────────────────────────────────────────────
export interface LoginForm {
  email:    string
  password: string
}

export interface RegisterForm {
  full_name:        string
  email:            string
  password:         string
  confirm_password: string
  phone:            string
  role:             UserRole
  city:             PakistanCity
}

export interface BloodRequestForm {
  blood_group:   BloodGroup
  component:     BloodComponent
  units_needed:  number
  urgency:       UrgencyLevel
  hospital_name: string
  city:          PakistanCity
  patient_name:  string
  contact_phone: string
  notes?:        string
}

// ─── Re-export config types ───────────────────────────────────
export type { BloodGroup, UserRole, UrgencyLevel, BloodComponent, PakistanCity }
