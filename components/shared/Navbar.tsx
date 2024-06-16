"use client";
import {
  Home,
  LineChart,
  History,
  Files,
  Inbox,
  Contact,
  Wrench,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarItems = [
  { name: "Dashboard", path: "/dashboard", iconSrc: <Home /> },
  { name: "Content Library", path: "/contentLibrary", iconSrc: <Files /> },
  { name: "History", path: "/history", iconSrc: <History /> },
  { name: "Analytics", path: "/analytics", iconSrc: <LineChart /> },
  {
    name: "Subreddit Manager",
    path: "/subredditManager",
    iconSrc: <Contact />,
  },
  { name: "Toolbox", path: "/toolbox", iconSrc: <Wrench /> },
  { name: "Inbox", path: "/inbox", iconSrc: <Inbox /> },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <nav className="p-5 bg-black text-white">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">Redditly</p>
        </div>
        <div>
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <ul className="mt-6 space-y-3">
                {navbarItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={item.path}>
                        <button
                          className={`w-full justify-start flex gap-2 items-center text-black  px-3 py-2 rounded-lg ${
                            item.path === pathname ? "bg-[FFA62F] hover:bg-[FFC96F]" : ""
                          }`}
                        >
                          {item.iconSrc}
                          {item.name}
                        </button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
