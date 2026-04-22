import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI';

const AboutUsPage = () => {
  const navigate = useNavigate();
  const team = [
    {
      name: 'Rahul Sharma',
      role: 'Founder & CEO',
      image: '👨‍💼',
      bio: 'Passionate about sustainable tourism and cultural preservation with 15+ years of experience.'
    },
    {
      name: 'Priya Patel',
      role: 'Chief Technology Officer',
      image: '👩‍💻',
      bio: 'Tech visionary building innovative solutions for modern travel experiences.'
    },
    {
      name: 'Amit Kumar',
      role: 'Head of Operations',
      image: '👨‍✈️',
      bio: 'Ensuring seamless travel experiences with meticulous attention to detail.'
    },
    {
      name: 'Sneha Reddy',
      role: 'Head of Customer Experience',
      image: '👩‍💼',
      bio: 'Dedicated to providing exceptional service and creating memorable journeys.'
    }
  ];

  const values = [
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: 'Sustainability',
      description: 'We are committed to eco-friendly tourism practices and carbon-neutral travel options.'
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
      title: 'Cultural Preservation',
      description: 'We work closely with local communities to preserve and celebrate cultural heritage.'
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: 'Community Impact',
      description: 'A portion of every booking goes back to local communities and conservation efforts.'
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: 'Trust & Safety',
      description: 'Verified destinations, secure payments, and 24/7 support for peace of mind.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Travelers' },
    { number: '200+', label: 'Destinations' },
    { number: '15+', label: 'Countries' },
    { number: '4.9/5', label: 'Customer Rating' }
  ];

  const milestones = [
    { year: '2019', title: 'Founded', description: 'SmartTour360 was born with a vision to revolutionize cultural tourism.' },
    { year: '2020', title: 'First 10K Users', description: 'Reached our first major milestone despite challenging times.' },
    { year: '2021', title: 'Expanded to 50 Destinations', description: 'Grew our network to cover major heritage sites across India.' },
    { year: '2022', title: 'Launched Mobile App', description: 'Made travel planning easier with our mobile application.' },
    { year: '2023', title: 'Carbon Neutral Initiative', description: 'Committed to offsetting 100% of carbon emissions from our trips.' },
    { year: '2024', title: '50K+ Travelers', description: 'Celebrated serving over 50,000 travelers worldwide.' }
  ];

  return (
    <div className="min-h-[calc(100vh-68px)] bg-stone-50 pb-20 md:pb-8">
      {/* Hero Section */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>About SmartTour360</h1>
            <p className="text-lg text-stone-600">
              Revolutionizing cultural tourism by connecting travelers with authentic heritage experiences while preserving our planet and supporting local communities.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-orange-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{stat.number}</div>
                <div className="text-sm text-stone-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-12">
        <Card padding>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>Our Mission</h2>
              <p className="text-base md:text-lg text-stone-600 mb-6">
                At SmartTour360, we believe that travel should be transformative, not just transactional. Our mission is to create meaningful connections between travelers and the world's cultural treasures while ensuring tourism benefits local communities and protects our environment.
              </p>
              <p className="text-base md:text-lg text-stone-600 mb-6">
                We're not just a travel platform – we're a movement towards more conscious, sustainable, and culturally respectful tourism. Every journey we curate is designed to leave a positive impact on both the traveler and the destination.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Button variant="primary" size="md" onClick={() => navigate('/destinations')}>Join Our Journey</Button>
                <Button variant="ghost" size="md">Learn More</Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-8 md:p-12 flex items-center justify-center">
              <svg className="w-32 h-32 md:w-40 md:h-40 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Values Section */}
      <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Core Values</h2>
          <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
            These principles guide everything we do, from how we select destinations to how we treat our customers and partners.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, index) => (
            <Card key={index} padding className="hover:border-orange-200 transition-colors">
              <div className="text-orange-500 mb-4">{value.icon}</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{value.title}</h3>
              <p className="text-sm text-stone-600">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Journey</h2>
          <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
            From a small idea to a movement transforming cultural tourism.
          </p>
        </div>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <Card key={index} padding className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-xl font-black text-orange-600" style={{ fontFamily: 'var(--font-display)' }}>{milestone.year}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{milestone.title}</h3>
                <p className="text-sm text-stone-600">{milestone.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Meet Our Team</h2>
          <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
            A passionate team of travelers, technologists, and dreamers working together to transform tourism.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, index) => (
            <Card key={index} padding className="text-center hover:border-orange-200 transition-colors">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-3xl mx-auto mb-4">
                {member.image}
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{member.name}</h3>
              <p className="text-sm text-orange-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-stone-600">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-12">
        <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-none">
          <div className="text-center py-8 md:py-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-display)' }}>Ready to Start Your Journey?</h2>
            <p className="text-base md:text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the magic of cultural tourism with SmartTour360.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button variant="secondary" size="md" onClick={() => navigate('/destinations')}>Explore Destinations</Button>
              <Button variant="outline" size="md" className="!border-white !text-white hover:!bg-white hover:!text-orange-600">Contact Us</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutUsPage;
