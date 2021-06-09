import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import heroImage from '../images/freeCodeCampImage.jpeg';
import { formatUnixToLocaleString } from '../utils';

const EventCard = ({ event }) => {
  const {
    id,
    is_online_event,
    name,
    time,
    utc_offset,
    venue: { name: venueName },
  } = event;

  useEffect(() => {
    fetch(
      'https://sleepy-villani-37e19c.netlify.app/.netlify/functions/pingEvents'
    )
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <div className="p-4 border border-solid border-gray-400 mx-auto">
      <a
        href={`https://www.meetup.com/freeCodeCamp-Nashville/events/${id}/`}
        target="blank"
        rel="noopener noreferrer"
      >
        <img className="object-cover" src={heroImage} />
        <div className="mt-4">
          <p className="text-blue-400 font-Roboto font-bold md:text-xl md:text-FCCgray-200">
            {formatUnixToLocaleString(time + utc_offset)} CST
          </p>
          <p className="text-FCCgray-200 font-Roboto font-extrabold text-lg md:text-2xl">
            {name}
          </p>
          <p className="text-FCCgray-200 font-Roboto font-medium md:text-xl">
            {is_online_event ? 'Online Event' : venueName}
          </p>
        </div>
      </a>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    is_online_event: PropTypes.bool,
    name: PropTypes.string,
    time: PropTypes.number,
    utc_offset: PropTypes.number,
    venue: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default EventCard;
