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
      slug: "wood-blinds",
      name: "Модон хөшиг / Wood Blind",
      price: null,
      compareAt: null,
      category: "wood-blinds",
      categoryLabel: "Модон хөшиг",
      colors: ["Байгалийн модон", "Хар бор", "Цайвар бор"],
      sizes: ["Захиалгаар"],
      materials: ["Хулс", "Мод"],
      colorTags: ["brown", "natural"],
      images: [
        img("website/wood.jpg"),
        img("website/wooden/images (2).jpg"),
        img("website/np/wood.jpg"),
      ],
      rating: 4.9,
      reviewCount: 142,
      popularity: 98,
      addedAt: "2026-01-10",
      isNew: true,
      description:
        "Модон хөшгийг хулсан болон халуун орны модоор гэсэн 2 төрлийн материалаар үйлдвэрлэдэг. Модон хөшиг нь өрөөний интерьертэй зохицож чадвал хамгийн тансаг хөшиг болж чадна.",
      reviews: []
    },
    {
      id: 2,
      slug: "zebra-blinds",
      name: "Давхар хөшиг / Zebra Blind",
      price: null,
      compareAt: null,
      category: "zebra-blinds",
      categoryLabel: "Давхар хөшиг",
      colors: ["Цагаан", "Саарал", "Шаргал"],
      sizes: ["Захиалгаар"],
      materials: ["Тор", "Даавуу"],
      colorTags: ["white", "gray", "neutral"],
      images: [
        img("website/zb.jpg"),
        img("website/np/zb.jpg"),
        img("website/np/zb1.jpg")
        
      ],
      rating: 4.8,
      reviewCount: 235,
      popularity: 97,
      addedAt: "2026-01-12",
      isNew: false,
      description:
        "Давхар хөшиг нь утасан тор болон даавуун хослол юм. Агаар салхийг хүссэнээрээ нэвтрүүлэх онцлогтой (Нээх, хаах, ихэсгэх, багасгах). Гэрлийг 40-100% хүртэл бууруулах боломжтой. Шинэ загварын төгс шийдэл.",
      reviews: []
    },
    {
      id: 3,
      slug: "vertical-blinds",
      name: "Туузан хөшиг / Vertical Blind",
      price: null,
      compareAt: null,
      category: "vertical-blinds",
      categoryLabel: "Туузан хөшиг",
      colors: ["Цагаан", "Тунгалаг саарал"],
      sizes: ["Захиалгаар"],
      materials: ["Синтетик даавуу"],
      colorTags: ["white", "gray"],
      images: [
        img("website/vb.jpg"),
        img("website/np/vb.jpg"),
        img("website/np/vb1.jpg"),
        img("website/np/vb2.jpg")
      ],
      rating: 4.6,
      reviewCount: 98,
      popularity: 84,
      addedAt: "2025-11-15",
      isNew: false,
      description:
        "Туузан хөшиг бол дээрээс доош унжих олон тооны туузнаас бүрдэх хөшиг юм. Материалын маш өргөн сонголттой. Хэрэв та томоохон хэмжээтэй цонхонд хөшиг сонгох гэж байгаа бол хамгийн зөв сонголт бол ТУУЗАН хөшиг.",
      reviews: []
    },
    {
      id: 4,
      slug: "verman-blinds",
      name: "Верман хөшиг / Verman Blind",
      price: null,
      compareAt: null,
      category: "verman-blinds",
      categoryLabel: "Верман хөшиг",
      colors: ["Элсэн шаргал", "Зөөлөн цагаан"],
      sizes: ["Захиалгаар"],
      materials: ["Тор нарийн даавуу"],
      colorTags: ["neutral", "white"],
      images: [
        img("website/ver.jpg"),
        img("website/np/ver.jpg"),
        img("website/np/ver1.jpg"),
        img("website/np/ver2.jpg")
      ],
      rating: 4.7,
      reviewCount: 64,
      popularity: 89,
      addedAt: "2026-02-05",
      isNew: true,
      description:
        "Верман хөшиг нь давхар хөшигтэй ажиллах зарчим нь ижил. Хийц дизайны хувьд өвөрмөц, содон нь гайхалтай. Агаар салхийг хүссэнээрээ нэвтрүүлэх онцлогтой (Нээх, хаах, ихэсгэх, багасгах). Гэрлийг 40-75% хүртэл бууруулах боломжтой. Шинэ загварын төгс шийдэл.",
      reviews: []
    },
    {
      id: 5,
      slug: "aluminum-venetian-blinds",
      name: "Металл жалюзан хөшиг / Aluminum Venetian Blind",
      price: null,
      compareAt: null,
      category: "aluminum-blinds",
      categoryLabel: "Металл жалюзан хөшиг",
      colors: ["Мөнгөлөг", "Металл саарал", "Цагаан"],
      sizes: ["Захиалгаар"],
      materials: ["Хөнгөн цагаан металл"],
      colorTags: ["gray", "white"],
      images: [
        img("website/al.jpg"),
        img("website/np/j.jpg"),
        img("website/np/j1.jpg")
      ],
      rating: 4.5,
      reviewCount: 112,
      popularity: 79,
      addedAt: "2025-10-20",
      isNew: false,
      description:
        "Энэ төрлийн хөшигний үндсэн материал нь хөнгөн цагаан бөгөөд овор хэмжээ багатай, өвөрмөц загвартай. Жалюзан хөшиг нарны гэрлийн шууд тусгалыг хаах боловч орчныг хаалтгүй ажиллагаатай. Эдгээр хөшигний бүтэц бол хөндлөн байрлалтай олон тооны металл туузнаас бүрдэнэ. Жалюзан хөшигөөр өрөөнд орох гэрлийг тусгалыг хүссэнээр өөрчлөх бүрэн боломжтой. Материалын сонголтын хувьд чанар, өнгө үзэмж, дизайнаас хамааран маш өргөн сонголттой.",
      reviews: []
    },
    {
      id: 6,
      slug: "shangrila-blinds",
      name: "Шангри-Ла хөшиг / Shangrila Blind",
      price: null,
      compareAt: null,
      category: "shangrila-blinds",
      categoryLabel: "Шангри-Ла хөшиг",
      colors: ["Тансаг цагаан", "Алтан шаргал"],
      sizes: ["Захиалгаар"],
      materials: ["Тюль", "Голын даавуун материал"],
      colorTags: ["white", "neutral"],
      images: [
        img("website/sh.jpg"),
        img("website/np/sh.jpg"),
        img("website/np/sh1.jpg"),
      ],
      rating: 4.9,
      reviewCount: 81,
      popularity: 93,
      addedAt: "2026-02-10",
      isNew: true,
      description:
        "Шангри-Ла хөшиг нь хоёр талдаа тюль бүхий тасалгаатай. Тюльн тасалгааны голын даавуун материал нь нээгдэж хаагдах зарчмаар ажилладаг. Хийц дизайны хувьд өвөрмөц содон. Агаар салхийг хүссэнээрээ нэвтрүүлэх онцлогтой (Нээх, хаах, ихэсгэх, багасгах). Гэрлийг 40-75% хүртэл бууруулах боломжтой. Шинэ загварын төгс шийдэл.",
      reviews: []
    },
    {
      id: 7,
      slug: "roller-blinds",
      name: "Хуйлдаг хөшиг / Roller Blind",
      price: null,
      compareAt: null,
      category: "roller-blinds",
      categoryLabel: "Хуйлдаг хөшиг",
      colors: ["Цагаан", "Саарал", "Шаргал", "Хөх"],
      sizes: ["Захиалгаар"],
      materials: ["Битүү полиэстер даавуу"],
      colorTags: ["white", "gray", "neutral"],
      images: [
        img("website/roll.jpg"),
        img("website/np/roller.jpg"),
        img("website/np/roller1.jpg"),
      ],
      rating: 4.7,
      reviewCount: 304,
      popularity: 95,
      addedAt: "2025-08-18",
      isNew: false,
      description:
        "Хуйлдаг хөшиг бол дээрээс доош буух зарчмаар ажилладаг. Ажиллагааны 3 янзын сонголттой: Гараар дээш доош болгох (3 төрлийн тоног), Гараар доош болгож, автоматаар дээш хураах (3 төрлийн пүрш), Алсын удирдлагаар ажиллуулах бүрэн автомат. Хаана ч ямар ч өрөө тасалгааны тохижилттой зохицож чаддаг найдвартай хөнгөн гайхамшигт хөшиг юм. Материалын сонголт маш ихтэй тул үйлдвэрийн байранд ирж үзэх эсвэл дуудлага өгч каталогоос сонголт хийж болно.",
      reviews: []
    },
    {
      id: 8,
      slug: "bamboo-blinds",
      name: "Хулсан хөшиг / Bamboo Blind",
      price: null,
      compareAt: null,
      category: "bamboo-blinds",
      categoryLabel: "Хулсан хөшиг",
      colors: ["Байгалийн хулсан өнгө"],
      sizes: ["Захиалгаар"],
      materials: ["Цэвэр хулс мод"],
      colorTags: ["brown", "natural"],
      images: [
        img("website/bam.jpg"),
        img("website/np/bam.jpg"),
      ],
      rating: 4.6,
      reviewCount: 52,
      popularity: 77,
      addedAt: "2025-09-01",
      isNew: false,
      description:
        "Хулсан хөшигний мод нь цэвэр хувьд хөнгөн. Дээрээс доош буух зарчмаар ажилладаг. Цэвэр байгалийн бүтээгдэхүүн юм.",
      reviews: []
    }

  ];

  window.LUMINA_getProductById = function (id) {
    const n = Number(id);
    return window.LUMINA_PRODUCTS.find((p) => p.id === n) || null;
  };

  window.LUMINA_getProductBySlug = function (slug) {
    return window.LUMINA_PRODUCTS.find((p) => p.slug === slug) || null;
  };
})();
