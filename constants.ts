import { Slab, Project, Job } from './types';

const SLABS_EN: Slab[] = [
    // --- MARBLE COLLECTION ---
    { id: 101, slug: "afyon-white", name: "Afyon White", quarry: "Afyon Quarry", image: "/images/products/101.webp", type: "marble" },
    { id: 102, slug: "afyon-sugar", name: "Afyon Sugar", quarry: "Afyon Quarry", image: "/images/products/102.webp", type: "marble" },
    { id: 103, slug: "carrara-white", name: "Carrara White", quarry: "Italy (Imported)", image: "/images/products/103.webp", type: "marble" },
    { id: 104, slug: "calacatta-marble", name: "Calacatta Marble", quarry: "Italy (Imported)", image: "/images/products/104.webp", type: "marble" },
    { id: 105, slug: "marmara-white", name: "Marmara White", quarry: "Marmara Island", image: "/images/products/105.webp", type: "marble" },
    { id: 106, slug: "marmara-equator", name: "Marmara Equator", quarry: "Marmara Island", image: "/images/products/106.webp", type: "marble" },
    { id: 107, slug: "mugla-white", name: "Mugla White", quarry: "Mugla Quarry", image: "/images/products/107.webp", type: "marble" },
    { id: 108, slug: "kemalpasa-white", name: "Kemalpasa White", quarry: "Bursa Quarry", image: "/images/products/108.webp", type: "marble" },
    { id: 109, slug: "ottoman-beige", name: "Ottoman Beige", quarry: "Isparta Quarry", image: "/images/products/109.webp", type: "marble" },
    { id: 110, slug: "burdur-beige", name: "Burdur Beige", quarry: "Burdur Quarry", image: "/images/products/110.webp", type: "marble" },
    { id: 111, slug: "crema-nouva", name: "Crema Nouva", quarry: "Bilecik Quarry", image: "/images/products/111.webp", type: "marble" },
    { id: 112, slug: "bilecik-rosalia", name: "Bilecik Rosalia", quarry: "Bilecik Quarry", image: "/images/products/112.webp", type: "marble" },
    { id: 113, slug: "sivrihisar-beige", name: "Sivrihisar Beige", quarry: "Eskisehir Quarry", image: "/images/products/113.webp", type: "marble" },
    { id: 114, slug: "crema-bella", name: "Crema Bella", quarry: "Burdur Quarry", image: "/images/products/114.webp", type: "marble" },
    { id: 115, slug: "botticino", name: "Botticino", quarry: "Imported / Local", image: "/images/products/115.webp", type: "marble" },
    { id: 116, slug: "mediterranean-emperador", name: "Mediterranean Emperador", quarry: "Toros Quarry", image: "/images/products/116.webp", type: "marble" },
    { id: 117, slug: "spanish-emperador", name: "Spanish Emperador", quarry: "Imported", image: "/images/products/117.webp", type: "marble" },
    { id: 118, slug: "light-emperador", name: "Light Emperador", quarry: "Bursa Quarry", image: "/images/products/118.webp", type: "marble" },
    { id: 119, slug: "dark-emperador", name: "Dark Emperador", quarry: "Antalya Quarry", image: "/images/products/119.webp", type: "marble" },
    { id: 120, slug: "grey-emperador", name: "Grey Emperador", quarry: "Afyon Quarry", image: "/images/products/120.webp", type: "marble" },
    { id: 121, slug: "tundra-grey", name: "Tundra Grey", quarry: "Afyon Quarry", image: "/images/products/121.webp", type: "marble" },
    { id: 122, slug: "cool-grey", name: "Cool Grey", quarry: "Balikesir Quarry", image: "/images/products/122.webp", type: "marble" },
    { id: 123, slug: "rosso-levanto", name: "Rosso Levanto", quarry: "Elazig/Hatay Quarry", image: "/images/products/123.webp", type: "marble" },

    // --- TRAVERTINE COLLECTION ---
    { id: 201, slug: "denizli-travertine", name: "Denizli Travertine", quarry: "Denizli Quarry", image: "/images/products/201.webp", type: "travertine" },
    { id: 202, slug: "silver-travertine", name: "Silver Travertine", quarry: "Afyon/Denizli", image: "/images/products/202.webp", type: "travertine" },
    { id: 203, slug: "arizona-travertine", name: "Arizona Travertine", quarry: "Export Collection", image: "/images/products/203.webp", type: "travertine" },
    { id: 204, slug: "grey-travertine", name: "Grey Travertine", quarry: "Kutahya Quarry", image: "/images/products/204.webp", type: "travertine" },
    { id: 205, slug: "light-travertine", name: "Light Travertine", quarry: "Mersin Quarry", image: "/images/products/205.webp", type: "travertine" },
    { id: 206, slug: "yellow-travertine", name: "Yellow Travertine", quarry: "Sivas Quarry", image: "/images/products/206.webp", type: "travertine" },
    { id: 207, slug: "classic-travertine", name: "Classic Travertine", quarry: "Denizli Quarry", image: "/images/products/207.webp", type: "travertine" },
    { id: 208, slug: "noche-travertine", name: "Noche Travertine", quarry: "Elazig Quarry", image: "/images/products/208.webp", type: "travertine" },

    // --- ONYX COLLECTION ---
    { id: 301, slug: "honey-onyx", name: "Honey Onyx", quarry: "Bilecik Quarry", image: "/images/products/301.webp", type: "onyx" },
    { id: 302, slug: "green-onyx", name: "Green Onyx", quarry: "Akhisar Quarry", image: "/images/products/302.webp", type: "onyx" },
    { id: 303, slug: "white-onyx", name: "White Onyx", quarry: "Manisa Quarry", image: "/images/products/303.webp", type: "onyx" },

    // --- LIMESTONE COLLECTION ---
    { id: 401, slug: "classic-limestone", name: "Classic Limestone", quarry: "Antalya Quarry", image: "/images/products/401.webp", type: "limestone" },
    { id: 402, slug: "cloudy-limestone", name: "Cloudy Limestone", quarry: "Finike Quarry", image: "/images/products/402.webp", type: "limestone" },
    { id: 403, slug: "sesame-limestone", name: "Sesame Limestone", quarry: "Demre Quarry", image: "/images/products/403.webp", type: "limestone" },

    // --- GRANITE COLLECTION ---
    { id: 501, slug: "anatolian-grey-granite", name: "Anatolian Grey Granite", quarry: "Anatolian Region", image: "/images/products/501.webp", type: "granite" },
    { id: 502, slug: "wildflower-granite", name: "Wildflower Granite", quarry: "Bergama Quarry", image: "/images/products/502.webp", type: "granite" },
    { id: 503, slug: "aksaray-yaylak-granite", name: "Aksaray Yaylak Granite", quarry: "Aksaray Quarry", image: "/images/products/503.webp", type: "granite" },

    // --- DOLOMITE COLLECTION ---
    { id: 601, slug: "active-dolomite", name: "Active Dolomite", quarry: "Marmara Island", image: "/images/products/601.webp", type: "dolomite" },
    { id: 602, slug: "dolomite-spider", name: "Dolomite Spider", quarry: "Marmara Island", image: "/images/products/602.webp", type: "dolomite" },
    { id: 603, slug: "white-dolomite", name: "White Dolomite", quarry: "Eskisehir Quarry", image: "/images/products/603.webp", type: "dolomite" },

    // --- MOSAIC COLLECTION (700 Series) ---
    { id: 701, slug: "hexagon-carrara", name: "Hexagon Carrara", quarry: "Processed", image: "/images/products/701.webp", type: "mosaic" },
    { id: 702, slug: "tundra-grey-hexagon-mosaic", name: "Tundra Grey Hexagon Mosaic", quarry: "Afyon Quarry", image: "/images/products/702.webp", type: "mosaic" },
    { id: 703, slug: "light-beige-marble-mosaic", name: "Light Beige Marble Mosaic", quarry: "Burdur Quarry", image: "/images/products/703.webp", type: "mosaic" },
    { id: 704, slug: "emperador-beige-mix-marble-mosaic", name: "Emperador Beige Mix Marble Mosaic", quarry: "Mixed Quarries", image: "/images/products/704.webp", type: "mosaic" },

    // --- TUMBLED STONE COLLECTION (800 Series) ---
    { id: 801, slug: "granite-pebbles-5-10cm", name: "Granite Pebbles 5-10cm", quarry: "Natural", image: "/images/products/801.webp", type: "tumbled" },
    { id: 802, slug: "tumbled-granite", name: "Tumbled Granite", quarry: "Natural", image: "/images/products/802.webp", type: "tumbled" },
    { id: 803, slug: "tumbled-granite-1-3cm", name: "Tumbled Granite 1-3cm", quarry: "Natural", image: "/images/products/803.webp", type: "tumbled" },
    { id: 804, slug: "tumbled-granite-4-6cm", name: "Tumbled Granite 4-6cm", quarry: "Natural", image: "/images/products/804.webp", type: "tumbled" },
    { id: 805, slug: "granite-gravel", name: "Granite Gravel", quarry: "Natural", image: "/images/products/805.webp", type: "tumbled" },
    { id: 806, slug: "tumbled-granite-2-4cm", name: "Tumbled Granite 2-4cm", quarry: "Natural", image: "/images/products/806.webp", type: "tumbled" },
    { id: 807, slug: "white-dolomite-2-4cm", name: "White Dolomite 2-4cm", quarry: "Marmara Island", image: "/images/products/807.webp", type: "tumbled" },
    { id: 808, slug: "dolomite", name: "Dolomite", quarry: "Marmara Island", image: "/images/products/808.webp", type: "tumbled" },
    { id: 809, slug: "dolomite-4-6cm", name: "Dolomite 4-6cm", quarry: "Marmara Island", image: "/images/products/809.webp", type: "tumbled" },
    { id: 810, slug: "marmara-white-dolomite", name: "Marmara White Dolomite", quarry: "Marmara Island", image: "/images/products/810.webp", type: "tumbled" },
    { id: 811, slug: "dolomite-stone", name: "Dolomite Stone", quarry: "General", image: "/images/products/811.webp", type: "tumbled" },
    { id: 812, slug: "dolomite-rock", name: "Dolomite Rock", quarry: "General", image: "/images/products/812.webp", type: "tumbled" },
    { id: 813, slug: "tumbled-basalt-gravel", name: "Tumbled Basalt Gravel", quarry: "Volcanic", image: "/images/products/813.webp", type: "tumbled" },
    { id: 814, slug: "tumbled-basalt", name: "Tumbled Basalt", quarry: "Volcanic", image: "/images/products/814.webp", type: "tumbled" },
    { id: 815, slug: "basalt-gravel", name: "Basalt Gravel", quarry: "Volcanic", image: "/images/products/815.webp", type: "tumbled" },
    { id: 816, slug: "mixed-color-pebbles", name: "Mixed Color Pebbles", quarry: "Riverbed", image: "/images/products/816.webp", type: "tumbled" },
    { id: 817, slug: "river-pebbles", name: "River Pebbles", quarry: "Riverbed", image: "/images/products/817.webp", type: "tumbled" },
    { id: 818, slug: "dere-cakili", name: "Dere Çakılı", quarry: "Riverbed", image: "/images/products/818.webp", type: "tumbled" },
    { id: 819, slug: "flat-podima", name: "Flat Podima", quarry: "Podima", image: "/images/products/819.webp", type: "tumbled" },
    { id: 820, slug: "tumbled-pebbles", name: "Tumbled Pebbles", quarry: "General", image: "/images/products/820.webp", type: "tumbled" },
    { id: 821, slug: "podima-stone", name: "Podima Stone", quarry: "Podima", image: "/images/products/821.webp", type: "tumbled" },
    { id: 822, slug: "all-mix", name: "All Mix", quarry: "Mixed", image: "/images/products/822.webp", type: "tumbled" },
    { id: 823, slug: "black-stone", name: "Black Stone", quarry: "Volcanic", image: "/images/products/823.webp", type: "tumbled" },
    { id: 824, slug: "tumbled-aegean-burgundy", name: "Tumbled Aegean Burgundy", quarry: "Aegean", image: "/images/products/824.webp", type: "tumbled" },
    { id: 825, slug: "tumbled-burgundy", name: "Tumbled Burgundy", quarry: "Aegean", image: "/images/products/825.webp", type: "tumbled" },
    { id: 826, slug: "green-angel", name: "Green Angel", quarry: "Imported", image: "/images/products/826.webp", type: "tumbled" },
    { id: 827, slug: "black-angel", name: "Black Angel", quarry: "Imported", image: "/images/products/827.webp", type: "tumbled" },
    { id: 828, slug: "desert-yellow", name: "Desert Yellow", quarry: "Imported", image: "/images/products/828.webp", type: "tumbled" },
    { id: 829, slug: "angelo-cristalo", name: "Angelo Cristalo", quarry: "Specialty", image: "/images/products/829.webp", type: "tumbled" },
    { id: 830, slug: "calcite", name: "Calcite", quarry: "Natural", image: "/images/products/830.webp", type: "tumbled" },
    { id: 831, slug: "white-slag", name: "White Slag", quarry: "Industrial", image: "/images/products/831.webp", type: "tumbled" },
    { id: 832, slug: "riviera", name: "Riviera", quarry: "Coastal", image: "/images/products/832.webp", type: "tumbled" },
    { id: 833, slug: "sherry", name: "Sherry", quarry: "Imported", image: "/images/products/833.webp", type: "tumbled" },
    { id: 834, slug: "rainbow", name: "Rainbow", quarry: "Exotic", image: "/images/products/834.webp", type: "tumbled" },
    { id: 835, slug: "yellow-river", name: "Yellow River", quarry: "Riverbed", image: "/images/products/835.webp", type: "tumbled" },
    { id: 836, slug: "pink-travertine-tumbled", name: "Pink Travertine Tumbled", quarry: "Travertine", image: "/images/products/836.webp", type: "tumbled" },
    { id: 837, slug: "pearl", name: "Pearl", quarry: "Specialty", image: "/images/products/837.webp", type: "tumbled" },
    { id: 838, slug: "rainbow-stone", name: "Rainbow Stone", quarry: "Exotic", image: "/images/products/838.webp", type: "tumbled" },
    { id: 839, slug: "tumbled-stone-application", name: "Tumbled Stone Application", quarry: "Application", image: "/images/products/839.webp", type: "tumbled" },

    // --- INDUSTRIAL SAND COLLECTION (900 Series) ---
    { id: 901, slug: "quartz-sand", name: "Quartz Sand", quarry: "Industrial", image: "/images/products/901.webp", type: "sand" },
    { id: 902, slug: "quartz-powder", name: "Quartz Powder", quarry: "Industrial", image: "/images/products/902.webp", type: "sand" },
    { id: 903, slug: "quartz-granule", name: "Quartz Granule", quarry: "Industrial", image: "/images/products/903.webp", type: "sand" },
    { id: 904, slug: "silica-sand", name: "Silica Sand", quarry: "Industrial", image: "/images/products/904.webp", type: "sand" },

    // --- SPLITFACE COLLECTION (1000 Series) ---
    { id: 1001, slug: "rustic-split", name: "Rustic Split", quarry: "Afyon", image: "/images/products/1001.webp", type: "splitface" },
    { id: 1002, slug: "classic-travertine-split", name: "Classic Travertine Split", quarry: "Denizli Quarry", image: "/images/products/1002.webp", type: "splitface" },
    { id: 1003, slug: "noce-split", name: "Noce Split", quarry: "Denizli Quarry", image: "/images/products/1003.webp", type: "splitface" },
    { id: 1004, slug: "afyon-grey-split", name: "Afyon Grey Split", quarry: "Afyon Quarry", image: "/images/products/1004.webp", type: "splitface" }
];

// Turkish translations - slugs remain the same for consistent URLs
const SLABS_TR: Slab[] = [
    // --- MERMER ÇEŞİTLERİ ---
    { id: 101, slug: "afyon-white", name: "Afyon White", quarry: "Afyon Ocağı", image: SLABS_EN[0].image, type: "marble" },
    { id: 102, slug: "afyon-sugar", name: "Afyon Sugar", quarry: "Afyon Ocağı", image: SLABS_EN[1].image, type: "marble" },
    { id: 103, slug: "carrara-white", name: "Carrara White", quarry: "İtalya (İthal)", image: SLABS_EN[2].image, type: "marble" },
    { id: 104, slug: "calacatta-marble", name: "Calacatta Mermer", quarry: "İtalya (İthal)", image: SLABS_EN[3].image, type: "marble" },
    { id: 105, slug: "marmara-white", name: "Marmara Beyaz Mermer", quarry: "Marmara Adası", image: SLABS_EN[4].image, type: "marble" },
    { id: 106, slug: "marmara-equator", name: "Marmara Equator Mermer", quarry: "Marmara Adası", image: SLABS_EN[5].image, type: "marble" },
    { id: 107, slug: "mugla-white", name: "Muğla Beyaz Mermer", quarry: "Muğla Ocağı", image: SLABS_EN[6].image, type: "marble" },
    { id: 108, slug: "kemalpasa-white", name: "Kemalpaşa Beyaz Mermer", quarry: "Bursa Ocağı", image: SLABS_EN[7].image, type: "marble" },
    { id: 109, slug: "ottoman-beige", name: "Ottoman Bej", quarry: "Isparta Ocağı", image: SLABS_EN[8].image, type: "marble" },
    { id: 110, slug: "burdur-beige", name: "Burdur Bej", quarry: "Burdur Ocağı", image: SLABS_EN[9].image, type: "marble" },
    { id: 111, slug: "crema-nouva", name: "Crema Nouva", quarry: "Bilecik Ocağı", image: SLABS_EN[10].image, type: "marble" },
    { id: 112, slug: "bilecik-rosalia", name: "Bilecik Rosalia Bej", quarry: "Bilecik Ocağı", image: SLABS_EN[11].image, type: "marble" },
    { id: 113, slug: "sivrihisar-beige", name: "Sivrihisar Bej", quarry: "Eskişehir Ocağı", image: SLABS_EN[12].image, type: "marble" },
    { id: 114, slug: "crema-bella", name: "Crema Bella", quarry: "Burdur Ocağı", image: SLABS_EN[13].image, type: "marble" },
    { id: 115, slug: "botticino", name: "Bottochino", quarry: "İthal / Yerli", image: SLABS_EN[14].image, type: "marble" },
    { id: 116, slug: "mediterranean-emperador", name: "Akdeniz Emperador Mermer", quarry: "Toros Ocağı", image: SLABS_EN[15].image, type: "marble" },
    { id: 117, slug: "spanish-emperador", name: "İspanyol Emperador Mermer", quarry: "İthal", image: SLABS_EN[16].image, type: "marble" },
    { id: 118, slug: "light-emperador", name: "Light Emperador Mermer", quarry: "Bursa Ocağı", image: SLABS_EN[17].image, type: "marble" },
    { id: 119, slug: "dark-emperador", name: "Dark Emperador Mermer", quarry: "Antalya Ocağı", image: SLABS_EN[18].image, type: "marble" },
    { id: 120, slug: "grey-emperador", name: "Gri Emperador Mermer", quarry: "Afyon Ocağı", image: SLABS_EN[19].image, type: "marble" },
    { id: 121, slug: "tundra-grey", name: "Tundra Grey Mermer", quarry: "Afyon Ocağı", image: SLABS_EN[20].image, type: "marble" },
    { id: 122, slug: "cool-grey", name: "Cool Grey Mermer", quarry: "Balıkesir Ocağı", image: SLABS_EN[21].image, type: "marble" },
    { id: 123, slug: "rosso-levanto", name: "Rosso Levanto Mermer", quarry: "Elazığ/Hatay Ocağı", image: SLABS_EN[22].image, type: "marble" },

    // --- TRAVERTEN ÇEŞİTLERİ ---
    { id: 201, slug: "denizli-travertine", name: "Denizli Traverten", quarry: "Denizli Ocağı", image: SLABS_EN[23].image, type: "travertine" },
    { id: 202, slug: "silver-travertine", name: "Silver Traverten", quarry: "Afyon/Denizli", image: SLABS_EN[24].image, type: "travertine" },
    { id: 203, slug: "arizona-travertine", name: "Arizona Traverten", quarry: "İhracat Koleksiyonu", image: SLABS_EN[25].image, type: "travertine" },
    { id: 204, slug: "grey-travertine", name: "Gri Traverten", quarry: "Kütahya Ocağı", image: SLABS_EN[26].image, type: "travertine" },
    { id: 205, slug: "light-travertine", name: "Light Traverten", quarry: "Mersin Ocağı", image: SLABS_EN[27].image, type: "travertine" },
    { id: 206, slug: "yellow-travertine", name: "Sarı Traverten", quarry: "Sivas Ocağı", image: SLABS_EN[28].image, type: "travertine" },
    { id: 207, slug: "classic-travertine", name: "Klasik Traverten", quarry: "Denizli Ocağı", image: SLABS_EN[29].image, type: "travertine" },
    { id: 208, slug: "noche-travertine", name: "Noche Traverten", quarry: "Elazığ Ocağı", image: SLABS_EN[30].image, type: "travertine" },

    // --- ONİKS KOLEKSİYONU ---
    { id: 301, slug: "honey-onyx", name: "Bal Oniks", quarry: "Bilecik Ocağı", image: SLABS_EN[31].image, type: "onyx" },
    { id: 302, slug: "green-onyx", name: "Yeşil Oniks", quarry: "Akhisar Ocağı", image: SLABS_EN[32].image, type: "onyx" },
    { id: 303, slug: "white-onyx", name: "Beyaz Oniks", quarry: "Manisa Ocağı", image: SLABS_EN[33].image, type: "onyx" },

    // --- LİMRA (LIMESTONE) KOLEKSİYONU ---
    { id: 401, slug: "classic-limestone", name: "Klasik Limra", quarry: "Antalya Ocağı", image: SLABS_EN[34].image, type: "limestone" },
    { id: 402, slug: "cloudy-limestone", name: "Bulutlu Limra", quarry: "Finike Ocağı", image: SLABS_EN[35].image, type: "limestone" },
    { id: 403, slug: "sesame-limestone", name: "Susam Limra", quarry: "Demre Ocağı", image: SLABS_EN[36].image, type: "limestone" },

    // --- GRANİT KOLEKSİYONU ---
    { id: 501, slug: "anatolian-grey-granite", name: "Anadolu Gri Granit", quarry: "Anadolu Bölgesi", image: SLABS_EN[37].image, type: "granite" },
    { id: 502, slug: "wildflower-granite", name: "Kır Çiçeği Granit", quarry: "Bergama Ocağı", image: SLABS_EN[38].image, type: "granite" },
    { id: 503, slug: "aksaray-yaylak-granite", name: "Aksaray Yaylak Granit", quarry: "Aksaray Ocağı", image: SLABS_EN[39].image, type: "granite" },

    // --- DOLOMİT KOLEKSİYONU ---
    { id: 601, slug: "active-dolomite", name: "Aktif Dolomit", quarry: "Marmara Adası", image: SLABS_EN[40].image, type: "dolomite" },
    { id: 602, slug: "dolomite-spider", name: "Dolomit Spider", quarry: "Marmara Adası", image: SLABS_EN[41].image, type: "dolomite" },
    { id: 603, slug: "white-dolomite", name: "Beyaz Dolomit", quarry: "Eskişehir Ocağı", image: SLABS_EN[42].image, type: "dolomite" },

    // --- MOZAİK KOLEKSİYONU (700 Serisi) ---
    { id: 701, slug: "hexagon-carrara", name: "Altıgen Carrara", quarry: "İşlenmiş", image: SLABS_EN[43].image, type: "mosaic" },
    { id: 702, slug: "tundra-grey-hexagon-mosaic", name: "Tundra Grey Altıgen Mozaik", quarry: "Afyon Ocağı", image: SLABS_EN[44].image, type: "mosaic" },
    { id: 703, slug: "light-beige-marble-mosaic", name: "Açık Bej Mermer Mozaik", quarry: "Burdur Ocağı", image: SLABS_EN[45].image, type: "mosaic" },
    { id: 704, slug: "emperador-beige-mix-marble-mosaic", name: "Emperador Bej Miks Mermer Mozaik", quarry: "Karışık Ocaklar", image: SLABS_EN[46].image, type: "mosaic" },

    // --- TAMBURLU TAŞ KOLEKSİYONU ---
    { id: 801, slug: "granite-pebbles-5-10cm", name: "Granit Toplar 5/10 cm", quarry: "Doğal", image: SLABS_EN[47].image, type: "tumbled" },
    { id: 802, slug: "tumbled-granite", name: "Tamburlu Granit", quarry: "Doğal", image: SLABS_EN[48].image, type: "tumbled" },
    { id: 803, slug: "tumbled-granite-1-3cm", name: "Tamburlu Granit 1/3 cm", quarry: "Doğal", image: SLABS_EN[49].image, type: "tumbled" },
    { id: 804, slug: "tumbled-granite-4-6cm", name: "Tamburlu Granit 4/6 cm", quarry: "Doğal", image: SLABS_EN[50].image, type: "tumbled" },
    { id: 805, slug: "granite-gravel", name: "Granit Çakıl Taşı", quarry: "Doğal", image: SLABS_EN[51].image, type: "tumbled" },
    { id: 806, slug: "tumbled-granite-2-4cm", name: "Tamburlu Granit 2/4 cm", quarry: "Doğal", image: SLABS_EN[52].image, type: "tumbled" },
    { id: 807, slug: "white-dolomite-2-4cm", name: "Beyaz Dolomit 2/4 cm", quarry: "Marmara Adası", image: SLABS_EN[53].image, type: "tumbled" },
    { id: 808, slug: "dolomite", name: "Dolomite", quarry: "Marmara Adası", image: SLABS_EN[54].image, type: "tumbled" },
    { id: 809, slug: "dolomite-4-6cm", name: "Dolomit 4/6 cm", quarry: "Marmara Adası", image: SLABS_EN[55].image, type: "tumbled" },
    { id: 810, slug: "marmara-white-dolomite", name: "Marmara Beyaz Dolomit", quarry: "Marmara Adası", image: SLABS_EN[56].image, type: "tumbled" },
    { id: 811, slug: "dolomite-stone", name: "Dolomit", quarry: "Genel", image: SLABS_EN[57].image, type: "tumbled" },
    { id: 812, slug: "dolomite-rock", name: "Dolomit Taşı", quarry: "Genel", image: SLABS_EN[58].image, type: "tumbled" },
    { id: 813, slug: "tumbled-basalt-gravel", name: "Tamburlu Bazalt Çakıl Taşı", quarry: "Volkanik", image: SLABS_EN[59].image, type: "tumbled" },
    { id: 814, slug: "tumbled-basalt", name: "Tamburlu Bazalt", quarry: "Volkanik", image: SLABS_EN[60].image, type: "tumbled" },
    { id: 815, slug: "basalt-gravel", name: "Bazalt Çakıl Taşı", quarry: "Volkanik", image: SLABS_EN[61].image, type: "tumbled" },
    { id: 816, slug: "mixed-color-pebbles", name: "Karışık Renkli Çakıl Taşı", quarry: "Dere Yatağı", image: SLABS_EN[62].image, type: "tumbled" },
    { id: 817, slug: "river-pebbles", name: "Çakıl Taşı", quarry: "Dere Yatağı", image: SLABS_EN[63].image, type: "tumbled" },
    { id: 818, slug: "dere-cakili", name: "Dere Çakılı", quarry: "Dere Yatağı", image: SLABS_EN[64].image, type: "tumbled" },
    { id: 819, slug: "flat-podima", name: "Yassı Podima", quarry: "Podima", image: SLABS_EN[65].image, type: "tumbled" },
    { id: 820, slug: "tumbled-pebbles", name: "Tamburlu Çakıl Taşı", quarry: "Genel", image: SLABS_EN[66].image, type: "tumbled" },
    { id: 821, slug: "podima-stone", name: "Podima Taşı", quarry: "Podima", image: SLABS_EN[67].image, type: "tumbled" },
    { id: 822, slug: "all-mix", name: "Karışık", quarry: "Karışık", image: SLABS_EN[68].image, type: "tumbled" },
    { id: 823, slug: "black-stone", name: "Siyah Taş", quarry: "Volkanik", image: SLABS_EN[69].image, type: "tumbled" },
    { id: 824, slug: "tumbled-aegean-burgundy", name: "Tamburlu Ege Bordo", quarry: "Ege", image: SLABS_EN[70].image, type: "tumbled" },
    { id: 825, slug: "tumbled-burgundy", name: "Tamburlu Bordo", quarry: "Ege", image: SLABS_EN[71].image, type: "tumbled" },
    { id: 826, slug: "green-angel", name: "Yeşil Angel", quarry: "İthal", image: SLABS_EN[72].image, type: "tumbled" },
    { id: 827, slug: "black-angel", name: "Siyah Angel", quarry: "İthal", image: SLABS_EN[73].image, type: "tumbled" },
    { id: 828, slug: "desert-yellow", name: "Çöl Sarısı", quarry: "İthal", image: SLABS_EN[74].image, type: "tumbled" },
    { id: 829, slug: "angelo-cristalo", name: "Angelo Kristal", quarry: "Özel", image: SLABS_EN[75].image, type: "tumbled" },
    { id: 830, slug: "calcite", name: "Kalsit", quarry: "Doğal", image: SLABS_EN[76].image, type: "tumbled" },
    { id: 831, slug: "white-slag", name: "Beyaz Cüruf", quarry: "Endüstriyel", image: SLABS_EN[77].image, type: "tumbled" },
    { id: 832, slug: "riviera", name: "Riviera", quarry: "Sahil", image: SLABS_EN[78].image, type: "tumbled" },
    { id: 833, slug: "sherry", name: "Sherry", quarry: "İthal", image: SLABS_EN[79].image, type: "tumbled" },
    { id: 834, slug: "rainbow", name: "Gökkuşağı", quarry: "Egzotik", image: SLABS_EN[80].image, type: "tumbled" },
    { id: 835, slug: "yellow-river", name: "Sarı Nehir", quarry: "Dere Yatağı", image: SLABS_EN[81].image, type: "tumbled" },
    { id: 836, slug: "pink-travertine-tumbled", name: "Pembe Traverten", quarry: "Traverten", image: SLABS_EN[82].image, type: "tumbled" },
    { id: 837, slug: "pearl", name: "İnci", quarry: "Özel", image: SLABS_EN[83].image, type: "tumbled" },
    { id: 838, slug: "rainbow-stone", name: "Gökkuşağı Taşı", quarry: "Egzotik", image: SLABS_EN[84].image, type: "tumbled" },
    { id: 839, slug: "tumbled-stone-application", name: "Tamburlu Taş Uygulaması", quarry: "Uygulama", image: SLABS_EN[85].image, type: "tumbled" },

    // --- ENDÜSTRİYEL KUM KOLEKSİYONU ---
    { id: 901, slug: "quartz-sand", name: "Kuvars Kum", quarry: "Endüstriyel", image: SLABS_EN[86].image, type: "sand" },
    { id: 902, slug: "quartz-powder", name: "Kuvars Tozu", quarry: "Endüstriyel", image: SLABS_EN[87].image, type: "sand" },
    { id: 903, slug: "quartz-granule", name: "Kuvars Granül", quarry: "Endüstriyel", image: SLABS_EN[88].image, type: "sand" },
    { id: 904, slug: "silica-sand", name: "Silis Kumu", quarry: "Endüstriyel", image: SLABS_EN[89].image, type: "sand" },

    // --- PATLATMA TAŞ KOLEKSİYONU (1000 Serisi) ---
    { id: 1001, slug: "rustic-split", name: "Rustik Patlatma", quarry: "Afyon", image: SLABS_EN[90].image, type: "splitface" },
    { id: 1002, slug: "classic-travertine-split", name: "Klasik Traverten Patlatma", quarry: "Denizli Ocağı", image: SLABS_EN[91].image, type: "splitface" },
    { id: 1003, slug: "noce-split", name: "Noçe Patlatma", quarry: "Denizli Ocağı", image: SLABS_EN[92].image, type: "splitface" },
    { id: 1004, slug: "afyon-grey-split", name: "Afyon Gri Patlatma", quarry: "Afyon Ocağı", image: SLABS_EN[93].image, type: "splitface" }
];

const PROJECTS_EN: Project[] = [
    {
        id: 1,
        name: "Private Villa Interior",
        category: "Residential",
        image: "/images/projects/1.png",
        description: "Modern villa living space featuring elegant Afyon White marble flooring and natural stone fireplace.",
        longDescription: "This contemporary Turkish villa showcases the timeless elegance of Afyon White marble throughout its main living areas. The 180 square meter installation includes polished marble flooring that reflects natural light beautifully, complemented by a custom-designed natural stone fireplace surround using Ottoman Beige marble. The project demonstrates how premium marble can transform a residential space into a sophisticated sanctuary.",
        location: "Çeşme, Turkey",
        year: 2023,
        materials: ["Afyon White", "Ottoman Beige"],
        client: "Private Client",
        featured: true
    },
    {
        id: 2,
        name: "Boutique Hotel Lobby",
        category: "Hospitality",
        image: "/images/projects/2.png",
        description: "Mediterranean-style hotel reception with travertine walls and warm ambient lighting.",
        longDescription: "A charming boutique hotel in Turkey's Aegean coast features 320 square meters of Denizli Travertine throughout its lobby and reception areas. The warm, earthy tones of the travertine create an inviting Mediterranean atmosphere that welcomes guests. The material was selected for its natural beauty and durability in high-traffic hospitality environments.",
        location: "Bodrum, Turkey",
        year: 2023,
        materials: ["Denizli Travertine", "Light Travertine"],
        client: "Aegean Boutique Hotels",
        featured: true
    },
    {
        id: 3,
        name: "Residential Complex Entrance",
        category: "Residential",
        image: "/images/projects/3.png",
        description: "Modern apartment building featuring natural stone cladding and Mediterranean landscaping.",
        longDescription: "This residential complex entrance showcases the versatility of Turkish natural stone in modern architecture. The exterior features carefully selected limestone cladding that provides both aesthetic appeal and weather resistance. Integrated landscaping with olive trees and native plants creates a seamless connection between the built environment and nature.",
        location: "İzmir, Turkey",
        year: 2022,
        materials: ["Classic Limestone", "Anatolian Grey Granite"],
        client: "Sultan Residences",
        featured: true
    },
    {
        id: 4,
        name: "Restaurant Interior",
        category: "Commercial",
        image: "/images/projects/4.png",
        description: "Upscale restaurant with marble bar counter and natural stone accent walls.",
        longDescription: "This elegant restaurant interior features a stunning marble bar counter as its centerpiece, crafted from carefully selected Calacatta-style marble. The natural stone accent wall behind the bar adds texture and warmth to the dining experience. The 85 square meter installation demonstrates how natural stone can elevate commercial spaces.",
        location: "Ankara, Turkey",
        year: 2023,
        materials: ["Afyon White", "Classic Limestone"],
        client: "Private Restaurant Group",
        featured: false
    },
    {
        id: 5,
        name: "Cafe Terrace",
        category: "Hospitality",
        image: "/images/projects/5.png",
        description: "Outdoor cafe with Denizli Travertine flooring and natural stone planters overlooking the coast.",
        longDescription: "This seaside cafe terrace utilizes 150 square meters of tumbled Denizli Travertine to create a rustic yet elegant outdoor dining experience. The natural stone planters crafted from Silver Travertine add Mediterranean charm while the travertine flooring provides slip resistance and stays cool under the summer sun. The project showcases outdoor applications of Turkish natural stone.",
        location: "Kalkan, Turkey",
        year: 2022,
        materials: ["Denizli Travertine", "Silver Travertine"],
        client: "Keyif Bahçesi",
        featured: false
    },
    {
        id: 6,
        name: "Luxury Bathroom Renovation",
        category: "Residential",
        image: "/images/projects/6.png",
        description: "Master bathroom with floor-to-ceiling white marble and brass fixtures.",
        longDescription: "This bathroom renovation project features floor-to-ceiling Afyon White marble installation, creating a spa-like sanctuary in a private residence. The 25 square meter space showcases the beauty of book-matched marble slabs, with elegant brass fixtures providing warm contrast. The project demonstrates SeeMAR's expertise in precision cutting and installation for residential applications.",
        location: "İstanbul, Turkey",
        year: 2024,
        materials: ["Afyon White", "Marmara White"],
        client: "Private Client",
        featured: true
    }
];

const PROJECTS_TR: Project[] = [
    {
        id: 1,
        name: "Özel Villa İç Mekanı",
        category: "Konut",
        image: "/images/projects/1.png",
        description: "Şık Afyon Beyaz mermer zemin ve doğal taş şömine özellikli modern villa yaşam alanı.",
        longDescription: "Bu çağdaş Türk villası, ana yaşam alanlarında Afyon Beyaz mermerinin zamansız zarafetini sergiliyor. 180 metrekarelik kurulum, doğal ışığı güzelce yansıtan cilalı mermer zemin ve Ottoman Bej mermer kullanılarak tasarlanan özel şömine çevresini içeriyor. Proje, premium mermerin bir konut alanını sofistike bir sığınağa nasıl dönüştürebileceğini göstermektedir.",
        location: "Çeşme, Türkiye",
        year: 2023,
        materials: ["Afyon White", "Ottoman Beige"],
        client: "Özel Müşteri",
        featured: true
    },
    {
        id: 2,
        name: "Butik Otel Lobisi",
        category: "Konaklama",
        image: "/images/projects/2.png",
        description: "Traverten duvarlar ve sıcak ambiyans aydınlatmalı Akdeniz tarzı otel resepsiyonu.",
        longDescription: "Türkiye'nin Ege kıyısındaki bu şirin butik otel, lobi ve resepsiyon alanlarında 320 metrekare Denizli Traverten içeriyor. Travertenin sıcak, toprak tonları, misafirleri karşılayan davetkar bir Akdeniz atmosferi yaratıyor. Malzeme, doğal güzelliği ve yüksek trafikli konaklama ortamlarındaki dayanıklılığı nedeniyle seçilmiştir.",
        location: "Bodrum, Türkiye",
        year: 2023,
        materials: ["Denizli Travertine", "Light Travertine"],
        client: "Aegean Boutique Hotels",
        featured: true
    },
    {
        id: 3,
        name: "Konut Kompleksi Girişi",
        category: "Konut",
        image: "/images/projects/3.png",
        description: "Doğal taş kaplama ve Akdeniz peyzajı içeren modern apartman binası.",
        longDescription: "Bu konut kompleksi girişi, modern mimaride Türk doğal taşının çok yönlülüğünü sergiliyor. Dış cephe, hem estetik çekicilik hem de hava koşullarına dayanıklılık sağlayan özenle seçilmiş limra taş kaplama içeriyor. Zeytin ağaçları ve yerli bitkilerle entegre peyzaj, yapılı çevre ile doğa arasında kusursuz bir bağlantı yaratıyor.",
        location: "İzmir, Türkiye",
        year: 2022,
        materials: ["Classic Limestone", "Anatolian Grey Granite"],
        client: "Sultan Residences",
        featured: true
    },
    {
        id: 4,
        name: "Restoran İç Mekanı",
        category: "Ticari",
        image: "/images/projects/4.png",
        description: "Mermer bar tezgahı ve doğal taş aksanlı duvarlarla şık restoran.",
        longDescription: "Bu zarif restoran iç mekanı, özenle seçilmiş Calacatta tarzı mermerden üretilmiş çarpıcı bir mermer bar tezgahını merkez noktası olarak sunuyor. Barın arkasındaki doğal taş aksanlı duvar, yemek deneyimine doku ve sıcaklık katıyor. 85 metrekarelik kurulum, doğal taşın ticari mekanları nasıl yükseltebileceğini göstermektedir.",
        location: "Ankara, Türkiye",
        year: 2023,
        materials: ["Afyon White", "Classic Limestone"],
        client: "Özel Restoran Grubu",
        featured: false
    },
    {
        id: 5,
        name: "Kafe Terası",
        category: "Konaklama",
        image: "/images/projects/5.png",
        description: "Kıyı manzaralı Denizli Traverten zemin ve doğal taş saksılı açık hava kafesi.",
        longDescription: "Bu sahil kafe terası, rustik ama zarif bir açık hava yemek deneyimi yaratmak için 150 metrekare tamburlu Denizli Traverten kullanıyor. Silver Traverten'den üretilen doğal taş saksılar Akdeniz cazibesi katıyor, traverten zemin kaymayı önlüyor ve yaz güneşi altında serin kalıyor. Proje, Türk doğal taşının dış mekan uygulamalarını sergiliyor.",
        location: "Kalkan, Türkiye",
        year: 2022,
        materials: ["Denizli Travertine", "Silver Travertine"],
        client: "Keyif Bahçesi",
        featured: false
    },
    {
        id: 6,
        name: "Lüks Banyo Yenilemesi",
        category: "Konut",
        image: "/images/projects/6.png",
        description: "Yerden tavana beyaz mermer ve pirinç armatürlerle ana banyo.",
        longDescription: "Bu banyo yenileme projesi, özel bir konutta spa benzeri bir sığınak yaratan yerden tavana Afyon Beyaz mermer kurulumu içeriyor. 25 metrekarelik alan, zarif pirinç armatürlerle sıcak kontrast sağlayan kitap eşlemeli mermer plakaların güzelliğini sergiliyor. Proje, SeeMAR'ın konut uygulamaları için hassas kesim ve kurulum uzmanlığını göstermektedir.",
        location: "İstanbul, Türkiye",
        year: 2024,
        materials: ["Afyon White", "Marmara White"],
        client: "Özel Müşteri",
        featured: true
    }
];

const JOBS_EN: Job[] = [
    {
        id: 1,
        title: "General Application",
        category: "All Departments",
        location: "Ankara, Turkey",
        type: "Full Time / Part Time",
        level: "All Levels",
        icon: "group_add",
        description: "Don't see a position that fits? We're always looking for talented individuals to join our team. Share your skills with us.",
        longDescription: "At SeeMAR, we believe that great talent comes in many forms. If you're passionate about natural stone, craftsmanship, or the construction industry but don't see a role that matches your skills, we want to hear from you. Submit your general application and let us know how you can contribute to our mission of delivering premium Turkish stone to the world.",
        responsibilities: [
            "Share your unique skills and experience with our team.",
            "Demonstrate your passion for quality and craftsmanship.",
            "Be open to various roles and opportunities within the company.",
            "Contribute to our collaborative and innovative work environment."
        ],
        qualifications: [
            "Passion for the natural stone industry or related fields.",
            "Strong communication and teamwork skills.",
            "Willingness to learn and grow with the company.",
            "Relevant experience or education in your field of interest."
        ],
        teamDescription: "SeeMAR is a family of dedicated professionals united by our love for natural stone. We value diversity, creativity, and a shared commitment to excellence.",
        teamImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
    }
];

const JOBS_TR: Job[] = [
    {
        id: 1,
        title: "Genel Başvuru",
        category: "Tüm Departmanlar",
        location: "Ankara, Türkiye",
        type: "Tam Zamanlı / Yarı Zamanlı",
        level: "Tüm Seviyeler",
        icon: "group_add",
        description: "Uygun bir pozisyon göremiyor musunuz? Ekibimize katılacak yetenekli bireyler arıyoruz. Yeteneklerinizi bizimle paylaşın.",
        longDescription: "SeeMAR'da harika yeteneklerin pek çok formda geldiğine inanıyoruz. Doğal taş, zanaat veya inşaat sektörü hakkında tutkuluysanz ancak becerilerinize uyan bir rol göremıyorsanız, sizden haber almak istiyoruz. Genel başvurunuzu gönderin ve premium Türk taşını dünyaya ulaştırma misyonumuza nasıl katkıda bulunabileceğinizi bize bildirin.",
        responsibilities: [
            "Benzersiz becerilerinizi ve deneyiminizi ekibimizle paylaşın.",
            "Kalite ve işçiliğe olan tutkunuzu gösterin.",
            "Şirket içindeki çeşitli rollere ve fırsatlara açık olun.",
            "İş birliği ve yenilikçi çalışma ortamımıza katkıda bulunun."
        ],
        qualifications: [
            "Doğal taş endüstrisi veya ilgili alanlara tutku.",
            "Güçlü iletişim ve takım çalışması becerileri.",
            "Şirketle birlikte öğrenme ve büyüme isteği.",
            "İlgi alanınızda ilgili deneyim veya eğitim."
        ],
        teamDescription: "SeeMAR, doğal taşa olan sevgimizle birleşmiş özverili profesyonellerden oluşan bir ailedir. Çeşitliliğe, yaratıcılığa ve mükemmellik için ortak bağlılığa değer veriyoruz.",
        teamImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
    }
];

export const getSlabs = (language: string) => {
    return language === 'tr' ? SLABS_TR : SLABS_EN;
};

export const getProjects = (language: string) => {
    return language === 'tr' ? PROJECTS_TR : PROJECTS_EN;
};

export const getJobs = (language: string) => {
    return language === 'tr' ? JOBS_TR : JOBS_EN;
};

// Helper to find product by slug
export const getSlabBySlug = (language: string, slug: string) => {
    const slabs = getSlabs(language);
    return slabs.find(s => s.slug === slug);
};

// Get all product slugs for sitemap generation
export const getAllProductSlugs = (): string[] => {
    return SLABS_EN.map(s => s.slug);
};