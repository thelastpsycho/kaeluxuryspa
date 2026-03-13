# Kae Luxury Spa Website

A modern, elegant spa website built with Vue 3, TypeScript, and Firebase. Experience Balinese healing traditions meets contemporary luxury.

![Kae Luxury Spa](https://img.shields.io/badge/Vue-3.5-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue) ![Vite](https://img.shields.io/badge/Vite-4.5-646cff)

## ✨ Features

- 🎨 **Elegant Design** - Luxury aesthetic with custom emerald and gold color palette
- 📱 **Fully Responsive** - Mobile-first approach, works perfectly on all devices
- 🔥 **Firebase Integration** - Real-time data with Firestore
- 📅 **Booking System** - Easy appointment scheduling via WhatsApp
- ⭐ **Testimonials** - Customer reviews carousel
- 🗺️ **Google Maps** - Location integration
- 💬 **WhatsApp Integration** - Direct communication with visitors
- 🌅 **Hero Section** - Dynamic background with trust badges (5-star rating, expert therapists, hours)
- 🧭 **Smooth Navigation** - Seamless scrolling and SPA routing
- 🎭 **Splash Screen** - Elegant loading animation

## 🛠️ Tech Stack

- **Framework**: Vue.js 3 with Composition API & TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Backend**: Firebase (Firestore)
- **Deployment**: Netlify

## 📁 Project Structure

```
kaeluxuryspa/
├── src/
│   ├── assets/           # Static assets (images, SVGs, logos)
│   ├── components/       # Vue components
│   │   ├── sections/     # Page sections (Hero, About, Services, etc.)
│   │   └── ui/           # Reusable UI components
│   ├── router/           # Vue Router configuration
│   ├── services/         # API services (menuService, etc.)
│   ├── stores/           # Pinia stores
│   ├── style.css         # Global styles
│   └── views/            # Page components
├── public/               # Public assets (favicons, etc.)
├── netlify.toml          # Netlify configuration
├── .env.example          # Environment variables template
└── package.json          # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kaeluxuryspa.git
   cd kaeluxuryspa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Fill in your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run migrate` | Run data migration script |
| `npm run seed` | Seed database with sample data |

## 🔥 Firebase Setup

1. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project

2. **Enable Firestore Database**
   - Navigate to Firestore Database
   - Click "Create Database"
   - Choose production or test mode

3. **Configure Collections**
   - `services` - Spa treatments and pricing
   - `bookings` - Appointment bookings
   - `testimonials` - Customer reviews
   - `inquiries` - Contact form submissions

## 🌐 Deployment

### Netlify (Recommended)

The project includes a `netlify.toml` configuration file for easy deployment.

#### Via Netlify Dashboard:

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Configure build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site Settings → Environment variables
7. Deploy!

#### Via Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Environment Variables for Production

Add these in Netlify (Site Settings → Environment variables):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

## 🎨 Customization

### Colors

Edit the color palette in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'kae-green': '#1A3A32',
      'kae-beige': '#F5F1E8',
      'kae-gold': '#B8860B',
      'kae-gold-light': '#D4A437',
    },
  },
}
```

### Logo

Replace the logo in `src/assets/`:
- `kae_logo_gold.svg` - Gold version for dark backgrounds
- `kae_logo_black.svg` - Black version for light backgrounds

### Images

Update images in:
- `src/assets/` - Component-specific images
- `public/` - Static assets

## 📄 License

MIT License - feel free to use this project for your own spa website!

## 👨‍💻 Author

Built for Kae Luxury Spa - Bali

---

**Enjoy your spa website! 🌺**
