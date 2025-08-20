import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuNavigation from "../features/navigation/MenuNavigation";
import Search from "../features/navigation/SearchNavigation";
import Loader from "../components/ui/Loader";
import { LoaderPinwheel as LoaderIcon } from "lucide-react";
import CartNavigation from "../features/navigation/CartNavigation";

export default function AppLayouts() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const hideElement =
    location.pathname === "/login" ||
    location.pathname === "/cart" ||
    location.pathname === "/checkout" ||
    location.pathname === "/profile" ||
    location.pathname === "/signup";

  const hideMenu = location.pathname === "/payment";

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      {isLoading && <Loader icon={<LoaderIcon />} size={50} fullscreen />}
      <header className="sticky top-0 z-50 py-2 shadow-md bg-white flex items-center justify-between">
        <div className="flex-11/12">{!hideElement && <Search />}</div>
        <div>{!hideElement && <CartNavigation />}</div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="sticky bottom-0 z-50 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] bg-white">
        {!hideMenu && <MenuNavigation />}
      </footer>
    </div>
  );
}
