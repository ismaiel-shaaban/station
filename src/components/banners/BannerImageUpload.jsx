import React, { useRef } from "react";

export default function BannerImageUpload({ value, onChange }) {
  const fileInputRef = useRef();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result, file);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="mb-3">
      <label className="form-label">صورة البنر</label>
      <input
        type="file"
        className="form-control"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {value && (
        <div className="mt-2">
          <img src={value} alt="banner preview" style={{ maxWidth: 200, maxHeight: 120, borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}
