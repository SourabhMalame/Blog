"use client";

import { useState } from "react";

export default function Customise() {
  const [settings, setSettings] = useState({
    siteName: "Maharashtra Startup Organisation",
    siteDescription: "A modern news & magazine platform",
    logo: "/logo.png",
    footerText: "© 2024 Maharashtra Startup Organisation. All rights reserved.",
    socialLinks: {
      facebook: "",
      twitter: "",
      youtube: "",
      instagram: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social_")) {
      const key = name.replace("social_", "");
      setSettings((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", settings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customise</h1>
        <p className="text-sm text-gray-500 mt-1">Customize your site settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site Settings */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Site Settings
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Footer Text
              </label>
              <input
                type="text"
                name="footerText"
                value={settings.footerText}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Social Media Links
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                name="social_facebook"
                value={settings.socialLinks.facebook}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                name="social_twitter"
                value={settings.socialLinks.twitter}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                name="social_youtube"
                value={settings.socialLinks.youtube}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
                placeholder="https://youtube.com/yourchannel"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                name="social_instagram"
                value={settings.socialLinks.instagram}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-200 font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

