export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface MegaMenuSection {
  title: string;
  items: { label: string; href: string; description?: string }[];
}

export const mainNavItems: NavItem[] = [
  { label: 'Personal', href: '/' },
  { label: 'Membership', href: '/membership' },
];

export const secondaryNavItems: NavItem[] = [
  {
    label: 'Checking & Savings',
    href: '/checking-savings'
  },
  {
    label: 'Credit Cards',
    href: '/credit-cards'
  },
  {
    label: 'Loans',
    href: '/auto-loans'
  },
  {
    label: 'Payment History',
    href: '/payment-history'
  },
];

export const footerLinks: { main: { label: string; href: string }[]; secondary: { label: string; href: string }[] } = {
  main: [
    { label: 'About Us', href: '/about' },
    { label: 'Current Rates', href: '#' },
    { label: 'Contact Us', href: '/contact' },
  ],
  secondary: [],
};

