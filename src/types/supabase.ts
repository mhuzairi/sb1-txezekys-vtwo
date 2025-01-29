export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          role: 'jobseeker' | 'employer'
          location: string | null
          headline: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          role?: 'jobseeker' | 'employer'
          location?: string | null
          headline?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          role?: 'jobseeker' | 'employer'
          location?: string | null
          headline?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cvs: {
        Row: {
          id: string
          user_id: string
          title: string | null
          cv_data: Json
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          cv_data: Json
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          cv_data?: Json
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'jobseeker' | 'employer'
      cv_status: 'active' | 'archived'
    }
  }
}
