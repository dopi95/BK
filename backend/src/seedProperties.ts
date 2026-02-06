import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/Property';

dotenv.config();

const properties = [
  {
    name: 'Gold Souq by Akoya Properties',
    slug: 'gold-souq',
    description: 'Step into Gold Souq — a landmark of luxury, prestige, and promise in the heart of Addis Ababa\'s 4 Kilo district. Experience 14 levels of vibrant retail spaces designed for visibility, value, and success.',
    location: '4 Kilo, Behind Ambassador Mall, Addis Ababa',
    price: '',
    type: 'Commercial Building',
    category: 'commercial',
    area: '196 Units Available',
    images: ['/images/gs1.png', '/images/gs2.jpg', '/images/gs3.png', '/images/gs4.jpg', '/images/gs5.jpg', '/images/gs6.jpg'],
    mapUrl: 'https://maps.google.com/?q=4+Kilo,Ambassador+Mall,Addis+Ababa',
    tourVideo: 'https://akoyarealproperty.com/wp-content/uploads/2025/10/Gold-Final.mp4',
    features: ['Event / Common Space', 'Suit Shop', 'Boutique One', 'Boutique Two', 'Gold Shops', 'Cosmetics Shop', 'Swimming Pool', 'Covered Parking', 'Children\'s Play Area', 'Valet Parking', 'EV Charging', 'Fully Finished'],
    order: 1
  },
  {
    name: 'Ameliaz by Akoya Properties',
    slug: 'ameliaz',
    description: 'Ameliaz offers affordable luxury apartments in the heart of Sarbet, one of Addis Ababa\'s most desirable living areas.',
    location: 'Sarbet, Addis Ababa',
    price: '',
    type: '1-3 Bedroom Apartments',
    category: 'apartments',
    area: '120 Units Available',
    images: ['/images/al1.jpg', '/images/al2.jpg', '/images/al3.jpg', '/images/al4.jpg', '/images/al5.jpg'],
    mapUrl: 'https://maps.google.com/?q=Sarbet,Canadian+Embassy,Addis+Ababa',
    tourVideo: 'https://youtu.be/4bPOxraXQjQ?si=E_Wh-SiHn7XzLxI8',
    features: ['Event / Common Space', 'Swimming Pool', 'Valet Parking', 'Gym & Spa', 'Cinema'],
    order: 2
  },
  {
    name: 'Ozone by Akoya Properties',
    slug: 'ozone',
    description: 'Breathe easy at Ozone Apartments, where refreshing living awaits.',
    location: 'Beside Sarem Hotel, Addis Ababa',
    price: '',
    type: '1-3 Bedroom Apartments',
    category: 'apartments',
    area: '105 Units Available',
    images: ['/images/oz1.jpg', '/images/oz2.jpg', '/images/oz3.jpg', '/images/oz4.jpg', '/images/oz5.jpg'],
    mapUrl: 'https://maps.google.com/?q=Sarem+Hotel,Addis+Ababa',
    tourVideo: 'https://youtu.be/ipkOP8TVVEE?si=Pn5ZCCkU_1D8JsYr',
    features: ['Event / Common Space', 'Swimming Pool', 'Valet Parking', 'Gym & Spa', 'Garden'],
    order: 3
  },
  {
    name: 'Novelty by Akoya Properties',
    slug: 'novelty',
    description: 'Experience the extraordinary at Novelty Apartments.',
    location: 'Infront of Friendship Park, Addis Ababa',
    price: '',
    type: '2-3 Bedroom Apartments',
    category: 'apartments',
    area: '60 Units Available',
    images: ['/images/n1.jpg', '/images/n2.jpg', '/images/n3.jpg', '/images/n4.jpg', '/images/n5.jpg'],
    mapUrl: 'https://maps.google.com/?q=Friendship+Park,Addis+Ababa',
    tourVideo: 'https://youtu.be/XWHYP3cvW2o?si=TCOMqz0yEVBf8d6z',
    features: ['Event / Common Space', 'Gym & Spa', 'Gardens', 'Valet Parking'],
    order: 4
  }
];

const seedProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Property.deleteMany({});
    await Property.insertMany(properties);
    console.log('Properties seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding properties:', error);
    process.exit(1);
  }
};

seedProperties();
