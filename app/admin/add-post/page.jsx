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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-24 relative border border-gray-300 rounded-lg overflow-hidden">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Image URL or path"
                  />
                </div>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Upload Image
                </button>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Content Blocks
            </h2>
            <div className="flex items-center gap-2">
              {blockTypes.map((blockType) => {
                const Icon = blockType.icon;
                return (
                  <button
                    key={blockType.type}
                    type="button"
                    onClick={() => addBlock(blockType.type)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    title={blockType.label}
                  >
                    <Icon size={16} />
                    <span className="hidden md:inline">{blockType.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {contentBlocks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 mb-4">
                No content blocks yet. Add your first block above.
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
                    className="border border-gray-300 rounded-lg p-4 hover:border-gray-400 transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <GripVertical
                          size={20}
                          className="text-gray-400 cursor-move"
                        />
                        <BlockIcon size={18} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {block.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, "up")}
                          disabled={index === 0}
                          className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, "down")}
                          disabled={index === contentBlocks.length - 1}
                          className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move down"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBlock(block.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Delete block"
                        >
                          <Trash2 size={16} />
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
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Save Post
          </button>
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

