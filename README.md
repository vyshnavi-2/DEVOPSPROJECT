```md
# TrackPrep

TrackPrep is a full-stack placement preparation dashboard that helps users stay organized across DSA, core subjects, system design, and daily planning in one place.

---

## Features

- User signup and login with JWT authentication
- Personalized dashboard with preparation stats
- DSA tracker with NeetCode 150 problems
- Core subjects tracker for OS, DBMS, CN, and OOP
- System design topic tracker
- Planner for daily tasks with deadlines and priority
- User-specific progress, notes, and status updates
- Clean multi-page interface with sidebar navigation

---

## Modules

### Authentication
- Register new users
- Login existing users
- Protected routes using JWT
- Password hashing using bcrypt

### Dashboard
- Welcome section with user name
- DSA solved stats
- Subject completion stats
- System design stats
- Planner summary
- Calendar and streak section

### DSA Tracker
- Preloaded NeetCode 150 problem list
- Topic-wise grouping
- Difficulty and LeetCode links
- Status tracking: Solved, Not Solved, Revision
- Notes for each problem
- Filtering by topic, status, and search

### Core Subjects
- Subjects included:
  - Operating Systems
  - DBMS
  - Computer Networks
  - OOP
- Predefined interview-relevant topics
- Topic status tracking
- Notes and revision flag

### System Design
- Predefined topics like:
  - Scalability
  - Load Balancing
  - Caching
  - Database Sharding
  - CAP Theorem
- Status and notes tracking

### Planner
- Add daily tasks
- Set deadlines
- Set priority
- Mark complete
- Delete tasks

---

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB Atlas with Mongoose
- Authentication: JWT, bcryptjs
- Environment Management: dotenv
- Development Tooling: nodemon

---

## Project Structure

```bash
placement-tracker/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   └── js/
│   └── pages/
│       ├── auth/
│       ├── dashboard/
│       ├── dsa/
│       ├── subjects/
│       ├── system-design/
│       └── planner/
│
└── README.md
```

---

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/vyshnavi-2/DEVOPSPROJECT.git
```

### 2. Open the backend folder

```bash
cd DEVOPSPROJECT/backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file inside the `backend` folder

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Start the server

```bash
node server.js
```

Or for development:

```bash
npm run dev
```

### 6. Open in browser

```bash
http://localhost:5000
```

---

## Database Collections

- users
- dsaProblems
- subjects
- systemDesign
- tasks

---

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### DSA
- `POST /api/dsa/initialize`
- `GET /api/dsa`
- `GET /api/dsa/stats/summary`
- `PATCH /api/dsa/:id`

### Subjects
- `GET /api/subjects`
- `GET /api/subjects/summary`
- `GET /api/subjects/:subjectId`
- `PATCH /api/subjects/:subjectId/topics/:topicId`

### System Design
- `GET /api/system-design`
- `GET /api/system-design/summary`
- `PATCH /api/system-design/:topicId`

### Planner
- `GET /api/tasks`
- `GET /api/tasks/summary`
- `POST /api/tasks`
- `PATCH /api/tasks/:taskId`
- `DELETE /api/tasks/:taskId`

---

## Future Improvements

- Add charts and deeper analytics
- Add revision reminders
- Add planner calendar integration
- Add profile settings
- Add dark mode
- Improve mobile responsiveness

---

## Author

**Vyshnavi Kuchana**

---

## Support

If you like this project, consider giving it a star on GitHub.
```
