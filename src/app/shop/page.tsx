import { Suspense } from "react";
import ShopPage from "@/components/shop/ShopPage";

export const metadata = {
    title: "Shop Jewellery | Kivyaa Jewels",
    description:
        "Explore our curated collection of luxury rings, necklaces, earrings, and bracelets. Handcrafted with precision and passion.",
};

export default function Shop() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border border-gold-500/30 rounded-full animate-spin border-t-gold-500" />
                </div>
            }
        >
            <ShopPage />
        </Suspense>
    );
}
