import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'

const treatments = [
  {
    name: 'Balinese Traditional Massage',
    description: 'Balinese Therapy combines gentle stretching, long therapeutic stroke, and improve blood circulation. Soft medium pressure.',
    category: 'Massage',
    options: [
      { duration: '60 mins', price: '250k' },
      { duration: '90 mins', price: '370k' },
      { duration: '120 mins', price: '450k' }
    ]
  },
  {
    name: 'Signature Warm Oil Massage',
    description: 'Massage using warm oil and aromatic experience will be achieve during this treatment. A choice of specially blended pure essential oils to help achieve an overall sense of wellbeing and will leave you in total relaxation.',
    category: 'Massage',
    options: [
      { duration: '60 mins', price: '250k' },
      { duration: '90 mins', price: '370k' },
      { duration: '120 mins', price: '450k' }
    ]
  },
  {
    name: 'Hot Stone Massage',
    description: 'Melt tension away with a hot stone massage using smooth, heated stones that will be soothed with the right amount of pressure to encourage muscles to warmup and relax.',
    category: 'Massage',
    options: [
      { duration: '60 mins', price: '250k' },
      { duration: '90 mins', price: '370k' },
      { duration: '120 mins', price: '450k' }
    ]
  },
  {
    name: 'Deep Tissue Massage',
    description: 'Firm and slow pressure will be applied. Release the tension and stiffness of your muscle from tiring or after work out session.',
    category: 'Massage',
    options: [
      { duration: '60 mins', price: '250k' },
      { duration: '90 mins', price: '370k' },
      { duration: '120 mins', price: '450k' }
    ]
  },
  {
    name: 'Foot Massage',
    description: 'Based on principles that there are reflexes in the feet that correspond to every organ. Pressure is applied to this point to relieve tension, improve circulation of whole body.',
    category: 'Massage',
    options: [
      { duration: '60 mins', price: '250k' },
      { duration: '90 mins', price: '330k' }
    ]
  },
  {
    name: 'Back & Head Massage',
    description: 'Focused on relieving specific stress and muscle tension around back, shoulder, neck.',
    category: 'Massage',
    options: [
      { duration: '30 mins', price: '150k' },
      { duration: '60 mins', price: '250k' }
    ]
  },
  {
    name: 'Shiatsu',
    description: 'Is dry massage modified form of acupressure that involves pressing specific points in the body to reduce tension and fatigue by improving blood and lymphatic circulation.',
    category: 'Massage',
    options: [
      { duration: '60 mins', price: '250k' },
      { duration: '90 mins', price: '370k' },
      { duration: '120 mins', price: '450k' }
    ]
  },
  {
    name: 'Face Lifting Massage',
    description: 'Offers relaxation and antiaging by stimulating circulation to nourish skin, draining lymph to reduce puffiness, toning facial muscles for smoothing fine lines.',
    category: 'Facial',
    options: [
      { duration: '30 mins', price: '150k' },
      { duration: '60 mins', price: '250k' }
    ]
  },
  {
    name: 'Body Scrub',
    description: 'Removing dead skin cells from the surface to make your skin smoother, brighter, and healthier.',
    category: 'Body Treatment',
    options: [
      { duration: '30 mins', price: '150k' },
      { duration: '60 mins', price: '250k' }
    ]
  },
  {
    name: 'Water Healing Head Spa (60 min)',
    description: 'Holistic treatment focusing on deep scalp cleansing, nourishment, and therapeutic massage to promote hair health and total relaxation. Includes welcome drink, hair oil vitamin, head massage, face cleansing, face massage, shoulder massage, hair wash & hair mask, water healing spa, hand massage, hair dry (no styling), and closing drink.',
    category: 'Head Spa',
    options: [
      { duration: '60 mins', price: '375k' }
    ]
  },
  {
    name: 'Water Healing Head Spa (90 min)',
    description: 'Holistic treatment focusing on deep scalp cleansing, nourishment, and therapeutic massage to promote hair health and total relaxation. Includes welcome drink, hair oil vitamin, head massage, face cleansing, face massage, shoulder massage, facemask, hair wash, hair mask, water healing spa, hand massage, hair dry (no styling), hair tonic, and closing drink.',
    category: 'Head Spa',
    options: [
      { duration: '90 mins', price: '475k' }
    ]
  },
  {
    name: 'Water Healing Head Spa (120 min)',
    description: 'Holistic treatment focusing on deep scalp cleansing, nourishment, and therapeutic massage to promote hair health and total relaxation. Includes welcome drink, hair oil vitamin, head massage, face cleansing, face massage, shoulder massage, facemask, hair wash, hair mask, water healing spa, hand massage, foot massage, hair dry (no styling), hair tonic, and closing drink.',
    category: 'Head Spa',
    options: [
      { duration: '120 mins', price: '575k' }
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