import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { logout, updateProfile } from "../../features/auth/authSlice";
import type { User } from "../../features/auth/types";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user as User);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Silakan login dulu
      </div>
    );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setEditing(false);
  };

  // ✅ update field primitif
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "age") {
        return { ...prev, age: Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  // ✅ khusus address (nested)
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
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
                <input
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-1/2"
                  placeholder="Nama Depan"
                />
                <input
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-1/2"
                  placeholder="Nama Belakang"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                >
                  Batal
                </button>
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
            <button
              onClick={() => setEditing(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Edit Profil
            </button>
          )}
        </div>

        {/* Info Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informasi Pribadi */}
          <div className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition">
            <h2 className="font-semibold text-lg mb-2">Informasi Pribadi</h2>
            {editing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="No. HP"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age?.toString() || ""}
                  onChange={handleChange}
                  placeholder="Usia"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  placeholder="Gender"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate || ""}
                  onChange={handleChange}
                  placeholder="Tanggal Lahir"
                  className="border px-2 py-1 rounded w-full"
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
                <input
                  type="text"
                  name="address"
                  value={formData.address?.address || ""}
                  onChange={handleAddressChange}
                  placeholder="Alamat"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.address?.city || ""}
                  onChange={handleAddressChange}
                  placeholder="Kota"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.address?.state || ""}
                  onChange={handleAddressChange}
                  placeholder="Provinsi"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="country"
                  value={formData.address?.country || ""}
                  onChange={handleAddressChange}
                  placeholder="Negara"
                  className="border px-2 py-1 rounded w-full"
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
                <input
                  name="university"
                  value={formData.university || ""}
                  onChange={handleChange}
                  placeholder="Universitas"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  name="ein"
                  value={formData.ein || ""}
                  onChange={handleChange}
                  placeholder="EIN"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  name="ssn"
                  value={formData.ssn || ""}
                  onChange={handleChange}
                  placeholder="SSN"
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  name="ip"
                  value={formData.ip || ""}
                  onChange={handleChange}
                  placeholder="IP Address"
                  className="border px-2 py-1 rounded w-full"
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
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
