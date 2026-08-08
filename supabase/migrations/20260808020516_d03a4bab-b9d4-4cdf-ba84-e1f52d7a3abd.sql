
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('customer','admin','seller');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  phone text,
  national_code text,
  birth_date date,
  email text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.phone, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id,'customer') ON CONFLICT DO NOTHING;
  INSERT INTO public.credit_accounts (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

-- ============ CATALOG ============
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  parent_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url text,
  icon text,
  color text,
  is_active boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  logo_url text,
  description text,
  website text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  business_name text,
  phone text,
  email text,
  status text NOT NULL DEFAULT 'active',
  rating numeric(2,1) NOT NULL DEFAULT 5.0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subtitle text,
  slug text NOT NULL UNIQUE,
  sku text NOT NULL UNIQUE,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  brand_id uuid REFERENCES public.brands(id) ON DELETE SET NULL,
  seller_id uuid REFERENCES public.sellers(id) ON DELETE SET NULL,
  description text,
  specifications jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text,
  price bigint NOT NULL DEFAULT 0,
  discount_percent int NOT NULL DEFAULT 0,
  stock int NOT NULL DEFAULT 0,
  min_stock int NOT NULL DEFAULT 3,
  rating numeric(2,1) NOT NULL DEFAULT 0,
  reviews_count int NOT NULL DEFAULT 0,
  sold_count int NOT NULL DEFAULT 0,
  views_count int NOT NULL DEFAULT 0,
  installment_available boolean NOT NULL DEFAULT true,
  warranty text,
  is_active boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  is_daily_deal boolean NOT NULL DEFAULT false,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_brand ON public.products(brand_id);

CREATE TABLE public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt text,
  display_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku text NOT NULL UNIQUE,
  option_type text NOT NULL,
  option_value text NOT NULL,
  option_hex text,
  price bigint,
  stock int NOT NULL DEFAULT 0,
  image_url text,
  display_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  subtitle text,
  image_url text,
  bg_color text,
  cta_text text,
  cta_url text,
  placement text NOT NULL DEFAULT 'hero',
  is_active boolean NOT NULL DEFAULT true,
  starts_at timestamptz,
  ends_at timestamptz,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- public catalog grants + RLS
GRANT SELECT ON public.categories, public.brands, public.sellers, public.products,
  public.product_images, public.product_variants, public.banners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories, public.brands, public.sellers, public.products,
  public.product_images, public.product_variants, public.banners TO authenticated;
GRANT ALL ON public.categories, public.brands, public.sellers, public.products,
  public.product_images, public.product_variants, public.banners TO service_role;

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write categories" ON public.categories FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "public read brands" ON public.brands FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write brands" ON public.brands FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "public read sellers" ON public.sellers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write sellers" ON public.sellers FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "public read products" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write products" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "public read product_images" ON public.product_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write product_images" ON public.product_images FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "public read variants" ON public.product_variants FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write variants" ON public.product_variants FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "public read banners" ON public.banners FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin write banners" ON public.banners FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ REVIEWS / WISHLIST ============
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid,
  author_name text,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  comment text,
  pros text[] NOT NULL DEFAULT '{}',
  cons text[] NOT NULL DEFAULT '{}',
  images text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read approved reviews" ON public.reviews FOR SELECT TO anon, authenticated
  USING (status = 'approved' OR user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "create own review" ON public.reviews FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "admin manage reviews" ON public.reviews FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);
GRANT SELECT, INSERT, DELETE ON public.wishlists TO authenticated;
GRANT ALL ON public.wishlists TO service_role;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own wishlist" ON public.wishlists FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ============ ADDRESSES / CART ============
CREATE TABLE public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  label text,
  receiver_name text NOT NULL,
  receiver_phone text NOT NULL,
  province text NOT NULL,
  city text NOT NULL,
  address text NOT NULL,
  postal_code text,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.addresses TO authenticated;
GRANT ALL ON public.addresses TO service_role;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own addresses" ON public.addresses FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id uuid NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id uuid REFERENCES public.product_variants(id) ON DELETE SET NULL,
  quantity int NOT NULL DEFAULT 1 CHECK (quantity > 0),
  saved_for_later boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.carts, public.cart_items TO authenticated;
GRANT ALL ON public.carts, public.cart_items TO service_role;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own cart" ON public.carts FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "own cart items" ON public.cart_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.carts c WHERE c.id = cart_id AND c.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.carts c WHERE c.id = cart_id AND c.user_id = auth.uid()));

-- ============ ORDERS ============
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE DEFAULT to_char(now(),'YYMMDD') || lpad((floor(random()*1000000))::text,6,'0'),
  user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending_payment',
  payment_status text NOT NULL DEFAULT 'pending',
  payment_method text,
  shipping_method text,
  shipping_cost bigint NOT NULL DEFAULT 0,
  items_total bigint NOT NULL DEFAULT 0,
  discount_total bigint NOT NULL DEFAULT 0,
  coupon_code text,
  total bigint NOT NULL DEFAULT 0,
  address_snapshot jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id uuid REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_image text,
  variant_label text,
  unit_price bigint NOT NULL,
  discount_percent int NOT NULL DEFAULT 0,
  quantity int NOT NULL,
  line_total bigint NOT NULL
);
GRANT SELECT, INSERT, UPDATE ON public.orders, public.order_items TO authenticated;
GRANT ALL ON public.orders, public.order_items TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own orders" ON public.orders FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update orders" ON public.orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "own order items" ON public.order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

-- ============ PAYMENTS ============
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  installment_id uuid,
  user_id uuid NOT NULL,
  amount bigint NOT NULL,
  method text NOT NULL,
  gateway text,
  transaction_id text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own payments" ON public.payments FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- ============ COUPONS ============
CREATE TABLE public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  discount_type text NOT NULL DEFAULT 'percentage',
  value bigint NOT NULL,
  min_order bigint NOT NULL DEFAULT 0,
  max_discount bigint,
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit int,
  per_user_limit int NOT NULL DEFAULT 1,
  used_count int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.coupon_usages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id uuid NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.coupons TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.coupons TO authenticated;
GRANT SELECT ON public.coupon_usages TO authenticated;
GRANT ALL ON public.coupons, public.coupon_usages TO service_role;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage coupons" ON public.coupons FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "own coupon usages" ON public.coupon_usages FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- ============ CREDIT / INSTALLMENTS ============
CREATE TABLE public.credit_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  wallet_balance bigint NOT NULL DEFAULT 0,
  total_credit bigint NOT NULL DEFAULT 0,
  used_credit bigint NOT NULL DEFAULT 0,
  monthly_cap bigint NOT NULL DEFAULT 0,
  plan_name text DEFAULT 'اشتراک پایه',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount bigint NOT NULL,
  type text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.installment_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  principal bigint NOT NULL,
  down_payment bigint NOT NULL DEFAULT 0,
  months int NOT NULL,
  profit_rate numeric(5,2) NOT NULL DEFAULT 0,
  guarantee_type text,
  monthly_amount bigint NOT NULL,
  total_repayment bigint NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.installments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid NOT NULL REFERENCES public.installment_plans(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  number int NOT NULL,
  amount bigint NOT NULL,
  penalty bigint NOT NULL DEFAULT 0,
  due_date date NOT NULL,
  paid_at timestamptz,
  status text NOT NULL DEFAULT 'pending',
  bank_info text
);
GRANT SELECT, INSERT, UPDATE ON public.credit_accounts, public.wallet_transactions,
  public.installment_plans, public.installments TO authenticated;
GRANT ALL ON public.credit_accounts, public.wallet_transactions,
  public.installment_plans, public.installments TO service_role;
ALTER TABLE public.credit_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own credit" ON public.credit_accounts FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own wallet tx" ON public.wallet_transactions FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own plans" ON public.installment_plans FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own installments" ON public.installments FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- ============ NOTIFICATIONS ============
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  channel text NOT NULL DEFAULT 'in_app',
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notifications" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ SEED ============
INSERT INTO public.categories (name, slug, icon, color, display_order) VALUES
('موبایل و تبلت','mobile-tablet','Smartphone','#EEF2FF',1),
('لپ‌تاپ و کامپیوتر','laptop-computer','Laptop','#F0FDF4',2),
('لوازم دیجیتال','digital','Headphones','#FEF2F2',3),
('لوازم خانگی','home-appliance','WashingMachine','#FFF7ED',4),
('مد و پوشاک','fashion','Shirt','#FDF2F8',5),
('زیبایی و سلامت','beauty-health','Sparkles','#F5F3FF',6),
('سوپرمارکت','supermarket','ShoppingBasket','#ECFEFF',7),
('خودرو و موتورسیکلت','car-motorcycle','Car','#F1F5F9',8),
('ابزار و تجهیزات','tools','Wrench','#FEFCE8',9),
('ورزش و سفر','sport-travel','Bike','#F0FDFA',10),
('کتاب و لوازم تحریر','book-stationery','BookOpen','#FFF1F2',11),
('کودک و نوزاد','kids-baby','Baby','#F7FEE7',12),
('خانه و آشپزخانه','home-kitchen','CookingPot','#FAF5FF',13),
('سایر محصولات','others','Package','#F8FAFC',14);

INSERT INTO public.brands (name, slug) VALUES
('سامسونگ','samsung'),('اپل','apple'),('شیائومی','xiaomi'),('ال جی','lg'),('اسنوا','snowa'),
('نوکیا','nokia'),('ایسوس','asus'),('پاناسونیک','panasonic'),('کاسیو','casio'),('کوتون','koton');

INSERT INTO public.sellers (name, business_name, phone, rating) VALUES
('فروشگاه مرکزی لندچی','لندچی مارکت','02112345678',4.9),
('دیجی سنتر','دیجی سنتر ایرانیان','02133445566',4.6),
('خانه کالا','خانه کالای پارس','02177889900',4.4);

INSERT INTO public.banners (title, subtitle, placement, bg_color, cta_text, cta_url, display_order) VALUES
('نگران پولش نباش','قسطی خرید کن','hero','#5A2A47','خرید','/installments/calculator',1),
('کاسیو اصلش اینجاست','تخفیف تا ۳۰٪','hero-side','#DCE8F7','خرید','/brand/casio',2),
('تابستون امسال خنک باشید','KOTON','hero-side','#2F6FA8','خرید','/category/fashion',3),
('خانه و آشپزخانه','تا ۲۰٪ تخفیف','hero-side','#F0E7DC','خرید','/category/home-kitchen',4),
('باکیفیت ترین محصولات','تخفیف تا ۳۰٪ BEAUTY CARE','promo','#EFE3DA','خرید','/category/beauty-health',5),
('متنوع ترین لباس','مناسب خانم ها و آقایان','promo','#F7F4EF','خرید','/category/fashion',6),
('ارسال رایگان','برای خرید بالای ۱ میلیون تومان','strip','#FDE68A','',''  ,7),
('تخفیف ویژه','برای خرید بالای ۱ میلیون تومان','strip','#FCE7F3','','',8);
