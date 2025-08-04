"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "项目作品", href: "/projects" },
  { name: "思考感悟", href: "/thoughts" },
  { name: "关于我", href: "/about" },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-card/80 backdrop-blur-md transition-colors duration-500 border-b border-accent-primary/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <Link
              href="/"
              className="font-header font-bold text-xl text-white hover:text-accent-primary transition-colors duration-300"
            >
              曾德荣 认知突触
            </Link>
          </div>
          <div className="hidden sm:flex sm:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? "text-accent-primary font-semibold"
                    : "text-white/70 hover:text-accent-secondary",
                  "font-body text-sm leading-6 transition-colors",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
