# HireFlow – Modern Job Portal Platform

## Overview

HireFlow is a modern full-stack job portal designed to connect job seekers with recruiters through a clean, responsive, and intuitive user experience.

The platform enables candidates to search and discover jobs, view detailed job information, apply for positions, manage applications, and maintain resumes. Recruiters can register, log in, and manage job postings through a dedicated dashboard interface.

The application is built with React, React Router, Clerk Authentication, Context API, and modern UI libraries to deliver a scalable and user-friendly recruitment platform.

---

# Features

## Candidate Features

### Job Search & Discovery

- Browse all available job listings
- Search jobs by:
  - Job title
  - Company name
  - Location

- Filter jobs using:
  - Job categories
  - Locations

- Dynamic filtering using React Context API
- Pagination support for large job datasets

### Featured Jobs

- Homepage highlights selected featured jobs
- Quick access to top opportunities
- Direct navigation to full job listings

### Job Details

Each job listing contains:

- Job title
- Company information
- Salary details
- Job category
- Experience level
- Location
- Detailed job description
- Job overview section

### Application Management

Candidates can:

- Upload resumes
- Replace existing resumes
- Remove uploaded resumes
- View previously applied jobs
- Track application status

Supported statuses include:

- Accepted
- Rejected
- Pending

### User Authentication

Powered by Clerk Authentication:

- User login
- User session management
- Personalized greetings
- Secure account handling
- User profile management

---

## Recruiter Features

### Recruiter Authentication

Recruiters can:

- Register a company account
- Login to existing recruiter accounts
- Upload company logos
- Manage recruiter profile information

### Multi-Step Registration

Recruiter onboarding includes:

#### Step 1

- Company Name
- Email Address
- Password

#### Step 2

- Company Logo Upload

### Dashboard Structure

Recruiter dashboard includes dedicated routes for:

- Add Jobs
- Manage Jobs
- View Applications

Current dashboard architecture is implemented and ready for backend integration.

---

# Technology Stack

## Frontend

- React
- React Router DOM
- Context API
- Clerk Authentication
- Axios
- Lucide React Icons
- React Icons

## Styling

- CSS Modules / Component-based CSS
- Responsive Design
- Mobile-Friendly Layout

## State Management

- React Context API
- Local Component State

## Routing

Implemented using React Router:

| Route                        | Description         |
| ---------------------------- | ------------------- |
| /                            | Homepage            |
| /jobs                        | All Jobs            |
| /jobs/:id                    | Job Details         |
| /applications                | Applied Jobs        |
| /dashboard                   | Recruiter Dashboard |
| /dashboard/add-jobs          | Add Jobs            |
| /dashboard/manage-jobs       | Manage Jobs         |
| /dashboard/view-applications | View Applications   |

---

# Project Structure

```text
src/
│
├── components/
│   ├── Hero
│   ├── NavBar
│   ├── Sidebar
│   ├── JobCards
│   ├── RecruiterLogin
│
├── pages/
│   ├── Home
│   ├── JobsPage
│   ├── JobDetails
│   ├── JobApplications
│   ├── Dashboard
│   ├── AddJobs
│   ├── ManageJobs
│   └── ViewApplications
│
├── context/
│   └── AppContext
│
├── assets/
│   └── Job Data
│
├── styles/
│   └── CSS Files
│
├── App.jsx
└── main.jsx
```

---

# Search & Filtering System

The application uses a centralized Context API architecture.

### Search Filters

```javascript
{
  title: "",
  location: "",
  selectedCategories: [],
  selectedLocations: []
}
```

### Supported Filters

#### Text Filters

- Job Title
- Company Name
- Location

#### Category Filters

Examples:

- Software Development
- Design
- Marketing
- Product Management

#### Location Filters

Examples:

- Remote
- Hybrid
- On-site Locations

---

# Authentication Flow

## Job Seekers

Authentication is managed using Clerk.

Features include:

- Secure sign in
- Session persistence
- User profile management
- Protected user actions

## Recruiters

Recruiter authentication UI supports:

- Login
- Registration
- Company onboarding
- Logo uploads

---

# Responsive Design

HireFlow is optimized for:

- Desktop
- Laptop
- Tablet
- Mobile devices

Responsive features include:

- Mobile filter drawer
- Adaptive navigation
- Flexible job cards
- Responsive search interface

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/hireflow.git
```

## Navigate to Project

```bash
cd hireflow
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Start Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:5173
```

---

# Future Improvements

## Candidate Side

- Resume database integration
- Saved jobs
- Job recommendations
- Application analytics
- Email notifications

## Recruiter Side

- Create job postings
- Edit job postings
- Delete job postings
- Application review workflow
- Candidate shortlisting

## Platform Enhancements

- Backend API integration
- MongoDB database support
- JWT authentication
- Cloud resume storage
- Cloud image uploads
- Real-time notifications
- Admin dashboard
- AI-powered job matching

---

# Learning Outcomes

This project demonstrates practical experience with:

- React Development
- Component Architecture
- React Router
- Context API
- Authentication with Clerk
- State Management
- Dynamic Filtering
- Responsive UI Design
- Form Handling
- Multi-Step Workflows
- Modern Frontend Development Practices

---

# Author

**Angshuman**

Computer Science Undergraduate | Full-Stack Developer | AI Enthusiast

---

# License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute this project for educational and commercial purposes.
