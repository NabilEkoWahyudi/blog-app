export const metadata = {
  title: "BlogApp - Home",
  description:
    "A modern blog platform built with Next.js, Drizzle ORM, and NextAuth.js",
}

// Homepage content rendered from markdown-like structure
// MDX file available at app/homepage.mdx (for development with next dev)
export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="markdown prose max-w-none">
        <h1>Welcome to BlogApp 🚀</h1>
        <p>
          A modern blog platform built with <strong>Next.js 16</strong>,{" "}
          <strong>Drizzle ORM</strong>, and <strong>NextAuth.js</strong>.
        </p>
        <hr />
        <h2>Features</h2>
        <ul>
          <li>
            📝 <strong>Create &amp; read blogs</strong> with full authentication
          </li>
          <li>
            🔐 <strong>Secure login</strong> with NextAuth.js and bcrypt
          </li>
          <li>
            📚 <strong>Personal reading list</strong> to track what you&apos;ve
            read
          </li>
          <li>
            🔑 <strong>API token</strong> for programmatic access
          </li>
          <li>
            ✨ <strong>Modern UI</strong> with Tailwind CSS
          </li>
        </ul>
        <hr />
        <h2>Getting Started</h2>
        <ol>
          <li>
            <strong>Register</strong> a new account using the link in the
            navigation bar
          </li>
          <li>
            <strong>Login</strong> with your credentials
          </li>
          <li>
            <strong>Browse</strong> existing blogs or create your own
          </li>
          <li>
            <strong>Manage</strong> your reading list from your personal page
          </li>
        </ol>
        <hr />
        <h2>Tech Stack</h2>
        <ul>
          <li>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>{" "}
            — React framework with App Router
          </li>
          <li>
            <a
              href="https://orm.drizzle.team"
              target="_blank"
              rel="noopener noreferrer"
            >
              Drizzle ORM
            </a>{" "}
            — Type-safe SQL ORM
          </li>
          <li>
            <a
              href="https://authjs.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              NextAuth.js
            </a>{" "}
            — Authentication for Next.js
          </li>
          <li>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS
            </a>{" "}
            — Utility-first CSS framework
          </li>
          <li>
            <a
              href="https://neon.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neon
            </a>{" "}
            — Serverless PostgreSQL
          </li>
        </ul>
        <hr />
        <p>
          <em>Full Stack Open — Chapter 4</em>
        </p>
      </div>
    </div>
  )
}
