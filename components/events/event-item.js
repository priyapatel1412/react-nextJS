import React from 'react';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './event-item.module.css';
import Button from '../ui/button';
//Use Image from Next form Image iptimisation
import Image from 'next/image';
export default function EventItem({event}) {
  const humanReadableDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = event.location.replace(', ', '\n');
  const exploreLink = `/events/${event.id}`;

  return (
    <li className={classes.item}>
      <Image
        src={'/' + event.image}
        alt={event.title}
        width={250}
        height={160}
      />
      <div className={classes.content}>
        <div>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span> Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
