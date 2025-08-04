'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Thoughts', href: '/thoughts' },
  { name: 'About', href: '/about' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-background/80 backdrop-blur-sm transition-colors duration-500">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
             <Link href="/" className="font-header font-bold text-xl text-brand-text hover:text-brand-accent transition-colors duration-300">
              曾德荣
            </Link>
          </div>
          <div className="hidden sm:flex sm:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? 'text-brand-accent font-semibold'
                    : 'text-brand-text/70 hover:text-brand-accent',
                  'font-body text-sm leading-6 transition-colors'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
