import Link from "next/link";
import Image from "next/image";

interface Props {
  slug: string;
  location: string;
  date: string;
  time: string;
  title: string;
  image: string;
}

const EventCard = ({ title, image, location, date, time, slug }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <div className="flex flex-row gap-2">
        <Image
          src="/icons/pin.svg"
          alt="Location Icon"
          width={16}
          height={16}
        />
        <p className="location-short">{location}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="Calendar Icon"
            width={16}
            height={16}
          />
          <p className="date">{date}</p>
        </div>

        <div>
          <Image
            src="/icons/clock.svg"
            alt="Clock Icon"
            width={16}
            height={16}
          />
          <p className="time">{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
