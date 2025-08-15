import Button from "../components/ui/Button";
import { useState } from "react";
import { Trash, Search } from "lucide-react";
import Input from "../components/ui/Input";

export default function Home() {
  const [loading, setLoading] = useState(false); // ✅ bikin state

  const handleClick = () => {
    setLoading(true); // aktifkan loading
  };

  return (
    <div className="px-4">
      <h1>halaman home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quod?
      </p>
      <Button
        onClick={handleClick}
        rightIcon={<Trash size={16} />}
        size="sm"
        variant="danger"
        isLoading={loading}
      >
        herman
      </Button>

      <div>
        <Input label="herman" rightIcon={<Search />} />
      </div>
    </div>
  );
}
