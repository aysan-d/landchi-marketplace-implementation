
INSERT INTO public.products
 (name, subtitle, slug, sku, category_id, brand_id, seller_id, description, image_url, price,
  discount_percent, stock, rating, reviews_count, sold_count, is_featured, is_daily_deal, warranty, specifications)
SELECT v.name, v.subtitle, v.slug, v.sku, c.id, b.id, s.id, v.descr, v.img, v.price,
       v.disc, v.stock, v.rating, v.rc, v.sold, v.feat, v.daily, v.warranty,
       v.specs::jsonb
FROM (VALUES
 ('گوشی موبایل سامسونگ Galaxy S24 Ultra ظرفیت ۵۱۲ گیگابایت','Samsung Galaxy S24 Ultra 512GB','samsung-galaxy-s24-ultra','SKU-10001','mobile-tablet','samsung','/images/p-phone.jpg',62500000,12,24,4.8,42,320,true,false,'گارانتی ۱۸ ماهه شرکتی','[{"k":"صفحه نمایش","v":"۶.۸ اینچ AMOLED"},{"k":"حافظه داخلی","v":"۵۱۲ گیگابایت"},{"k":"رم","v":"۱۲ گیگابایت"}]','پرچم‌دار سامسونگ با دوربین ۲۰۰ مگاپیکسلی و قلم S Pen.'),
 ('گوشی موبایل شیائومی Redmi Note 13 Pro ظرفیت ۲۵۶ گیگابایت','Xiaomi Redmi Note 13 Pro 256GB','xiaomi-redmi-note-13-pro','SKU-10002','mobile-tablet','xiaomi','/images/p-phone.jpg',14900000,18,60,4.5,88,910,true,true,'گارانتی ۱۸ ماهه','[{"k":"صفحه نمایش","v":"۶.۶۷ اینچ"},{"k":"حافظه داخلی","v":"۲۵۶ گیگابایت"}]','انتخابی مقرون به صرفه با دوربین ۲۰۰ مگاپیکسلی.'),
 ('گوشی موبایل اپل iPhone 15 Pro Max ظرفیت ۲۵۶ گیگابایت','Apple iPhone 15 Pro Max 256GB','apple-iphone-15-pro-max','SKU-10003','mobile-tablet','apple','/images/p-phone.jpg',89000000,5,12,4.9,150,540,true,false,'گارانتی ۱۲ ماهه','[{"k":"تراشه","v":"A17 Pro"},{"k":"بدنه","v":"تیتانیوم"}]','بدنه تیتانیومی و تراشه A17 Pro.'),
 ('تبلت سامسونگ Galaxy Tab S9 ظرفیت ۱۲۸ گیگابایت','Samsung Galaxy Tab S9','samsung-galaxy-tab-s9','SKU-10004','mobile-tablet','samsung','/images/p-phone.jpg',38000000,10,18,4.6,31,120,false,false,'گارانتی ۱۲ ماهه','[{"k":"صفحه نمایش","v":"۱۱ اینچ"}]','تبلت حرفه‌ای با قلم S Pen.'),
 ('گوشی موبایل نوکیا مدل 105 دو سیم کارت','Nokia 105 Dual SIM','nokia-105','SKU-10005','mobile-tablet','nokia','/images/p-phone.jpg',1250000,8,120,4.2,64,1500,false,true,'گارانتی ۱۲ ماهه','[{"k":"باتری","v":"۸۰۰ میلی‌آمپر"}]','گوشی ساده با باتری بسیار پرقدرت.'),
 ('گوشی موبایل موتورولا مدل Edge 60 Fusion دو سیم کارت ظرفیت ۲۵۶ گیگابایت','Motorola Edge 60 Fusion Dual SIM 256GB','motorola-edge-60-fusion','SKU-10006','mobile-tablet','xiaomi','/images/p-phone.jpg',11350000,34,9,4.3,11,86,true,true,'گارانتی اصالت و فیزیکی کالا','[{"k":"حافظه داخلی","v":"۲۵۶ گیگابایت"},{"k":"رم","v":"۱۲ گیگابایت"}]','نمایشگر منحنی و باتری ۵۰۰۰ میلی‌آمپری.'),
 ('لپ تاپ ایسوس VivoBook 15 پردازنده Core i7','ASUS VivoBook 15 Core i7','asus-vivobook-15','SKU-10007','laptop-computer','asus','/images/p-laptop.jpg',42000000,9,15,4.4,27,210,false,false,'گارانتی ۲۴ ماهه','[{"k":"پردازنده","v":"Core i7"},{"k":"رم","v":"۱۶ گیگابایت"}]','لپ‌تاپ سبک برای کارهای روزمره و اداری.'),
 ('لپ تاپ اپل MacBook Air M3 ظرفیت ۵۱۲ گیگابایت','Apple MacBook Air M3','apple-macbook-air-m3','SKU-10008','laptop-computer','apple','/images/p-laptop.jpg',78000000,6,8,4.9,52,180,true,false,'گارانتی ۱۲ ماهه','[{"k":"تراشه","v":"Apple M3"}]','باریک، سبک و بی‌صدا با عمر باتری طولانی.'),
 ('لپ تاپ گیمینگ ایسوس ROG Strix G16','ASUS ROG Strix G16','asus-rog-strix-g16','SKU-10009','laptop-computer','asus','/images/p-laptop.jpg',96000000,11,6,4.7,19,74,false,false,'گارانتی ۲۴ ماهه','[{"k":"کارت گرافیک","v":"RTX 4060"}]','لپ‌تاپ گیمینگ با نمایشگر ۱۶۵ هرتز.'),
 ('مانیتور ال جی ۲۷ اینچ مدل UltraGear','LG UltraGear 27 inch','lg-ultragear-27','SKU-10010','laptop-computer','lg','/images/p-laptop.jpg',18700000,15,22,4.5,23,160,false,true,'گارانتی ۳۶ ماهه','[{"k":"نرخ نوسازی","v":"۱۴۴ هرتز"}]','مانیتور گیمینگ با پاسخ‌دهی یک میلی‌ثانیه.'),
 ('کنسول بازی مدل Q10 گیم استیک طرح PSP 3D','PSP 3D Q10 Game Stick','game-console-q10','SKU-10011','digital','xiaomi','/images/p-console.jpg',855000,42,80,4.1,120,2400,true,true,'گارانتی ۶ ماهه','[{"k":"تعداد بازی","v":"۱۰۰۰۰ بازی"}]','کنسول بازی خانگی با بیش از ۱۰ هزار بازی.'),
 ('هدفون بی سیم سامسونگ مدل Galaxy Buds3','Samsung Galaxy Buds3','samsung-galaxy-buds3','SKU-10012','digital','samsung','/images/p-watch.jpg',6200000,20,40,4.4,36,300,false,true,'گارانتی ۱۲ ماهه','[{"k":"نویز کنسلینگ","v":"فعال"}]','حذف نویز فعال و شارژ سریع.'),
 ('مچ بند هوشمند شیائومی مدل Mi Band 8','Xiaomi Mi Band 8','xiaomi-mi-band-8','SKU-10013','digital','xiaomi','/images/p-watch.jpg',1850000,25,95,4.3,210,3100,true,true,'گارانتی ۱۲ ماهه','[{"k":"عمر باتری","v":"۱۶ روز"}]','ردیاب سلامتی با باتری ۱۶ روزه.'),
 ('ساعت مچی دیجیتال کاسیو مدل G-Shock','Casio G-Shock Digital Watch','casio-g-shock','SKU-10014','digital','casio','/images/p-watch.jpg',4300000,30,18,4.8,74,420,true,false,'گارانتی اصالت کالا','[{"k":"ضد آب","v":"۲۰۰ متر"}]','مقاوم در برابر ضربه و آب.'),
 ('پاوربانک شیائومی ظرفیت ۲۰۰۰۰ میلی آمپر','Xiaomi Power Bank 20000mAh','xiaomi-powerbank-20000','SKU-10015','digital','xiaomi','/images/p-watch.jpg',1150000,16,150,4.2,90,1200,false,true,'گارانتی ۱۲ ماهه','[{"k":"توان خروجی","v":"۲۲.۵ وات"}]','شارژ سریع دو دستگاه به صورت هم‌زمان.'),
 ('ماشین لباسشویی اسنوا ۸ کیلوگرمی مدل SWM-84606','Snowa Washing Machine 8kg','snowa-washing-machine-8kg','SKU-10016','home-appliance','snowa','/images/p-washer.jpg',32500000,12,10,4.5,44,260,true,false,'گارانتی ۱۸ ماهه','[{"k":"ظرفیت","v":"۸ کیلوگرم"},{"k":"دور موتور","v":"۱۲۰۰"}]','ماشین لباسشویی کم مصرف با موتور اینورتر.'),
 ('یخچال فریزر ساید بای ساید ال جی','LG Side by Side Refrigerator','lg-side-by-side','SKU-10017','home-appliance','lg','/images/p-washer.jpg',118000000,7,4,4.7,18,60,false,false,'گارانتی ۲۴ ماهه','[{"k":"حجم","v":"۶۰۰ لیتر"}]','یخچال ساید بای ساید با آبسردکن.'),
 ('جاروبرقی پاناسونیک ۲۰۰۰ وات','Panasonic Vacuum Cleaner 2000W','panasonic-vacuum-2000w','SKU-10018','home-appliance','panasonic','/images/p-washer.jpg',9400000,14,26,4.3,29,240,false,true,'گارانتی ۱۲ ماهه','[{"k":"توان","v":"۲۰۰۰ وات"}]','مکش قوی و فیلتر هپا.'),
 ('مایکروویو ال جی ۳۰ لیتری','LG Microwave 30L','lg-microwave-30l','SKU-10019','home-appliance','lg','/images/p-washer.jpg',15600000,10,14,4.4,21,130,false,false,'گارانتی ۲۴ ماهه','[{"k":"حجم","v":"۳۰ لیتر"}]','مایکروویو گریل‌دار با برنامه‌های آماده.'),
 ('تی شرت نخی برند Say مدل یقه گرد','Say Cotton Round Neck T-Shirt','say-cotton-tshirt','SKU-10020','fashion','koton','/images/p-tshirt.jpg',1135000,34,75,4.2,111,1800,true,true,'ضمانت اصالت کالا','[{"k":"جنس","v":"نخ پنبه"},{"k":"مدل یقه","v":"گرد"}]','تی‌شرت نخی خنک مناسب فصل گرم.'),
 ('پیراهن مردانه آستین بلند کوتون','Koton Long Sleeve Shirt','koton-long-sleeve-shirt','SKU-10021','fashion','koton','/images/p-tshirt.jpg',2450000,25,40,4.1,33,410,false,false,'ضمانت اصالت کالا','[{"k":"جنس","v":"پنبه"}]','پیراهن رسمی و راحت برای محیط کار.'),
 ('کفش راحتی مردانه چرم طبیعی','Men Leather Casual Shoes','men-leather-shoes','SKU-10022','fashion','koton','/images/p-tshirt.jpg',3890000,20,25,4.4,47,300,false,true,'ضمانت اصالت کالا','[{"k":"جنس رویه","v":"چرم طبیعی"}]','کفش چرم دست‌دوز با زیره ضد لغزش.'),
 ('هودی اورسایز زنانه','Women Oversize Hoodie','women-oversize-hoodie','SKU-10023','fashion','koton','/images/p-tshirt.jpg',2150000,15,50,4.0,25,220,false,false,'ضمانت اصالت کالا','[{"k":"جنس","v":"سه نخ"}]','هودی گرم و راحت با فیت اورسایز.'),
 ('ریمل حجم دهنده Beauty Care','Beauty Care Volume Mascara','beauty-care-mascara','SKU-10024','beauty-health','koton','/images/p-beauty.jpg',890000,30,90,4.3,68,970,true,true,'ضمانت اصالت کالا','[{"k":"حجم","v":"۱۰ میلی‌لیتر"}]','ریمل ضدآب با اثر حجم‌دهی فوری.'),
 ('براش آرایشی ست ۱۲ عددی','Makeup Brush Set 12 pcs','makeup-brush-set','SKU-10025','beauty-health','koton','/images/p-beauty.jpg',1250000,22,60,4.5,54,640,false,false,'ضمانت اصالت کالا','[{"k":"تعداد","v":"۱۲ عدد"}]','ست کامل براش با موی مصنوعی نرم.'),
 ('کرم ضد آفتاب SPF50 بدون رنگ','Sunscreen Cream SPF50','sunscreen-spf50','SKU-10026','beauty-health','koton','/images/p-beauty.jpg',680000,18,110,4.6,82,1400,false,true,'ضمانت اصالت کالا','[{"k":"SPF","v":"۵۰"}]','مناسب انواع پوست، فاقد چربی.'),
 ('روغن سرخ کردنی ۱.۵ لیتری','Frying Oil 1.5L','frying-oil-15l','SKU-10027','supermarket','koton','/images/p-beauty.jpg',145000,5,300,4.0,15,3200,false,false,'','[{"k":"حجم","v":"۱.۵ لیتر"}]','روغن سرخ کردنی مخصوص با مقاومت حرارتی بالا.'),
 ('قهوه اسپرسو ۲۵۰ گرمی','Espresso Coffee 250g','espresso-coffee-250g','SKU-10028','supermarket','koton','/images/p-beauty.jpg',390000,12,140,4.7,60,890,false,true,'','[{"k":"وزن","v":"۲۵۰ گرم"}]','ترکیب ۷۰٪ عربیکا و ۳۰٪ روبوستا.'),
 ('جاروبرقی شارژی خودرو','Car Cordless Vacuum','car-cordless-vacuum','SKU-10029','car-motorcycle','panasonic','/images/p-washer.jpg',1480000,17,45,4.1,22,330,false,false,'گارانتی ۶ ماهه','[{"k":"باتری","v":"۲۵۰۰ میلی‌آمپر"}]','جاروی شارژی سبک مخصوص خودرو.'),
 ('روکش صندلی خودرو چرم','Car Leather Seat Cover','car-seat-cover','SKU-10030','car-motorcycle','panasonic','/images/p-washer.jpg',2600000,10,30,4.2,17,190,false,false,'','[{"k":"جنس","v":"چرم مصنوعی"}]','روکش صندلی قابل شست‌وشو.'),
 ('دریل شارژی ۲۴ ولت','Cordless Drill 24V','cordless-drill-24v','SKU-10031','tools','panasonic','/images/p-washer.jpg',4750000,13,20,4.4,26,210,false,true,'گارانتی ۱۲ ماهه','[{"k":"ولتاژ","v":"۲۴ ولت"}]','دریل شارژی همراه دو باتری.'),
 ('ست آچار ۴۶ پارچه','46-piece Wrench Set','wrench-set-46','SKU-10032','tools','panasonic','/images/p-washer.jpg',1980000,20,35,4.3,19,260,false,false,'','[{"k":"تعداد","v":"۴۶ پارچه"}]','ست ابزار کامل با کیف حمل.'),
 ('دوچرخه کوهستان ۲۷.۵ اینچ','Mountain Bike 27.5','mountain-bike-275','SKU-10033','sport-travel','panasonic','/images/p-washer.jpg',18900000,8,7,4.5,14,90,false,false,'گارانتی ۱۲ ماهه','[{"k":"سایز طوقه","v":"۲۷.۵"}]','دوچرخه کوهستان ۲۱ سرعته.'),
 ('چمدان مسافرتی سایز بزرگ','Large Travel Suitcase','travel-suitcase-large','SKU-10034','sport-travel','koton','/images/p-tshirt.jpg',4200000,16,28,4.2,31,240,false,true,'گارانتی ۲۴ ماهه','[{"k":"جنس","v":"ABS"}]','چمدان سبک با قفل رمزدار.'),
 ('دفتر یادداشت جلد سخت ست ۳ عددی','Hardcover Notebook Set','notebook-set-3','SKU-10035','book-stationery','koton','/images/p-tshirt.jpg',320000,10,200,4.1,12,520,false,false,'','[{"k":"تعداد برگ","v":"۱۰۰ برگ"}]','ست دفتر یادداشت با کاغذ مرغوب.'),
 ('خودکار ژله ای بسته ۱۰ عددی','Gel Pen Pack of 10','gel-pen-10','SKU-10036','book-stationery','koton','/images/p-tshirt.jpg',180000,25,400,4.0,8,780,false,true,'','[{"k":"ضخامت نوک","v":"۰.۷"}]','خودکار ژله‌ای با نوشتار روان.'),
 ('پوشک بچه سایز ۴ بسته ۴۰ عددی','Baby Diapers Size 4','baby-diapers-size4','SKU-10037','kids-baby','koton','/images/p-tshirt.jpg',690000,12,180,4.6,91,2100,false,false,'','[{"k":"سایز","v":"۴"}]','پوشک نرم و ضد حساسیت.'),
 ('کالسکه سه چرخ نوزاد','Baby Tricycle Stroller','baby-stroller','SKU-10038','kids-baby','panasonic','/images/p-washer.jpg',12400000,18,11,4.4,20,140,false,true,'گارانتی ۱۲ ماهه','[{"k":"وزن","v":"۹ کیلوگرم"}]','کالسکه سبک با تاشوی سریع.'),
 ('سرویس قابلمه ۱۲ پارچه گرانیتی','12-piece Granite Cookware Set','granite-cookware-12','SKU-10039','home-kitchen','snowa','/images/p-washer.jpg',8900000,22,16,4.5,38,310,true,true,'گارانتی ۱۲ ماهه','[{"k":"تعداد","v":"۱۲ پارچه"}]','سرویس پخت‌وپز نچسب گرانیتی.'),
 ('ست کارد آشپزخانه ۶ پارچه','6-piece Kitchen Knife Set','kitchen-knife-set-6','SKU-10040','home-kitchen','snowa','/images/p-washer.jpg',1690000,15,55,4.2,24,420,false,false,'','[{"k":"جنس تیغه","v":"استیل ضدزنگ"}]','ست چاقوی استیل به همراه پایه.')
) AS v(name, subtitle, slug, sku, cslug, bslug, img, price, disc, stock, rating, rc, sold, feat, daily, warranty, specs, descr)
JOIN public.categories c ON c.slug = v.cslug
JOIN public.brands b ON b.slug = v.bslug
CROSS JOIN LATERAL (SELECT id FROM public.sellers ORDER BY created_at LIMIT 1) s;

-- gallery images
INSERT INTO public.product_images (product_id, url, alt, display_order)
SELECT p.id, p.image_url, p.name, i
FROM public.products p, generate_series(0,3) i;

-- variants
INSERT INTO public.product_variants (product_id, sku, option_type, option_value, option_hex, price, stock, display_order)
SELECT p.id, p.sku || '-C' || v.ord, 'color', v.val, v.hex, NULL, 10, v.ord
FROM public.products p
JOIN public.categories c ON c.id = p.category_id AND c.slug IN ('mobile-tablet','fashion','digital')
CROSS JOIN (VALUES ('مشکی','#111827',1),('سفید','#FFFFFF',2),('آبی','#2563EB',3),('سبز','#16A34A',4)) AS v(val,hex,ord);

INSERT INTO public.product_variants (product_id, sku, option_type, option_value, price, stock, display_order)
SELECT p.id, p.sku || '-S' || v.ord, 'size', v.val, NULL, 12, v.ord
FROM public.products p
JOIN public.categories c ON c.id = p.category_id AND c.slug = 'fashion'
CROSS JOIN (VALUES ('S',1),('M',2),('L',3),('XL',4),('XXL',5)) AS v(val,ord);

INSERT INTO public.product_variants (product_id, sku, option_type, option_value, price, stock, display_order)
SELECT p.id, p.sku || '-M' || v.ord, 'storage', v.val, p.price + v.delta, 8, v.ord
FROM public.products p
JOIN public.categories c ON c.id = p.category_id AND c.slug = 'mobile-tablet'
CROSS JOIN (VALUES ('۱۲۸ گیگابایت', 0::bigint, 1),('۲۵۶ گیگابایت', 4000000::bigint, 2),('۵۱۲ گیگابایت', 9000000::bigint, 3)) AS v(val,delta,ord);

-- reviews
INSERT INTO public.reviews (product_id, author_name, rating, title, comment, pros, cons, status)
SELECT p.id, r.author, r.rating, r.title, r.comment, r.pros, r.cons, 'approved'
FROM (SELECT id, row_number() OVER (ORDER BY created_at) rn FROM public.products) p
JOIN (VALUES
 (1,'آیسان دقتی',5,'کیفیت عالی','کیفیت ساخت واقعا خوب بود و سریع به دستم رسید.',ARRAY['کیفیت ساخت','ارسال سریع'],ARRAY['قیمت']),
 (2,'رضا محمدی',4,'ارزش خرید دارد','نسبت به قیمتش انتخاب خوبی است.',ARRAY['قیمت مناسب'],ARRAY['بسته‌بندی']),
 (3,'مینا کریمی',5,'راضی هستم','دقیقا مطابق توضیحات سایت بود.',ARRAY['مطابق توضیحات'],ARRAY[]::text[]),
 (4,'سعید نوروزی',4,'خوب بود','بعد از یک ماه استفاده مشکلی نداشتم.',ARRAY['دوام'],ARRAY['وزن']),
 (5,'الهام رستمی',5,'پیشنهاد می‌کنم','پشتیبانی لندچی هم خیلی خوب جواب داد.',ARRAY['پشتیبانی'],ARRAY[]::text[]),
 (6,'حسین اکبری',3,'متوسط','انتظار بیشتری داشتم ولی بد نیست.',ARRAY['ظاهر'],ARRAY['باتری']),
 (7,'زهرا موسوی',5,'عالی','خرید اقساطی کار من را خیلی راحت کرد.',ARRAY['خرید اقساطی'],ARRAY[]::text[]),
 (8,'امیر صادقی',4,'مناسب استفاده روزمره','برای کارهای روزمره کاملا کافی است.',ARRAY['کارایی'],ARRAY['گرمای دستگاه']),
 (9,'نگار احمدی',5,'بسته بندی مرتب','سالم و مرتب تحویل گرفتم.',ARRAY['بسته‌بندی'],ARRAY[]::text[]),
 (10,'محمد رحیمی',4,'ارزش قیمت','با تخفیفی که خورد خرید خوبی بود.',ARRAY['تخفیف'],ARRAY['موجودی کم'])
) AS r(rn, author, rating, title, comment, pros, cons) ON r.rn = p.rn;

INSERT INTO public.coupons (code, discount_type, value, min_order, max_discount, is_active, usage_limit) VALUES
('LANDCHI10','percentage',10,1000000,500000,true,1000),
('WELCOME','fixed',200000,2000000,NULL,true,500),
('SUMMER25','percentage',25,5000000,3000000,true,200);
