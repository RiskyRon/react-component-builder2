import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="w-full py-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center">
        <h1 className="text-4xl font-bold">Neon Glow Sticks</h1>
        <p className="mt-2 text-lg">Light up your festival with our bulk neon glow sticks!</p>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Our Glow Sticks?</h2>
          <p className="mb-6 max-w-2xl">
            Our neon glow sticks are perfect for any festival, party, or event. They are bright, long-lasting, and come in a variety of vibrant colors. Make your night unforgettable with our high-quality glow sticks.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
            Shop Now
          </button>
        </section>
      </main>
      <footer className="w-full py-4 bg-gray-800 text-center">
        <p>&copy; 2023 Neon Glow Sticks. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;