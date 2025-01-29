import React from 'react';
import { Hero } from '../components/Hero';
import { CareerSuggestions } from '../components/CareerSuggestions';

export function Home() {
  return (
    <main>
      <Hero />
      <CareerSuggestions />
    </main>
  );
}