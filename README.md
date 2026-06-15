# 🟡 Jello Clone

A full-featured project management app inspired by Trello, built with React,
Redux Toolkit, and @dnd-kit.

🌐 **Live Demo:** [jello-web.vercel.app](https://jello-web.vercel.app)

## 🎯 Demo Notes

> **Email Verification**
> Account verification via email is disabled in the demo environment due to
> current budget constraints for email service providers.

> **Demo Account**
> You can sign up with your own account, or use the demo account below to
> explore the app right away:
>
> - **Email:** abcxyz@gmail.com
> - **Password:** Abc123456

> **Cold Start**
> The backend is hosted on Render's free tier — it may take up to **1 minute**
> to spin up on the first request. Please be patient! ☕

> **Planned Features**
> The app currently includes the features listed in this README.
> Additional features will be added over time as the project continues to grow.
> **Issues**
> If you encounter any issues with the demo, feel free to reach out at
> [qingyunruan1605@gmail.com](mailto:qingyunruan1605@gmail.com)

---

## ✨ Features

### 🔐 Authentication
- Sign up and log in with email and password
- Manage your profile

### 🗂️ Boards
- Create and manage boards
- Invite members to collaborate on a board

### 📋 Columns & Cards
- Create, edit, and delete columns and cards
- Drag and drop columns and cards with smooth UX (powered by @dnd-kit)
- Attach images to cards
- Join cards and invite others to a card
- Comment on cards
- Receive notifications on card activity

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| UI Framework  | React 18                            |
| State         | Redux Toolkit                       |
| Drag & Drop   | @dnd-kit                            |
| Styling       | MUI (Material UI)                   |
| Build Tool    | Vite                                |
| Deployment    | Vercel, Render                      |

---

## 🔗 Related

- [Jello Clone API](https://github.com/QingYunne/jello-api) — Backend repository

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/QingYunne/jello-web

git clone https://github.com/QingYunne/jello-api

cd jello-web

yarn install

cd jello-api

yarn install
```

### Environment Variables

Create a `.env` file in the frontend's root:

```env
VITE_API_ROOT='http://localhost:8017'
VITE_API_VERSION='v1'
```
Create a `.env` file in the backend's root:
```env
MONGODB_URI=
DATABASE_NAME='clone-jello'
APP_HOST='localhost'
APP_PORT=8017

WEBSITE_DOMAIN_DEVELOPMENT=http://localhost:5173
WEBSITE_DOMAIN_PRODUCTION=

MAILERSEND_API_KEY=
MAILERSEND_EMAIL_FROM=
MAILERSEND_NAME_FROM=

ACCESS_TOKEN_SECRET_KEY=
ACCESS_TOKEN_EXPIRES_IN='1h'

REFRESH_TOKEN_SECRET_KEY=
REFRESH_TOKEN_EXPIRES_IN='14d'

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

BUILD_MODE=dev

```

### Run locally

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── apis/              # API calls and mock data
├── assets/            # Images and static files
├── components/        # Reusable UI components
│   ├── AppBar/        # Top navigation bar
│   ├── Form/          # Form utilities and inputs
│   ├── Loading/       # Loading spinner
│   ├── Modal/         # Card detail modal
│   └── ModeSelect/    # Light/dark mode toggle
├── customHooks/       # Custom React hooks
├── customLibraries/   # Third-party library configs (dnd-kit)
├── pages/             # Page-level components
│   ├── Auth/          # Login, register, account verification
│   ├── Boards/        # Board view with columns and cards
│   ├── Settings/      # Profile and security settings
│   └── Users/         # User profile pages
├── redux/             # Redux Toolkit store and slices
│   ├── activeBoard/
│   ├── activeCard/
│   ├── notifications/
│   └── user/
├── utils/             # Helper functions and constants
├── socket-client.js   # Socket.IO client setup
├── theme.js           # MUI theme configuration
└── App.jsx
```
---

## Demo images

### Login

<img width="1265" height="683" alt="image" src="https://github.com/user-attachments/assets/c26fceeb-c3c5-4535-ba58-d5a2bda46449" />

### Sign up

<img width="1267" height="689" alt="image" src="https://github.com/user-attachments/assets/e3656f0c-b49e-4be2-88d5-863b929de45d" />

### Boards

<img width="1268" height="701" alt="image" src="https://github.com/user-attachments/assets/f1c502f2-b7ae-4513-82f0-4e5f800a41a5" />

### Board

<img width="1271" height="697" alt="image" src="https://github.com/user-attachments/assets/c0a45b06-968c-438e-bb1f-e22832bae590" />

### Card

<img width="1274" height="679" alt="Ảnh chụp màn hình 2026-06-11 154247" src="https://github.com/user-attachments/assets/8cb5f057-bf23-45e5-8c7d-d0444f7c049f" />

### Comments

<img width="544" height="260" alt="Ảnh chụp màn hình 2026-06-11 154925" src="https://github.com/user-attachments/assets/16f59b9d-c1ae-471f-8371-c76c3d909e50" />

### Invitation

<img width="299" height="212" alt="Ảnh chụp màn hình 2026-06-11 154152" src="https://github.com/user-attachments/assets/b0cc4a7f-9c77-413d-9d66-14f59762e937" />
<img width="385" height="219" alt="Ảnh chụp màn hình 2026-06-11 154207" src="https://github.com/user-attachments/assets/9a9cc7ec-ae0f-48fc-99f6-d7afa2306ef7" />

## Profile
<img width="1278" height="658" alt="image" src="https://github.com/user-attachments/assets/bced6bf6-b14f-4b98-ba36-4e7aa93b992c" />

<img width="1268" height="648" alt="image" src="https://github.com/user-attachments/assets/9f9538fe-9ca4-4a19-bb2f-98091f038d9e" />

---

## 🙋 Author

Made by **[QingYunne](https://github.com/QingYunne)**
