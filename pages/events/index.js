import React, { useEffect, useState } from "react";
import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/events-search";
import { useRouter } from "next/router";

export default function AllEventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter();

  const findEventHandler = (selectedYear, selectedMonth) => {
    // craete a path to the event with selectedYear and selectedMonth that will be used to extracted from the url to dsiplay filtered events
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={allEvents} />
    </>
  );
}
