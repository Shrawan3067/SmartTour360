import React, { useState } from 'react';

/**
 * Avatar Upload Component
 * Allows users to upload and preview profile avatars
 */
const AvatarUpload = ({ currentAvatar, onAvatarChange, size = 'md' }) => {
  const [preview, setPreview] = useState(currentAvatar || null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onAvatarChange && onAvatarChange(reader.result, file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onAvatarChange && onAvatarChange(null, null);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        {/* Avatar Display */}
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold text-2xl`}>
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{getInitials('User')}</span>
          )}
        </div>

        {/* Upload Button */}
        <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <label className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          Upload Photo
        </label>
        {preview && (
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-500">
        <p>JPG, PNG or GIF (max 5MB)</p>
      </div>
    </div>
  );
};

export default AvatarUpload;
