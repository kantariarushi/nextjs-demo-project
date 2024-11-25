"use client";

import { useSession } from "next-auth/react";
import MainNavigation from "@/components/layout/main-navigation";  // Assuming the MainNavigation is in this path

export default function NavigationWrapper() {
    const { data: session } = useSession();  // Access session in client-side component

    return session?.user ? <MainNavigation /> : null;  // Only render MainNavigation if the user is logged in
}
