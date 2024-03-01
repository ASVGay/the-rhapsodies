export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

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
          attending: Database["public"]["Enums"]["attending"]
          comment: string | null
          event_id: string
          member_id: string
        }
        Insert: {
          attending?: Database["public"]["Enums"]["attending"]
          comment?: string | null
          event_id: string
          member_id: string
        }
        Update: {
          attending?: Database["public"]["Enums"]["attending"]
          comment?: string | null
          event_id?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendee_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendee_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "division_song_instrument_id_fkey"
            columns: ["song_instrument_id"]
            isOneToOne: false
            referencedRelation: "song_instrument"
            referencedColumns: ["id"]
          },
        ]
      }
      event: {
        Row: {
          end_time: string
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          location: string
          start_time: string
        }
        Insert: {
          end_time: string
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          location: string
          start_time: string
        }
        Update: {
          end_time?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          location?: string
          start_time?: string
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
          hidden: boolean
          id: string
        }
        Insert: {
          display_name: string
          hidden?: boolean
          id: string
        }
        Update: {
          display_name?: string
          hidden?: boolean
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      song: {
        Row: {
          artist: string[]
          author: string
          created_at: string
          id: string
          image: string | null
          inRepertoire: boolean
          link: string | null
          motivation: string
          previewUrl: string | null
          title: string
        }
        Insert: {
          artist: string[]
          author: string
          created_at?: string
          id?: string
          image?: string | null
          inRepertoire?: boolean
          link?: string | null
          motivation: string
          previewUrl?: string | null
          title: string
        }
        Update: {
          artist?: string[]
          author?: string
          created_at?: string
          id?: string
          image?: string | null
          inRepertoire?: boolean
          link?: string | null
          motivation?: string
          previewUrl?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "song_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "instrument"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_instrument_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
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
      get_events_with_attendance: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          event_type: Database["public"]["Enums"]["event_type"]
          start_time: string
          end_time: string
          location: string
          present: number
          absent: number
          undecided: number
        }[]
      }
      get_members_by_event: {
        Args: {
          event_id: string
        }
        Returns: {
          id: string
          display_name: string
          attending: Database["public"]["Enums"]["attending"]
          comment: string
        }[]
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
      event_type: "brainstormborrel" | "rehearsal"
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
          owner_id: string | null
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
          owner_id?: string | null
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
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
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
          owner_id: string | null
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
          owner_id?: string | null
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
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
