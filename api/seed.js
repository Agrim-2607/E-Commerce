const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  // PHOTOGRAPHY - CAMERAS
  { hobby: 'Photography', category: 'Cameras', subcategory: 'Mirrorless', brand: 'Sony', product_name: 'Sony Alpha 7 IV', price: 214990, image_url: 'https://m.media-amazon.com/images/I/71XmPxtf1VL._SX679_.jpg', official_url: 'https://www.sony.co.in/electronics/interchangeable-lens-cameras/ilce-7m4', source_type: 'official_product_page', description: '33MP full-frame mirrorless camera.' },
  { hobby: 'Photography', category: 'Cameras', subcategory: 'Mirrorless', brand: 'Canon', product_name: 'Canon EOS R6 Mark II', price: 243995, image_url: 'https://in.canon/media/image/2022/11/01/16c87e35b75b42b58fb81b67f1b7fc62_EOS+R6+Mark+II+RF24-105mm+f4L+IS+USM+Front+Slant.png', official_url: 'https://in.canon/en/consumer/eos-r6-mark-ii-body/product', source_type: 'official_product_page', description: 'Advanced full-frame mirrorless camera for hybrid shooters.' },
  { hobby: 'Photography', category: 'Cameras', subcategory: 'Mirrorless', brand: 'Fujifilm', product_name: 'Fujifilm X-T5', price: 169999, image_url: 'https://m.media-amazon.com/images/I/71R2H0N2kZL._SX679_.jpg', official_url: 'https://fujifilm-x.com/en-in/products/cameras/x-t5/', source_type: 'official_product_page', description: '40MP APS-C mirrorless camera with classic dials.' },
  { hobby: 'Photography', category: 'Cameras', subcategory: 'Mirrorless', brand: 'Nikon', product_name: 'Nikon Z8', price: 343995, image_url: 'https://m.media-amazon.com/images/I/81M1zD4dDdL._SX679_.jpg', official_url: 'https://www.nikon.co.in/mirrorless-z-8', source_type: 'official_product_page', description: 'Compact, lightweight, full-frame professional camera.' },
  
  // PHOTOGRAPHY - LENSES
  { hobby: 'Photography', category: 'Lenses', subcategory: 'Prime', brand: 'Sigma', product_name: 'Sigma 35mm f/1.4 DG HSM Art', price: 74000, image_url: 'https://m.media-amazon.com/images/I/61kM2G-0m9L._SX679_.jpg', official_url: 'https://www.sigma-global.com/en/lenses/a_35_14/', source_type: 'official_product_page', description: 'High-optical performance prime lens.' },
  { hobby: 'Photography', category: 'Lenses', subcategory: 'Zoom', brand: 'Tamron', product_name: 'Tamron 28-75mm f/2.8 Di III VXD G2', price: 75000, image_url: 'https://m.media-amazon.com/images/I/61Z+-tE9VGL._SX679_.jpg', official_url: 'https://www.tamron.in/product/a063', source_type: 'official_product_page', description: 'Fast standard zoom lens for Sony E-mount.' },
  { hobby: 'Photography', category: 'Lenses', subcategory: 'Prime', brand: 'Sony', product_name: 'Sony FE 50mm f/1.2 GM', price: 169990, image_url: 'https://m.media-amazon.com/images/I/71u9s9WnLNL._SX679_.jpg', official_url: 'https://www.sony.co.in/electronics/camera-lenses/sel50f12gm', source_type: 'official_product_page', description: 'Breathtaking G Master resolution and bokeh.' },

  // PHOTOGRAPHY - DRONES
  { hobby: 'Photography', category: 'Drones', subcategory: 'Compact', brand: 'DJI', product_name: 'DJI Mini 4 Pro', price: 89000, image_url: 'https://m.media-amazon.com/images/I/61vY+P8YJQL._SX679_.jpg', official_url: 'https://www.dji.com/mini-4-pro', source_type: 'official_product_page', description: 'Mini camera drone with omnidirectional obstacle sensing.' },
  { hobby: 'Photography', category: 'Drones', subcategory: 'Professional', brand: 'DJI', product_name: 'DJI Mavic 3 Pro', price: 219000, image_url: 'https://m.media-amazon.com/images/I/61dF-oNfB2L._SX679_.jpg', official_url: 'https://www.dji.com/mavic-3-pro', source_type: 'official_product_page', description: 'Flagship drone with a triple-camera system.' },

  // MUSIC - HEADPHONES
  { hobby: 'Music', category: 'Headphones', subcategory: 'Over-Ear', brand: 'Sony', product_name: 'Sony WH-1000XM5', price: 29990, image_url: 'https://m.media-amazon.com/images/I/51aXvjzcukL._SX679_.jpg', official_url: 'https://www.sony.co.in/electronics/headband-headphones/wh-1000xm5', source_type: 'official_product_page', description: 'Industry leading noise canceling headphones.' },
  { hobby: 'Music', category: 'Headphones', subcategory: 'Over-Ear', brand: 'Sennheiser', product_name: 'Sennheiser Momentum 4', price: 24990, image_url: 'https://m.media-amazon.com/images/I/61L18G2x4LL._SX679_.jpg', official_url: 'https://www.sennheiser-hearing.com/en-IN/p/momentum-4-wireless/', source_type: 'official_product_page', description: 'Premium wireless headphones with audiophile sound.' },
  { hobby: 'Music', category: 'Headphones', subcategory: 'Studio', brand: 'Beyerdynamic', product_name: 'Beyerdynamic DT 770 PRO', price: 13999, image_url: 'https://m.media-amazon.com/images/I/711mYcKq4yL._SX679_.jpg', official_url: 'https://global.beyerdynamic.com/dt-770-pro.html', source_type: 'official_product_page', description: 'Closed over-ear studio headphones for professional recording.' },

  // MUSIC - IEMs
  { hobby: 'Music', category: 'IEMs', subcategory: 'Wired', brand: 'Moondrop', product_name: 'Moondrop Aria Snow Edition', price: 6999, image_url: 'https://m.media-amazon.com/images/I/51pD-h+mZXL._SX679_.jpg', official_url: 'https://moondroplab.com/en/products/aria-se', source_type: 'official_product_page', description: 'High performance dynamic driver IEM.' },
  { hobby: 'Music', category: 'IEMs', subcategory: 'Wired', brand: '7Hz', product_name: '7Hz Timeless', price: 18990, image_url: 'https://m.media-amazon.com/images/I/61R1w9b-7TL._SX679_.jpg', official_url: 'https://www.headphonezone.in/products/7hz-timeless', source_type: 'distributor', description: 'Planar magnetic in-ear monitors.' },
  
  // GAMING - MICE
  { hobby: 'Gaming', category: 'Gaming Mice', subcategory: 'Wireless', brand: 'Logitech G', product_name: 'Logitech G Pro X Superlight', price: 12995, image_url: 'https://m.media-amazon.com/images/I/51r26kX7p+L._SX679_.jpg', official_url: 'https://www.logitechg.com/en-in/products/gaming-mice/pro-x-superlight-wireless-mouse.html', source_type: 'official_product_page', description: 'Ultra-lightweight wireless esports gaming mouse.' },
  { hobby: 'Gaming', category: 'Gaming Mice', subcategory: 'Wireless', brand: 'Razer', product_name: 'Razer DeathAdder V3 Pro', price: 13999, image_url: 'https://m.media-amazon.com/images/I/61Uf3n55Z1L._SX679_.jpg', official_url: 'https://www.razer.com/gaming-mice/razer-deathadder-v3-pro', source_type: 'official_product_page', description: 'Ergonomic wireless esports mouse.' },

  // GAMING - KEYBOARDS
  { hobby: 'Gaming', category: 'Gaming Keyboards', subcategory: 'Mechanical', brand: 'Keychron', product_name: 'Keychron K2 V2', price: 8499, image_url: 'https://m.media-amazon.com/images/I/61QG3aNf+HL._SX679_.jpg', official_url: 'https://keychron.in/product/keychron-k2-wireless-mechanical-keyboard/', source_type: 'official_brand_page', description: '75% layout wireless mechanical keyboard.' },
  { hobby: 'Gaming', category: 'Gaming Keyboards', subcategory: 'Optical', brand: 'Razer', product_name: 'Razer Huntsman V2 TKL', price: 13499, image_url: 'https://m.media-amazon.com/images/I/71S+yX9768L._SX679_.jpg', official_url: 'https://www.razer.com/gaming-keyboards/razer-huntsman-v2-tenkeyless', source_type: 'official_product_page', description: 'Tenkeyless optical gaming keyboard.' },

  // CODING - LAPTOPS
  { hobby: 'Coding', category: 'Laptops', subcategory: 'MacBook', brand: 'Apple', product_name: 'MacBook Pro 14" M3 Pro', price: 199900, image_url: 'https://m.media-amazon.com/images/I/61vFO3R5UNL._SX679_.jpg', official_url: 'https://www.apple.com/in/macbook-pro/', source_type: 'official_product_page', description: 'Incredible performance for compiling and rendering.' },
  { hobby: 'Coding', category: 'Laptops', subcategory: 'Windows', brand: 'Dell', product_name: 'Dell XPS 15', price: 185000, image_url: 'https://m.media-amazon.com/images/I/71p0Wf84LqL._SX679_.jpg', official_url: 'https://www.dell.com/en-in/shop/laptops-2-in-1-pcs/xps-15-laptop/spd/xps-15-9530-laptop', source_type: 'official_product_page', description: 'Creator powerhouse laptop with OLED display.' },

  // CODING - MONITORS
  { hobby: 'Coding', category: 'Monitors', subcategory: 'Ultrawide', brand: 'LG', product_name: 'LG 34WP65C-B 34" Curved', price: 34500, image_url: 'https://m.media-amazon.com/images/I/71YyMtyfF-L._SX679_.jpg', official_url: 'https://www.lg.com/in/monitors/lg-34wp65c-b', source_type: 'official_product_page', description: '34 inch ultrawide for ultimate productivity.' },

  // FOOTBALL - BOOTS
  { hobby: 'Football', category: 'Football Boots', subcategory: 'Firm Ground', brand: 'Nike', product_name: 'Nike Mercurial Superfly 9', price: 22995, image_url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22ca72d4-1a9d-47fb-8df4-057bf242c7aa/zoom-mercurial-superfly-9-elite-fg-football-boot-kM6R21.png', official_url: 'https://www.nike.com/in/t/zoom-mercurial-superfly-9-elite-fg-football-boot-kM6R21', source_type: 'official_product_page', description: 'Elite firm-ground football boots.' },
  { hobby: 'Football', category: 'Football Boots', subcategory: 'Firm Ground', brand: 'Adidas', product_name: 'Adidas Predator Accuracy.1', price: 19999, image_url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/25ea947ce4044b7e9b0eaf95010642fa_9366/Predator_Accuracy.1_Firm_Ground_Boots_White_GZ0038_22_model.jpg', official_url: 'https://www.adidas.co.in/predator-accuracy.1-firm-ground-boots/GZ0038.html', source_type: 'official_product_page', description: 'Control and power on the pitch.' },

  // FITNESS - DUMBBELLS
  { hobby: 'Fitness', category: 'Dumbbells & Weights', subcategory: 'Adjustable', brand: 'Boldfit', product_name: 'Boldfit Hex Dumbbells 5kg Pair', price: 2199, image_url: 'https://m.media-amazon.com/images/I/71rVlYm7bTL._SX679_.jpg', official_url: 'https://boldfit.in/products/hex-dumbbells-set', source_type: 'official_brand_page', description: 'Rubber coated hex dumbbells.' },
  
  // TRAVEL - BACKPACKS
  { hobby: 'Travel', category: 'Backpacks', subcategory: 'Trekking', brand: 'Wildcraft', product_name: 'Wildcraft 45L Rucksack', price: 2499, image_url: 'https://m.media-amazon.com/images/I/71ZpT7EwJHL._SX679_.jpg', official_url: 'https://wildcraft.com/rucksacks', source_type: 'official_brand_page', description: 'Durable trekking rucksack with rain cover.' }
];

async function seed() {
  console.log('Fetching hobbies from DB...');
  const { data: hobbiesData, error: hobbyErr } = await supabase.from('hobbies').select('*');
  if (hobbyErr) {
    console.error('Error fetching hobbies:', hobbyErr);
    return;
  }

  const hobbyMap = {};
  hobbiesData.forEach(h => {
    hobbyMap[h.hobby_name] = h.id;
  });

  console.log('Clearing old products (optional, but let us just append to be safe or maybe delete everything and reinsert)...');
  // We'll just insert to avoid deleting user carts, but wait, if we delete, carts referencing them might break if cascade delete isn't on.
  // We will just insert new ones.
  
  const mappedProducts = products.map(p => ({
    hobby_id: hobbyMap[p.hobby],
    category: p.category,
    subcategory: p.subcategory,
    brand: p.brand,
    product_name: p.product_name,
    price: p.price,
    image_url: p.image_url,
    official_url: p.official_url,
    source_type: p.source_type,
    description: p.description
  })).filter(p => p.hobby_id); // Filter out any mismatched hobbies

  console.log(`Inserting ${mappedProducts.length} new products...`);
  const { data, error } = await supabase.from('products').insert(mappedProducts);
  
  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log('Seeding complete!');
  }
}

seed();
