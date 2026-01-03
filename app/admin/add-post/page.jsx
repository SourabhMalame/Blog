"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  GripVertical,
  Type,
  Image as ImageIcon,
  Heading1,
  List,
  Quote,
} from "lucide-react";

export default function AddPost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    featuredImage: "/demo.png",
    status: "draft",
  });

  const [contentBlocks, setContentBlocks] = useState([]);

  const blockTypes = [
    { type: "text", label: "Text", icon: Type },
    { type: "heading", label: "Heading", icon: Heading1 },
    { type: "image", label: "Image", icon: ImageIcon },
    { type: "list", label: "List", icon: List },
    { type: "quote", label: "Quote", icon: Quote },
  ];

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: type === "list" ? [] : "",
      image: type === "image" ? "/demo.png" : null,
    };
    setContentBlocks([...contentBlocks, newBlock]);
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

  const moveBlock = (index, direction) => {
    const newBlocks = [...contentBlocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      [newBlocks[index], newBlocks[targetIndex]] = [
        newBlocks[targetIndex],
        newBlocks[index],
      ];
      setContentBlocks(newBlocks);
    }
  };

  const addListItem = (blockId) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === blockId
          ? { ...block, content: [...block.content, ""] }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      contentBlocks,
    };
    console.log("Form submitted:", postData);
    // Handle form submission here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "text":
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, "content", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
            placeholder="Enter text content..."
          />
        );

      case "heading":
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, "content", e.target.value)}
            className="w-full px-4 py-3 text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter heading..."
          />
        );

      case "image":
        return (
          <div className="space-y-3">
            <div className="w-full h-64 relative border border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={block.image}
                alt="Content image"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={block.image}
                onChange={(e) => updateBlock(block.id, "image", e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Image URL or path"
              />
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Upload
              </button>
            </div>
            <input
              type="text"
              value={block.alt || ""}
              onChange={(e) => updateBlock(block.id, "alt", e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
              placeholder="Image alt text (optional)"
            />
          </div>
        );

      case "list":
        return (
          <div className="space-y-2">
            {block.content.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2">
                <span className="text-gray-500">•</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    updateListItem(block.id, itemIndex, e.target.value)
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="List item"
                />
                <button
                  type="button"
                  onClick={() => deleteListItem(block.id, itemIndex)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem(block.id)}
              className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              + Add List Item
            </button>
          </div>
        );

      case "quote":
        return (
          <div className="border-l-4 border-red-500 pl-4">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, "content", e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent italic"
              placeholder="Enter quote text..."
            />
            {block.author !== undefined && (
              <input
                type="text"
                value={block.author || ""}
                onChange={(e) => updateBlock(block.id, "author", e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Quote author (optional)"
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Post</h1>
        <p className="text-sm text-gray-500 mt-1">Create and customize your blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Basic Information
            </h2>
          </div>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm bg-white"
                required
              >
                <option value="">Select category</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="music">Music</option>
                <option value="bitcoin">Bitcoin</option>
              </select>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="flex items-center gap-4">
                <div className="w-40 h-28 relative border-2 border-gray-200 rounded-xl overflow-hidden shadow-md ring-1 ring-gray-100">
                  <Image
                    src={formData.featuredImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
                    placeholder="Image URL or path"
                  />
                </div>
                <button
                  type="button"
                  className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-100 font-medium transition shadow-sm"
                >
                  Upload
                </button>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">
                Content Blocks
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {blockTypes.map((blockType) => {
                const Icon = blockType.icon;
                return (
                  <button
                    key={blockType.type}
                    type="button"
                    onClick={() => addBlock(blockType.type)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:from-red-50 hover:to-red-50 hover:border-red-300 text-sm font-medium transition shadow-sm"
                    title={blockType.label}
                  >
                    <Icon size={18} />
                    <span className="hidden md:inline">{blockType.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {contentBlocks.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
              <p className="text-gray-500 mb-2 font-medium">
                No content blocks yet
              </p>
              <p className="text-sm text-gray-400">
                Add your first block using the buttons above
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {contentBlocks.map((block, index) => {
                const BlockIcon = blockTypes.find((b) => b.type === block.type)
                  ?.icon || Type;
                return (
                  <div
                    key={block.id}
                    className="border-2 border-gray-200 rounded-xl p-5 hover:border-red-300 hover:shadow-md transition bg-gradient-to-br from-white to-gray-50/50"
                  >
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <GripVertical
                          size={20}
                          className="text-gray-400 cursor-move hover:text-gray-600"
                        />
                        <div className="p-2 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                          <BlockIcon size={18} className="text-red-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 capitalize">
                          {block.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, "up")}
                          disabled={index === 0}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, "down")}
                          disabled={index === contentBlocks.length - 1}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition"
                          title="Move down"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBlock(block.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete block"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div>{renderBlock(block, index)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-200 font-semibold"
          >
            Save Post
          </button>
          <button
            type="button"
            className="px-8 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition shadow-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

