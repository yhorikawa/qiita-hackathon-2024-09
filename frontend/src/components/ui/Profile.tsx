import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type MeterProps = {
  label: string;
  color: string;
  value: number;
  merterColor: string;
};

type ProfileProps = {
  name: string;
  imageUrl: string;
  description: string;
  meters: {
    label: string;
    value: number;
    color: string;
    merterColor: string;
  }[];
  id?: string;
};

const Meter = ({ label, color, value, merterColor }: MeterProps) => {
  const bgColor = `bg-${color}-100`;
  const textColor = `text-${color}-800`;

  return (
    <div className="flex gap-3 items-center">
      <p
        className={twMerge(
          "py-1 px-2.5 rounded text-xs w-20 text-center shrink-0",
          bgColor,
          textColor,
        )}
      >
        {label}
      </p>
      <meter
        id="fuel"
        min="0"
        max="100"
        value={value}
        className={twMerge("flex-grow", merterColor)}
      >
        at {value}/100
      </meter>
    </div>
  );
};

export const Profile = ({
  name,
  imageUrl,
  description,
  meters,
  id,
}: ProfileProps) => {
  return (
    <div className="py-6 px-4 rounded-lg shadow-sm flex flex-col gap-6 items-center bg-white">
      <p className="text-lg font-black leading-normal text-center">
        {name}の守護霊
      </p>
      <Image
        src={imageUrl}
        alt={`${name}の守護霊`}
        width={214}
        height={214}
        className="rounded-full object-cover"
      />
      {id ? (
        <Link
          href={`/api/v1/rooms/redirect-room/${id}`}
          className="text-white bg-blue-500 rounded-lg py-3 px-5"
        >
          この守護霊にメッセージを送る
        </Link>
      ) : null}
      <p className="text-sm font-normal leading-relaxed">{description}</p>
      <div className="flex flex-col gap-4 w-full px-4">
        {meters.map((meter) => (
          <Meter
            key={meter.label}
            label={meter.label}
            color={meter.color}
            value={meter.value}
            merterColor={meter.merterColor}
          />
        ))}
      </div>
    </div>
  );
};
