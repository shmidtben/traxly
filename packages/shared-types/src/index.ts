// ─── Enums ───────────────────────────────────────────────────────────────────

export enum Role {
  ARTIST = "ARTIST",
  CURATOR = "CURATOR",
  ADMIN = "ADMIN",
}

export enum CuratorStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

export enum SubmissionStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PAID = "PAID",
  ASSIGNING = "ASSIGNING",
  IN_REVIEW = "IN_REVIEW",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
}

export enum ReviewStatus {
  ASSIGNED = "ASSIGNED",
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  EXPIRED = "EXPIRED",
  SKIPPED = "SKIPPED",
}

export enum PayoutStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export enum CreditTransactionType {
  PURCHASE = "PURCHASE",
  SPEND = "SPEND",
  BONUS = "BONUS",
  REFUND = "REFUND",
}

export enum NotificationType {
  SUBMISSION_COMPLETE = "SUBMISSION_COMPLETE",
  REVIEW_ASSIGNED = "REVIEW_ASSIGNED",
  REVIEW_EXPIRING = "REVIEW_EXPIRING",
  PAYOUT_SENT = "PAYOUT_SENT",
  APPLICATION_APPROVED = "APPLICATION_APPROVED",
  APPLICATION_REJECTED = "APPLICATION_REJECTED",
}

// ─── DB Row Types ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  name: string | null;
  role: Role;
  credit_balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface CuratorProfile {
  id: string;
  user_id: string;
  status: CuratorStatus;
  bio: string | null;
  genres: string[];
  spotify_url: string | null;
  instagram_url: string | null;
  website_url: string | null;
  stripe_account_id: string | null;
  credibility_score: number;
  total_reviews: number;
  current_week_review_count: number;
  max_weekly_reviews: number;
  application_why: string | null;
  application_link: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ArtistProfile {
  id: string;
  user_id: string;
  bio: string | null;
  genres: string[];
  spotify_url: string | null;
  instagram_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Track {
  id: string;
  artist_id: string;
  title: string;
  audio_file_url: string; // R2 object key
  duration_seconds: number | null;
  genre: string;
  bpm: number | null;
  key: string | null;
  influences: string | null;
  artist_notes: string | null;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Submission {
  id: string;
  track_id: string;
  artist_id: string;
  status: SubmissionStatus;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  tier: number;
  curator_count: number;
  credits_spent: number;
  amount_cents: number;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface SubmissionCuratorAssignment {
  id: string;
  submission_id: string;
  curator_id: string;
  status: ReviewStatus;
  listen_token: string;
  assigned_at: Date;
  deadline_at: Date;
  listen_duration_seconds: number;
  created_at: Date;
  updated_at: Date;
}

export interface Review {
  id: string;
  assignment_id: string;
  curator_id: string;
  submission_id: string;
  emotional_response: number; // 1-10
  playlist_intent: "YES" | "NO" | "MAYBE";
  readiness: "RELEASE_NOW" | "NEEDS_WORK" | "MAJOR_CHANGES";
  written_notes: string;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ReviewTimestamp {
  id: string;
  review_id: string;
  position_seconds: number;
  question_key: string;
  note: string | null;
  created_at: Date;
}

export interface Payout {
  id: string;
  curator_id: string;
  review_id: string;
  amount_cents: number;
  tier: number;
  status: PayoutStatus;
  stripe_transfer_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price_cents: number;
  stripe_price_id: string | null;
  active: boolean;
  created_at: Date;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  type: CreditTransactionType;
  credits: number;
  description: string;
  submission_id: string | null;
  created_at: Date;
}

export interface TrackOutcome {
  id: string;
  track_id: string;
  submission_id: string;
  spotify_streams_30d: number | null;
  spotify_playlist_adds: number | null;
  checked_at: Date;
  created_at: Date;
}

export interface WaitlistEntry {
  id: string;
  type: "artist" | "curator";
  name: string;
  email: string;
  genre: string | null;
  link: string | null;
  why: string | null;
  created_at: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  read: boolean;
  link: string | null;
  created_at: Date;
}
