// Seed product data for the jewellery store
// This acts as our data source until backend is connected

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    categorySlug: string;
    featured: boolean;
    isNew: boolean;
    inStock: boolean;
    material: string;
    weight: string;
    rating: number;
    reviews: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
}

export const categories: Category[] = [
    {
        id: "cat-1",
        name: "Rings",
        slug: "rings",
        description: "Handcrafted rings that capture timeless elegance",
        image: "/images/categories/rings.png",
    },
    {
        id: "cat-2",
        name: "Necklaces",
        slug: "necklaces",
        description: "Luxurious necklaces for every occasion",
        image: "/images/categories/necklaces.png",
    },
    {
        id: "cat-3",
        name: "Earrings",
        slug: "earrings",
        description: "Statement earrings that elevate your style",
        image: "/images/categories/earrings.png",
    },
    {
        id: "cat-4",
        name: "Bracelets",
        slug: "bracelets",
        description: "Elegant bracelets for the modern woman",
        image: "/images/categories/bracelets.png",
    },
];

export const products: Product[] = [
    {
        id: "prod-1",
        name: "Celestine Diamond Ring",
        slug: "celestine-diamond-ring",
        description: "A breathtaking solitaire ring featuring a 1.5-carat brilliant-cut diamond set in 18K rose gold. The delicate band is adorned with micro-pavé diamonds, creating an ethereal glow that captures light from every angle.",
        price: 185000,
        originalPrice: 210000,
        images: ["/images/products/ring-1.png", "/images/products/ring-1-alt.png"],
        category: "Rings",
        categorySlug: "rings",
        featured: true,
        isNew: true,
        inStock: true,
        material: "18K Rose Gold, Diamond",
        weight: "4.2g",
        rating: 4.9,
        reviews: 47,
    },
    {
        id: "prod-2",
        name: "Aurelia Gold Necklace",
        slug: "aurelia-gold-necklace",
        description: "An exquisite 22K gold necklace with a cascading pendant design inspired by Art Deco architecture. Features hand-engraved detailing and a natural pearl accent.",
        price: 245000,
        images: ["/images/products/necklace-1.png", "/images/products/necklace-1-alt.png"],
        category: "Necklaces",
        categorySlug: "necklaces",
        featured: true,
        isNew: false,
        inStock: true,
        material: "22K Gold, Pearl",
        weight: "18.5g",
        rating: 4.8,
        reviews: 32,
    },
    {
        id: "prod-3",
        name: "Seraphina Drop Earrings",
        slug: "seraphina-drop-earrings",
        description: "Graceful chandelier earrings crafted in 18K white gold, featuring a waterfall of brilliant-cut diamonds. These statement pieces move with fluid elegance.",
        price: 156000,
        originalPrice: 175000,
        images: ["/images/products/earring-1.png", "/images/products/earring-1-alt.png"],
        category: "Earrings",
        categorySlug: "earrings",
        featured: true,
        isNew: true,
        inStock: true,
        material: "18K White Gold, Diamond",
        weight: "8.3g",
        rating: 4.9,
        reviews: 61,
    },
    {
        id: "prod-4",
        name: "Versailles Cuff Bracelet",
        slug: "versailles-cuff-bracelet",
        description: "A bold yet refined cuff bracelet in polished 22K gold, featuring an intricate filigree pattern inspired by the gardens of Versailles. A masterpiece of artisan craftsmanship.",
        price: 198000,
        images: ["/images/products/bracelet-1.png", "/images/products/bracelet-1-alt.png"],
        category: "Bracelets",
        categorySlug: "bracelets",
        featured: true,
        isNew: false,
        inStock: true,
        material: "22K Gold",
        weight: "32.1g",
        rating: 4.7,
        reviews: 28,
    },
    {
        id: "prod-5",
        name: "Luna Crescent Ring",
        slug: "luna-crescent-ring",
        description: "A contemporary ring design featuring a crescent moon motif set with sapphires and diamonds in 18K yellow gold. A celestial piece for the modern woman.",
        price: 92000,
        images: ["/images/products/ring-2.png"],
        category: "Rings",
        categorySlug: "rings",
        featured: false,
        isNew: true,
        inStock: true,
        material: "18K Yellow Gold, Sapphire, Diamond",
        weight: "3.8g",
        rating: 4.6,
        reviews: 19,
    },
    {
        id: "prod-6",
        name: "Ophelia Pearl Necklace",
        slug: "ophelia-pearl-necklace",
        description: "A timeless strand of South Sea pearls, each hand-selected for its lustre and uniformity. Finished with an 18K gold clasp adorned with a single diamond.",
        price: 325000,
        images: ["/images/products/necklace-2.png"],
        category: "Necklaces",
        categorySlug: "necklaces",
        featured: false,
        isNew: false,
        inStock: true,
        material: "South Sea Pearl, 18K Gold, Diamond",
        weight: "42.0g",
        rating: 5.0,
        reviews: 15,
    },
    {
        id: "prod-7",
        name: "Aria Hoop Earrings",
        slug: "aria-hoop-earrings",
        description: "Modern oversized hoops crafted in 18K gold with a brushed matte finish. The interior features a hidden row of tiny diamonds that catch the light as you move.",
        price: 78000,
        images: ["/images/products/earring-2.png"],
        category: "Earrings",
        categorySlug: "earrings",
        featured: false,
        isNew: true,
        inStock: true,
        material: "18K Gold, Diamond",
        weight: "6.2g",
        rating: 4.8,
        reviews: 44,
    },
    {
        id: "prod-8",
        name: "Empress Tennis Bracelet",
        slug: "empress-tennis-bracelet",
        description: "A classic tennis bracelet reimagined with alternating round and emerald-cut diamonds in a platinum setting. Total diamond weight: 5.2 carats.",
        price: 450000,
        images: ["/images/products/bracelet-2.png"],
        category: "Bracelets",
        categorySlug: "bracelets",
        featured: true,
        isNew: false,
        inStock: true,
        material: "Platinum, Diamond",
        weight: "15.8g",
        rating: 5.0,
        reviews: 22,
    },
    {
        id: "prod-9",
        name: "Athena Cocktail Ring",
        slug: "athena-cocktail-ring",
        description: "A showstopping cocktail ring featuring a 3-carat oval emerald surrounded by a double halo of diamonds, set in 18K white gold.",
        price: 278000,
        images: ["/images/products/ring-3.png"],
        category: "Rings",
        categorySlug: "rings",
        featured: true,
        isNew: false,
        inStock: true,
        material: "18K White Gold, Emerald, Diamond",
        weight: "6.5g",
        rating: 4.9,
        reviews: 37,
    },
    {
        id: "prod-10",
        name: "Riviera Layered Necklace",
        slug: "riviera-layered-necklace",
        description: "A set of three delicate chains in varying lengths, each featuring a different pendant — a star, a crescent, and a teardrop — in 18K gold with diamond accents.",
        price: 135000,
        images: ["/images/products/necklace-3.png"],
        category: "Necklaces",
        categorySlug: "necklaces",
        featured: false,
        isNew: true,
        inStock: true,
        material: "18K Gold, Diamond",
        weight: "9.3g",
        rating: 4.7,
        reviews: 53,
    },
    {
        id: "prod-11",
        name: "Florentine Stud Earrings",
        slug: "florentine-stud-earrings",
        description: "Elegant floral-inspired studs featuring a cluster of rose-cut diamonds set in 18K rose gold. Timeless sophistication for everyday wear.",
        price: 62000,
        images: ["/images/products/earring-3.png"],
        category: "Earrings",
        categorySlug: "earrings",
        featured: false,
        isNew: false,
        inStock: true,
        material: "18K Rose Gold, Diamond",
        weight: "3.1g",
        rating: 4.8,
        reviews: 71,
    },
    {
        id: "prod-12",
        name: "Byzantine Chain Bracelet",
        slug: "byzantine-chain-bracelet",
        description: "A substantial chain bracelet in 22K gold featuring the classic Byzantine weave pattern. Each link is individually hand-forged for exceptional quality.",
        price: 168000,
        images: ["/images/products/bracelet-3.png"],
        category: "Bracelets",
        categorySlug: "bracelets",
        featured: false,
        isNew: false,
        inStock: true,
        material: "22K Gold",
        weight: "28.4g",
        rating: 4.6,
        reviews: 18,
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
    return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured);
}

export function getNewProducts(): Product[] {
    return products.filter((p) => p.isNew);
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
}
