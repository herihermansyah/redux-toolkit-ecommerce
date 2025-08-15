import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice"; // pastikan ini ada

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  // Kalau belum login, redirect ke login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) return null; // Safety

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      {/* Header dengan Logout */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-28 h-28 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Detail Informasi */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alamat */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Alamat</h2>
          <p>{user.address.address}</p>
          <p>
            {user.address.city}, {user.address.state} {user.address.postalCode}
          </p>
          <p>{user.address.country}</p>
        </div>

        {/* Kontak */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Kontak</h2>
          <p>📞 {user.phone}</p>
          <p>🖥️ Username: {user.username}</p>
          <p>💻 IP: {user.ip}</p>
        </div>

        {/* Perusahaan */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Perusahaan</h2>
          <p className="font-medium">{user.company.name}</p>
          <p>{user.company.title}</p>
          <p>Dept: {user.company.department}</p>
          <p>
            {user.company.address.city}, {user.company.address.country}
          </p>
        </div>

        {/* Bank */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Bank</h2>
          <p>💳 {user.bank.cardType}</p>
          <p>No: {user.bank.cardNumber}</p>
          <p>Exp: {user.bank.cardExpire}</p>
          <p>Currency: {user.bank.currency}</p>
        </div>

        {/* Info Tambahan */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Info Lainnya</h2>
          <p>Gender: {user.gender}</p>
          <p>Usia: {user.age}</p>
          <p>Tinggi: {user.height} cm</p>
          <p>Berat: {user.weight} kg</p>
          <p>Golongan Darah: {user.bloodGroup}</p>
          <p>Warna Mata: {user.eyeColor}</p>
          <p>
            Rambut: {user.hair.color} ({user.hair.type})
          </p>
        </div>
      </div>
    </div>
  );
}
