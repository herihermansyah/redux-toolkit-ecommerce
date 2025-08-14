import { Link } from "react-router-dom";

type IconType = {
  id: number;
  name: string;
  path: string;
  iconClass: string;
  iconName: string;
};

const menuIcon: IconType[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
    iconClass: "material-symbols-outlined",
    iconName: "home",
  },
  {
    id: 2,
    name: "Product",
    path: "product",
    iconClass: "material-symbols-outlined",
    iconName: "storefront",
  },
  {
    id: 3,
    name: "Category",
    path: "category",
    iconClass: "material-symbols-outlined",
    iconName: "apps",
  },
  {
    id: 4,
    name: "Wishlist",
    path: "wishlist",
    iconClass: "material-symbols-outlined",
    iconName: "favorite",
  },
  {
    id: 5,
    name: "Profile",
    path: "profile",
    iconClass: "material-symbols-outlined",
    iconName: "person",
  },
];

function MenuItem({ item }: { item: IconType }) {
  return (
    <li className="flex-1">
      <Link
        to={item.path}
        className="flex flex-col items-center justify-center text-sm font-medium"
      >
        <span
          className={`hover:bg-black hover:text-white rounded-sm p-1 transition-all duration-200 ease-in-out ${item.iconClass}`}
          aria-hidden="true"
        >
          {item.iconName}
        </span>
        <span>{item.name}</span>
      </Link>
    </li>
  );
}

export default function MenuNavigation() {
  return (
    <nav aria-label="Main menu navigation">
      <ul className="flex justify-between">
        {menuIcon.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
