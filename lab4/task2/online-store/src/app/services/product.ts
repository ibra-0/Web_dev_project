import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  categories: Category[] = [
    { id: 1, name: 'Smartphones' },
    { id: 2, name: 'Laptops' },
    { id: 3, name: 'Headphones' },
    { id: 4, name: 'Tablets' }
  ];

  private products: Product[] = [
    // --- SMARTPHONES (Category 1) ---
    {
      id: 1, categoryId: 1, name: 'iPhone 15', price: 499000, rating: 4.8, likes: 0,
      description: 'Последняя модель с улучшенной камерой и производительностью.',
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h65/h81/86275143532574.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h6d/h89/86275143565342.jpg?format=gallery-medium'],
      link: 'https://kaspi.kz/shop/p/apple-iphone-15-128gb-chernyi-113137790/'
    },
    {
      id: 2, categoryId: 1, name: 'Samsung Galaxy S24', price: 459000, rating: 4.7, likes: 0,
      description: 'Новейший флагман с мощным процессором и интеллектуальными функциями ИИ.',
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h6f/h23/84963273736222.png?format=gallery-medium',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/h7b/h6d/84963273867294.png?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h71/hb2/84963114254366.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h6b/h2b/84963114516510.jpg?format=gallery-medium'],
      link: 'https://kaspi.kz/shop/p/samsung-galaxy-s24-5g-8-gb-256-gb-chernyi-116042629/'
    },
    { id: 3, categoryId: 1, name: ' Xiaomi Redmi Note 14 Pro', description: 'Powerful Xiaomi phone', price: 299000, rating: 4.6, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/p64/p81/67214865.png?format=gallery-medium', images: ['https://resources.cdn-kaspi.kz/img/m/p/p65/p99/45808873.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/pb9/p99/45808876.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/p81/p99/45808874.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/xiaomi-redmi-note-14-pro-8-gb-256-gb-chernyi-133335702/?c=750000000' },
    { id: 4, categoryId: 1, name: 'Huawei nova Y63', description: 'Huawei premium model', price: 379000, rating: 4.5, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/p98/p15/49461116.png?format=preview-large', images: ['https://resources.cdn-kaspi.kz/img/m/p/pef/p9a/56659591.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/p9a/p9a/56659594.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/p46/p9a/56659597.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/huawei-nova-y73-8-gb-128-gb-chernyi-podarok-143552032/?c=750000000' },
    { id: 5, categoryId: 1, name: 'Google Pixel 8a', description: 'Google smartphone', price: 429000, rating: 4.7, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/hc3/h37/86037204238366.png?format=gallery-medium', images: ['https://resources.cdn-kaspi.kz/img/m/p/ha9/h56/86037204172830.png?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h68/hbd/86037204205598.png?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h57/h1b/86005320450078.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/google-pixel-8a-8-gb-128-gb-goluboi-119369122/?c=750000000' },

    // --- LAPTOPS (Category 2) ---
    {
      id: 6, categoryId: 2, name: 'MacBook Air M2', price: 699000, rating: 4.9, likes: 0,
      description: 'Тонкий и мощный ноутбук с невероятным временем автономной работы.',
      image: 'https://resources.cdn-kaspi.kz/img/m/p/hf4/h52/64509322919966.jpg?format=gallery-medium',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/h86/h70/64509325803550.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h45/hb7/64509328457758.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h8e/h0c/64509330030622.jpg?format=gallery-medium'],
      link: 'https://kaspi.kz/shop/p/apple-macbook-air-13-2022-13-6-8-gb-ssd-256-gb-macos-mlxy3-105933794/'
    },
    {
      id: 7, categoryId: 2, name: 'ASUS ROG Strix G16', price: 850000, rating: 4.6, likes: 0,
      description: 'Игровой ноутбук с видеокартой RTX 4060 для максимальной графики.',
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h14/hc1/70303437488158.jpg',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/h09/h88/70303438012446.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h46/hfe/70303439061022.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h91/h32/70303440109598.jpg?format=gallery-medium'],
      link: 'https://kaspi.kz/shop/p/asus-rog-strix-g16-16-16-gb-ssd-1000-gb-dos-g614jv-n4071-90nr0c61-m005r0-109460263/'
    },
    { id: 8, categoryId: 2, name: 'Lenovo Legion 5', description: 'Gaming performance', price: 780000, rating: 4.7, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/p44/pb8/59691124.JPG?format=gallery-medium', images: ['https://resources.cdn-kaspi.kz/img/m/p/p0c/pb8/59691126.JPG?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/pb7/pb7/59691129.JPG?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/p13/pb5/59691132.JPG?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/lenovo-legion-5-15iax10-15-1-32-gb-ssd-1000-gb-bez-os-83f0000frk-144392765/?c=750000000' },
    { id: 9, categoryId: 2, name: 'HP Pavilion', description: 'Everyday laptop', price: 420000, rating: 4.4, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/h4e/hb6/82089377726494.jpg?format=preview-large', images: ['https://resources.cdn-kaspi.kz/img/m/p/h20/h6d/82089377988638.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h0b/h3f/82089378185246.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/hdc/hb0/82089378381854.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/hp-pavilion-15-eh3007ci-15-6-16-gb-ssd-1024-gb-dos-7p438ea-uuq-111968153/?c=750000000' },
    { id: 10, categoryId: 2, name: 'Dell XPS 13', description: 'Premium ultrabook', price: 920000, rating: 4.8, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/p00/p2c/43905749.jpeg?format=gallery-medium', images: ['https://resources.cdn-kaspi.kz/img/m/p/p15/p77/43905750.jpeg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/p7f/p7a/43905751.jpeg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h3b/heb/67343534358558.jpg?format=preview-large'], link: 'https://kaspi.kz/shop/p/dell-xps-13-9345-13-4-16-gb-ssd-512-gb-win-11-210-bmtr-140113298/?c=750000000' },

    // --- HEADPHONES (Category 3) ---
    {
      id: 11, categoryId: 3, name: 'Sony WH-1000XM5', price: 199000, rating: 4.8, likes: 0,
      description: 'Беспроводные наушники с лучшим в индустрии шумоподавлением.',
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h9c/h23/65099684020254.jpg?format=gallery-medium',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/hd5/hd0/65099686150174.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/hc7/hde/65099687657502.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h0d/h4e/65099689000990.jpg?format=gallery-medium'],
      link: 'https://kaspi.kz/shop/p/naushniki-sony-wh-1000xm5-chernyi-105259822/'
    },
    { id: 12, categoryId: 3, name: 'AirPods Pro 2', description: 'Apple earbuds', price: 159000, rating: 4.7, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/ha3/h07/84108189630494.jpg?format=gallery-medium', images: ['https://resources.cdn-kaspi.kz/img/m/p/h14/h8a/84108189761566.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/hf4/hf2/84108189827102.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h34/he4/84108189892638.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/naushniki-apple-airpods-pro-2nd-generation-with-wireless-magsafe-charging-case-belyi-113677582/?c=750000000' },
    { id: 13, categoryId: 3, name: 'JBL Tune 760NC', description: 'Wireless JBL', price: 89000, rating: 4.5, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/hf3/h7c/64217926172702.jpg?format=preview-large', images: ['https://resources.cdn-kaspi.kz/img/m/p/h7e/h2f/64217929121822.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/ha6/hc1/64217932070942.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h96/h91/64217968181278.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/naushniki-jbl-tune-760nc-chernyi-102863031/?c=750000000' },
    { id: 14, categoryId: 3, name: 'Beats Studio 3', description: 'Premium Beats', price: 210000, rating: 4.6, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/h02/h7a/63765148139550.jpg?format=preview-large', images: ['https://resources.cdn-kaspi.kz/img/m/p/hf7/h26/63765148991518.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/hd0/hd5/63765149450270.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h56/hba/63765148532766.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/naushniki-beats-studio-3-wireless-chernyi-4803513/?c=750000000' },
    { id: 15, categoryId: 3, name: 'Huawei FreeBuds 5', description: 'Wireless Huawei', price: 99000, rating: 4.4, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/h38/h21/80650609524766.jpg?format=preview-large', images: ['https://resources.cdn-kaspi.kz/img/m/p/h5f/hff/80650609590302.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h2e/h61/80652805111838.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h33/h93/80652805177374.jpg?format=preview-large'], link: 'https://kaspi.kz/shop/p/naushniki-huawei-freebuds-5-belyi-110237554/?c=750000000' },

    // --- TABLETS (Category 4) ---
    {
      id: 16, categoryId: 4, name: 'iPad 10th Gen', description: 'Apple tablet', price: 299000, rating: 4.8, likes: 0,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/p5d/p30/30827845.png?format=preview-large', 
      images: ['https://resources.cdn-kaspi.kz/img/m/p/p7a/p30/30827846.png?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/pb7/p12/37019481.png?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/p7e/p12/37019483.png?format=gallery-medium'],
      link: 'https://kaspi.kz/shop/p/apple-ipad-a16-11-2025-wi-fi-11-djuim-6-gb-128-gb-serebristyi-138199634/?c=750000000'
    },
    { id: 17, categoryId: 4, name: 'Samsung Galaxy Tab S9', description: 'Samsung tablet', price: 359000, rating: 4.7, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/h02/h6e/82770436030494.jpg?format=preview-large', images: ['https://resources.cdn-kaspi.kz/img/m/p/hde/h76/82770436784158.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h53/h0f/82770863226910.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h22/h67/82770863489054.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/samsung-galaxy-tab-s9-sm-x716bzaas-11-djuim-8-gb-128-gb-grafit-112488621/?c=750000000' },
    { id: 18, categoryId: 4, name: 'Xiaomi Pad 6', description: 'Xiaomi tablet', price: 189000, rating: 4.6, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/h32/hdc/82729741582366.jpg?format=gallery-medium', images: ['https://resources.cdn-kaspi.kz/img/m/p/p78/pfa/78318162.png?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/p95/pfa/78318163.png?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/pb1/pfa/78318164.png?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/xiaomi-pad-6-11-djuim-8-gb-256-gb-seryi-112453226/?c=750000000' },
    { id: 19, categoryId: 4, name: 'Lenovo Tab P11', description: 'Lenovo tablet', price: 169000, rating: 4.5, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/hb7/hdb/79994503921694.jpg?format=gallery-medium', images: ['https://resources.cdn-kaspi.kz/img/m/p/hc4/h5b/79994504183838.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/hed/h72/79994504445982.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h59/hea/79994503659550.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/lenovo-tab-p11-plus-tb-j616f-za940326ru-11-djuim-4-gb-128-gb-seryi-109848413/?c=750000000' },
    { id: 20, categoryId: 4, name: 'Huawei MatePad 11', description: 'Huawei tablet', price: 229000, rating: 4.6, likes: 0, image: 'https://resources.cdn-kaspi.kz/img/m/p/hc5/h60/86746842595358.jpg?format=preview-large', images: ['https://resources.cdn-kaspi.kz/img/m/p/h26/hdf/86746842660894.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h41/h26/86746842857502.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h6a/hfc/86746842923038.jpg?format=gallery-medium'], link: 'https://kaspi.kz/shop/p/huawei-matepad-se-ags6-w09-11-djuim-6-gb-128-gb-seryi-122142537/?c=750000000' }
  ];
  getCategories() {
    return this.categories;
  }

  getProductsByCategory(categoryId: number) {
    return this.products.filter(p => p.categoryId === categoryId);
  }

  getAllProducts() {
    return this.products;
  }
}