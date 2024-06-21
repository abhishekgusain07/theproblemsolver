"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/posts",
        label: "Posts"
    }
]
const Header = () => {

    const pathName = usePathname()
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
                        navLinks.map((link) => {
                            return <li key={link.href}>
                                <Link  className={`${pathName === link.href ? "text-zinc-900" : "text-zinc-400 "}`} href={link.href}>
                                    {link.label}
                                </Link>
                            </li>
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;