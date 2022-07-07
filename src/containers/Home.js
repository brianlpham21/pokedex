import React from 'react';

import CardListContainer from '../components/CardListContainer';
import DetailCard from '../components/DetailCard';

export default function Home() {
  return (
    <div className="home-page">
      <CardListContainer />
      <DetailCard />
    </div>
  )
}

