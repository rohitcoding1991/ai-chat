### Chat GPT Clone using Next.js

This project is a Full Stack Next.js-based chat gpt clone using modern technologies and APIs for a seamless chat experience.

#### Technologies Used:

- **Next.js 14**: React framework for building server-rendered applications.
- **Shadcn**: Custom CSS framework for styling components.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **GROQ**: Query language for accessing data from Sanity.io API.
- **Vercel AI SDK**: SDK for integrating AI-powered chat streaming from Vercel.
- **Auth.js v5**: Library for Google Authentication.
- **Prisma**: Database toolkit for Node.js and TypeScript.
- **Zustand**: Minimalistic state management for React.

#### Requirements:

- **Node.js version 20.9.0+** required.

#### Clone Project:

To clone the repository, run the following command:

```bash
git clone https://github.com/rohitcoding1991/ai-chat.git
cd ai-chat
```

#### Steps to Run the Project:

1. **Generate Environment Keys**:
   - Generate necessary keys and tokens for the `.env` file.

2. **Set up Database URI**:
   - Obtain a database URI (e.g., from https://neon.tech/) and set it as `DATABASE_URL` in `.env`.

3. **Configure Google Authentication**:
   - Create a project on https://console.cloud.google.com/.
   - Generate `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` and add them to `.env`.

4. **Set up GROQ API Key**:
   - Create a [GROQ](https://console.groq.com/docs/quickstart) keyand set it as `GROQ_CLOUD_API_KEY` in `.env`.

5. **Install Dependencies**:
   - Install project dependencies using npm:

     ```bash
     npm install
     ```

6. **Generate Prisma Client**:
   - Generate Prisma client using:

     ```bash
     npm run prisma-generate
     ```

7. **Run Development Server**:
   - Start the development server:

     ```bash
     npm run dev
     ```

This project aims to demonstrate the integration of AI-powered chat capabilities, Google Authentication, and modern state management and UI frameworks within a Next.js application.