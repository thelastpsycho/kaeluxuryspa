# Kae Spa Website

A modern and elegant spa website built with Vue.js, TypeScript, and Firebase.

## Features

- Responsive design with mobile-first approach
- Elegant and clean UI with custom color palette
- Firebase integration for data storage
- Booking system
- Testimonials carousel
- Contact form with Google Maps integration
- WhatsApp integration for direct communication
- Beautiful hero section with dynamic background
- Smooth scrolling navigation

## Tech Stack

- Vue.js 3 with TypeScript
- Vite
- Tailwind CSS
- Firebase (Firestore)
- Vue Router
- Pinia

## Project Structure

```
kaespa/
├── src/
│   ├── assets/         # Static assets (images, SVGs)
│   │   ├── sections/   # Page sections
│   │   └── ui/         # UI components
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores
│   └── views/          # Page components
├── public/             # Public assets
└── dist/              # Production build
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Firebase Setup

1. Create a new Firebase project
2. Enable Firestore database
3. Create the following collections:
   - services
   - bookings
   - testimonials
   - inquiries

## Netlify Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Sign in to Netlify and click "New site from Git"

3. Choose your repository

4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (or your preferred version)

5. Add your environment variables in the Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add all your Firebase environment variables
   - Add any other environment variables your app needs

6. Optional: Configure custom domain
   - Go to Domain settings
   - Add your custom domain
   - Follow the DNS configuration instructions

7. Enable automatic deployments:
   - Netlify will automatically deploy when you push to your main branch
   - You can also set up branch deployments for previews

## Customization

### Colors

The color palette can be customized in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'spa-bg': '#FFFDF6',
      'spa-accent-1': '#FAF6E9',
      'spa-accent-2': '#DDEB9D',
      'spa-accent-3': '#A0C878',
    },
  },
},
```

### Images

Replace the placeholder images in the `public/images` directory with your own spa images.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## License

MIT
