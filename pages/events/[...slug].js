import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="'center">Loading....</p>;
  }

  const filteredMonth = filterData[1];
  const filteredyear = filterData[0];

  // filteredYear and filteredMonth are string variables containing numeric values, the unary plus operator (+) used to convert them into numbers.
  const numYear = +filteredyear;
  const numMonth = +filteredMonth;

  // check is numYear and numMonth is NaN eg url gives something like '/events/abcas'
  if (
    isNaN(
      numYear ||
        numMonth ||
        numYear > 2030 ||
        numMonth < 2021 ||
        numMonth > 12 ||
        numMonth < 1
    )
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter.Please adjust value</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the choosen filter!</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  // when creating a Date object using the new Date(year, month) constructor, the month parameter is zero-based. It means the months are represented by numbers from 0 to 11, where 0 corresponds to January and 11 corresponds to December.
  const date = new Date(numYear, numMonth - 1);

  console.log("date", date);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </div>
  );
}
