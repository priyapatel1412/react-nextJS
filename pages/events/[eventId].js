import React, {useState, useEffect} from 'react';
import {getEventById, getFeaturedEvents} from '@/helpers/api-utils';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';

export default function EventDetailPage({selectedEvent}) {
  if (!selectedEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.imageAlt}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </>
  );
}

export const getStaticProps = async (context) => {
  const {params} = context;
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  if (!event)
    return {
      notFound: true,
    };

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30, // Update every 30 seconds
  };
};

export const getStaticPaths = async (context) => {
  const events = await getFeaturedEvents(); // Pre-render only featured events
  const paths = events.map((event) => ({params: {eventId: event.id}}));

  return {
    paths: paths,
    fallback: true, // beacuse we are pre-loaidng only featured event
  };
};
