# Intro

This project is a web app created with NextJS and TailwindCSS. It has some features like:

- Authentication using Supabase auth
- Create multiple boards, open, update and delete boards.
- Create multiple lists, open, update and delete lists.
- Create multiple cards, open, update and delete cards.

## Installation

You need to follow these steps to install this project on your machine:

1. Clone the repo from GitHub.

```bash
git clone git@github.com:CC-Applications/gilang-2023-11.git
```

2. Open the directory and run `npm install` to install `node_modules`.

```bash
npm install
```

3. Sign in and create a project in [Supabase](https://supabase.com/).

4. Integration with Prisma (Coming soon)

5. Create `.env.local` in root directory and fill it with supabase url and anon key you got from this [page](https://app.supabase.io/project/YOUR_PROJECT_ID/settings/api) in Supabase.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

6. Run the project with `npm run dev`.

```bash
npm run dev
```

#### Source of Inspiration
https://medium.com/@gattigaga/show-time-shoryuken-trello-like-web-app-using-nextjs-and-tailwindcss-271461394849
