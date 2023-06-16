import React, {useState, useEffect} from 'react';
import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import {getFilteredEvents} from '@/helpers/api-utils';
import {useRouter} from 'next/router';
import useSWR from 'swr';

export default function FilteredEventsPage({
  filteredEvents,
  hasError,
  dateValue,
}) {
  // Bellow section is an example of client side data fetching
  /**  
   *  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  //The name “SWR” is derived from stale-while-revalidate
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {data, error} = useSWR(
    //Firebase realtime database url
    'https://nextjs-course-1d786-default-rtdb.firebaseio.com/sales.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p>Loading....</p>;
  }
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="'center">Loading....</p>;
  }

  const filteredMonth = filterData[1];
  const filteredyear = filterData[0];

  // filteredYear and filteredMonth are string variables containing numeric values, the unary plus operator (+) used to convert them into numbers.
  const numYear = +filteredyear;
  const numMonth = +filteredMonth;

  if (
    isNaN(
      numYear ||
        numMonth ||
        numYear > 2030 ||
        numMonth < 2021 ||
        numMonth > 12 ||
        numMonth < 1 ||
  error
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

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });
  */

  if (hasError) {
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

  console.log('dateValue', dateValue);
  // when creating a Date object using the new Date(year, month) constructor, the month parameter is zero-based. It means the months are represented by numbers from 0 to 11, where 0 corresponds to January and 11 corresponds to December.
  const date = new Date(dateValue.year, dateValue.month - 1);

  console.log('date', date);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const {params} = context;
  const filterData = params.slug;

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
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }
  const filteredValues = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents: filteredValues,
      dateValue: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
