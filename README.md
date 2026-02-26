🏥 MediVault – Healthcare Management System (MERN Stack)

MediVault is a full-stack healthcare management system built using the MERN stack.
It enables secure role-based access for Admin, Doctors, and Patients to manage appointments and medical records efficiently.

🚀 Features
🔐 Authentication & Authorization

JWT-based authentication

Role-based access control:

Admin

Doctor

Patient

👨‍⚕️ Admin Module

Create and manage doctor accounts

Assign doctor specializations

View all registered doctors

🧑‍💼 Patient Module

Patient signup & login

Book appointments with doctors

Upload medical reports (PDF / images)

View appointment history and reports

🩺 Doctor Module

View assigned patient appointments

Access patient details related to appointments

📂 Medical Records

Secure file upload using Multer

Files served safely from backend

🛠️ Tech Stack
Frontend

React (Vite)

JavaScript

CSS (custom modern UI)

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

Multer (file uploads)

Tools & Others

Git & GitHub

MongoDB Atlas

Nodemon

📁 Project Structure
medivault/
│
├── client/            # React frontend
│   ├── src/
│   └── package.json
│
├── server/            # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   └── index.js
│
└── README.md
⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/<your-username>/medivault-healthcare_app-mern-stack.git
cd medivault-healthcare_app-mern-stack
2️⃣ Backend Setup
cd server
npm install

Create a .env file inside server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start backend:

npm run dev

Backend runs at:

http://localhost:5000
3️⃣ Frontend Setup
cd client
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🔑 Demo Flow (for Presentation)

Login as Admin

Create Doctor account

Logout

Signup/Login as Patient

Book appointment & upload report

Logout

Login as Doctor

View patient appointments

🔒 Security Notes

.env file is ignored via .gitignore

Sensitive credentials are never committed

MongoDB Atlas IP whitelisting enabled

DNS fallback handling for MongoDB Atlas connectivity
