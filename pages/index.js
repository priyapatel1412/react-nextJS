import React, {useEffect, useState} from 'react';
import EventList from '@/components/events/event-list';
import {getFeaturedEvents} from '@/helpers/api-utils';

export default function HomePage({events}) {
  return (
    <>
      <div>
        <EventList events={events} />
      </div>
    </>
  );
}

// Nextjs executes getStaticProps first and gets static props for the component
export const getStaticProps = async (context) => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // Update every half hour
  };
};
