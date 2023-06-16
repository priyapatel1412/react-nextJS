import React from 'react';
import Head from 'next/head';
import EventList from '@/components/events/event-list';
import {getFeaturedEvents} from '@/helpers/api-utils';

export default function HomePage({events}) {
  return (
    <>
      <div>
        <Head>
          <title>NextJs Events</title>
          <meta
            name="description"
            content="Find a lot of great events that allow you to evolve..."
          />
        </Head>
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
