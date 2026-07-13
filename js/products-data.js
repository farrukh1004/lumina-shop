/**
 * Product catalog — curtains & blinds demo data
 * Loaded before page scripts; exposes window.LUMINA_PRODUCTS
 */
(function () {
  /**
   * Local image path relative to the site root (lumina-atelier/).
   * Put files in the website/ folder, then reference like: img("website/roller/photo.jpg")
   * Use forward slashes. Spaces in filenames are OK.
   */
  const img = (relativePath) =>
    relativePath
      .replace(/\\/g, "/")
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/");

  window.LUMINA_CATEGORIES = [
    { id: "double-curtains", label: "Давхар хөшиг" },
    { id: "wooden-blinds", label: "Модон жалюзи" },
    { id: "venetian-blinds", label: "Жалюзи" },
    { id: "motorized-curtains", label: "Автомат хөшиг" },
    { id: "roller-blinds", label: "Роллер хөшиг" },
  ];

  window.LUMINA_PRODUCTS = [
    {
      id: 1,
      slug: "aurora-linen-drape",
      name: "Аврора маалинган хөшиг",
      price: 189,
      compareAt: 229,
      category: "double-curtains",
      categoryLabel: "Давхар хөшиг",
      colors: ["Зааны ясан", "Элсэн", "Саарал"],
      sizes: ['W100 × L220 cm', 'W140 × L250 cm', 'W180 × L270 cm'],
      materials: ["Маалинган даавуу"],
      colorTags: ["neutral", "white", "gray"],
      images: [
        img("website/download.webp"),
      ],
      rating: 4.8,
      reviewCount: 124,
      popularity: 96,
      addedAt: "2026-01-12",
      isNew: true,
      description:
        "Зөөлөн, байгалийн гэрлийг шүүдэг давхар хөшиг. Зочны өрөөнд дулаан уур амьсгал бүрдүүлэхэд тохиромжтой. Хөшигний уяа болон зэвэнд тэсвэртэй цагирагтай.",
      reviews: [
        { author: "Maya K.", rating: 5, text: "Маш гоё бүтэцтэй, төгс унждаг.", date: "2026-03-02" },
        { author: "James R.", rating: 5, text: "Бидний хүссэн тайван өнгө төрх яг мөн байна.", date: "2026-02-18" },
      ],
    },
    {
      id: 2,
      slug: "noir-velvet-panel",
      name: "Noir хилэн хөшиг",
      price: 249,
      compareAt: null,
      category: "double-curtains",
      categoryLabel: "Давхар хөшиг",
      colors: ["Нүүрсэн саарал", "Мокка", "Ойн ногоон"],
      sizes: ['W120 × L240 cm', 'W160 × L260 cm'],
      materials: ["Хөвөн хилэн"],
      colorTags: ["dark", "green", "brown"],
      images: [
        img("website/images (1).jpg"),
      ],
      rating: 4.9,
      reviewCount: 89,
      popularity: 91,
      addedAt: "2025-11-03",
      isNew: false,
      description:
        "Тансаг хилэн материалтай хөшиг. Унтлагын болон кино үзэх өрөөнд тохиромжтой. Гэрэл хаах давхаргатай бөгөөд дулаан хадгална.",
      reviews: [
        { author: "Elena V.", rating: 5, text: "Үнэхээр тансаг мэдрэмж төрүүлдэг. Үнэ цэнээ бүрэн хангана.", date: "2026-01-08" },
      ],
    },
    {
      id: 3,
      slug: "breeze-sheer-voile",
      name: "Breeze тунгалаг хөшиг",
      price: 98,
      compareAt: 118,
      category: "double-curtains",
      categoryLabel: "Давхар хөшиг",
      colors: ["Сувдан", "Маалинган", "Манан"],
      sizes: ['W100 × L220 cm', 'W140 × L250 cm'],
      materials: ["Полиэстер вуаль"],
      colorTags: ["white", "neutral", "gray"],
      images: [
        img("website/images.jpg"),
      ],
      rating: 4.6,
      reviewCount: 210,
      popularity: 88,
      addedAt: "2025-09-20",
      isNew: false,
      description:
        "Хөнгөн тунгалаг хөшиг нь өдрийн гэрлийг зөөлрүүлж, гаднах үзэмжийг хадгална. Саваа эсвэл далд бэхэлгээгээр суурилуулах боломжтой.",
      reviews: [
        { author: "Priya S.", rating: 4, text: "Маш хөнгөн, үнэхээр гоё.", date: "2025-12-01" },
      ],
    },
    {
      id: 4,
      slug: "solstice-roller-blackout",
      name: "Solstice гэрэл бүрэн хаадаг роллер хөшиг",
      price: 156,
      compareAt: 176,
      category: "roller-blinds",
      categoryLabel: "Роллер хөшиг",
      colors: ["Цагаан", "Чулуун саарал", "Хар"],
      sizes: ['W60–120 cm', 'W121–180 cm', 'W181–240 cm'],
      materials: ["Полиэстер", "Хөнгөн цагаан зам"],
      colorTags: ["white", "gray", "dark"],
      images: [
        img("website/roller/download.webp"),
      ],
      rating: 4.7,
      reviewCount: 342,
      popularity: 99,
      addedAt: "2026-02-01",
      isNew: true,
      description:
        "Утасгүй ажиллагаатай, гэрлийг бүрэн хаадаг роллер хөшиг. Хүүхдэд аюулгүй бөгөөд маш чимээгүй ажиллана.",
      reviews: [
        { author: "Tom W.", rating: 5, text: "Манай хүүхдийн өрөөг бүрэн харанхуй болгож чадсан.", date: "2026-03-10" },
      ],
    },
    {
      id: 5,
      slug: "haze-filter-roller",
      name: "Haze гэрэл шүүдэг роллер хөшиг",
      price: 132,
      compareAt: null,
      category: "roller-blinds",
      categoryLabel: "Роллер хөшиг",
      colors: ["Овъёос", "Тагтаан саарал", "Далайн ногоон"],
      sizes: ['W60–120 cm', 'W121–180 cm'],
      materials: ["Полиэстер"],
      colorTags: ["neutral", "green"],
      images: [
        img("website/roller/images.jpg"),
      ],
      rating: 4.5,
      reviewCount: 156,
      popularity: 82,
      addedAt: "2025-10-15",
      isNew: false,
      description:
        "Хурц нарны гэрлийг шүүж, өрөөг гэрэлтэй хэвээр хадгална. Гал тогоо зэрэг өрөөнд цэвэрлэхэд хялбар гадаргуутай.",
      reviews: [],
    },
    {
      id: 6,
      slug: "atelier-roman-fold",
      name: "Atelier Ром хөшиг",
      price: 278,
      compareAt: 310,
      category: "wooden-blinds",
      categoryLabel: "Модон жалюзи",
      colors: ["Цайвар шаргал", "Бор шаргал", "Шөнийн хөх"],
      sizes: ['W80–140 cm', 'W141–200 cm'],
      materials: ["Маалинган-хөвөн", "Хулсан хавтан"],
      colorTags: ["neutral", "brown", "dark"],
      images: [
        img("website/wooden/images (2).jpg"),
        img("website/wooden/images (2).jpg"),
      ],
      rating: 4.9,
      reviewCount: 67,
      popularity: 90,
      addedAt: "2026-01-28",
      isNew: true,
      description:
        "Зөөлөн дотор давхаргатай, цэвэрхэн эвхэгддэг Ром загварын хөшиг. Орчин үеийн интерьерт төгс зохицоно.",
      reviews: [
        {
          author: "Claire D.",
          rating: 5,
          text: "Маш цэвэрхэн, гоёмсог харагддаг. Найзууд маань хаанаас авсныг байнга асуудаг.",
          date: "2026-02-22"
        },
      ],
    },
    {
      id: 7,
      slug: "loft-roman-minimal",
      name: "Loft Минимал Ром хөшиг",
      price: 235,
      compareAt: null,
      category: "wooden-blinds",
      categoryLabel: "Модон жалюзи",
      colors: ["Ясан цагаан", "Бал чулуун саарал"],
      sizes: ['W80–140 cm', 'W141–200 cm'],
      materials: ["Хөвөн"],
      colorTags: ["white", "gray"],
      images: [
        img("website/wooden/images.jpg"),
        img("website/wooden/images.jpg"),
      ],
      rating: 4.6,
      reviewCount: 54,
      popularity: 76,
      addedAt: "2025-08-11",
      isNew: false,
      description:
        "Далд механизмтай минимал Ром хөшиг. Цэвэрхэн, энгийн харагдах байдлыг бий болгоно.",
      reviews: [],
    },
    {
      id: 8,
      slug: "vertex-vertical-office",
      name: "Vertex Босоо жалюзи",
      price: 198,
      compareAt: 218,
      category: "venetian-blinds",
      categoryLabel: "Жалюзи",
      colors: ["Алебастер", "Хайрган саарал", "Карбон хар"],
      sizes: ['W150–300 cm', 'W301–400 cm'],
      materials: ["PVC агуулаагүй хавтан", "Ган зам"],
      colorTags: ["white", "gray", "dark"],
      images: [
        img("website/vs/images (1).jpg"),
        img("website/vs/images (1).jpg"),
      ],
      rating: 4.4,
      reviewCount: 201,
      popularity: 85,
      addedAt: "2025-12-05",
      isNew: false,
      description:
        "Чимээгүй ажиллагаатай босоо жалюзи. Том шилэн цонх болон тагтны хаалганд тохиромжтой.",
      reviews: [
        {
          author: "Omar F.",
          rating: 4,
          text: "Манай студийн цонхонд маш сайн тохирсон.",
          date: "2026-01-14"
        },
      ],
    },
    {
      id: 9,
      slug: "slate-vertical-textile",
      name: "Slate Даавуун босоо жалюзи",
      price: 224,
      compareAt: null,
      category: "venetian-blinds",
      categoryLabel: "Жалюзи",
      colors: ["Манан", "Какао"],
      sizes: ['W150–300 cm'],
      materials: ["Нэхмэл даавуу"],
      colorTags: ["gray", "brown"],
      images: [
        img("website/vs/images.jpg"),
        img("website/vs/images.jpg"),
      ],
      rating: 4.7,
      reviewCount: 44,
      popularity: 72,
      addedAt: "2025-07-22",
      isNew: false,
      description:
        "Даавуун босоо жалюзи нь дуу чимээг бага зэрэг шингээж, уламжлалт PVC материалаас илүү тав тухтай мэдрэмж төрүүлнэ.",
      reviews: [],
    },
    {
      id: 10,
      slug: "bespoke-arch-window",
      name: "Захиалгат автомат хөшиг",
      price: 0,
      compareAt: null,
      consultationOnly: true,
      category: "motorized-curtains",
      categoryLabel: "Автомат хөшиг",
      colors: ["Дизайнер өнгөний сонголт"],
      sizes: ["Захиалгын хэмжээ"],
      materials: ["Таны сонголтоор"],
      colorTags: ["custom"],
      images: [
        img("website/moto/images.jpg"),
        img("website/moto/images (2).jpg"),
      ],
      rating: 5,
      reviewCount: 31,
      popularity: 70,
      addedAt: "2026-03-01",
      isNew: true,
      description:
        "Манай мэргэжлийн баг тусгай хэмжээтэй цонх, автомат систем болон олон давхар шийдлийг захиалгаар хийдэг. Зөвлөгөөнд материалын сонголт болон 3D загвар багтана.",
      reviews: [
        {
          author: "Helena P.",
          rating: 5,
          text: "Манай булан цонхны асуудлыг маш сайхан шийдэж өгсөн.",
          date: "2026-03-28"
        },
      ],
    },

  ];

  window.LUMINA_getProductById = function (id) {
    const n = Number(id);
    return window.LUMINA_PRODUCTS.find((p) => p.id === n) || null;
  };

  window.LUMINA_getProductBySlug = function (slug) {
    return window.LUMINA_PRODUCTS.find((p) => p.slug === slug) || null;
  };
})();