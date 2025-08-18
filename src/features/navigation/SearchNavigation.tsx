import Input from "../../components/ui/Input";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  selectSearchTerm,
} from "../../features/product/productSlice";
import type { AppDispatch, RootState } from "../../app/store";

export default function SearchNavigation() {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => selectSearchTerm(state));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="px-4">
      <Input
        placeholder="Search..."
        rightIcon={<Search />}
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}
