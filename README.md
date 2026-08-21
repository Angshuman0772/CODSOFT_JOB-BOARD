# HireFlow Job Portal

HireFlow is a full-stack job portal for discovering roles, applying with a resume, and managing hiring workflows. The repository contains a Vite + React client and an Express + MongoDB API server.

## Features

- Search and filter jobs by title, location, category, and work level.
- Browse job details and submit applications as a candidate.
- Manage candidate profiles and resume uploads.
- Register and authenticate companies with JWT tokens.
- Post jobs, control job visibility, and review application data from the recruiter dashboard.
- Upload company logos and resumes through Cloudinary.
- Use Clerk for candidate authentication and webhook handling.
- Monitor server errors with Sentry.

## Tech Stack

- **Client:** React, Vite, React Router, Context API, Axios, Clerk React, React Toastify
- **Server:** Node.js, Express, MongoDB with Mongoose, Clerk Express, JWT, Multer, Cloudinary, Sentry

## Project Structure

```text
.
├── client/   React/Vite frontend
└── server/   Express API and MongoDB integration
```

For a deeper walkthrough of the frontend architecture, see [client/README.md](client/README.md).

## Getting Started

### Prerequisites

Install the following before starting:

- Node.js 18 or newer
- npm
- A MongoDB deployment and connection string
- A Clerk application
- A Cloudinary account

### 1. Install dependencies

```bash
git clone git@github.com:Angshuman0772/CODSOFT_JOB-BOARD.git
cd CODSOFT_JOB-BOARD

cd server
npm install

cd ../client
npm install
```

### 2. Configure the server

Create `server/.env`:

```dotenv
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLERK_WEBHOOK_SECRET=your-clerk-webhook-signing-secret
```

`MONGODB_URI`, `JWT_SECRET`, and the Cloudinary values are required for the corresponding server features. Keep this file out of version control.

### 3. Configure the client

Create `client/.env`:

```dotenv
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```

The Clerk publishable key must belong to the same Clerk application configured for the server webhook.

### 4. Run the application

Start the API server in one terminal:

```bash
cd server
npm run server
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Available Scripts

### Client

Run these commands from `client/`:

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build            |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

### Server

Run these commands from `server/`:

| Command          | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `npm start`      | Start the API with Node.js                    |
| `npm run server` | Start the API with Nodemon during development |

The API listens on port `5000` by default, or on the port specified by `PORT`.

## Application Routes

The client currently provides these main routes:

- `/` - Browse the home page and search for jobs
- `/jobs` - View and filter job listings
- `/jobs/:id` - View a job and apply
- `/applications` - View candidate applications
- `/dashboard` - Access recruiter dashboard pages when authenticated
- `/dashboard/add-jobs` - Post a job
- `/dashboard/manage-jobs` - Manage company jobs
- `/dashboard/view-applications` - Review applications

The server exposes these API groups:

- `/api/jobs` - Public job listing and job detail reads
- `/api/company` - Company registration, login, job management, and recruiter operations
- `/api/user` - Candidate data, applications, and resume profile updates
- `/webhooks` - Clerk webhook endpoint

## Contributing

1. Create a feature branch from the default branch.
2. Make a focused change and keep client and server changes scoped to the feature.
3. Run `npm run lint` and `npm run build` from `client/`.
4. Exercise the affected server workflow locally with the required environment variables.
5. Open a pull request with a concise description, verification steps, and screenshots for UI changes.

Please avoid committing secrets, generated files, or local environment files. Detailed contribution policies can be added in `CONTRIBUTING.md` as the project grows.

## Support

For setup or usage issues, first review [client/README.md](client/README.md) and the relevant source area under `client/src/` or `server/`. Then open an issue in the [GitHub repository](https://github.com/Angshuman0772/CODSOFT_JOB-BOARD/issues) with your environment, reproduction steps, and relevant logs. Do not include credentials or tokens in an issue.

## Maintainer

HireFlow is maintained by [Angshuman0772](https://github.com/Angshuman0772). Contributions and focused bug reports are welcome through GitHub issues and pull requests.

## License

The server package currently declares the ISC license. See the repository's license file when one is added for the complete license text and terms.
