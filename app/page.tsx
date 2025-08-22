'use client'

import { useState, useEffect } from 'react'
import { Play, Copy, Search, Upload as UploadIcon, RefreshCw } from 'lucide-react'
import FileUpload from './components/FileUpload'

interface CodeFile {
  id: string
  name: string
  path: string
  category: string
  content: string
  description?: string
  uploadedAt?: string
}

export default function Home() {
  const [pyodide, setPyodide] = useState<any>(null)
  const [output, setOutput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<CodeFile[]>([])
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showUpload, setShowUpload] = useState<boolean>(false)
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false)

  useEffect(() => {
    const loadPyodide = async () => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
      script.async = true
      
      script.onload = async () => {
        try {
          const pyodideInstance = await (window as any).loadPyodide()
          setPyodide(pyodideInstance)
        } catch (error) {
          console.error('Failed to load Pyodide:', error)
        }
      }
      
      document.head.appendChild(script)
    }

    loadPyodide()
    loadFiles()
  }, [])

  const loadFiles = async () => {
    setLoadingFiles(true)
    try {
      const response = await fetch('/api/files')
      const data = await response.json()
      setFiles(data.files || [])
      if (data.files && data.files.length > 0 && !selectedFile) {
        setSelectedFile(data.files[0])
      }
    } catch (error) {
      console.error('Failed to load files:', error)
    }
    setLoadingFiles(false)
  }

  const runCode = async (code: string) => {
    if (!pyodide) {
      setOutput('Python runtime is still loading. Please wait...')
      return
    }

    setIsLoading(true)
    setOutput('')

    try {
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `)

      pyodide.runPython(code)
      const stdout = pyodide.runPython('sys.stdout.getvalue()')
      
      setOutput(stdout || 'Code executed successfully (no output)')
    } catch (error: any) {
      setOutput(`Error: ${error.message}`)
    }

    setIsLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const categories = ['all', ...Array.from(new Set(files.map(file => file.category)))]
  
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Python Code Examples</h1>
          <p className="text-blue-100 mt-2">Upload, share, and run Python code examples</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
            >
              <UploadIcon className="w-4 h-4" />
              {showUpload ? 'Hide Upload' : 'Upload File'}
            </button>
            <button
              onClick={loadFiles}
              disabled={loadingFiles}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loadingFiles ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Upload Section */}
        {showUpload && (
          <div className="mb-6">
            <FileUpload onUploadSuccess={() => {
              loadFiles()
              setShowUpload(false)
            }} />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Files List */}
            <div className="file-list">
              {loadingFiles ? (
                <div className="text-center p-4 text-gray-500">Loading files...</div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center p-4 text-gray-500">
                  {files.length === 0 ? 'No files uploaded yet' : 'No files match your search'}
                </div>
              ) : (
                filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`file-item ${selectedFile?.id === file.id ? 'selected' : ''}`}
                  >
                    <h3 className="font-semibold text-gray-800">{file.name}</h3>
                    {file.description && (
                      <p className="text-sm text-gray-600 mt-1">{file.description}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                        {file.category.replace('-', ' ')}
                      </span>
                      {file.uploadedAt && (
                        <span className="text-xs text-gray-500">
                          {new Date(file.uploadedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3">
            {selectedFile ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* File Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedFile.name}</h2>
                    {selectedFile.description && (
                      <p className="text-gray-600 mt-1">{selectedFile.description}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {selectedFile.category.replace('-', ' ')}
                    </span>
                    {selectedFile.uploadedAt && (
                      <span className="text-xs text-gray-500 mt-1">
                        Uploaded: {new Date(selectedFile.uploadedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Code Block */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-700">Code:</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(selectedFile.content)}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                      <button
                        onClick={() => runCode(selectedFile.content)}
                        disabled={!pyodide || isLoading}
                        className="flex items-center gap-2 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors disabled:opacity-50"
                      >
                        <Play className="w-4 h-4" />
                        {isLoading ? 'Running...' : 'Run Code'}
                      </button>
                    </div>
                  </div>
                  
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto code-block">
                    {selectedFile.content}
                  </pre>
                </div>

                {/* Output */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Output:</h3>
                  <div className="output-container">
                    {!pyodide ? 'Loading Python runtime...' : output || 'Click "Run Code" to see the output'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center text-gray-500">
                  <UploadIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h2 className="text-xl font-semibold mb-2">No files yet</h2>
                  <p>Upload your first Python file to get started!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}