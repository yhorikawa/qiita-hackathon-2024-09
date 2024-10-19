import Image from "next/image";
import { twMerge } from "tailwind-merge";

type MeterProps = {
  label: string;
  color: string;
  value: number;
  merterColor: string;
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

export const Profile = () => {
  return (
    <div className="py-6 px-4 rounded-lg shadow-sm flex flex-col gap-6 items-center bg-white">
      <p className="text-lg font-black leading-normal text-center">
        万歩留 燕京 の守護霊
      </p>
      <Image
        src="/214x214.png"
        alt="守護霊"
        width={214}
        height={214}
        className="rounded-full object-cover"
      />
      <p className="text-sm font-normal leading-relaxed">
        生成された守護霊の紹介文が入ります。以下はダミーテキスト。山路を登りながら、こう考えた。智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。住みにくさが高じると、安い所へ引き越したくなる。
      </p>
      <div className="flex flex-col gap-4 w-full px-4">
        <Meter
          label="社交性"
          color="red"
          value={50}
          merterColor="custom-meter-red"
        />
        <Meter
          label="好奇心"
          color="yellow"
          value={30}
          merterColor="custom-meter-yellow"
        />
        <Meter
          label="感情安定性"
          color="green"
          value={20}
          merterColor="custom-meter-green"
        />
        <Meter
          label="勤勉性"
          color="blue"
          value={70}
          merterColor="custom-meter-blue"
        />
        <Meter
          label="協調性"
          color="purple"
          value={90}
          merterColor="custom-meter-purple"
        />
      </div>
    </div>
  );
};
