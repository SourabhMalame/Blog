"use client";

import { useState } from "react";
import { 
  Layout, 
  Sparkles, 
  Star, 
  Compass, 
  Lightbulb,
  Save
} from "lucide-react";

export default function Customise() {
  const [activeTab, setActiveTab] = useState("hero");
  
  const [heroSettings, setHeroSettings] = useState({
    title: "Top Picks",
    showNewsletter: true,
    newsletterTitle: "Newsletter",
    newsletterPlaceholder: "Enter your Email",
  });

  const [spotlightSettings, setSpotlightSettings] = useState({
    title: "SpotLight",
    subtitle: "Featured Stories & Insights",
    showSection: true,
  });

  const [featuredSettings, setFeaturedSettings] = useState({
    title: "Featured",
    showSMBStory: true,
    showHerStory: true,
    showSocialStory: true,
  });

  const [exploreSettings, setExploreSettings] = useState({
    title: "EXPLORE",
    subtitle: "Upcoming startups of 2026 and browse them on YourStory",
    showSection: true,
  });

  const [discoverSettings, setDiscoverSettings] = useState({
    title: "Discover More",
    showSection: true,
  });

  const tabs = [
    { id: "hero", name: "Hero", icon: Layout },
    { id: "spotlight", name: "Spotlight", icon: Sparkles },
    { id: "features", name: "Features", icon: Star },
    { id: "explore", name: "Explore", icon: Compass },
    { id: "discover", name: "Discover More", icon: Lightbulb },
  ];

  const handleHeroChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHeroSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSpotlightChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSpotlightSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeaturedChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeaturedSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleExploreChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExploreSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDiscoverChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDiscoverSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allSettings = {
      hero: heroSettings,
      spotlight: spotlightSettings,
      featured: featuredSettings,
      explore: exploreSettings,
      discover: discoverSettings,
    };
    console.log("Settings saved:", allSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Customise</h1>
        <p className="text-xs text-gray-500 mt-0.5">Customize your homepage sections</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon size={14} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={heroSettings.title}
                  onChange={handleHeroChange}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Top Picks"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="showNewsletter"
                  id="showNewsletter"
                  checked={heroSettings.showNewsletter}
                  onChange={handleHeroChange}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="showNewsletter" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Show Newsletter Section
                </label>
              </div>

              {heroSettings.showNewsletter && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Newsletter Title
                    </label>
                    <input
                      type="text"
                      name="newsletterTitle"
                      value={heroSettings.newsletterTitle}
                      onChange={handleHeroChange}
                      className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Newsletter"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Newsletter Placeholder
                    </label>
                    <input
                      type="text"
                      name="newsletterPlaceholder"
                      value={heroSettings.newsletterPlaceholder}
                      onChange={handleHeroChange}
                      className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Enter your Email"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Spotlight Tab */}
          {activeTab === "spotlight" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="showSection"
                  id="showSpotlight"
                  checked={spotlightSettings.showSection}
                  onChange={handleSpotlightChange}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="showSpotlight" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Show Spotlight Section
                </label>
              </div>

              {spotlightSettings.showSection && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={spotlightSettings.title}
                      onChange={handleSpotlightChange}
                      className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="SpotLight"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={spotlightSettings.subtitle}
                      onChange={handleSpotlightChange}
                      className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Featured Stories & Insights"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={featuredSettings.title}
                  onChange={handleFeaturedChange}
                  className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Featured"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="showSMBStory"
                    id="showSMBStory"
                    checked={featuredSettings.showSMBStory}
                    onChange={handleFeaturedChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="showSMBStory" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Show SMB Story Column
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="showHerStory"
                    id="showHerStory"
                    checked={featuredSettings.showHerStory}
                    onChange={handleFeaturedChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="showHerStory" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Show Her Story Column
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="showSocialStory"
                    id="showSocialStory"
                    checked={featuredSettings.showSocialStory}
                    onChange={handleFeaturedChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="showSocialStory" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Show Social Story Column
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Explore Tab */}
          {activeTab === "explore" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="showSection"
                  id="showExplore"
                  checked={exploreSettings.showSection}
                  onChange={handleExploreChange}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="showExplore" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Show Explore Section
                </label>
              </div>

              {exploreSettings.showSection && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={exploreSettings.title}
                      onChange={handleExploreChange}
                      className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="EXPLORE"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={exploreSettings.subtitle}
                      onChange={handleExploreChange}
                      className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Upcoming startups of 2026..."
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Discover More Tab */}
          {activeTab === "discover" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="showSection"
                  id="showDiscover"
                  checked={discoverSettings.showSection}
                  onChange={handleDiscoverChange}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="showDiscover" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Show Discover More Section
                </label>
              </div>

              {discoverSettings.showSection && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={discoverSettings.title}
                    onChange={handleDiscoverChange}
                    className="w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Discover More"
                  />
                </div>
              )}
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1.5 text-xs rounded hover:from-red-600 hover:to-red-700 shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 font-medium"
            >
              <Save size={14} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
