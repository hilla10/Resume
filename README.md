# 📝 Online Resume Builder

<p align="center">
  <img src="https://img.shields.io/github/repo-size/hilla10/resume" alt="Repo Size" />
  <img src="https://img.shields.io/github/languages/top/hilla10/resume" alt="Top Language" />
  <img src="https://img.shields.io/github/issues/hilla10/resume" alt="Open Issues" />
  <img src="https://img.shields.io/github/forks/hilla10/resume" alt="Forks" />
  <img src="https://img.shields.io/github/stars/hilla10/resume" alt="Stars" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
</p>

<p align="center">
  <strong>An AI-powered Online Resume Builder that helps users create, preview, share, and optimize professional resumes easily.</strong>
</p>

<p align="center">
  <img src="/home-page.png" alt="Home Page"  width="500"  />
  <img src="/resume-preview.png" alt="Resume Preview"  width="500"  height="500" />
  <img src="/ai-optimization.png" alt="AI Optimization"  width="500" height="500" />
  
</p>

---

## 📑 Table of Contents

- [📝 Online Resume Builder](#-online-resume-builder)
  - [📑 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [⚙️ Getting Started](#️-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Environment Variables](#environment-variables)
    - [Backend .env:](#backend-env)
    - [Frontend .env:](#frontend-env)
    - [Backend (dev)](#backend-dev)
    - [Frontend (dev)](#frontend-dev)
  - [📂 Folder Structure](#-folder-structure)

---

## 🚀 Features

- ✅ User sign in / sign up
- ✅ Create new resumes from scratch
- ✅ Live preview of resumes & generate shareable links
- ✅ Upload resume and optimize content using AI
- ✅ Manage resumes (add, edit, delete)
- ✅ Upload images in resumes and remove backgrounds
- ✅ Multiple resume templates

---

## 🛠️ Tech Stack

**Frontend:**  
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

**Backend:**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-DA627D?style=flat)
![Multer](https://img.shields.io/badge/Multer-8D6BFF?style=flat)
![ImageKit](https://img.shields.io/badge/ImageKit-FF6D00?style=flat)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/hilla10/Resume.git
cd online-resume-builder

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

```

## Environment Variables

### Backend .env:

```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=your_openai_base_url
OPENAI_MODEL=your_openai_model
```

### Frontend .env:

```bash
VITE_BASE_URL=http://localhost:5000
```

### Backend (dev)

```bash
cd backend
npm run dev
```

### Frontend (dev)

```bash
cd frontend
npm run dev
```

## 📂 Folder Structure

```
online-resume-builder/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── app/
│   │   ├── api/
│   │   └── App.jsx
├── README.md
└── package.json
```

📄 License

MIT License

👤 Contact

<p align="left"> <a href="https://github.com/hilla10">GitHub</a> • <a href="https://www.linkedin.com/in/hailemichaelnegusse/">LinkedIn</a> </p>
