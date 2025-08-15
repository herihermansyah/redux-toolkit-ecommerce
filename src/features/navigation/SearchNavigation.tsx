import Input from "../../components/ui/Input";
import { Search } from "lucide-react";

export default function SearchNavigation() {
  return (
    <div className="px-4">
      <Input placeholder="search...." rightIcon={<Search />} />
    </div>
  );
}
