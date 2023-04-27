import { Laptop, Moon, SunMedium, Twitter, type Icon as LucideIcon } from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  twitter: Twitter,
  logo: () => <img width={32} height={32} alt="logo" src="/logo.png" className="rounded-full" />,
};
