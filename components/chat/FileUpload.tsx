"use client";

import { useState } from 'react';

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      console.log('File uploaded:', selectedFile.name);
      setSelectedFile(null);
      setUploading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="font-semibold mb-3">Upload File</h3>
      
      <div className="flex flex-col items-center">
        <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mb-3">
          Choose File
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </label>
        
        {selectedFile && (
          <div className="w-full mb-3">
            <div className="flex justify-between items-center bg-gray-700 p-2 rounded">
              <span className="text-sm truncate">{selectedFile.name}</span>
              <span className="text-xs text-gray-400">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        )}
        
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className={`w-full py-2 px-4 rounded-lg ${
            !selectedFile || uploading 
              ? 'bg-gray-700 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
}