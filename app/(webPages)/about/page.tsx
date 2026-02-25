"use client";

import React from 'react';
import IndustriesServed from '@/components/IndustriesServed';
import QualityStandards from '@/components/QualityStandards';
import WhyChooseUs from '@/components/WhyChooseUs';
import { motion } from 'framer-motion';
import PageBanner from '@/components/web/PageBanner';

export default function AboutPage() {
    const CreateDataList = (data: string[]) => {
        return (
            <ul className="text-base md:text-lg text-gray-600 leading-relaxed list-none space-y-0 my-2">
                {data.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 ">
                        <span className="text-primary text-2xl leading-none mt-px">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Hero / Header */}
            <PageBanner title="About Detco" subtitle="Pioneers in Tensile Structures & Sun Control Solutions in Saudi Arabia" />


            {/* 2. Vision & Mission */}
            <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 md:p-10 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                In addition to maintaining leadership in the construction of all awnings, DETCO is committed to increasing its market share in other sectors, mainly in the Space Frame, Skylight sector, and Metal Works through strategic alliances with national and international reputable companies.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-8 md:p-10 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-teal-700"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To engineer superior protection against the harsh climate while enhancing aesthetic appeal. We aim to deliver turn-key projects, including advanced masonry and metal work, on time, within budget, and above expectations through rigorous quality control, safety standards, and reliable strategic alliances.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Company Overview */}
            <section className="py-16 md:py-24 bg-white" id="about-us">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block text-center">
                                Company Overview
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight text-center">
                                Who We Are
                            </h2>
                            <div className="text-left">
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    <strong className='text-primary text-2xl'>DETCO</strong> is one of the national leading companies in the Kingdom of Saudi Arabia and is considered to be one of the important companies in the development and construction process in the Kingdom.  Especially in construction and technical work fields of shades, covers, and stretched membranes, masonry works, turn-key projects, in addition to all metal and iron works.
                                </p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Company's specializations and activities:
                                </h3>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    Providing and installing car park shades of all types, fabricated from high-quality materials as per international specifications which we firmly commit to. Also, the accurate properties of our control program in manufacturing ensure the stability of the final product.
                                </p>

                                {CreateDataList([
                                    "Stretched construction installations for public squares and gardens with aesthetic forms of open and covered areas that add an aesthetic touch to the place.",
                                    "Installations of shades for schools and gardens, which are subject to international standard specifications to ensure they block ultraviolet rays.",
                                    "Covering of swimming pools, playgrounds and recreation centers, mobile shades, wall blocks, and wind barriers.",
                                    "Metal fences, doors, protection windows, hangers, and warehouses as per the highest specifications, factories (Pre-Engineered Structures), and commercial showrooms.",
                                ])}
                                <div className="p-5 bg-primary/5 rounded-xl border border-primary/10 text-center my-8">
                                    <p className="text-base md:text-lg text-primary font-semibold tracking-wide">
                                        Car Parking Shades <span className="mx-2 text-gray-300">|</span> Sails Shade <span className="mx-2 text-gray-300">|</span> Swimming Pool Shade <span className="mx-2 text-gray-300">|</span> Outdoor Sitting Area Shade
                                    </p>
                                </div>


                                {/* ================  METAL & IRON SPECIFICATIONS ===========*/}
                                <h3 className="text-2xl font-bold text-gray-900 my-4">
                                    METAL & IRON SPECIFICATIONS
                                </h3>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    The high taste, the need for covering and adding an aesthetic touch for buildings, communities and public areas and creating a new spirit and an artistic touch with a stretchable materials leads us to use a different types of metal& Iron sectors and fabricated, ready accessories & cables to stretch these elements collectively with a highly artistic way in accordance with loads and reactions and conducting a study for it using several engineering software to calculate the steel structure of the shades such as:
                                </p>
                                {CreateDataList([
                                    "SAP 2000.",
                                    "ITAB 2000.",
                                    "ISTAD 2000.",
                                ])}
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    These various programs differs in the way of structural and engineering design and using the architectural and drawn form with (AutoCAD) to take into account the surrounding area of the shades and to determine the metal sector type as per (weight and in_uential force and Stiffness coef_cient). We use different types of metal in formulating the metal elements includes:
                                </p>
                                {CreateDataList([
                                    "The Galvanized meta.",
                                    "Ordinary Metal.",
                                    "Aluminum.",
                                    "Stainless Steel.",
                                ])}
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    With gathering points of tension and connection of these sectors collectively with the stretching membranes with using a highly strong and solid screws diameter up to 5.8, 8.8 and 10.3 according to American and German Code which determines in turn the diameter and length of the used screw and the exposed power of tension, pressure and cutting.
                                </p>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    The way of protection and treatment of these accessories & sectors differs depending on natural atmospheric and erosion factors and environment (Heat- Cold - high humidity wind power-... Etc.) With adding a layer or packaging of the used sectors through:
                                </p>
                                {CreateDataList([
                                    "Treatment using thermal galvanization.",
                                    "Treatment using cold galvanization.",
                                    "Regular Paint.",
                                    "Fiery Paint.",
                                    "Єроху Paint.",
                                    "Thermal Powder Coated Paint",
                                ])}

                                {/* ================SPECIFICATION OF MEMBRANE ========= */}
                                <h3 className="text-2xl font-bold text-gray-900 my-4">
                                    SPECIFICATION OF MEMBRANE
                                </h3>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    Great edibility to take the suitable form The stretched membrane characteristic with a to the various architectural designs, where we are manufacturing all types of structural stretched shades in different sizes and Shapes such as:
                                </p>
                                {CreateDataList([
                                    "⁠Structural stretched shades for the public areas.",
                                    "Swimming pools and gardens shades.",
                                    "Installations of structural stretching shades in shops entrances and malls.",
                                    "Car parking, public areas and mobile shades.",
                                    "Aesthetic forms shades for open and covered areas.",
                                ])}
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    The difference of forms, areas and purposes of coverage leads to differences in welding area thickness in the stretching membrane ranging between 3cm or 5cm as per calculations and the affecting power on the stretched membrane and also the types and technologies of stretched membrane welding differs by using modern machines for each type such as:
                                </p>
                                {CreateDataList([
                                    "Welding by using hot air.",
                                    "Welding by using hot bar.",
                                ])}
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    The establishment has treated with various types of stretching and coverage membranes with multi-sides shades by using the highest quality types of PVC which manufactured in (France - Germany - Saudi Arabia - Australia ....). By the amount of grams per square meter, the weight of PVC is ranging and differs among the following weights (580, 680, 900, 1050, 1250,1350,1500).
                                </p>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    ⁠We used different types of coverage to meet the need of the area to be covered and the duration of guarantee period, and the atmospheric factors surrounding the shade including:
                                </p>
                                {CreateDataList([
                                    "Structural Stretching Membrane (PVC).",
                                    "Structural Stretching Membrane (PVDF).",
                                    "Teflon Stretching Membrane (PTFI).",
                                    "Plastic Membrane Protection (Poly Ethylene).",
                                ])}
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    These materials must be treated with more edibility and high level of confidence and the use of aesthetic sense and experience alongside with the modern science and developed science to the implementation of the shades using the latest versions of engineering software to deal with the stretching membrane and plastic resistance membrane according to (self-weight - wind - sand - Rain) which are approved on Program IXFORTEN 4000.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* 5. Quality & Safety (Reusable Component) */}
            <QualityStandards />

            {/* 6. Why Choose DetcoShades (Reusable/Shared Component) */}
            <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
                                Why Choose Us
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                                The Detco Advantage
                            </h2>
                        </motion.div>
                    </div>
                    <WhyChooseUs />
                </div>
            </section>
        </main>
    );
}
