/**
 * Database Seeding Script
 * Seeds Supabase database with all schemes and services
 * Run with: npx tsx scripts/seed-database.ts
 */

import { createClient } from '@supabase/supabase-js';
import { schemes } from '../src/data/schemes';
import { services } from '../src/data/services';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://jazqpsxgsfadvkvhwnkf.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphenFwc3hnc2ZhZHZrdmh3bmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDE4MDUsImV4cCI6MjA3OTkxNzgwNX0.D4ofbEnYUCXop6_VFeF7K5YT_gvp8_ylZn53JMH4-OY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedSchemes() {
  console.log(`🌱 Seeding ${schemes.length} schemes...`);
  
  for (const scheme of schemes) {
    const schemeData = {
      id: scheme.id,
      name: scheme.name,
      name_hi: scheme.nameHi,
      name_mr: scheme.nameMr,
      description: scheme.description,
      description_hi: scheme.descriptionHi,
      description_mr: scheme.descriptionMr,
      category: scheme.category,
      scheme_type: scheme.schemeType,
      ministry: scheme.ministry,
      eligibility: scheme.eligibility,
      eligibility_hi: scheme.eligibilityHi,
      eligibility_mr: scheme.eligibilityMr,
      documents: scheme.documents,
      documents_hi: scheme.documentsHi,
      documents_mr: scheme.documentsMr,
      application_process: scheme.applicationProcess,
      application_process_hi: scheme.applicationProcessHi,
      application_process_mr: scheme.applicationProcessMr,
      how_to_apply: scheme.howToApply,
      benefits: scheme.benefits,
      benefits_hi: scheme.benefitsHi,
      benefits_mr: scheme.benefitsMr,
      website: scheme.website,
      helpline: scheme.helpline,
      state: scheme.state,
      states: scheme.states,
      target_audience: scheme.targetAudience,
      tags: scheme.tags,
      is_active: scheme.isActive,
      last_updated: scheme.lastUpdated
    };

    const { error } = await supabase
      .from('schemes')
      .upsert(schemeData, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error seeding scheme ${scheme.id}:`, error.message);
    } else {
      console.log(`✅ Seeded scheme: ${scheme.name}`);
    }
  }
  
  console.log(`✨ Completed seeding ${schemes.length} schemes!`);
}

async function seedServices() {
  console.log(`🌱 Seeding ${services.length} services...`);
  
  for (const service of services) {
    const serviceData = {
      id: service.id,
      name: service.name,
      name_hi: service.nameHi,
      name_mr: service.nameMr,
      description: service.description,
      description_hi: service.descriptionHi,
      description_mr: service.descriptionMr,
      category: service.category,
      office: service.office,
      office_hi: service.officeHi,
      office_mr: service.officeMr,
      address: service.address,
      phone: service.phone,
      email: service.email,
      working_hours: service.workingHours,
      working_hours_hi: service.workingHoursHi,
      working_hours_mr: service.workingHoursMr,
      district: service.district,
      taluka: service.taluka,
      state: 'Maharashtra', // Default state
      documents: service.documents,
      documents_hi: service.documentsHi,
      documents_mr: service.documentsMr,
      fees: service.fees,
      fees_hi: service.feesHi,
      fees_mr: service.feesMr,
      processing_time: service.processingTime,
      processing_time_hi: service.processingTimeHi,
      processing_time_mr: service.processingTimeMr,
      is_online: service.isOnline,
      website: service.website,
      tags: service.tags,
      is_active: true
    };

    const { error } = await supabase
      .from('services')
      .upsert(serviceData, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error seeding service ${service.id}:`, error.message);
    } else {
      console.log(`✅ Seeded service: ${service.name}`);
    }
  }
  
  console.log(`✨ Completed seeding ${services.length} services!`);
}

async function main() {
  console.log('🚀 Starting database seeding...\n');
  
  try {
    await seedSchemes();
    console.log('');
    await seedServices();
    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    process.exit(1);
  }
}

main();
