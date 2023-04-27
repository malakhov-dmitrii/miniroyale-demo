export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  comingSoon?: boolean;
}

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: 'Star Wars Demo',
  description: 'Demo app for Star Wars API',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
  ],
};
