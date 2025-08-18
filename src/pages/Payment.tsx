import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 3000);
  return (
    <div className="container mx-auto flex flex-col mt-[30%] items-center">
      <span className="w-20 h-20 border-red-700 border-4 rounded-full border-t-transparent border-r-transparent animate-spin mb-10"></span>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="font-semibold">Pembayaran via Rekening:</p>
        <p>a/n Herman</p>
        <p>No Rek: 1010101010</p>
        <p>Bank: Redux Bank</p>
      </div>
      <p className="capitalize mt-4 ">Maintenance</p>
    </div>
  );
};

export default Payment;
