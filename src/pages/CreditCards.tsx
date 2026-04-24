import { motion } from 'framer-motion';


import { EligibilityForm } from '@/components/EligibilityForm';
import { Check, Star } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const creditCards = [
  {
    id: 'platinum',
    name: 'Platinum Card',
    tagline: 'Pay less interest',
    description: '0% intro APR on balance transfers for the first year. Save money and pay down debt faster.',
    apr: '0%',
    aprLabel: 'intro APR',
    features: [
      'No annual fee',
      '0% intro APR on balance transfers',
      'No balance transfer fee',
    ],
    highlight: true,
    href: '#',
  },
  {
    id: 'cashrewards',
    name: 'cashRewards Card',
    tagline: 'Earn while you spend',
    description: 'Earn unlimited 1.75% cash back on every purchase. No caps, no categories, no annual fee.',
    apr: '1.75%',
    aprLabel: 'cash back',
    features: [
      'Unlimited cash back',
      'No annual fee',
      'No spending caps',
    ],
    highlight: false,
    href: '#',
  },
  {
    id: 'flagship',
    name: 'Visa Signature Flagship Rewards',
    tagline: 'Premium rewards',
    description: 'Earn 3X points on travel and 2X on everything else. Premium benefits for premium lifestyles.',
    apr: '3X',
    aprLabel: 'points on travel',
    features: [
      'Premium travel rewards',
      'Travel benefits',
      'Concierge service',
    ],
    highlight: false,
    href: '#',
  },
];


export function CreditCards() {
  return (
    <main className="flex-1">

        {/* Hero Section */}
        <section className="bg-navy py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <Star className="h-5 w-5 text-orange fill-orange" />
                <span className="text-white text-sm font-semibold">
                  TIME #1 in Credit Cards 2026
                </span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white">
                Credit Cards
              </h1>
              <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
                Save more money. Stress way less. Find the perfect card for your lifestyle.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Card */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-orange text-xs font-semibold tracking-wider uppercase">
                    Featured Offer
                  </span>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mt-3">
                    0% interest? Power up your payoff with Platinum.
                  </h2>
                  <p className="text-gray-300 mt-4">
                    Platinum card, gold-star savings—pay 0% interest the first year 
                    on transferred balances and change your whole game.
                  </p>
<EligibilityForm product="Credit Cards" />
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=280&fit=crop"
                    alt="Platinum Card"
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
transition={{ duration: 0.5 }}
              id="compare"
              className="text-2xl lg:text-3xl font-bold text-navy mb-8"
            >
              Compare Our Cards
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {creditCards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
                    card.highlight ? 'ring-2 ring-orange' : ''
                  }`}
                >
                  {card.highlight && (
                    <span className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-bold text-navy text-xl">{card.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{card.tagline}</p>
                  
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-navy">{card.apr}</span>
                    <span className="text-gray-500 text-sm ml-2">{card.aprLabel}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-4">{card.description}</p>
                  
                  <ul className="mt-4 space-y-2">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <EligibilityForm product={card.name} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
  );
}

