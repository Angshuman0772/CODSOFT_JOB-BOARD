# HireFlow Project Documentation

_A complete architectural walkthrough of your React Job Portal_

This documentation is written as if you're returning to the project 6–12 months from now and need to understand everything quickly.

---

# 1. Project Overview

**HireFlow** is a frontend job portal built using:

- React
- React Router
- Context API
- Clerk Authentication
- CSS Modules/Component CSS
- Static mock data (`jobsData`, `jobsApplied`, etc.)

The application supports two user roles:

### Candidate

Can:

- Search jobs
- Filter jobs
- Browse job listings
- View job details
- Apply for jobs
- Upload resume
- View application history

### Recruiter (In Progress)

Can:

- Open recruiter login modal
- Register company
- Upload company logo

Future pages already exist:

- Add Jobs
- Manage Jobs
- View Applications
- Dashboard

but are currently placeholders.

---

# 2. High-Level Architecture

```text
main.jsx
│
├── ClerkProvider
│
├── BrowserRouter
│
├── AppContextProvider
│
└── App.jsx
     │
     ├── Home
     ├── Jobs
     ├── JobDetails
     ├── JobApplications
     └── Dashboard
```

Startup flow:

```text
main.jsx
    ↓
Creates React App
    ↓
Provides Clerk Authentication
    ↓
Provides React Router
    ↓
Provides Global AppContext
    ↓
Renders App.jsx
```

This is established in `main.jsx`.

---

# 3. Application Entry Point

## main.jsx

Purpose:

- Creates React root
- Enables routing
- Enables authentication
- Enables global state

```jsx
<ClerkProvider>
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
</ClerkProvider>
```

### Why this structure?

Because every page needs:

- Router access
- Authentication access
- Global filter state

Placing providers at the root avoids prop drilling.

---

# 4. Routing System

## App.jsx

This file is the application's route map.

```text
/
│
├── Home
│
├── /jobs
│
├── /jobs/:id
│
├── /applications
│
└── /dashboard
     ├── add-jobs
     ├── manage-jobs
     └── view-applications
```

Routes:

```jsx
<Route path="/" />
<Route path="/jobs" />
<Route path="/jobs/:id" />
<Route path="/applications" />
<Route path="/dashboard" />
```

Dynamic route:

```jsx
/jobs/:id
```

allows:

```text
/jobs/123
/jobs/456
/jobs/789
```

to render different jobs.

---

# 5. Global State Management

## AppContext.jsx

This is the brain of the application.

Everything shared across pages lives here.

---

## Stored State

### Search Filters

```jsx
searchFilter;
```

contains:

```js
{
  title: "",
  location: "",
  selectedCategories: [],
  selectedLocations: []
}
```

Used everywhere search/filtering is needed.

---

### Search Status

```jsx
isSearched;
```

Tracks whether a search has occurred.

Used to determine whether filter chips should appear.

---

### Mobile Filters

```jsx
showFilters;
```

Controls sidebar visibility on mobile.

---

### Recruiter Modal

```jsx
showRecruiterLogin;
```

Controls recruiter popup visibility.

---

# 6. Job Filtering Engine

This is arguably the most important logic in the entire project.

Inside AppContext:

```jsx
const filteredJobs = jobsData.filter(...)
```

Every job is checked against:

### Title Search

```jsx
job.title.includes(searchFilter.title);
```

Example:

```text
Search:
"react"

Matches:
React Developer
Senior React Engineer
```

---

### Location Search

```jsx
job.location.includes(searchFilter.location);
```

Example:

```text
Input:
London

Matches:
London
Greater London
```

---

### Category Filters

```jsx
selectedCategories.includes(job.category);
```

Example:

```text
Frontend
Backend
Full Stack
```

---

### Location Checkbox Filters

```jsx
selectedLocations.includes(job.location);
```

---

Final result:

```jsx
titleMatch && searchLocationMatch && categoryMatch && locationMatch;
```

Only jobs satisfying ALL conditions survive.

---

# 7. Search Flow

One of the most important flows in the project.

---

## Step 1

User types:

```text
Job Title
Location
```

inside Hero component.

Hero uses:

```jsx
useRef();
```

to access input values.

---

## Step 2

User clicks:

```text
Search Job
```

---

## Step 3

Hero executes:

```jsx
handleSearch();
```

which:

```jsx
setSearchFilter(...)
```

updates global state.

---

## Step 4

Marks search as active:

```jsx
setIsSearched(true);
```

---

## Step 5

Redirects:

```jsx
navigate("/jobs");
```

---

## Step 6

JobsPage receives:

```jsx
filteredJobs;
```

from Context.

---

## Result

```text
Hero Search
    ↓
Context Updates
    ↓
JobsPage Reads Context
    ↓
Filtered Jobs Display
```

---

# 8. Home Page Architecture

## Home.jsx

Purpose:

Landing page.

Structure:

```text
Navbar
│
Hero
│
Sidebar
│
Featured Jobs
```

Jobs shown:

```jsx
jobsData.slice(0, 6);
```

Only first 6 jobs appear as featured jobs.

---

# 9. Hero Section

## Hero.jsx

Purpose:

Primary search entry point.

Contains:

### Search Inputs

```jsx
Job Title
Location
```

### Search Button

Triggers filtering workflow.

---

### Stats

Static values:

```text
25,850 Jobs
10,250 Candidates
18,400 Companies
```

Purely presentational.

---

### Company Strip

Displays:

- Spotify
- Cloudflare
- Discord
- Asana
- Linear

Used as social proof.

---

# 10. Sidebar Architecture

## Sidebar.jsx

Purpose:

Filter control center.

---

## Search Filters

Allows:

```text
Job Title
Location
```

updates Context instantly.

---

## Category Filters

Checkboxes:

```text
Frontend
Backend
...
```

Uses:

```jsx
toggleCategory();
```

from Context.

---

## Location Filters

Checkboxes:

```text
London
Berlin
Remote
...
```

Uses:

```jsx
toggleLocation();
```

---

## Redirect Behavior

Home page passes:

```jsx
redirectOnFilter={true}
```

Meaning:

```text
User checks filter
    ↓
Automatically navigates
    ↓
/jobs
```

Nice UX decision because filtering belongs on Jobs page.

---

# 11. Jobs Page

## JobsPage.jsx

Purpose:

Displays all filtered jobs.

---

## Pagination

```jsx
jobsPerPage = 9;
```

Each page shows 9 jobs.

---

## Current Page Logic

```jsx
startIndex = (currentPage - 1) * jobsPerPage;
```

Then:

```jsx
filteredJobs.slice(...)
```

extracts visible jobs.

---

## Search Reset Logic

Whenever filters change:

```jsx
useEffect(() => {
  setCurrentPage(1);
}, [searchFilter]);
```

This prevents:

```text
Page 5
↓
Search
↓
Only 2 results
```

from causing blank pages. Excellent UX choice.

---

# 12. Job Card System

## JobCards.jsx

Reusable job rendering component.

Input:

```jsx
jobs;
```

Output:

```jsx
job cards
```

Each card displays:

- Category
- Title
- Company
- Location
- Level
- Salary

and links to:

```text
/jobs/{id}
```

---

# 13. Job Details Page

## JobDetails.jsx

Purpose:

Detailed job view.

---

## Route Parameter

```jsx
const { id } = useParams();
```

Gets:

```text
/jobs/123
```

↓

```text
id = 123
```

---

## Job Lookup

```jsx
jobsData.find(...)
```

Finds matching job.

---

## Sections

### Left

Contains:

- Logo
- Company
- Salary
- Category
- Description

---

### Right

Contains:

```text
Apply Button
Job Overview
```

---

## HTML Rendering

Uses:

```jsx
dangerouslySetInnerHTML;
```

for job descriptions.

Meaning descriptions are stored as HTML.

---

# 14. Applications Page

## JobApplications.jsx

Purpose:

Candidate dashboard.

---

## Resume System

Current implementation:

```jsx
const [resume, setResume];
```

Local state only.

Not persisted.

If page refreshes:

```text
Resume disappears
```

because backend storage doesn't exist yet.

---

## Resume Flow

```text
Select Resume
      ↓
handleResumeUpload
      ↓
setResume(file)
      ↓
Create Object URL
      ↓
Preview Link
```

---

## Applications Table

Source:

```jsx
jobsApplied;
```

Displays:

- Company
- Job Title
- Location
- Date
- Status

---

# 15. Authentication System

## Clerk Authentication

Used in Navbar.

```jsx
const { user } = useUser();
```

Checks login status.

---

### Logged Out

Shows:

```text
Recruiter Login
Login
```

Buttons.

---

### Logged In

Shows:

```text
Applied Jobs
Hi, User
UserButton
```

---

## Why Clerk?

Benefits:

- No custom auth backend
- User management included
- Sign-in UI included
- Session management included

This is a smart choice for a frontend-heavy portfolio project.

---

# 16. Recruiter Login Architecture

## RecruiterLogin.jsx

Purpose:

Separate recruiter onboarding flow.

---

## Modes

```jsx
login;
register;
```

Controlled by:

```jsx
mode;
```

---

## Registration Flow

### Step 1

Collect:

```text
Company Name
Email
Password
```

### Step 2

Collect:

```text
Company Logo
```

---

## State Machine

```text
login
│
└── submit
     ↓
console.log()

register
│
├── step 1
│      ↓
│    next
│
└── step 2
       ↓
   register
```

Currently backend integration is not implemented.

---

# 17. Dashboard Area (Future Recruiter Portal)

Routes already exist:

```text
/ dashboard
    /add-jobs
    /manage-jobs
    /view-applications
```

Current status:

Placeholder components only.

Intended architecture is likely:

```text
Recruiter Login
      ↓
Dashboard
      ↓
Add Jobs
Manage Jobs
View Applications
```

---

# 18. Engineering Decisions

## Why Context API?

Instead of:

```text
Hero
 ↓
Home
 ↓
App
 ↓
Jobs
```

prop drilling search state,

you created:

```text
AppContext
```

which allows any component to access search filters directly.

Good choice for project size.

---

## Why Reusable JobCards?

Avoids duplicate code between:

```text
Home
Jobs Page
```

Both render jobs through one component.

---

## Why Router Dynamic Params?

Instead of:

```text
/job1
/job2
/job3
```

you use:

```text
/ jobs / :id
```

which scales infinitely.

---

# 19. Current Limitations

### No Backend

Everything is mock data.

### No Database

Jobs are static.

### Resume Not Persistent

Stored only in React state.

### Recruiter Auth Not Real

Only logs data to console.

### Dashboard Not Implemented

Placeholder pages.

### No Protected Routes

Recruiters can theoretically access dashboard routes directly.

### No API Layer

No Axios / Fetch calls yet.

Supported by current source files.

---

# 20. Mental Model (Remember This)

If you forget everything else, remember this:

```text
Hero Search
      ↓
AppContext Stores Filters
      ↓
filteredJobs Computed
      ↓
JobsPage Reads filteredJobs
      ↓
JobCards Render Results
      ↓
JobDetails Uses :id Route
      ↓
Applications Page Tracks Candidate Activity

Authentication
      ↓
Clerk

Recruiter Portal
      ↓
Modal
      ↓
Future Dashboard
```

That single flow explains about 80–90% of how HireFlow currently works. The true center of the application is **AppContext**—it owns the search state, filtering logic, UI visibility state, and recruiter modal state. Everything else either feeds data into it (Hero, Sidebar) or consumes data from it (JobsPage, Navbar, RecruiterLogin).
