import React from 'react';

import Pagination from '../components/Pagination';
import CardListContainer from '../components/CardListContainer';
import DetailCard from '../components/DetailCard';

export default function Home() {
  return (
    <div className="home-page">
      <div>
        <Pagination />
        <CardListContainer />
      </div>
      <DetailCard />
    </div>
  )
}

