import { MainNav } from '@/components/main-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        {/* <div className="flex flex-1 items-center justify-end space-x-4"></div> */}
      </div>
    </header>
  );
}
