# CloudVault

A minimal, secure cloud storage service with a focus on privacy and accessibility.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://cloudvault.adityakirti.tech)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?style=for-the-badge)](https://github.com/addy118/cloudvault)

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Core Concepts](#architecture--core-concepts)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Challenges Faced](#challenges-faced)
- [Future Scope](#future-scope)
- [Contributing](#contributing)

## The Problem

Most major cloud storage platforms require tying your account to a personal identity (like a Google or Apple account), which can lead to privacy concerns. Furthermore, the risk of forgetting to log out on a shared or public computer is a significant security liability.

## The Solution

CloudVault offers a straightforward and secure file storage solution using traditional email and password authentication with JWT. It provides a familiar, intuitive user interface similar to Google Drive’s navigation, ensuring a private and accessible user experience without relying on external identity providers.

## Key Features

- **JWT-Based Authentication**: Secure and private login using only an email and password.
- **Full File Management**: Supports file upload, delete, rename, and folder creation.
- **Intuitive Navigation**: Features a breadcrumb-based navigation system, mimicking the user experience of Google Drive.
- **Modern UI/UX**: A fully responsive layout with a user-friendly drag-and-drop interface for file uploads.
- **Privacy-Focused**: No external identity providers or tracking analytics.
- **Isolated Storage**: Each user's files and folder hierarchy are completely isolated from other users.

## Tech Stack

| Frontend     | Backend | Auth   | Storage  | Deployment |
| :----------- | :------ | :----- | :------- | :--------- |
| React        | Node.js | JWT    | Supabase | Vercel     |
| Tailwind CSS | Express | bcrypt |          | Netlify    |

## Architecture & Core Concepts

The application is built with a classic client-server architecture, focusing on secure, stateless authentication and isolated file management.

- **High-Level Architecture**: An overview of the client, server, and storage interactions.
  ![High Level Architecture](https://cdn.jsdelivr.net/gh/addy118/portfolio@master/public/seq-diagrams/cloudvault/cloudvault-hla.svg)
- **Database Schema**: The ERD for the user and file metadata.
  ![Database Schema](https://cdn.jsdelivr.net/gh/addy118/portfolio@master/public/schemas/cloudvault-db.svg)

For a deeper dive into the core logic, visit [here](https://www.adityakirti.tech/projects/cloudvault)

## Getting Started

Follow these instructions to get a local copy of the project up and running for development.

### Prerequisites

- **Node.js** (v16 or newer)
- **npm** or **Yarn**
- **PostgreSQL** database

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/addy118/cloudvault.git
    cd cloudvault
    ```

2.  **Install dependencies**:
    You will need to do this for both the `client` and `server` directories.

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Set up environment variables**:
    In the `server` directory, create a `.env` file and populate it with your credentials.

    **How to Generate Secrets:**
    For `ACCESS_TOKEN`, `REFRESH_TOKEN`, and `SECRET`, you can generate secure random strings by running the following command in your terminal:

    ```sh
      node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

    ```env
    # --- General Settings ---
    PORT=3000
    IS_PROD=false

    # --- JWT Secrets (Generate these yourself) ---
    # Run `openssl rand -hex 32` in your terminal to generate secure secrets
    ACCESS_TOKEN=your_generated_access_token_secret
    REFRESH_TOKEN=your_generated_refresh_token_secret
    SECRET=your_generated_jwt_secret

    # --- Development Database ---
    # Your local PostgreSQL connection string
    DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/cloud-vault?schema=public"

    # --- Supabase (Optional, if you use it for storage/DB) ---
    # Get these from your Supabase project settings
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_KEY=your_supabase_anon_key
    SUPABASE_DB_PASS=your_supabase_db_password
    PROJECT_ID=your_supabase_project_id

    # A default password if needed for seeding or other scripts
    USER_PASS=a_strong_default_password
    ```

4.  **Run database migrations**:
    From the `server` directory, apply the database schema.

    ```bash
    cd server
    npx prisma migrate dev
    ```

5.  **Start the development servers**:
    You need to run the backend and frontend servers in separate terminals.

    ```bash
    # In your first terminal, from the /server directory
    npm run dev

    # In your second terminal, from the /client directory
    npm run dev
    ```

## Challenges Faced

- Ensuring secure, stateless access control without creating persistent login sessions that could be a liability on shared devices.
- Structuring the file storage system to support nested folders while guaranteeing strict user isolation.
- Building a responsive and dynamic breadcrumb navigation component that correctly syncs with the file path state.

## Future Scope

- **File Previews**: Add in-app previews for common file types like PDF, images, and text documents.
- **Cloud Storage Integration**: Migrate the storage backend from the local filesystem to a cloud service like AWS S3 or Cloudinary for scalability.
- **Sharing Features**: Enable multi-user file/folder sharing and secure, link-based access.
- **Two-Factor Authentication (2FA)**: Implement 2FA for an additional layer of account security.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major updates, please open an issue first to discuss the proposed change.
