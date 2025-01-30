# sb1-txezekys

A modern CV management application built with React, Vite, and Supabase.

## Features

- CV Management with primary CV selection
- User authentication and authorization
- Secure data storage with Row Level Security
- Modern, responsive UI
- Real-time database updates

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Supabase
- **Styling**: TailwindCSS
- **Deployment**: Vercel

## Development

1. Clone the repository:
```bash
git clone https://github.com/mhuzairi/sb1-txezekys.git
cd sb1-txezekys
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
```

## Database Setup

The project uses Supabase as the backend. To set up the database:

1. Create a new Supabase project
2. Run the migration scripts in `supabase/migrations/`
3. Update your environment variables with the new Supabase credentials

## Deployment

The project is deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Import the project to Vercel
3. Add your Supabase environment variables
4. Deploy!

## Live Demo

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/mhuzairi/sb1-txezekys)

## License

MIT