import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

// ==================== DATA MODELS ====================

interface TreatmentOption {
  duration: string
  price: string
}

interface Treatment {
  name: string
  description: string
  options: TreatmentOption[]
  image?: string
  category?: string
  featured?: boolean
}

interface Testimonial {
  name: string
  comment: string
  rating: number
  image?: string
  date?: string
  verified?: boolean
  treatment?: string
}

interface BlogPost {
  title: string
  content: string
  excerpt: string
  author: string
  publishedDate: string
  modifiedDate: string
  image?: string
  category?: string
  tags?: string[]
  published?: boolean
}

interface SiteSettings {
  contactEmail: string
  contactPhone: string
  whatsappNumber: string
  address: string
  openingHours: string
  socialMedia: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }
  bookingUrl?: string
}

// ==================== SEED DATA ====================

const treatments: Treatment[] = [
  {
    name: 'Balinese Traditional Massage',
    description: 'A deeply relaxing massage using traditional Balinese techniques to relieve tension, improve circulation, and restore balance.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ],
    category: 'massage',
    featured: true
  },
  {
    name: 'Signature Kae Warm Oil Massage',
    description: 'Our signature massage with warm oil to soothe muscles, nourish the skin, and promote deep relaxation.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ],
    category: 'massage',
    featured: true
  },
  {
    name: 'Deep Tissue Massage',
    description: 'A therapeutic massage targeting deeper muscle layers to release chronic tension and knots.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ],
    category: 'massage'
  },
  {
    name: 'Hot Stone Massage',
    description: 'Smooth, heated stones are used to melt away tension and enhance relaxation throughout your body.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ],
    category: 'massage'
  },
  {
    name: 'Shiatsu Massage',
    description: 'A Japanese technique using finger pressure to balance energy flow and promote overall wellness.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ],
    category: 'massage'
  },
  {
    name: 'Back & Head Massage',
    description: 'Focused on the back, neck, and head to relieve stress, tension, and headaches.',
    options: [
      { duration: '30 min', price: '150K' },
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '330K' }
    ],
    category: 'massage',
    featured: true
  },
  {
    name: 'Foot & Back Massage',
    description: 'A revitalizing massage for tired feet and a soothing treatment for your back.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '330K' }
    ],
    category: 'massage'
  },
  {
    name: 'Foot Massage',
    description: 'Relieve fatigue and improve circulation with a relaxing foot massage.',
    options: [
      { duration: '30 min', price: '150K' },
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '330K' }
    ],
    category: 'massage',
    featured: true
  },
  {
    name: 'Face Massage',
    description: 'A gentle massage to rejuvenate your skin and promote a healthy, radiant glow.',
    options: [
      { duration: '30 min', price: '150K' },
      { duration: '60 min', price: '250K' }
    ],
    category: 'facial',
    featured: true
  },
  {
    name: 'Aromatherapy Massage',
    description: 'A relaxing massage combined with essential oils to enhance your mood and promote wellness.',
    options: [
      { duration: '60 min', price: '280K' },
      { duration: '90 min', price: '400K' },
      { duration: '120 min', price: '500K' }
    ],
    category: 'massage'
  },
  {
    name: 'Body Scrub',
    description: 'Exfoliating treatment to remove dead skin cells and reveal smooth, radiant skin.',
    options: [
      { duration: '45 min', price: '200K' },
      { duration: '60 min', price: '280K' }
    ],
    category: 'body'
  },
  {
    name: 'Reflexology',
    description: 'Pressure point massage on feet and hands to promote healing throughout the body.',
    options: [
      { duration: '30 min', price: '150K' },
      { duration: '60 min', price: '250K' }
    ],
    category: 'massage'
  }
]

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    comment: 'The massage was absolutely amazing! The therapist was very professional and the ambiance was perfect for relaxation. I left feeling completely rejuvenated.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    date: '2024-01-15',
    verified: true,
    treatment: 'Balinese Traditional Massage'
  },
  {
    name: 'Michael Chen',
    comment: 'Best spa experience I\'ve ever had. The facial treatment left my skin glowing and refreshed. The staff was incredibly attentive.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    date: '2024-01-10',
    verified: true,
    treatment: 'Face Massage'
  },
  {
    name: 'Emily Rodriguez',
    comment: 'The staff was incredibly welcoming and the facilities were immaculate. The warm oil massage was divine! Will definitely be coming back.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    date: '2024-01-08',
    verified: true,
    treatment: 'Signature Kae Warm Oil Massage'
  },
  {
    name: 'David Wilson',
    comment: 'The hot stone massage was exactly what I needed after a long week. The therapist found all my tension points. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    date: '2024-01-05',
    verified: true,
    treatment: 'Hot Stone Massage'
  },
  {
    name: 'Aisha Patel',
    comment: 'Amazing foot massage! After days of walking around Bali, this was exactly what my feet needed. Very professional service.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    date: '2024-01-03',
    verified: true,
    treatment: 'Foot Massage'
  },
  {
    name: 'James Thompson',
    comment: 'The deep tissue massage was intense but exactly what I needed for my back pain. Great technique and knowledge of anatomy.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    date: '2023-12-28',
    verified: true,
    treatment: 'Deep Tissue Massage'
  },
  {
    name: 'Maria Santos',
    comment: 'Loved the aromatherapy massage! The scents were heavenly and the massage technique was perfect. Pure bliss.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    date: '2023-12-20',
    verified: true,
    treatment: 'Aromatherapy Massage'
  },
  {
    name: 'Robert Kim',
    comment: 'The body scrub followed by massage was the perfect combination. My skin has never felt smoother!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    date: '2023-12-15',
    verified: true,
    treatment: 'Body Scrub'
  },
  {
    name: 'Lisa Anderson',
    comment: 'First time trying Shiatsu and it was incredible! The therapist explained everything and I felt so balanced afterwards.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    date: '2023-12-10',
    verified: true,
    treatment: 'Shiatsu Massage'
  },
  {
    name: 'Tom Bradley',
    comment: 'The back and head massage was perfect for my stress headaches. Immediate relief! Great value for money.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
    date: '2023-12-05',
    verified: true,
    treatment: 'Back & Head Massage'
  }
]

const blogPosts: BlogPost[] = [
  {
    title: 'The Benefits of Balinese Massage for Stress Relief',
    excerpt: 'Discover how traditional Balinese massage techniques can help reduce stress and promote overall wellness.',
    content: `<p>Balinese massage is a traditional healing technique that has been practiced for centuries on the Indonesian island of Bali. This full-body, deep-tissue, holistic treatment combines acupressure, reflexology, and stretching to stimulate blood flow, oxygen, and energy around your body.</p>

    <h3>Key Benefits:</h3>
    <ul>
      <li><strong>Stress Relief:</strong> The combination of gentle stretches and acupressure helps release tension stored in muscles.</li>
      <li><strong>Improved Circulation:</strong> The massage techniques stimulate blood flow, delivering oxygen and nutrients throughout your body.</li>
      <li><strong>Better Sleep:</strong> Many clients report improved sleep quality after a Balinese massage session.</li>
      <li><strong>Emotional Balance:</strong> The holistic approach helps balance both physical and emotional well-being.</li>
    </ul>

    <h3>What to Expect:</h3>
    <p>During your session, your therapist will use a combination of gentle stretches, long strokes, skin rolling, and kneading. Essential oils are often incorporated to enhance the relaxation experience. The treatment can be customized to your preference - from gentle relaxation to deeper therapeutic work.</p>

    <p>At KAE Spa, our trained therapists bring years of experience in traditional Balinese techniques, ensuring an authentic and transformative experience.</p>`,
    author: 'KAE Spa Team',
    publishedDate: '2024-01-20T10:00:00Z',
    modifiedDate: '2024-01-20T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=600&fit=crop',
    category: 'Wellness',
    tags: ['massage', 'stress relief', 'balinese'],
    published: true
  },
  {
    title: 'Choosing the Right Massage for Your Needs',
    excerpt: 'Not sure which massage treatment is right for you? Our guide helps you choose based on your needs.',
    content: `<p>With so many massage options available, it can be overwhelming to choose the right treatment. At KAE Spa, we offer various massage techniques, each designed to address specific needs.</p>

    <h3>For Relaxation:</h3>
    <ul>
      <li><strong>Balinese Traditional Massage:</strong> Perfect for overall relaxation and stress relief.</li>
      <li><strong>Signature Kae Warm Oil Massage:</strong> Our unique blend of techniques with warm, nourishing oils.</li>
      <li><strong>Aromatherapy Massage:</strong> Combines massage with essential oils for enhanced relaxation.</li>
    </ul>

    <h3>For Pain Relief:</h3>
    <ul>
      <li><strong>Deep Tissue Massage:</strong> Targets chronic muscle tension and knots.</li>
      <li><strong>Back & Head Massage:</strong> Focused treatment for back pain and headaches.</li>
    </ul>

    <h3>For Specific Areas:</h3>
    <ul>
      <li><strong>Foot Massage:</strong> Perfect for tired feet and improved circulation.</li>
      <li><strong>Face Massage:</strong> Promotes radiant skin and relieves facial tension.</li>
      <li><strong>Reflexology:</strong> Pressure points on feet correspond to body organs and systems.</li>
    </ul>

    <p>Our therapists are always happy to recommend the best treatment based on your specific needs and preferences.</p>`,
    author: 'KAE Spa Team',
    publishedDate: '2024-01-15T10:00:00Z',
    modifiedDate: '2024-01-15T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&h=600&fit=crop',
    category: 'Guide',
    tags: ['massage', 'guide', 'wellness'],
    published: true
  },
  {
    title: 'After-Spa Care: Making Your Treatment Last',
    excerpt: 'Learn how to extend the benefits of your spa treatment with these simple aftercare tips.',
    content: `<p>Your spa treatment doesn't end when you leave our doors. With proper aftercare, you can extend the benefits of your massage or facial treatment for days to come.</p>

    <h3>Hydrate, Hydrate, Hydrate</h3>
    <p>Drinking plenty of water after your treatment helps flush out toxins released during massage and keeps your skin hydrated after facials.</p>

    <h3>Take It Easy</h3>
    <p>Allow yourself time to rest after your treatment. Avoid strenuous exercise for at least 24 hours to let your body continue to reap the benefits.</p>

    <h3>Warm Bath</h3>
    <p>A warm bath with Epsom salts can help further relax muscles and enhance the effects of your massage.</p>

    <h3>Skin Care</h3>
    <p>After body scrubs or facials, avoid direct sun exposure and use gentle, nourishing products on your skin.</p>

    <h3>Regular Treatments</h3>
    <p>For lasting benefits, consider scheduling regular treatments. Monthly sessions can help maintain optimal wellness.</p>

    <p>At KAE Spa, we're always available to answer your questions about aftercare and recommend products to support your wellness journey.</p>`,
    author: 'KAE Spa Team',
    publishedDate: '2024-01-10T10:00:00Z',
    modifiedDate: '2024-01-10T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=600&fit=crop',
    category: 'Tips',
    tags: ['aftercare', 'wellness', 'tips'],
    published: true
  },
  {
    title: 'Understanding Hot Stone Therapy',
    excerpt: 'Discover the ancient healing practice of hot stone massage and its modern benefits.',
    content: `<p>Hot stone massage is a specialty massage where the therapist uses smooth, heated stones as an extension of their own hands, or by placing them on the body.</p>

    <h3>The History</h3>
    <p>Hot stone therapy has been used by many cultures around the world for thousands of years. Native Americans used hot stones in sweat lodges, while Chinese medicine has used heated stones for centuries.</p>

    <h3>How It Works</h3>
    <p>The heat from the stones warms and relaxes your muscles, allowing the therapist to apply deeper pressure if desired. The stones are typically made of basalt, a volcanic rock that retains heat well.</p>

    <h3>Benefits Include:</h3>
    <ul>
      <li>Deep muscle relaxation</li>
      <li>Improved circulation</li>
      <li>Reduced stress and anxiety</li>
      <li>Pain relief</li>
      <li>Improved flexibility</li>
    </ul>

    <p>Our Hot Stone Massage at KAE Spa is a customer favorite, perfect for those seeking deep relaxation.</p>`,
    author: 'KAE Spa Team',
    publishedDate: '2024-01-05T10:00:00Z',
    modifiedDate: '2024-01-05T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&h=600&fit=crop',
    category: 'Education',
    tags: ['hot stone', 'massage', 'therapy'],
    published: true
  },
  {
    title: 'Spa Etiquette: A Guide for First-Timers',
    excerpt: 'New to spa visits? Here\'s everything you need to know for a comfortable experience.',
    content: `<p>Visiting a spa for the first time can be intimidating, but at KAE Spa, we want you to feel completely comfortable and relaxed.</p>

    <h3>Arrival Time</h3>
    <p>Please arrive 10-15 minutes early to complete any necessary paperwork and begin your relaxation journey before your treatment.</p>

    <h3>Communication</h3>
    <p>Don't hesitate to communicate with your therapist. Let them know about any areas of concern, pressure preferences, or if anything is uncomfortable.</p>

    <h3>Privacy</h3>
    <p>Your privacy is paramount. You'll always have private space to disrobe, and only the areas being treated will be exposed during your massage.</p>

    <h3>Gratuities</h3>
    <p>While not required, gratuities are appreciated for excellent service. Typical gratuity is 15-20% of the treatment price.</p>

    <h3>After Your Treatment</h3>
    <p>Take your time getting up - you may feel relaxed or even slightly groggy. We're happy to provide water and let you rest before leaving.</p>

    <p>Remember, our staff is here to ensure you have the best possible experience. Never hesitate to ask questions!</p>`,
    author: 'KAE Spa Team',
    publishedDate: '2023-12-20T10:00:00Z',
    modifiedDate: '2023-12-20T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=600&fit=crop',
    category: 'Guide',
    tags: ['etiquette', 'guide', 'first-timers'],
    published: true
  }
]

const siteSettings: SiteSettings = {
  contactEmail: 'info@kaespabali.com',
  contactPhone: '+62 821 4721 5031',
  whatsappNumber: '6282147215031',
  address: 'Jalan Raya Seminyak, Kuta, Badung, Bali, Indonesia',
  openingHours: 'Monday - Sunday: 9:00 AM - 9:00 PM',
  socialMedia: {
    instagram: 'https://instagram.com/kaespabali',
    facebook: 'https://facebook.com/kaespabali',
    tiktok: 'https://tiktok.com/@kaespabali'
  },
  bookingUrl: 'https://www.fresha.com/id/book-now/kae-spa-bali-c85srrpb/all-offer?share&pId=2564564'
}

// ==================== SEED FUNCTIONS ====================

async function seedTreatments() {
  console.log('🌿 Seeding treatments...')
  try {
    // Check if treatments already exist
    const existingTreatments = await getDocs(collection(db, 'treatments'))
    if (!existingTreatments.empty) {
      console.log('✓ Treatments already exist. Skipping.')
      return
    }

    const treatmentsCollection = collection(db, 'treatments')
    for (const treatment of treatments) {
      await addDoc(treatmentsCollection, treatment)
      console.log(`  ✓ Added: ${treatment.name}`)
    }
    console.log(`✓ Seeded ${treatments.length} treatments`)
  } catch (error) {
    console.error('✗ Error seeding treatments:', error)
  }
}

async function seedTestimonials() {
  console.log('⭐ Seeding testimonials...')
  try {
    // Check if testimonials already exist
    const existingTestimonials = await getDocs(collection(db, 'testimonials'))
    if (!existingTestimonials.empty) {
      console.log('✓ Testimonials already exist. Skipping.')
      return
    }

    const testimonialsCollection = collection(db, 'testimonials')
    for (const testimonial of testimonials) {
      await addDoc(testimonialsCollection, testimonial)
      console.log(`  ✓ Added testimonial from: ${testimonial.name}`)
    }
    console.log(`✓ Seeded ${testimonials.length} testimonials`)
  } catch (error) {
    console.error('✗ Error seeding testimonials:', error)
  }
}

async function seedBlogPosts() {
  console.log('📝 Seeding blog posts...')
  try {
    // Check if blog posts already exist
    const existingPosts = await getDocs(collection(db, 'blogPosts'))
    if (!existingPosts.empty) {
      console.log('✓ Blog posts already exist. Skipping.')
      return
    }

    const blogCollection = collection(db, 'blogPosts')
    for (const post of blogPosts) {
      await addDoc(blogCollection, post)
      console.log(`  ✓ Added: ${post.title}`)
    }
    console.log(`✓ Seeded ${blogPosts.length} blog posts`)
  } catch (error) {
    console.error('✗ Error seeding blog posts:', error)
  }
}

async function seedSiteSettings() {
  console.log('⚙️ Seeding site settings...')
  try {
    // Use a fixed document ID for settings
    const settingsRef = doc(db, 'settings', 'site')
    await setDoc(settingsRef, siteSettings, { merge: true })
    console.log('✓ Site settings configured')
  } catch (error) {
    console.error('✗ Error seeding site settings:', error)
  }
}

async function createAdminUser() {
  console.log('👤 Creating admin user...')
  const adminEmail = 'admin@kaespabali.com'
  const adminPassword = 'Admin123!'

  try {
    // Check if admin already exists by trying to sign in
    // For simplicity, we'll just try to create
    await createUserWithEmailAndPassword(auth, adminEmail, adminPassword)
    console.log(`✓ Admin user created: ${adminEmail}`)
    console.log(`  Password: ${adminPassword}`)
    console.log('  ⚠️ Please change this password after first login!')
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✓ Admin user already exists.')
    } else {
      console.error('✗ Error creating admin user:', error.message)
    }
  }
}

// ==================== MAIN SEED FUNCTION ====================

async function seedAll() {
  console.log('\n🌺 KAE Spa Bali - Firebase Data Seeding 🌺\n')
  console.log('=' .repeat(50))

  await seedTreatments()
  await seedTestimonials()
  await seedBlogPosts()
  await seedSiteSettings()
  await createAdminUser()

  console.log('=' .repeat(50))
  console.log('\n✅ Seeding completed!\n')

  process.exit(0)
}

// Run the seeding
seedAll().catch((error) => {
  console.error('✗ Seeding failed:', error)
  process.exit(1)
})
