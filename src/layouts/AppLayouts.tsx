import { Outlet } from "react-router-dom";
import MenuNavigation from "../features/navigation/MenuNavigation";
import Search from "../features/navigation/Search";

export default function AppLayouts() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <header className="sticky top-0 z-50  py-2 shadow-md bg-white">
        <Search />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="sticky bottom-0 z-50 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] bg-white">
        <MenuNavigation />
      </footer>
    </div>
  );
}
