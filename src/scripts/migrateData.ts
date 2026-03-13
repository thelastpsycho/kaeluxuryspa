import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'

const treatments = [
  {
    name: 'Balinese Traditional Massage',
    description: 'A deeply relaxing massage using traditional Balinese techniques to relieve tension, improve circulation, and restore balance.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ]
  },
  {
    name: 'Signature Kae Warm Oil Massage',
    description: 'Our signature massage with warm oil to soothe muscles, nourish the skin, and promote deep relaxation.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ]
  },
  {
    name: 'Deep Tissue Massage',
    description: 'A therapeutic massage targeting deeper muscle layers to release chronic tension and knots.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ]
  },
  {
    name: 'Hot Stone Massage',
    description: 'Smooth, heated stones are used to melt away tension and enhance relaxation throughout your body.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ]
  },
  {
    name: 'Shiatsu Massage',
    description: 'A Japanese technique using finger pressure to balance energy flow and promote overall wellness.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '370K' },
      { duration: '120 min', price: '450K' }
    ]
  },
  {
    name: 'Back & Head Massage',
    description: 'Focused on the back, neck, and head to relieve stress, tension, and headaches.',
    options: [
      { duration: '30 min', price: '150K' },
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '330K' }
    ]
  },
  {
    name: 'Foot & Back Massage',
    description: 'A revitalizing massage for tired feet and a soothing treatment for your back.',
    options: [
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '330K' }
    ]
  },
  {
    name: 'Foot Massage',
    description: 'Relieve fatigue and improve circulation with a relaxing foot massage.',
    options: [
      { duration: '30 min', price: '150K' },
      { duration: '60 min', price: '250K' },
      { duration: '90 min', price: '330K' }
    ]
  },
  {
    name: 'Face Massage',
    description: 'A gentle massage to rejuvenate your skin and promote a healthy, radiant glow.',
    options: [
      { duration: '30 min', price: '150K' },
      { duration: '60 min', price: '250K' }
    ]
  }
]

async function migrateData() {
  try {
    const treatmentsCollection = collection(db, 'treatments')
    
    // Add each treatment to Firestore
    for (const treatment of treatments) {
      await addDoc(treatmentsCollection, treatment)
      console.log(`Migrated: ${treatment.name}`)
    }
    
    console.log('Migration completed successfully!')
    process.exit(0) // Exit with success code
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1) // Exit with error code
  }
}

// Run the migration
migrateData() 