const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname)));
app.use(express.json());
const travelOptions = [
  { id: 1, type: 'Luxury Flight', price: 1200, duration: '6h', distance: '3,200 km', departure: '09:30', arrival: '15:30', seat: 'Business', details: 'Family seating, lounge access, and curated inflight meals.' },
  { id: 2, type: 'Private Train', price: 420, duration: '8h', distance: '650 km', departure: '11:00', arrival: '19:00', seat: '1A', details: 'Dedicated compartment with dining service and panoramic scenic routes.' },
  { id: 3, type: 'Luxury Bus', price: 180, duration: '5h', distance: '480 km', departure: '07:30', arrival: '12:30', seat: 'Row 3', details: 'Spacious reclining seats and onboard entertainment.' },
  { id: 4, type: 'Private Car', price: 220, duration: '3h', distance: '280 km', departure: '14:00', arrival: '17:00', seat: 'SUV', details: 'Luxury SUV with driver and flexible stops for family comfort.' },
  { id: 5, type: 'Cab & Ride', price: 70, duration: '1h', distance: '25 km', departure: '08:00', arrival: '09:00', seat: 'Sedan', details: 'City pickups, hotel transfers, and airport connections.' }
];
const hotels = [
  { id: 1, name: 'Emerald Bay Resort', price: 480, rating: 4.9, features: ['Pool', 'WiFi', 'Restaurant', 'Parking', 'Gym', 'Breakfast'], description: 'Luxury beachfront villas with private pools and family dining.' },
  { id: 2, name: 'Skyline Heritage', price: 360, rating: 4.8, features: ['Breakfast', 'Gym', 'WiFi', 'Parking', 'Spa', 'Pool'], description: 'City-center suites with gourmet breakfast and family spa.' },
  { id: 3, name: 'Bayfront Suites', price: 410, rating: 4.7, features: ['WiFi', 'Pool', 'Restaurant', 'Gym', 'Parking', 'Breakfast'], description: 'Seaside rooms with large family suites and premium amenities.' }
];
const destinations = [
  { id: 1, name: 'Bora Bora', tagline: 'Crystal lagoon retreat for families', bestTime: 'Nov - Apr', entryFee: '$108', hours: '07:00 - 22:00', tips: ['Book evening cruise', 'Use reef-safe sunscreen', 'Reserve kids club sessions'], features: ['Resort casual', '4h flight + boat', '6h total travel'], weather: '28°C, Sunny' },
  { id: 2, name: 'Kyoto', tagline: 'Heritage temple walk with serene family experiences', bestTime: 'Mar - May', entryFee: '$20', hours: '08:00 - 18:00', tips: ['Arrive early', 'Use transport passes', 'Carry snacks'], features: ['Smart casual', '10h flight + train', '12h total travel'], weather: '17°C, Breezy' },
  { id: 3, name: 'Amalfi Coast', tagline: 'Sea cliff adventures and coastal luxury stays', bestTime: 'May - Sep', entryFee: 'Free', hours: '09:00 - 21:00', tips: ['Reserve ferry seats early', 'Wear comfortable shoes', 'Bring light layers'], features: ['Resort chic', '12h flight + transfer', '14h total travel'], weather: '24°C, Clear' },
  { id: 4, name: 'Cape Town', tagline: 'Wild coasts, mountains, and family safari thrills', bestTime: 'Oct - Mar', entryFee: '$32', hours: '08:00 - 20:00', tips: ['Book wildlife tours early', 'Carry layers', 'Reserve restaurants early'], features: ['Smart casual', '13h flight', '13h total travel'], weather: '20°C, Mild' }
];
const memories = [
  { id: 1, category: 'Morning Photos',summary: 'Sunrise moments and family breakfast snapshots.' },
  { id: 2, category: 'Family Photos',summary: 'Group portraits, laughter, and candid smiles.' },
  { id: 3, category: 'Temple',summary: 'Serene rituals and candlelit reflections.' },
  { id: 4, category: 'Beach', summary: 'Sand, surf, and sunset playtime.' },
  { id: 5, category: 'Shopping',summary: 'Local markets and souvenir discoveries.' },
  { id: 6, category: 'Dinner', summary: 'Family feasts, dessert sharing, and restaurant cheers.' }
];
app.get('/api/travel', (req, res) => res.json(travelOptions));
app.get('/api/hotels', (req, res) => res.json(hotels));
app.get('/api/destinations', (req, res) => res.json(destinations));
app.get('/api/memories', (req, res) => res.json(memories));
const generateChatReply = (message) => {
  const text = message.toLowerCase();
  if (text.includes('hotel') || text.includes('stay')) {
    return 'I can help you pick a family-friendly hotel with pools, dining, and kid activities. Try asking for the best hotel by budget or location.';
  }
  if (text.includes('destination') || text.includes('where') || text.includes('trip')) {
    return 'Our top destinations include Bora Bora, Kyoto, Amalfi Coast, and Cape Town. Tell me what kind of family experience you want and I can suggest one.';
  }
  if (text.includes('travel') || text.includes('flight') || text.includes('car') || text.includes('train')) {
    return 'I can compare travel options for your family. Ask me about flights, trains, private cars, or booking transfers.';
  }
  if (text.includes('booking')) {
    return 'To book a hotel or travel option, choose the Book Now button on the relevant card and I will confirm it for you.';
  }
  if (text.includes('weather')) {
    return 'The dashboard includes a weather snapshot for your trip, with a 7-day outlook to help with planning outfits and activities.';
  }
  return 'I am here to help with family trip planning, hotels, destinations, and booking support. Ask me anything about your next journey.';
};
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message text is required.' });
  }
  return res.json({ reply: generateChatReply(message) });
});
app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  if (!booking || !booking.type || !booking.name) {
    return res.status(400).json({ error: 'Booking type and name are required.' });
  }
  booking.id = Math.floor(Math.random() *1000000);
  booking.status = 'confirmed';
  return res.status(201).json({ message: 'Booking confirmed', booking });
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});