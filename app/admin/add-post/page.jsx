"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Type, Heading1, Image as ImageIcon, List, Quote, X } from "lucide-react";

export default function AddPost() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    featuredImage: "",
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
  });
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMenuFor, setShowMenuFor] = useState(null);

  const blockTypes = [
    { type: "text", label: "Text", icon: Type },
    { type: "heading", label: "Heading", icon: Heading1 },
    { type: "image", label: "Image", icon: ImageIcon },
    { type: "list", label: "List", icon: List },
    { type: "quote", label: "Quote", icon: Quote },
  ];

  const addBlock = (index, type) => {
    const newBlock = {
      id: Date.now() + Math.random(),
      type,
      content: type === "list" ? [""] : "",
      image: type === "image" ? "" : null,
      alt: type === "image" ? "" : null,
    };
    const newBlocks = [...contentBlocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setContentBlocks(newBlocks);
    setShowMenuFor(null);
  };

  const updateBlock = (id, field, value) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === id ? { ...block, [field]: value } : block
      )
    );
  };

  const deleteBlock = (id) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id));
  };

  const addListItem = (blockId) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === blockId
          ? { ...block, content: [...(block.content || []), ""] }
          : block
      )
    );
  };

  const updateListItem = (blockId, itemIndex, value) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              content: block.content.map((item, idx) =>
                idx === itemIndex ? value : item
              ),
            }
          : block
      )
    );
  };

  const deleteListItem = (blockId, itemIndex) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              content: block.content.filter((_, idx) => idx !== itemIndex),
            }
          : block
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // For now, we'll create a data URL. In production, upload to a service like Cloudinary
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        [fieldName]: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e, customData = null) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const dataToUse = customData || formData;
      
      // Convert content blocks to content string
      const content = contentBlocks
        .map((block) => {
          if (block.type === "text") return block.content;
          if (block.type === "heading") return `# ${block.content}`;
          if (block.type === "quote") return `> ${block.content}`;
          if (block.type === "list") {
            return block.content.map((item) => `- ${item}`).join("\n");
          }
          if (block.type === "image") {
            return `![${block.alt || "Image"}](${block.image})`;
          }
          return "";
        })
        .filter(Boolean)
        .join("\n\n");

      const seoData = {
        metaTitle: dataToUse.metaTitle || dataToUse.title,
        metaDescription: dataToUse.metaDescription || dataToUse.excerpt,
        metaKeywords: dataToUse.metaKeywords,
        ogTitle: dataToUse.ogTitle || dataToUse.title,
        ogDescription: dataToUse.ogDescription || dataToUse.excerpt,
        ogImage: dataToUse.ogImage || dataToUse.featuredImage,
        twitterCard: "summary_large_image",
      };

      const postData = {
        title: dataToUse.title,
        excerpt: dataToUse.excerpt,
        content: content,
        category: dataToUse.category,
        featuredImage: dataToUse.featuredImage,
        status: dataToUse.status,
        contentBlocks: contentBlocks,
        seo: seoData,
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create post");
        setLoading(false);
        return;
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const categories = [
    "technology",
    "business",
    "startups",
    "funding",
    "innovation",
    "entrepreneurship",
    "success-stories",
    "guides",
    "tools",
    "legal",
    "marketing",
  ];

  const renderBlock = (block, index) => {
    const BlockIcon = blockTypes.find((b) => b.type === block.type)?.icon || Type;

    return (
      <div key={block.id} className="flex items-start gap-3 mb-3 group">
        {/* Plus button on the left */}
        <div className="relative flex-shrink-0 pt-2">
          <button
            type="button"
            onClick={() => setShowMenuFor(showMenuFor === block.id ? null : block.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Plus size={16} className="text-gray-400 dark:text-gray-500" />
          </button>
          
          {/* Block type menu */}
          {showMenuFor === block.id && (
            <div className="absolute left-10 top-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2 min-w-[200px]">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Add Block</span>
                <button
                  type="button"
                  onClick={() => setShowMenuFor(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-1">
                {blockTypes.map((blockType) => {
                  const Icon = blockType.icon;
                  return (
                    <button
                      key={blockType.type}
                      type="button"
                      onClick={() => addBlock(index, blockType.type)}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm text-left"
                    >
                      <Icon size={16} className="text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{blockType.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Block content */}
        <div className="flex-1 flex items-start gap-3">
          <div className="flex-1">
            {block.type === "text" && (
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, "content", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Enter text content..."
              />
            )}

            {block.type === "heading" && (
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, "content", e.target.value)}
                className="w-full px-4 py-3 text-xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter heading..."
              />
            )}

            {block.type === "image" && (
              <div className="space-y-2">
                <input
                  type="url"
                  value={block.image || ""}
                  onChange={(e) => updateBlock(block.id, "image", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Image URL"
                />
                <input
                  type="text"
                  value={block.alt || ""}
                  onChange={(e) => updateBlock(block.id, "alt", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Image alt text (optional)"
                />
                {block.image && (
                  <img
                    src={block.image}
                    alt={block.alt || "Preview"}
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </div>
            )}

            {block.type === "list" && (
              <div className="space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900/50">
                {(block.content || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateListItem(block.id, itemIndex, e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white text-sm"
                      placeholder="List item"
                    />
                    <button
                      type="button"
                      onClick={() => deleteListItem(block.id, itemIndex)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(block.id)}
                  className="mt-1 px-3 py-1.5 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  + Add List Item
                </button>
              </div>
            )}

            {block.type === "quote" && (
              <div className="border-l-4 border-red-500 pl-4">
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, "content", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 italic dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Enter quote text..."
                />
              </div>
            )}
          </div>

          {/* Delete button */}
          <button
            type="button"
            onClick={() => deleteBlock(block.id)}
            className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Write and publish your blog post with SEO optimization
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "content"
                ? "text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-900/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Content
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("seo");
              setShowMenuFor(null);
            }}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "seo"
                ? "text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-900/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            SEO Settings
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {activeTab === "content" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Post Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt / Short Description
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Brief description of your post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.featuredImage && (
                  <img
                    src={formData.featuredImage}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50 min-h-[200px]">
                  {contentBlocks.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">Click the + button below to add your first content block</p>
                      <button
                        type="button"
                        onClick={() => {
                          const newBlock = {
                            id: Date.now(),
                            type: "text",
                            content: "",
                          };
                          setContentBlocks([newBlock]);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <Plus size={18} />
                        Add First Block
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-0">
                      {contentBlocks.map((block, index) => renderBlock(block, index))}
                      
                      {/* Plus button at the end */}
                      <div className="flex items-start gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setShowMenuFor(showMenuFor === "end" ? null : "end")}
                          className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
                        >
                          <Plus size={16} className="text-gray-400 dark:text-gray-500" />
                        </button>
                        
                        {showMenuFor === "end" && (
                          <div className="relative z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2 min-w-[200px]">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Add Block</span>
                              <button
                                type="button"
                                onClick={() => setShowMenuFor(null)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className="space-y-1">
                              {blockTypes.map((blockType) => {
                                const Icon = blockType.icon;
                                return (
                                  <button
                                    key={blockType.type}
                                    type="button"
                                    onClick={() => addBlock(contentBlocks.length - 1, blockType.type)}
                                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm text-left"
                                  >
                                    <Icon size={16} className="text-gray-600 dark:text-gray-400" />
                                    <span className="text-gray-700 dark:text-gray-300">{blockType.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-800 dark:text-red-200">
                  <strong>Tip:</strong> SEO fields are optional. If left empty, they will automatically use your post title and excerpt.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="SEO title for search engines"
                  maxLength={60}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {formData.metaTitle.length}/60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="SEO description for search engines"
                  maxLength={160}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {formData.metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Comma-separated keywords"
                />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Open Graph (Social Media)
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      OG Title
                    </label>
                    <input
                      type="text"
                      name="ogTitle"
                      value={formData.ogTitle}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Title for social media sharing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      OG Description
                    </label>
                    <textarea
                      name="ogDescription"
                      value={formData.ogDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Description for social media sharing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      OG Image
                    </label>
                    <div className="space-y-3">
                      <input
                        type="url"
                        name="ogImage"
                        value={formData.ogImage}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Image URL for social media"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
                        <label className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "ogImage")}
                            className="hidden"
                          />
                          <span className="inline-block px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm">
                            Upload Image
                          </span>
                        </label>
                      </div>
                      {formData.ogImage && (
                        <img
                          src={formData.ogImage}
                          alt="OG Preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const draftData = { ...formData, status: "draft" };
                  handleSubmit(e, draftData);
                }}
                disabled={loading}
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
