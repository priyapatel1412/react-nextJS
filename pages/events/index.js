import React, {useEffect, useState} from 'react';
import EventList from '@/components/events/event-list';
import EventSearch from '@/components/events/events-search';
import {useRouter} from 'next/router';
import {getAllEvents} from '@/helpers/api-utils';

export default function AllEventsPage({loadedEvents}) {
  const router = useRouter();

  const findEventHandler = (selectedYear, selectedMonth) => {
    // craete a path to the event with selectedYear and selectedMonth that will be used to extracted from the url to dsiplay filtered events
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={loadedEvents} />
    </>
  );
}

export const getStaticProps = async (context) => {
  const allEvents = await getAllEvents();
  return {
    props: {
      loadedEvents: allEvents,
    },
    revalidate: 60, // Update every 60 seconds
  };
};
