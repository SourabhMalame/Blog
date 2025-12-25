"use client";

import { useState } from "react";

export default function Theme() {
  const [theme, setTheme] = useState({
    primaryColor: "#ef4444", // red-500
    secondaryColor: "#0f172a", // slate-900
    fontFamily: "Poppins",
    layout: "default",
  });

  const colorPresets = [
    { name: "Red", value: "#ef4444" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Orange", value: "#f97316" },
  ];

  const fontOptions = ["Poppins", "Inter", "Roboto", "Open Sans", "Lato"];

  const handleColorChange = (color) => {
    setTheme((prev) => ({ ...prev, primaryColor: color }));
  };

  const handleFontChange = (font) => {
    setTheme((prev) => ({ ...prev, fontFamily: font }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Theme saved:", theme);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Theme Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Primary Color */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Primary Color
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-20 h-12 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="#ef4444"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleColorChange(preset.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition ${
                    theme.primaryColor === preset.value
                      ? "border-gray-900"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: preset.value }}
                >
                  <span className="text-white font-medium">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Font Family */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Font Family
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fontOptions.map((font) => (
              <button
                key={font}
                type="button"
                onClick={() => handleFontChange(font)}
                className={`px-4 py-3 rounded-lg border-2 transition ${
                  theme.fontFamily === font
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        </div>

        {/* Layout Options */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Layout Style
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["default", "compact", "wide"].map((layout) => (
              <button
                key={layout}
                type="button"
                onClick={() => setTheme((prev) => ({ ...prev, layout }))}
                className={`p-4 rounded-lg border-2 transition text-left ${
                  theme.layout === layout
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="font-semibold capitalize mb-2">{layout}</div>
                <div className="text-sm text-gray-600">
                  {layout === "default" && "Standard blog layout"}
                  {layout === "compact" && "Compact spacing layout"}
                  {layout === "wide" && "Wide content layout"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
          <div
            className="p-6 rounded-lg border-2 border-gray-200"
            style={{
              backgroundColor: "#ffffff",
              color: "#171717",
            }}
          >
            <div
              className="text-2xl font-bold mb-2"
              style={{
                color: theme.primaryColor,
                fontFamily: theme.fontFamily,
              }}
            >
              Sample Heading
            </div>
            <p
              className="text-gray-700 mb-4"
              style={{ fontFamily: theme.fontFamily }}
            >
              This is a preview of how your theme will look. The primary color
              and font family are applied here.
            </p>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Sample Button
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Save Theme
          </button>
        </div>
      </form>
    </div>
  );
}

