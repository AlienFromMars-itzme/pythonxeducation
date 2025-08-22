# Python Code Examples - File Upload Website

A modern, interactive website where you can upload Python files, organize them by category, and let users view, copy, and run the code directly in their browser.

## 🌟 Features

- 📁 **File Upload**: Drag and drop or click to upload Python (.py) files
- 🗂️ **Category Organization**: Organize files into categories (basics, algorithms, web-development, etc.)
- 🔍 **Search & Filter**: Find files by name, description, or category
- 🐍 **Interactive Python Runner**: Execute Python code directly in the browser using Pyodide
- 📋 **Copy Code**: One-click copy functionality for all code snippets
- 💾 **GitHub Storage**: All files are stored in your GitHub repository
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚡ **Vercel Optimized**: Ready for deployment on Vercel

## 🚀 Quick Setup

### 1. Create Repository
1. Go to GitHub and create a new repository named `python-code-examples`
2. Initialize with a README

### 2. Set Up Environment Variables
Create a `.env.local` file in your project root:
```env
GITHUB_TOKEN=your_github_personal_access_token
```

To get a GitHub token:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `repo` permissions
3. Copy the token and add it to your `.env.local`

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Deploy to Vercel
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add the `GITHUB_TOKEN` environment variable in Vercel dashboard
4. Deploy!

## 📂 File Structure

```
python-code-examples/
├── app/
│   ├── api/
│   │   ├── upload/route.ts      # File upload API
│   │   └── files/route.ts       # File listing API
│   ├── components/
│   │   └── FileUpload.tsx       # Upload component
│   ├── globals.css              # Styles
│   ├── layout.tsx               # App layout
│   └── page.tsx                 # Main page
├── examples/                    # Your uploaded Python files
│   ├── basics/
│   ├── algorithms/
│   ├── web-development/
│   └── ...
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

## 📝 How to Use

### For File Owners (You):
1. **Upload Files**: Click "Upload File" button or drag & drop Python files
2. **Organize**: Choose categories (basics, algorithms, data-science, etc.)
3. **Add Descriptions**: Provide helpful descriptions for your code examples
4. **Manage**: Files are automatically stored in your GitHub repository

### For Visitors:
1. **Browse**: Search and filter through available Python examples
2. **View**: Click on any file to see the code
3. **Copy**: One-click copy to use the code elsewhere  
4. **Run**: Execute the code directly in the browser to see output
5. **Learn**: Study the examples and their outputs

## 🗂️ Categories

- **General**: Miscellaneous examples
- **Basics**: Hello World, variables, basic syntax
- **Data Structures**: Lists, dictionaries, sets, tuples
- **Algorithms**: Sorting, searching, problem-solving
- **Web Development**: Flask, Django, API examples
- **Data Science**: Pandas, NumPy, data analysis
- **Machine Learning**: Scikit-learn, basic ML examples
- **Utilities**: Helper functions, tools, scripts

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Python Runtime**: Pyodide (runs Python in browser)
- **File Storage**: GitHub Repository via GitHub API
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📤 API Endpoints

### POST /api/upload
Upload a Python file to the repository
- **Body**: FormData with file, category, description
- **Response**: Success/error status

### GET /api/files  
Get all uploaded Python files
- **Response**: Array of file objects with metadata

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub personal access token with repo permissions | Yes |

## 📱 Mobile Support

The website is fully responsive and works great on:
- 📱 Mobile phones
- 📟 Tablets  
- 💻 Desktop computers
- 🖥️ Large monitors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues & Support

If you encounter any issues or have questions:
1. Check the GitHub Issues page
2. Create a new issue with details about the problem
3. Include error messages and steps to reproduce

---

**Happy coding! 🐍✨**