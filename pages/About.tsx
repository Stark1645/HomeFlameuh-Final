
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Our Mission</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          HomeFlame was born from a simple idea: that the best food in the world isn't found in a restaurant, but in the heart of a home. We are on a mission to empower independent home chefs and bring authentic, healthy, and soulful meals to every table.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
          <div className="space-y-6">
            {[
              { title: 'Discover Local Talent', text: 'Browse curated menus from certified home chefs in your neighborhood.' },
              { title: 'Hand-Cooked with Love', text: 'Your meal is prepared only after you order, ensuring maximum freshness.' },
              { title: 'Delivered to Your Door', text: 'Safe, reliable delivery right from the chef\'s kitchen to your dining room.' }
            ].map((step, i) => (
              <div key={i} className="flex space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-500">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://picsum.photos/600/600?cooking" alt="Chef cooking" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="bg-slate-900 text-white p-12 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">Trust & Hygiene</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Every HomeFlame chef undergoes a rigorous 5-step verification process, including kitchen inspections, hygiene training, and food safety certification. We don't just deliver food; we deliver peace of mind.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center space-x-2">
            <i className="fas fa-shield-check text-orange-500 text-2xl"></i>
            <span className="font-semibold uppercase tracking-wider text-xs">Certified Kitchens</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-user-check text-orange-500 text-2xl"></i>
            <span className="font-semibold uppercase tracking-wider text-xs">Background Verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-vial text-orange-500 text-2xl"></i>
            <span className="font-semibold uppercase tracking-wider text-xs">Quality Testing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
