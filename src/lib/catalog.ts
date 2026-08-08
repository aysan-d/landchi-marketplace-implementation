import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  icon: string | null;
  color: string | null;
  display_order: number;
};

export type Brand = { id: string; name: string; slug: string };

export type Product = {
  id: string;
  name: string;
  subtitle: string | null;
  slug: string;
  sku: string;
  category_id: string | null;
  brand_id: string | null;
  description: string | null;
  specifications: { k: string; v: string }[];
  image_url: string | null;
  price: number;
  discount_percent: number;
  stock: number;
  rating: number;
  reviews_count: number;
  sold_count: number;
  installment_available: boolean;
  warranty: string | null;
  is_featured: boolean;
  is_daily_deal: boolean;
};

export type Banner = {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string | null;
  bg_color: string | null;
  cta_text: string | null;
  cta_url: string | null;
  placement: string;
  display_order: number;
};

const PRODUCT_COLUMNS =
  "id,name,subtitle,slug,sku,category_id,brand_id,description,specifications,image_url,price,discount_percent,stock,rating,reviews_count,sold_count,installment_available,warranty,is_featured,is_daily_deal";

export const SORT_OPTIONS = [
  { value: "relevant", label: "مرتبط‌ترین" },
  { value: "bestseller", label: "پرفروش‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "discount", label: "بیشترین تخفیف" },
  { value: "rating", label: "بالاترین امتیاز" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("id,name,slug,parent_id,icon,color,display_order")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return (data ?? []) as Category[];
    },
  });

export const brandsQuery = () =>
  queryOptions({
    queryKey: ["brands"],
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<Brand[]> => {
      const { data, error } = await supabase
        .from("brands")
        .select("id,name,slug")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return (data ?? []) as Brand[];
    },
  });

export const bannersQuery = (placement: string) =>
  queryOptions({
    queryKey: ["banners", placement],
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<Banner[]> => {
      const { data, error } = await supabase
        .from("banners")
        .select("id,title,subtitle,image_url,bg_color,cta_text,cta_url,placement,display_order")
        .eq("is_active", true)
        .eq("placement", placement)
        .order("display_order");
      if (error) throw error;
      return (data ?? []) as Banner[];
    },
  });

export type ProductFilters = {
  categorySlug?: string;
  brandSlugs?: string[];
  search?: string;
  featured?: boolean;
  dailyDeal?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  onlyDiscounted?: boolean;
  sort?: SortValue;
  page?: number;
  pageSize?: number;
};

async function resolveCategoryIds(slug?: string): Promise<string[] | null> {
  if (!slug) return null;
  const { data } = await supabase.from("categories").select("id,parent_id,slug");
  const all = data ?? [];
  const root = all.find((c) => c.slug === slug);
  if (!root) return [];
  const ids = [root.id];
  all.forEach((c) => {
    if (c.parent_id === root.id) ids.push(c.id);
  });
  return ids;
}

async function resolveBrandIds(slugs?: string[]): Promise<string[] | null> {
  if (!slugs?.length) return null;
  const { data } = await supabase.from("brands").select("id").in("slug", slugs);
  return (data ?? []).map((b) => b.id);
}

export const productsQuery = (filters: ProductFilters = {}) =>
  queryOptions({
    queryKey: ["products", filters],
    staleTime: 60_000,
    queryFn: async (): Promise<{ items: Product[]; count: number }> => {
      const pageSize = filters.pageSize ?? 20;
      const page = filters.page ?? 1;

      let query = supabase
        .from("products")
        .select(PRODUCT_COLUMNS, { count: "exact" })
        .eq("is_active", true);

      const categoryIds = await resolveCategoryIds(filters.categorySlug);
      if (categoryIds) query = query.in("category_id", categoryIds);

      const brandIds = await resolveBrandIds(filters.brandSlugs);
      if (brandIds) query = query.in("brand_id", brandIds);

      if (filters.search) {
        const term = `%${filters.search}%`;
        query = query.or(`name.ilike.${term},subtitle.ilike.${term},sku.ilike.${term}`);
      }
      if (filters.featured) query = query.eq("is_featured", true);
      if (filters.dailyDeal) query = query.eq("is_daily_deal", true);
      if (filters.minPrice != null) query = query.gte("price", filters.minPrice);
      if (filters.maxPrice != null) query = query.lte("price", filters.maxPrice);
      if (filters.minRating != null) query = query.gte("rating", filters.minRating);
      if (filters.inStock) query = query.gt("stock", 0);
      if (filters.onlyDiscounted) query = query.gt("discount_percent", 0);

      switch (filters.sort) {
        case "bestseller":
          query = query.order("sold_count", { ascending: false });
          break;
        case "newest":
          query = query.order("created_at", { ascending: false });
          break;
        case "cheapest":
          query = query.order("price", { ascending: true });
          break;
        case "expensive":
          query = query.order("price", { ascending: false });
          break;
        case "discount":
          query = query.order("discount_percent", { ascending: false });
          break;
        case "rating":
          query = query.order("rating", { ascending: false });
          break;
        default:
          query = query.order("is_featured", { ascending: false }).order("sold_count", {
            ascending: false,
          });
      }

      const from = (page - 1) * pageSize;
      const { data, error, count } = await query.range(from, from + pageSize - 1);
      if (error) throw error;
      return { items: (data ?? []) as unknown as Product[], count: count ?? 0 };
    },
  });
