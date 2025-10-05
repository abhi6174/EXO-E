import React, { useState } from 'react'
import { Upload } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  loading: boolean
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, loading }) => {
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState<string>('')

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setFileName(file.name)
        onFileSelect(file)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFileName(file.name)
      onFileSelect(file)
    }
  }

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">CSV files only</p>
          {fileName && (
            <p className="mt-2 text-sm text-blue-600 font-medium">{fileName}</p>
          )}
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleChange}
          disabled={loading}
        />
      </label>
    </div>
  )
}