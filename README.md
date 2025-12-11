# Discord Clone

A modern Discord clone built with Next.js, TypeScript, and Prisma. This application provides real-time chat functionality, voice chat capabilities, and a responsive design with dark/light theme support.

## ✨ Features

- **Real-time chat functionality** - Instant messaging with WebSocket support
- **Channel management** - Create and manage text and voice channels
- **Server creation and management** - Organize your communities
- **User authentication** - Secure login and registration system
- **Private messaging** - Direct communication between users
- **Voice chat capabilities** - Real-time voice communication
- **Responsive design** - Works seamlessly on all devices
- **Dark/light theme toggle** - Choose your preferred theme

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- A database (PostgreSQL recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd discord-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#-environment-variables) section)

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Environment Variables

To run this project, you will need to set up the following environment variables in a `.env.local` file:

```env
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="your_database_connection_string"
```

For production deployment, update NEXTAUTH_URL to your production URL.

### Generating NEXTAUTH_SECRET

You can generate a secure secret key using the following command:
```bash
openssl rand -base64 32
```

## 📁 Project Structure

```
discord-clone/
├── app/                    # Main application pages and routes
│   ├── api/               # API routes
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
│   ├── channels/          # Channel-related components
│   ├── chat/              # Chat components
│   └── servers/           # Server-related components
├── lib/                   # Utility functions and libraries
│   └── auth/              # Authentication utilities
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── src/                   # Source code files
    └── app/               # Next.js app directory
```

## 🔐 Authentication Setup

The application uses NextAuth.js for authentication. Make sure to:

1. Set up the correct NEXTAUTH_SECRET in your environment variables
2. Configure the database connection properly
3. Ensure the Prisma schema matches the authentication requirements
4. Deploy with the correct environment variables on Vercel

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/discord-clone)

When deploying on Vercel, make sure to set the following environment variables:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (set to your Vercel deployment URL)
- `DATABASE_URL`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Prisma Documentation](https://www.prisma.io/docs) - learn about Prisma ORM.
- [NextAuth.js Documentation](https://next-auth.js.org/) - learn about authentication.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 💬 Support

If you have any questions or need help, feel free to open an issue in the repository.
