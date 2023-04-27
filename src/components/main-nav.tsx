import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { NavItem, siteConfig } from '@/config/site';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <a href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </a>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <a
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </a>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
