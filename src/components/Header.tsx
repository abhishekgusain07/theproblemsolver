"use client";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/posts",
        label: "Posts"
    },
    {
        href: "/habits",
        label: "Habits"
    }
]
export interface link {
    href: string
    label: string
}
const adminLinks = {
    href: '/create-post',
    label: "Create Post"
}
const Header = () => {

    const pathName = usePathname()
    const {user} = useUser();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [updatedNavLinks,setUpdatedNavLinks] = useState<link[]>(navLinks)
    useEffect(() => {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim()?.toLowerCase();
        const userEmail = user?.emailAddresses[0]?.emailAddress?.trim()?.toLowerCase();

        if (userEmail === adminEmail) {
            setUpdatedNavLinks([...navLinks, adminLinks]);
            setIsAdmin(true);
        } else {
            setUpdatedNavLinks(navLinks);
            setIsAdmin(false)
        }
    }, [user]);
    return (
        <header className="flex justify-between items-center py-4 px-7 border-b">
            <Link href="/">
                <Image 
                    src="/logo.png"
                    alt="theProblemSolver"
                    height="50"
                    width="50"
                    className="w-[35px] h-[35px]"
                />
            </Link>
            <nav>
                <ul className="flex gap-x-5 text-[14px]">
                    {
                        updatedNavLinks.map((link) => {
                            return <li key={link.href}>
                                <Link  className={`${pathName === link.href ? "text-zinc-900" : "text-zinc-400 "}`} href={link.href}>
                                    {link.label}
                                </Link>
                            </li>
                        })
                    }
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton/>
                    </SignedOut>
                </ul>
            </nav>
        </header>
    )
}

export default Header;