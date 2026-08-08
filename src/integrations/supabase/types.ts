export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string
          city: string
          created_at: string
          id: string
          is_default: boolean
          label: string | null
          postal_code: string | null
          province: string
          receiver_name: string
          receiver_phone: string
          user_id: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          postal_code?: string | null
          province: string
          receiver_name: string
          receiver_phone: string
          user_id: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          postal_code?: string | null
          province?: string
          receiver_name?: string
          receiver_phone?: string
          user_id?: string
        }
        Relationships: []
      }
      banners: {
        Row: {
          bg_color: string | null
          created_at: string
          cta_text: string | null
          cta_url: string | null
          display_order: number
          ends_at: string | null
          id: string
          image_url: string | null
          is_active: boolean
          placement: string
          starts_at: string | null
          subtitle: string | null
          title: string | null
        }
        Insert: {
          bg_color?: string | null
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          display_order?: number
          ends_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          placement?: string
          starts_at?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          bg_color?: string | null
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          display_order?: number
          ends_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          placement?: string
          starts_at?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          slug: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          slug: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          slug?: string
          website?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: string
          created_at: string
          id: string
          product_id: string
          quantity: number
          saved_for_later: boolean
          variant_id: string | null
        }
        Insert: {
          cart_id: string
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          saved_for_later?: boolean
          variant_id?: string | null
        }
        Update: {
          cart_id?: string
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          saved_for_later?: boolean
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          display_order: number
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          parent_id: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          parent_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          parent_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupon_usages: {
        Row: {
          coupon_id: string
          created_at: string
          id: string
          order_id: string | null
          user_id: string
        }
        Insert: {
          coupon_id: string
          created_at?: string
          id?: string
          order_id?: string | null
          user_id: string
        }
        Update: {
          coupon_id?: string
          created_at?: string
          id?: string
          order_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_usages_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_usages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          discount_type: string
          ends_at: string | null
          id: string
          is_active: boolean
          max_discount: number | null
          min_order: number
          per_user_limit: number
          starts_at: string | null
          usage_limit: number | null
          used_count: number
          value: number
        }
        Insert: {
          code: string
          created_at?: string
          discount_type?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean
          max_discount?: number | null
          min_order?: number
          per_user_limit?: number
          starts_at?: string | null
          usage_limit?: number | null
          used_count?: number
          value: number
        }
        Update: {
          code?: string
          created_at?: string
          discount_type?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean
          max_discount?: number | null
          min_order?: number
          per_user_limit?: number
          starts_at?: string | null
          usage_limit?: number | null
          used_count?: number
          value?: number
        }
        Relationships: []
      }
      credit_accounts: {
        Row: {
          created_at: string
          id: string
          monthly_cap: number
          plan_name: string | null
          status: string
          total_credit: number
          updated_at: string
          used_credit: number
          user_id: string
          wallet_balance: number
        }
        Insert: {
          created_at?: string
          id?: string
          monthly_cap?: number
          plan_name?: string | null
          status?: string
          total_credit?: number
          updated_at?: string
          used_credit?: number
          user_id: string
          wallet_balance?: number
        }
        Update: {
          created_at?: string
          id?: string
          monthly_cap?: number
          plan_name?: string | null
          status?: string
          total_credit?: number
          updated_at?: string
          used_credit?: number
          user_id?: string
          wallet_balance?: number
        }
        Relationships: []
      }
      installment_plans: {
        Row: {
          created_at: string
          down_payment: number
          guarantee_type: string | null
          id: string
          monthly_amount: number
          months: number
          order_id: string | null
          principal: number
          profit_rate: number
          status: string
          total_repayment: number
          user_id: string
        }
        Insert: {
          created_at?: string
          down_payment?: number
          guarantee_type?: string | null
          id?: string
          monthly_amount: number
          months: number
          order_id?: string | null
          principal: number
          profit_rate?: number
          status?: string
          total_repayment: number
          user_id: string
        }
        Update: {
          created_at?: string
          down_payment?: number
          guarantee_type?: string | null
          id?: string
          monthly_amount?: number
          months?: number
          order_id?: string | null
          principal?: number
          profit_rate?: number
          status?: string
          total_repayment?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "installment_plans_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      installments: {
        Row: {
          amount: number
          bank_info: string | null
          due_date: string
          id: string
          number: number
          paid_at: string | null
          penalty: number
          plan_id: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          bank_info?: string | null
          due_date: string
          id?: string
          number: number
          paid_at?: string | null
          penalty?: number
          plan_id: string
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          bank_info?: string | null
          due_date?: string
          id?: string
          number?: number
          paid_at?: string | null
          penalty?: number
          plan_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "installments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "installment_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          channel: string
          created_at: string
          id: string
          is_read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          channel?: string
          created_at?: string
          id?: string
          is_read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          channel?: string
          created_at?: string
          id?: string
          is_read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          discount_percent: number
          id: string
          line_total: number
          order_id: string
          product_id: string | null
          product_image: string | null
          product_name: string
          quantity: number
          unit_price: number
          variant_id: string | null
          variant_label: string | null
        }
        Insert: {
          discount_percent?: number
          id?: string
          line_total: number
          order_id: string
          product_id?: string | null
          product_image?: string | null
          product_name: string
          quantity: number
          unit_price: number
          variant_id?: string | null
          variant_label?: string | null
        }
        Update: {
          discount_percent?: number
          id?: string
          line_total?: number
          order_id?: string
          product_id?: string | null
          product_image?: string | null
          product_name?: string
          quantity?: number
          unit_price?: number
          variant_id?: string | null
          variant_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address_snapshot: Json | null
          coupon_code: string | null
          created_at: string
          discount_total: number
          id: string
          items_total: number
          order_number: string
          payment_method: string | null
          payment_status: string
          shipping_cost: number
          shipping_method: string | null
          status: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          address_snapshot?: Json | null
          coupon_code?: string | null
          created_at?: string
          discount_total?: number
          id?: string
          items_total?: number
          order_number?: string
          payment_method?: string | null
          payment_status?: string
          shipping_cost?: number
          shipping_method?: string | null
          status?: string
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          address_snapshot?: Json | null
          coupon_code?: string | null
          created_at?: string
          discount_total?: number
          id?: string
          items_total?: number
          order_number?: string
          payment_method?: string | null
          payment_status?: string
          shipping_cost?: number
          shipping_method?: string | null
          status?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          gateway: string | null
          id: string
          installment_id: string | null
          method: string
          order_id: string | null
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          gateway?: string | null
          id?: string
          installment_id?: string | null
          method: string
          order_id?: string | null
          status?: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          gateway?: string | null
          id?: string
          installment_id?: string | null
          method?: string
          order_id?: string | null
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          alt: string | null
          display_order: number
          id: string
          product_id: string
          url: string
        }
        Insert: {
          alt?: string | null
          display_order?: number
          id?: string
          product_id: string
          url: string
        }
        Update: {
          alt?: string | null
          display_order?: number
          id?: string
          product_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          display_order: number
          id: string
          image_url: string | null
          option_hex: string | null
          option_type: string
          option_value: string
          price: number | null
          product_id: string
          sku: string
          stock: number
        }
        Insert: {
          display_order?: number
          id?: string
          image_url?: string | null
          option_hex?: string | null
          option_type: string
          option_value: string
          price?: number | null
          product_id: string
          sku: string
          stock?: number
        }
        Update: {
          display_order?: number
          id?: string
          image_url?: string | null
          option_hex?: string | null
          option_type?: string
          option_value?: string
          price?: number | null
          product_id?: string
          sku?: string
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string | null
          category_id: string | null
          created_at: string
          description: string | null
          discount_percent: number
          id: string
          image_url: string | null
          installment_available: boolean
          is_active: boolean
          is_daily_deal: boolean
          is_featured: boolean
          min_stock: number
          name: string
          price: number
          rating: number
          reviews_count: number
          seller_id: string | null
          seo_description: string | null
          seo_title: string | null
          sku: string
          slug: string
          sold_count: number
          specifications: Json
          stock: number
          subtitle: string | null
          updated_at: string
          views_count: number
          warranty: string | null
        }
        Insert: {
          brand_id?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount_percent?: number
          id?: string
          image_url?: string | null
          installment_available?: boolean
          is_active?: boolean
          is_daily_deal?: boolean
          is_featured?: boolean
          min_stock?: number
          name: string
          price?: number
          rating?: number
          reviews_count?: number
          seller_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          sku: string
          slug: string
          sold_count?: number
          specifications?: Json
          stock?: number
          subtitle?: string | null
          updated_at?: string
          views_count?: number
          warranty?: string | null
        }
        Update: {
          brand_id?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount_percent?: number
          id?: string
          image_url?: string | null
          installment_available?: boolean
          is_active?: boolean
          is_daily_deal?: boolean
          is_featured?: boolean
          min_stock?: number
          name?: string
          price?: number
          rating?: number
          reviews_count?: number
          seller_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          sku?: string
          slug?: string
          sold_count?: number
          specifications?: Json
          stock?: number
          subtitle?: string | null
          updated_at?: string
          views_count?: number
          warranty?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birth_date: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          national_code: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          national_code?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          national_code?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string | null
          comment: string | null
          cons: string[]
          created_at: string
          id: string
          images: string[]
          product_id: string
          pros: string[]
          rating: number
          status: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          author_name?: string | null
          comment?: string | null
          cons?: string[]
          created_at?: string
          id?: string
          images?: string[]
          product_id: string
          pros?: string[]
          rating: number
          status?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          author_name?: string | null
          comment?: string | null
          cons?: string[]
          created_at?: string
          id?: string
          images?: string[]
          product_id?: string
          pros?: string[]
          rating?: number
          status?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      sellers: {
        Row: {
          business_name: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          rating: number
          status: string
          user_id: string | null
        }
        Insert: {
          business_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          rating?: number
          status?: string
          user_id?: string | null
        }
        Update: {
          business_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          rating?: number
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "admin" | "seller"
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
      app_role: ["customer", "admin", "seller"],
    },
  },
} as const
