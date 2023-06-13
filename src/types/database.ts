export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      attendee: {
        Row: {
          attending: Database["public"]["Enums"]["attending"] | null
          event_id: string | null
          remark: string | null
          user_id: string | null
        }
        Insert: {
          attending?: Database["public"]["Enums"]["attending"] | null
          event_id?: string | null
          remark?: string | null
          user_id?: string | null
        }
        Update: {
          attending?: Database["public"]["Enums"]["attending"] | null
          event_id?: string | null
          remark?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendee_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendee_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "member"
            referencedColumns: ["id"]
          }
        ]
      }
      division: {
        Row: {
          musician: string
          song_instrument_id: string
        }
        Insert: {
          musician: string
          song_instrument_id: string
        }
        Update: {
          musician?: string
          song_instrument_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "division_musician_fkey"
            columns: ["musician"]
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "division_song_instrument_id_fkey"
            columns: ["song_instrument_id"]
            referencedRelation: "song_instrument"
            referencedColumns: ["id"]
          }
        ]
      }
      event: {
        Row: {
          end_time: string | null
          start_time: string
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          location: string | null
        }
        Insert: {
          end_time?: string | null
          start_time: string
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          location?: string | null
        }
        Update: {
          end_time?: string | null
          start_time?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          location?: string | null
        }
        Relationships: []
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
        Relationships: []
      }
      member: {
        Row: {
          display_name: string
          id: string
        }
        Insert: {
          display_name: string
          id: string
        }
        Update: {
          display_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      song: {
        Row: {
          artist: string[]
          author: string
          created_at: string
          id: string
          inRepertoire: boolean
          link: string | null
          motivation: string
          title: string
        }
        Insert: {
          artist: string[]
          author: string
          created_at?: string
          id?: string
          inRepertoire?: boolean
          link?: string | null
          motivation: string
          title: string
        }
        Update: {
          artist?: string[]
          author?: string
          created_at?: string
          id?: string
          inRepertoire?: boolean
          link?: string | null
          motivation?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "song_author_fkey"
            columns: ["author"]
            referencedRelation: "member"
            referencedColumns: ["id"]
          }
        ]
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
        Update: {
          description?: string | null
          id?: string
          instrument_id?: string
          song_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "song_instrument_instrument_id_fkey"
            columns: ["instrument_id"]
            referencedRelation: "instrument"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_instrument_song_id_fkey"
            columns: ["song_id"]
            referencedRelation: "song"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
      verify_user_password: {
        Args: {
          password: string
        }
        Returns: boolean
      }
    }
    Enums: {
      attending: "present" | "absent" | "undecided"
      event_type: "Brainstormborrel" | "Rehearsal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

