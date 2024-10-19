import type { NextPage } from "next";
import Link from "next/link";
import { Menu, Notice, Profile } from "#/components/ui";

const profile = {
  name: "万歩留 燕京",
  imageUrl: "/214x214.png",
  description:
    "生成された守護霊の紹介文が入ります。以下はダミーテキスト。山路を登りながら、こう考えた。智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。住みにくさが高じると、安い所へ引き越したくなる。",
  meters: [
    {
      label: "社交性",
      color: "red",
      value: 80,
      merterColor: "custom-meter-red",
    },
    {
      label: "好奇心",
      color: "yellow",
      value: 30,
      merterColor: "custom-meter-yellow",
    },
    {
      label: "感情安定性",
      color: "green",
      value: 20,
      merterColor: "custom-meter-green",
    },
    {
      label: "勤勉性",
      color: "blue",
      value: 70,
      merterColor: "custom-meter-blue",
    },
    {
      label: "協調性",
      color: "purple",
      value: 90,
      merterColor: "custom-meter-purple",
    },
  ],
};

const Page: NextPage = async () => {
  return (
    <section>
      <div className="py-6 px-4 bg-gray-50">
        <Notice />
        <div className="mt-4">
          <Profile
            name={profile.name}
            imageUrl={profile.imageUrl}
            description={profile.description}
            meters={profile.meters}
          />
        </div>
      </div>
      <Menu />
    </section>
  );
};

export default Page;
