// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { logout, updateProfile } from "../../features/auth/authSlice";
import type { User } from "../../features/auth/types";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Edit2, Save, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user as User);
  const [loading, setLoading] = useState(false); // ✅ loading save & logout

  const navigate = useNavigate();

  // 🔹 Redirect ke login otomatis kalau user null
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Silakan login dulu
      </div>
    );

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
      setLoading(false);
    }, 300);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(updateProfile(formData));
      setEditing(false);
      setLoading(false);
    }, 300); // ⏳ delay simpan
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "age") {
        return { ...prev, age: Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...(prev.address ?? {
          address: "",
          city: "",
          state: "",
          stateCode: "",
          postalCode: "",
          country: "",
          coordinates: { lat: 0, lng: 0 },
        }),
        [name]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8 flex-wrap sm:flex-nowrap">
          <img
            src={user.image || "https://via.placeholder.com/150"}
            alt={user.username}
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md object-cover"
          />
          <div className="flex-1">
            {editing ? (
              <div className="flex gap-2 flex-wrap">
                <Input
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  placeholder="Nama Depan"
                  leftIcon={<Edit2 size={16} />}
                />
                <Input
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  placeholder="Nama Belakang"
                  leftIcon={<Edit2 size={16} />}
                />
                <Button
                  onClick={handleSave}
                  variant="primary"
                  size="md"
                  leftIcon={<Save size={16} />}
                  isLoading={loading}
                >
                  Simpan
                </Button>
                <Button
                  onClick={() => setEditing(false)}
                  variant="secondary"
                  size="md"
                  leftIcon={<X size={16} />}
                  disabled={loading}
                >
                  Batal
                </Button>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-500">@{user.username}</p>
                <p className="text-gray-400">{user.email}</p>
                {user.role && (
                  <p className="text-sm text-indigo-600 font-medium mt-1">
                    Role: {user.role}
                  </p>
                )}
              </>
            )}
          </div>
          {!editing && (
            <Button
              onClick={() => setEditing(true)}
              variant="primary"
              size="md"
              leftIcon={<Edit2 size={16} />}
            >
              Edit Profil
            </Button>
          )}
        </div>

        {/* Info Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informasi Pribadi */}
          <div className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg mb-2">Informasi Pribadi</h2>
            {editing ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="No. HP"
                />
                <Input
                  type="number"
                  name="age"
                  value={formData.age?.toString() || ""}
                  onChange={handleChange}
                  placeholder="Usia"
                />
                <Input
                  type="text"
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  placeholder="Gender"
                />
                <Input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate || ""}
                  onChange={handleChange}
                  placeholder="Tanggal Lahir"
                />
              </div>
            ) : (
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>
                  Nama: {user.firstName} {user.lastName}
                </li>
                <li>Usia: {user.age || "-"}</li>
                <li>Gender: {user.gender || "-"}</li>
                <li>No HP: {user.phone || "-"}</li>
                <li>Tanggal Lahir: {user.birthDate || "-"}</li>
              </ul>
            )}
          </div>

          {/* Alamat */}
          <div className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg mb-2">Alamat</h2>
            {editing ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  name="address"
                  value={formData.address?.address || ""}
                  onChange={handleAddressChange}
                  placeholder="Alamat"
                />
                <Input
                  type="text"
                  name="city"
                  value={formData.address?.city || ""}
                  onChange={handleAddressChange}
                  placeholder="Kota"
                />
                <Input
                  type="text"
                  name="state"
                  value={formData.address?.state || ""}
                  onChange={handleAddressChange}
                  placeholder="Provinsi"
                />
                <Input
                  type="text"
                  name="country"
                  value={formData.address?.country || ""}
                  onChange={handleAddressChange}
                  placeholder="Negara"
                />
              </div>
            ) : (
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>{user.address?.address || "-"}</li>
                <li>
                  {user.address?.city || "-"}, {user.address?.state || "-"}
                </li>
                <li>{user.address?.country || "-"}</li>
              </ul>
            )}
          </div>

          {/* Data Tambahan */}
          <div className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition md:col-span-2">
            <h2 className="font-semibold text-lg mb-2">Data Tambahan</h2>
            {editing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input
                  name="university"
                  value={formData.university || ""}
                  onChange={handleChange}
                  placeholder="Universitas"
                />
                <Input
                  name="ein"
                  value={formData.ein || ""}
                  onChange={handleChange}
                  placeholder="EIN"
                />
                <Input
                  name="ssn"
                  value={formData.ssn || ""}
                  onChange={handleChange}
                  placeholder="SSN"
                />
                <Input
                  name="ip"
                  value={formData.ip || ""}
                  onChange={handleChange}
                  placeholder="IP Address"
                />
              </div>
            ) : (
              <ul className="space-y-1 text-gray-700 text-sm grid grid-cols-1 sm:grid-cols-2 gap-1">
                <li>Universitas: {user.university || "-"}</li>
                <li>EIN: {user.ein || "-"}</li>
                <li>SSN: {user.ssn || "-"}</li>
                <li>IP: {user.ip || "-"}</li>
              </ul>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleLogout}
            variant="danger"
            size="lg"
            isLoading={loading}
            leftIcon={<LogOut size={18} />}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
