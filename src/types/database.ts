export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      division: {
        Row: {
          musician: string
          suggestion_instrument_id: string
        }
        Insert: {
          musician: string
          suggestion_instrument_id: string
        }
        Update: {
          musician?: string
          suggestion_instrument_id?: string
        }
      }
      song_division: {
        Row: {
          musician: string
          song_instrument_id: string
        }
        Insert: {
          musician: string
          song_instrument_id: string
        }
      }
      instrument: {
        Row: {
          id: string
          image_source: string
          instrument_name: string
        }
        Insert: {
          id?: string
          image_source: string
          instrument_name: string
        }
        Update: {
          id?: string
          image_source?: string
          instrument_name?: string
        }
      }
      member: {
        Row: {
          display_name: string | null
          id: string
          is_first_login: boolean | null
        }
        Insert: {
          display_name?: string | null
          id: string
          is_first_login?: boolean | null
        }
        Update: {
          display_name?: string | null
          id?: string
          is_first_login?: boolean | null
        }
      }
      suggestion: {
        Row: {
          artist: string[]
          author: string
          created_at: string
          id: string
          link: string | null
          motivation: string
          title: string
        }
        Insert: {
          artist: string[]
          author: string
          created_at?: string
          id?: string
          link?: string | null
          motivation: string
          title: string
        }
        Update: {
          artist?: string[]
          author?: string
          created_at?: string
          id?: string
          link?: string | null
          motivation?: string
          title?: string
        }
      }
      suggestion_instrument: {
        Row: {
          description: string | null
          id: string
          instrument_id: string
          suggestion_id: string
        }
        Insert: {
          description?: string | null
          id?: string
          instrument_id: string
          suggestion_id: string
        }
        Update: {
          description?: string | null
          id?: string
          instrument_id?: string
          suggestion_id?: string
        }
      }
      song: {
        Row: {
          artist: string[]
          id: string
          link?: string | null
          title: string
        }
        Insert: {
          artist: string[]
          id?: string
          link?: string | null
          title: string
        }
      }
      song_instrument: {
        Row: {
          description: string | null
          id: string
          instrument_id: string
          song_id: string
        }
        Insert: {
          description?: string | null
          id?: string
          instrument_id: string
          song_id: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
