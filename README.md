# Landchi Marketplace Implementation

Build a production-ready Persian RTL e-commerce marketplace web application called "لندچی" (Landchi).

IMPORTANT:

The attached screenshots are the primary visual design reference for this project.

DO NOT redesign the UI.

DO NOT create a generic e-commerce template.

DO NOT copy the UI of Digikala.

DO NOT replace the existing visual direction with your own design.

The goal is to faithfully implement the visual language, layout structure, spacing, components, colors, typography, cards, navigation, dashboards and overall UX shown in the provided Landchi screenshots, while turning the static design into a functional web application.

==================================================

1. PRODUCT

==================================================

Product name:

لندچی

Landchi

Market:

Iran

Language:

Persian

Direction:

RTL

Platform:

Responsive web application

Business model:

Multi-category e-commerce marketplace.

Landchi sells multiple categories of physical products and supports:

- Online payment

- Credit payment

- Installment payment

- Wallet / credit balance

- Orders

- Product reviews

- Wishlist

- Product comparison

- Customer account

- Admin management

- Future multi-vendor marketplace

The architecture must be modular and scalable.

==================================================

2. CORE PRODUCT PRINCIPLE

==================================================

The entire experience should follow:

FIND → TRUST → BUY

Users must be able to:

1. Discover products quickly.

2. Search and filter products.

3. View detailed product information.

4. Select variants.

5. Compare products.

6. Add products to cart.

7. Checkout.

8. Select payment method.

9. Pay online or through credit/installments.

10. Track orders.

11. Manage their account.

12. Manage installments and payments.

==================================================

3. DESIGN DIRECTION

==================================================

Use the uploaded screenshots as the source of truth.

Visual style:

- Minimal

- Modern

- Persian-first

- RTL

- Clean

- Commercial

- Trustworthy

- Spacious

- Elegant

Primary visual color:

Plum / dark burgundy similar to the screenshots.

Use the exact visual relationship from the screenshots:

- white backgrounds

- very light gray surfaces

- plum primary sections

- subtle borders

- subtle shadows

- medium corner radius

- thin line icons

- compact but readable typography

- strong visual hierarchy

Do not introduce:

- gradients unless present in the reference

- excessive shadows

- glassmorphism

- neon colors

- excessive rounded cards

- oversized typography

- unnecessary animations

Typography:

Use a modern Persian font such as Vazirmatn.

All UI text must be Persian.

All layouts must be RTL.

==================================================

4. RESPONSIVE DESIGN

==================================================

Desktop:

Match the provided screenshots as closely as possible.

Tablet:

Adapt grids and navigation without changing the visual identity.

Mobile:

Create a proper mobile experience based on the same design language.

Mobile bottom navigation:

- خانه

- دسته‌بندی

- جستجو

- سبد خرید

- حساب

Mobile product grids should generally use two columns.

Checkout must be fully mobile friendly.

==================================================

5. GLOBAL APPLICATION SHELL

==================================================

Create a reusable application shell.

Structure:

TopBar

MainHeader

Navigation

PageContent

AppDownload / Newsletter section

Footer

Do not duplicate these sections manually on every page.

==================================================

6. TOP BAR

==================================================

Create a thin top bar using the primary plum color.

Include:

Right side:

- phone/contact information

- user/login information

Left side:

- city selector

- login/register

Example:

ورود | ثبت نام

تهران

Keep it compact.

==================================================

7. MAIN HEADER

==================================================

White background.

Right:

Landchi logo.

Center:

Large search bar.

Placeholder:

"جستجو محصول"

Include category selector near search:

"همه دسته بندی ها"

Additional navigation/actions:

- پیشنهادها

- پشتیبانی

- تسهیلات

- علاقه‌مندی‌ها

- حساب کاربری

- سبد خرید

Use simple outline icons.

Header must be reusable across all public pages.

==================================================

8. CATEGORY NAVIGATION

==================================================

Create a category navigation system.

Initial categories:

- موبایل و تبلت

- لپ‌تاپ و کامپیوتر

- لوازم دیجیتال

- لوازم خانگی

- مد و پوشاک

- زیبایی و سلامت

- سوپرمارکت

- خودرو و موتورسیکلت

- ابزار و تجهیزات

- ورزش و سفر

- کتاب و لوازم تحریر

- کودک و نوزاد

- خانه و آشپزخانه

- سایر محصولات

Categories must come from the database.

Do not hard-code category rendering.

==================================================

9. HOME PAGE

==================================================

Implement the homepage based on the uploaded screenshot.

Homepage structure:

1. Hero / campaign banner

2. Special offers

3. Product carousel

4. Promotional banners

5. Categories

6. Daily deals

7. Product carousel

8. Campaign banners

9. Top products

10. Shipping promotion

11. Discount promotion

12. App download / newsletter

13. Footer

All banners must be managed from Admin.

All products must come from the database.

==================================================

10. HERO / CAMPAIGN BANNERS

==================================================

Create reusable Banner components.

Banner fields:

- title

- subtitle

- image

- CTA text

- CTA URL

- active

- start date

- end date

- display order

Admin must be able to manage banners.

Do not hard-code campaign content.

==================================================

11. PRODUCT CARD

==================================================

Create a reusable ProductCard component.

Visual structure should closely follow the screenshots.

Card includes:

- product image

- discount badge

- wishlist icon

- product name

- rating

- old price

- current price

- discount

- inventory state

- add-to-cart action

States:

- default

- hover

- discount

- out of stock

- low stock

- loading

- added to cart

Prices must be displayed in تومان.

==================================================

12. PRODUCT GRID

==================================================

Create reusable:

ProductGrid

ProductCarousel

The number of columns should adapt responsively.

Desktop:

Use the same visual density as the reference screenshots.

Mobile:

Two-column product grid.

==================================================

13. SEARCH

==================================================

Create functional product search.

Search must support:

- product name

- brand

- category

- SKU

Search UX:

- autocomplete

- product suggestions

- category suggestions

- brand suggestions

- recent searches

Use debouncing.

Search results page must contain:

- query

- result count

- sorting

- filters

- product grid

Sorting:

- مرتبط‌ترین

- پرفروش‌ترین

- جدیدترین

- ارزان‌ترین

- گران‌ترین

- بیشترین تخفیف

- بالاترین امتیاز

==================================================

14. CATEGORY PAGE

==================================================

Route:

/category/:slug

Include:

- breadcrumb

- category title

- product count

- filters

- sorting

- product grid

- pagination

Filters:

- price

- brand

- rating

- availability

- discount

- category-specific specifications

Filters must be dynamic.

==================================================

15. PRODUCT DETAILS

==================================================

Route:

/product/:slug

Implement the product detail screen according to the uploaded screenshot.

Desktop structure:

Breadcrumb

Left:

Product information

Right:

Product image gallery

Product section includes:

- title

- subtitle

- brand

- rating

- reviews

- SKU

- price

- discount

- availability

- seller

- guarantee

- variants

- quantity

- add to cart

- buy now

- wishlist

- compare

Gallery:

- main image

- thumbnails

- zoom

==================================================

16. PRODUCT VARIANTS

==================================================

Products can have variants.

Examples:

Color:

- مشکی

- سفید

- آبی

Size:

- S

- M

- L

- XL

- XXL

Storage:

- 128GB

- 256GB

- 512GB

Each variant may have:

- SKU

- price

- stock

- images

Selecting a variant must update price and availability.

==================================================

17. PRODUCT INFORMATION TABS

==================================================

Product page tabs:

- توضیحات

- مشخصات

- نظرات

- پرسش و پاسخ

- شرایط ارسال

Use the visual tab structure from the screenshot.

==================================================

18. REVIEWS

==================================================

Users can review products.

Only verified purchasers should be allowed to submit product reviews.

Review fields:

- rating

- title

- comment

- pros

- cons

- images

Create a modal matching the uploaded review screenshot.

Modal title:

"ثبت نظر"

Fields:

"عنوان نظر"

"متن نظر"

"نقاط قوت"

"نقاط ضعف"

Rating:

☆ ☆ ☆ ☆ ☆

CTA:

"ثبت نظر"

Admin must approve/reject reviews.

==================================================

19. WISHLIST

==================================================

Users can add products to wishlist.

Wishlist page:

/account/wishlist

Include:

- image

- product name

- price

- availability

- add to cart

- remove

==================================================

20. PRODUCT COMPARISON

==================================================

Allow users to compare up to 4 products.

Comparison fields:

- image

- product name

- price

- brand

- rating

- technical specifications

Highlight different specifications.

==================================================

21. CART

==================================================

Route:

/cart

Cart includes:

- products

- quantity

- unit price

- discount

- subtotal

- shipping estimate

- coupon

- final total

Actions:

- increase quantity

- decrease quantity

- remove item

- save for later

CTA:

"ادامه فرایند خرید"

Prevent quantity from exceeding inventory.

Never trust client-side prices.

Calculate totals from server/database values.

==================================================

22. CHECKOUT

==================================================

Route:

/checkout

Checkout steps:

Step 1:

اطلاعات گیرنده

Step 2:

روش ارسال

Step 3:

روش پرداخت

Step 4:

تایید سفارش

Customer information:

- name

- phone

- address

- postal code

Shipping options:

- ارسال عادی

- ارسال سریع

Payment options:

- پرداخت آنلاین

- پرداخت اعتباری

- خرید اقساطی

- استفاده از اعتبار کیف پول

==================================================

23. PAYMENT ARCHITECTURE

==================================================

Create a payment abstraction layer.

Do NOT hard-code a specific payment gateway into the UI.

Architecture:

Checkout

→ Payment Service

→ Gateway

→ Callback

→ Verify

→ Create Order

→ Update Payment

→ Success / Failure

Payment entity:

- id

- order_id

- amount

- method

- transaction_id

- status

- created_at

Statuses:

- pending

- successful

- failed

- refunded

Create mock payment behavior for development.

The architecture must allow a real Iranian gateway to be connected later without changing the frontend.

==================================================

24. CREDIT SYSTEM

==================================================

Credit and installment functionality is a core Landchi feature.

Customer account should contain:

اعتبار کیف پول

Show:

- total credit

- available credit

- used credit

- status

Example:

اعتبار کیف پول

۱۲,۰۰۰,۰۰۰ تومان

Button:

"افزایش موجودی"

Credit data must come from backend.

==================================================

25. INSTALLMENT CALCULATOR

==================================================

Create a dedicated page:

/installments/calculator

Follow the provided screenshot closely.

Layout:

Right:

Calculator

Left:

Result summary

Inputs:

- مبلغ دلخواه

- تعداد اقساط

- نوع ضمانت

- پیش پرداخت

Installment options:

- 6 ماه

- 12 ماه

- 24 ماه

Result:

- مبلغ هر قسط

- پیش پرداخت

- سود

- مبلغ نهایی بازپرداخت

CTA:

"ادامه"

All calculations must be handled by a reusable service.

Do not hard-code financial values into UI.

==================================================

26. INSTALLMENT DASHBOARD

==================================================

Route:

/account/installments

Follow the provided installment dashboard screenshot.

Layout:

Right sidebar:

Account navigation.

Main content:

Installment payment list.

Tabs:

- در انتظار پرداخت

- پرداخت شده

- پرداخت نشده

Each installment card:

- installment number

- total installment plan

- amount

- due date

- status

- payment CTA

Example:

قسط ۴ از ۱۲

۴,۵۰۰,۰۰۰ تومان

[ پرداخت ]

==================================================

27. CUSTOMER ACCOUNT

==================================================

Route:

/account

Account dashboard should match the visual language of the screenshots.

Sidebar items:

- حساب کاربری

- کیف پول

- پیشنهادها

- طرح های لندچی

- اقساط و پرداخت ها

- سفارش ها

- علاقه مندی ها

- تراکنش ها

- آدرس ها

- خروج

Main dashboard:

- profile summary

- latest orders

- credit balance

- installment summary

- wishlist summary

==================================================

28. ORDERS

==================================================

Route:

/account/orders

Show:

- order ID

- date

- total

- payment status

- order status

Order statuses:

- در انتظار پرداخت

- پرداخت شده

- در حال پردازش

- آماده ارسال

- ارسال شده

- تحویل داده شده

- لغو شده

- مرجوع شده

==================================================

29. ORDER DETAILS

==================================================

Route:

/account/orders/:id

Show:

- products

- quantities

- prices

- total

- shipping

- payment method

- address

- order status

Create visual order timeline:

سفارش ثبت شد

↓

پرداخت انجام شد

↓

در حال آماده‌سازی

↓

تحویل به پست / پیک

↓

تحویل داده شد

==================================================

30. ADDRESS MANAGEMENT

==================================================

Users can:

- create address

- edit address

- delete address

- select default address

Fields:

- receiver name

- receiver phone

- province

- city

- address

- postal code

==================================================

31. AUTHENTICATION

==================================================

Implement:

- login

- registration

- logout

- password recovery

Prefer phone-based authentication for the Iranian market.

Architecture should allow OTP authentication.

Do not expose passwords.

Use secure authentication.

==================================================

32. ADMIN PANEL

==================================================

Create a separate protected Admin application.

Routes:

/admin

/admin/products

/admin/categories

/admin/brands

/admin/orders

/admin/users

/admin/sellers

/admin/inventory

/admin/coupons

/admin/reviews

/admin/banners

/admin/payments

/admin/installments

/admin/reports

/admin/settings

Admin UI should use the same Landchi visual identity but can be more information-dense.

==================================================

33. ADMIN DASHBOARD

==================================================

Dashboard KPI cards:

- فروش امروز

- فروش ماه

- سفارش‌ها

- کاربران

- محصولات

- محصولات ناموجود

- سفارش‌های در انتظار

- درآمد

Charts:

- daily sales

- monthly sales

- orders

- category performance

- top products

==================================================

34. ADMIN PRODUCT MANAGEMENT

==================================================

Admin can:

- create product

- edit product

- delete product

- activate/deactivate product

- set price

- set discount

- set inventory

- create variants

- upload images

- assign category

- assign brand

- assign seller

Product fields:

- name

- slug

- SKU

- brand

- category

- description

- specifications

- images

- price

- discount

- inventory

- variants

- seller

- status

==================================================

35. ADMIN CATEGORY MANAGEMENT

==================================================

Categories must be hierarchical.

Fields:

- name

- slug

- parent

- image

- status

- display order

Admin can:

- create

- edit

- delete

- reorder

- activate/deactivate

==================================================

36. ADMIN BRAND MANAGEMENT

==================================================

Brand:

- name

- logo

- description

- website

- status

==================================================

37. INVENTORY

==================================================

Inventory must track:

- SKU

- product

- variant

- current stock

- minimum stock

- last update

When stock reaches zero:

show "ناموجود"

Prevent checkout if stock is unavailable.

==================================================

38. COUPONS

==================================================

Admin can create coupons.

Fields:

- code

- discount type

- value

- minimum order

- maximum discount

- start date

- end date

- usage limit

- user limit

- active

Types:

- percentage

- fixed amount

==================================================

39. NOTIFICATIONS

==================================================

Create notification architecture.

Events:

- order created

- payment successful

- payment failed

- order shipped

- order delivered

- installment due

- credit update

- promotion

Channels:

- in-app

- SMS

- email

SMS should be abstracted so an Iranian provider can be connected later.

==================================================

40. SELLER ARCHITECTURE

==================================================

Design database and product model so that a product can belong to a seller.

Seller fields:

- name

- business name

- phone

- email

- status

- rating

Do not build a full seller dashboard in the first MVP unless necessary.

But database architecture must support it.

==================================================

41. DATABASE

==================================================

Use a relational database.

Recommended core entities:

users

products

product_variants

categories

brands

sellers

product_images

carts

cart_items

orders

order_items

addresses

payments

reviews

wishlists

coupons

coupon_usages

credit_accounts

installment_plans

installments

banners

notifications

Relationships must be properly normalized.

==================================================

42. USER ROLES

==================================================

Roles:

customer

admin

seller

Use role-based access control.

Customers must never access admin routes.

==================================================

43. SECURITY

==================================================

Implement:

- secure authentication

- role-based authorization

- input validation

- server-side validation

- rate limiting where appropriate

- secure payment callback verification

- inventory validation

- price validation

- coupon validation

Never trust:

- client-side price

- client-side discount

- client-side stock

- client-side payment status

==================================================

44. SEO

==================================================

Product and category pages must support:

- SEO title

- meta description

- slug

- canonical URL

- structured product data

Use Persian SEO-friendly URLs where appropriate.

==================================================

45. PERFORMANCE

==================================================

Implement:

- lazy-loaded images

- optimized images

- pagination

- debounced search

- efficient queries

- caching where appropriate

- code splitting

- responsive image sizes

Do not load all products on homepage at once.

==================================================

46. EMPTY / LOADING / ERROR STATES

==================================================

Every major component must have:

Loading

Empty

Error

Success

Examples:

"محصولی پیدا نشد."

"هنوز محصولی به علاقه‌مندی‌های خود اضافه نکرده‌اید."

"متأسفانه مشکلی پیش آمده. لطفاً دوباره تلاش کنید."

Do not expose technical backend errors to users.

==================================================

47. GLOBAL COMPONENTS

==================================================

Build reusable components:

Header

TopBar

Navigation

Footer

SearchBar

CategoryMenu

ProductCard

ProductGrid

ProductCarousel

ProductGallery

ProductVariantSelector

PriceDisplay

DiscountBadge

Rating

AddToCartButton

QuantitySelector

WishlistButton

CompareButton

Banner

CampaignBanner

CategoryCard

Modal

ReviewModal

InstallmentCalculator

InstallmentCard

CreditCard

Sidebar

Tabs

Breadcrumb

Pagination

Toast

LoadingState

EmptyState

ErrorState

==================================================

48. DATA / MOCK CONTENT

==================================================

Seed the application with realistic Persian demo data.

Create at least:

- 12 categories

- 10 brands

- 40 products

- multiple variants

- 10 reviews

- 10 users

- sample orders

- sample installment plans

- sample banners

- sample coupons

Use realistic Iranian product names and prices.

Use تومان for display.

Do not use Lorem Ipsum.

==================================================

49. IMPORTANT DATA RULE

==================================================

Do not hard-code product cards directly into components.

All catalog content must be driven by database/API data.

Do not hard-code:

- products

- categories

- prices

- stock

- reviews

- banners

- orders

==================================================

50. ROUTES

==================================================

Public:

/

 /search

 /category/:slug

 /product/:slug

 /brand/:slug

 /compare

 /cart

 /checkout

 /payment/result

 /installments/calculator

 /login

 /register

Account:

/account

/account/orders

/account/orders/:id

/account/wishlist

/account/addresses

/account/transactions

/account/installments

/account/credit

/account/settings

Admin:

/admin

/admin/products

/admin/products/new

/admin/products/:id

/admin/categories

/admin/brands

/admin/orders

/admin/users

/admin/sellers

/admin/inventory

/admin/coupons

/admin/reviews

/admin/banners

/admin/payments

/admin/installments

/admin/reports

/admin/settings

==================================================

51. DEVELOPMENT PHASES

==================================================

Build the project in the following order.

PHASE 1:

Foundation

- project setup

- RTL

- Persian typography

- design tokens

- global layout

- header

- navigation

- footer

- responsive system

PHASE 2:

Catalog

- database

- categories

- brands

- products

- product cards

- product grids

- search

- filters

- category pages

PHASE 3:

Product

- product detail

- gallery

- variants

- reviews

- wishlist

- comparison

PHASE 4:

Commerce

- cart

- checkout

- addresses

- payment abstraction

- orders

- order tracking

PHASE 5:

Credit

- credit account

- installment calculator

- installment plans

- installment dashboard

- payment records

PHASE 6:

Customer Account

- dashboard

- orders

- wishlist

- addresses

- transactions

- credit

- installments

PHASE 7:

Admin

- dashboard

- products

- categories

- brands

- users

- orders

- inventory

- coupons

- reviews

- banners

- payments

PHASE 8:

Polish

- responsive QA

- loading states

- empty states

- error states

- accessibility

- SEO

- performance

- visual consistency

==================================================

52. IMPLEMENTATION RULE

==================================================

Do not attempt to build everything as one giant component.

Use a clean component architecture.

Keep business logic separate from UI.

Keep payment logic separate from checkout UI.

Keep installment calculations separate from UI.

Keep product/catalog logic separate from product components.

Create reusable services/hooks where appropriate.

==================================================

53. VISUAL QA

==================================================

After implementing each major page:

Compare it against the provided Landchi screenshots.

Check:

- spacing

- alignment

- typography

- color

- card size

- button size

- border radius

- icon placement

- header proportions

- footer proportions

- RTL behavior

Do not make arbitrary visual redesign decisions.

If a visual decision is unclear, prioritize consistency with the uploaded screenshots.

==================================================

54. FINAL QUALITY BAR

==================================================

The final application should feel like a real Iranian e-commerce product, not a prototype.

It should be:

- polished

- responsive

- RTL

- Persian

- modular

- scalable

- production-oriented

- visually consistent with the supplied Landchi UI

Most importantly:

PRESERVE THE EXISTING LANDCHI VISUAL DESIGN.

Do not replace it with a generic SaaS dashboard.

Do not redesign the homepage.

Do not use a generic Tailwind template.

Do not copy Digikala.

Implement the supplied design faithfully and make it functional.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ce21a42-741c-4377-ad70-da76d804d669).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
