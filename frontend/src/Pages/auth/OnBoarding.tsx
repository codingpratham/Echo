import React, { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../lib/apis";

const OnBoarding = () => {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("bio", bio);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      await api.post("/api/v1/auth/onboarding", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-5">

        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-[420px] bg-white/6 border border-white/10 rounded-2xl px-8 py-8 backdrop-blur-xl"
        >
          <h1 className="text-3xl text-white text-center font-semibold">
            Complete Profile
          </h1>

          <p className="text-gray-400 text-center mt-2 mb-8">
            Tell us a little about yourself.
          </p>

          <div className="flex justify-center mb-6">
            <label
              htmlFor="profilePic"
              className="cursor-pointer relative"
            >
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-indigo-500 flex items-center justify-center overflow-hidden bg-white/5">

                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-gray-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                )}
              </div>

              <input
                hidden
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          <p className="text-center text-xs text-gray-500 mb-6">
            Profile picture (Optional)
          </p>

          <textarea
            rows={5}
            required
            placeholder="Write a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 resize-none outline-none text-white placeholder:text-white/50 focus:border-indigo-500"
          />

          <button
            type="submit"
            className="mt-6 w-full h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            Complete Profile
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-3 w-full text-sm text-gray-400 hover:text-white"
          >
            Skip for now
          </button>
        </form>
      </div>

      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-[300px] h-[180px] bg-gradient-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl" />
      </div>
    </>
  );
};

export default OnBoarding;
