import { motion } from 'framer-motion';
import { PromoCard } from '@/components/ui/PromoCard';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { promoCards } from '@/data/content';

export function PromoCards() {
  return (
    <section className="py-12 lg:py-16 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl lg:text-3xl font-bold text-white mb-8"
        >
          See what's new from Federal Navy
        </motion.h2>

        {/* Promo Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {promoCards.map((card) => (
            <motion.div key={card.id} variants={fadeInUp} className="h-full">
              <PromoCard
                title={card.title}
                subtitle={card.subtitle}
                cta={card.cta}
                href={card.href}
                bgColor={card.bgColor}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
