export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent: {
        Row: {
          capabilities: string[] | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          last_active: string | null
          max_tokens: number | null
          model: string | null
          name: string
          status: Database["public"]["Enums"]["agent_status"]
          system_prompt: string | null
          temperature: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          capabilities?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          last_active?: string | null
          max_tokens?: number | null
          model?: string | null
          name: string
          status: Database["public"]["Enums"]["agent_status"]
          system_prompt?: string | null
          temperature?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          capabilities?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          last_active?: string | null
          max_tokens?: number | null
          model?: string | null
          name?: string
          status?: Database["public"]["Enums"]["agent_status"]
          system_prompt?: string | null
          temperature?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      client: {
        Row: {
          active: boolean
          created_at: string | null
          departments: string[] | null
          id: string
          name: string
          subscription_id: string | null
          url: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          departments?: string[] | null
          id?: string
          name: string
          subscription_id?: string | null
          url?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          departments?: string[] | null
          id?: string
          name?: string
          subscription_id?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscription"
            referencedColumns: ["id"]
          },
        ]
      }
      client_subscription: {
        Row: {
          client_id: string
          created_at: string
          id: string
          subscription_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          subscription_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_plan_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_subscription_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscription"
            referencedColumns: ["id"]
          },
        ]
      }
      client_user_assignment: {
        Row: {
          client_id: string
          client_user_id: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          client_user_id: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          client_user_id?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_user_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      credential: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          is_secret: boolean
          provider: string | null
          updated_at: string | null
          variable_name: string
          variable_value: string | null
          vault_key: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          is_secret: boolean
          provider?: string | null
          updated_at?: string | null
          variable_name: string
          variable_value?: string | null
          vault_key?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          is_secret?: boolean
          provider?: string | null
          updated_at?: string | null
          variable_name?: string
          variable_value?: string | null
          vault_key?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credential_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      department: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      document: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          related_id: string | null
          related_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          related_id?: string | null
          related_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          related_id?: string | null
          related_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      node: {
        Row: {
          client_id: string | null
          code: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "node_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      node_input: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          node_id: string
          required: boolean
          type: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          node_id: string
          required?: boolean
          type: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          node_id?: string
          required?: boolean
          type?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "node_input_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "node"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_log: {
        Row: {
          created_at: string | null
          exception_id: string
          id: string
          method: string
          notified_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          exception_id: string
          id?: string
          method: string
          notified_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          exception_id?: string
          id?: string
          method?: string
          notified_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_exception_id_fkey"
            columns: ["exception_id"]
            isOneToOne: false
            referencedRelation: "workflow_exception"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_progress: {
        Row: {
          client_id: string
          completed_at: string | null
          created_at: string | null
          id: number
          pipeline_group_id: string | null
          status: Database["public"]["Enums"]["status"]
          step_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: number
          pipeline_group_id?: string | null
          status?: Database["public"]["Enums"]["status"]
          step_id: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: number
          pipeline_group_id?: string | null
          status?: Database["public"]["Enums"]["status"]
          step_id?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_progress_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_progress_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "pipeline_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_steps: {
        Row: {
          created_at: string | null
          id: number
          step_name: string
          step_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          step_name: string
          step_order: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          step_name?: string
          step_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      proposal: {
        Row: {
          client_id: string
          created_at: string | null
          html_content: string
          id: string
          pipeline_group_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          html_content: string
          id?: string
          pipeline_group_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          html_content?: string
          id?: string
          pipeline_group_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      solutions_engineer_assignment: {
        Row: {
          client_id: string
          created_at: string | null
          se_user_id: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          se_user_id: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          se_user_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solutions_engineer_assignment_se_user_id_fkey1"
            columns: ["se_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solutions_engineer_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription: {
        Row: {
          average_cost: number
          cap_amount: number
          contract_length: string
          credit_per_period: number
          id: string
          name: string
          payment_cadence: string
          prepayment_percentage: number
          price_per_credit: number
          pricing_model: string
          product_usage_api: string
          setup_fee: number
        }
        Insert: {
          average_cost: number
          cap_amount: number
          contract_length: string
          credit_per_period: number
          id?: string
          name: string
          payment_cadence: string
          prepayment_percentage: number
          price_per_credit: number
          pricing_model: string
          product_usage_api: string
          setup_fee: number
        }
        Update: {
          average_cost?: number
          cap_amount?: number
          contract_length?: string
          credit_per_period?: number
          id?: string
          name?: string
          payment_cadence?: string
          prepayment_percentage?: number
          price_per_credit?: number
          pricing_model?: string
          product_usage_api?: string
          setup_fee?: number
        }
        Relationships: []
      }
      survey_response: {
        Row: {
          agent_interaction: string[] | null
          analyzed_survey_response: Json | null
          api_access: string | null
          client_id: string | null
          created_at: string | null
          current_process: string | null
          id: string
          outputs: string[] | null
          pain_points: string[] | null
          pipeline_group_id: string | null
          priority: string | null
          systems: string[] | null
          triggers: string[] | null
          updated_at: string | null
          user_id: string | null
          volume: string | null
          workflow_type: string | null
        }
        Insert: {
          agent_interaction?: string[] | null
          analyzed_survey_response?: Json | null
          api_access?: string | null
          client_id?: string | null
          created_at?: string | null
          current_process?: string | null
          id?: string
          outputs?: string[] | null
          pain_points?: string[] | null
          pipeline_group_id?: string | null
          priority?: string | null
          systems?: string[] | null
          triggers?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          volume?: string | null
          workflow_type?: string | null
        }
        Update: {
          agent_interaction?: string[] | null
          analyzed_survey_response?: Json | null
          api_access?: string | null
          client_id?: string | null
          created_at?: string | null
          current_process?: string | null
          id?: string
          outputs?: string[] | null
          pain_points?: string[] | null
          pipeline_group_id?: string | null
          priority?: string | null
          systems?: string[] | null
          triggers?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          volume?: string | null
          workflow_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_response_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          admin: boolean | null
          avatar_initial: string | null
          bill_rate: number | null
          billing: boolean | null
          cost_rate: number | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          notes: string | null
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          admin?: boolean | null
          avatar_initial?: string | null
          bill_rate?: number | null
          billing?: boolean | null
          cost_rate?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          notes?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          admin?: boolean | null
          avatar_initial?: string | null
          bill_rate?: number | null
          billing?: boolean | null
          cost_rate?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      workflow: {
        Row: {
          client_id: string
          costsaved: number | null
          created_at: string | null
          department: string | null
          description: string | null
          exceptions: number | null
          executions: number | null
          id: string
          name: string
          nodes: number | null
          schedule_days: string[] | null
          schedule_hours: number[] | null
          schedule_months: string[] | null
          status: string
          timesaved: number | null
          trigger_option: Database["public"]["Enums"]["trigger_option"] | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          costsaved?: number | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          exceptions?: number | null
          executions?: number | null
          id?: string
          name: string
          nodes?: number | null
          schedule_days?: string[] | null
          schedule_hours?: number[] | null
          schedule_months?: string[] | null
          status?: string
          timesaved?: number | null
          trigger_option?: Database["public"]["Enums"]["trigger_option"] | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          costsaved?: number | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          exceptions?: number | null
          executions?: number | null
          id?: string
          name?: string
          nodes?: number | null
          schedule_days?: string[] | null
          schedule_hours?: number[] | null
          schedule_months?: string[] | null
          status?: string
          timesaved?: number | null
          trigger_option?: Database["public"]["Enums"]["trigger_option"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflows_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_exception: {
        Row: {
          client_id: string
          created_at: string | null
          department: string | null
          exception_type: string
          id: string
          node_id: string | null
          remedy_notes: string | null
          reported_at: string | null
          resolved_at: string | null
          resolved_by_user_id: string | null
          severity: string
          status: string
          updated_at: string | null
          workflow_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          department?: string | null
          exception_type: string
          id?: string
          node_id?: string | null
          remedy_notes?: string | null
          reported_at?: string | null
          resolved_at?: string | null
          resolved_by_user_id?: string | null
          severity: string
          status?: string
          updated_at?: string | null
          workflow_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          department?: string | null
          exception_type?: string
          id?: string
          node_id?: string | null
          remedy_notes?: string | null
          reported_at?: string | null
          resolved_at?: string | null
          resolved_by_user_id?: string | null
          severity?: string
          status?: string
          updated_at?: string | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_exceptions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_exceptions_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "node"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_exceptions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_node_assignment: {
        Row: {
          created_at: string | null
          node_id: string
          workflow_id: string
        }
        Insert: {
          created_at?: string | null
          node_id: string
          workflow_id: string
        }
        Update: {
          created_at?: string | null
          node_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_node_assignment_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "node"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_node_assignment_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_vault_secret: {
        Args:
          | { secret_text: string; secret_name: string; description: string }
          | { secret_value: string; secret_key: string }
        Returns: string
      }
      delete_vault_secret: {
        Args: { secret_id: string }
        Returns: undefined
      }
      retrieve_vault_secret: {
        Args: { vaultkey: string }
        Returns: {
          id: string
          name: string
          decrypted_secret: string
        }[]
      }
      update_pipeline_status: {
        Args: { p_id: number; new_status: string }
        Returns: undefined
      }
    }
    Enums: {
      agent_status: "active" | "inactive"
      status: "pending" | "completed" | "in-progress"
      trigger_option: "schedule" | "event"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_status: ["active", "inactive"],
      status: ["pending", "completed", "in-progress"],
      trigger_option: ["schedule", "event"],
    },
  },
} as const
