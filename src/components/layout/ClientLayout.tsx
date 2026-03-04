"use client";

import { type ReactNode } from "react";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import Loader from "@/components/layout/Loader";

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <SmoothScrollProvider>
            <Loader />
            <Navbar />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
        </SmoothScrollProvider>
    );
}
