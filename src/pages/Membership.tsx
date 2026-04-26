import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, Award, Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EligibilityForm } from '@/components/EligibilityForm';
import { UserDetailsForm } from '@/components/UserDetailsForm';
import { useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const eligibilityGroups = [
  {
    title: 'Active Duty',
    description: 'All branches of the military including Army, Marine Corps, Navy, Air Force, Coast Guard, National Guard and Space Force',
    icon: Shield,
  },
  {
    title: 'Veterans',
    description: 'No matter how long you served, you\'re in!',
    icon: Award,
  },
  {
    title: 'Immediate Family Members',
    description: 'Spouses, siblings, parents, children, grandparents and grandchildren',
    icon: Users,
  },
  {
    title: 'Department of Defense (DoD)',
    description: 'Civilian employees and contractors',
    icon: Heart,
  },
];

const benefits = [
  'Lower loan rates and higher savings rates',
  'No hidden fees or minimum balance requirements',
  '24/7 member service',
  'Access to 30,000+ free ATMs',
  'Military-exclusive discounts and offers',
  'Financial education and counseling',
];

export function Membership() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
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
              <h1 className="text-3xl lg:text-5xl font-bold text-white">
                Become a Member
              </h1>
              <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
                Our Members Are the Mission. Enjoy the support and great service of a 
                credit union that puts your needs first.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  type="button"
                  onClick={() => setIsJoinOpen(true)}
                  className="bg-orange hover:bg-orange-dark text-white font-semibold min-h-[44px]"
                >
                  Join Now
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEligibilityOpen(true)}
                  className="group inline-flex items-center text-white font-semibold hover:underline bg-transparent hover:bg-white/10 border-none min-h-[44px] py-3 px-4"
                >
                  Check Your Eligibility
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-navy">
                Who Can Join?
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                For more than 90 years, we&apos;ve been providing financial support to 
                the military, Veterans and their families. So, who&apos;s eligible?
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {eligibilityGroups.map((group, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 rounded-lg p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-navy rounded-full mb-4">
                    <group.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-navy">{group.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{group.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-8"
            >
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEligibilityOpen(true)}
                className="inline-flex items-center text-link font-semibold hover:underline bg-transparent border-none min-h-[44px] py-3 px-4"
              >
                Find Out if You&apos;re Eligible
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-navy">
                  Why Join Navy Federal?
                </h2>
                <p className="text-gray-600 mt-4">
                  As a not-for-profit credit union, we put our members first. 
                  That means better rates, fewer fees, and service that understands 
                  your unique needs.
                </p>
                <ul className="mt-6 space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=500&fit=crop"
                  alt="Family enjoying membership benefits"
                  className="rounded-lg shadow-lg w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Youth Membership */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-navy rounded-2xl p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">
                    Under 18?
                  </h2>
                  <p className="text-gray-300 mt-4">
                    It&apos;s never too early to start building healthy financial habits. 
                    Learn about minor membership options and how we help young members 
                    grow their savings.
                  </p>
                  <Link
                    to="#"
                    className="group inline-flex items-center text-white font-semibold mt-6 hover:underline"
                  >
                    Learn about minor membership
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop"
                    alt="Youth membership"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Dialog open={isEligibilityOpen} onOpenChange={setIsEligibilityOpen} modal>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Check Eligibility</DialogTitle>
            </DialogHeader>
            <EligibilityForm product="Membership" />
          </DialogContent>
        </Dialog>
        <Dialog open={isJoinOpen} onOpenChange={setIsJoinOpen} modal>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Verify Membership Eligibility</DialogTitle>
            </DialogHeader>
            <UserDetailsForm product="Membership" />
          </DialogContent>
        </Dialog>
      </main>
  );
}

