"use client";
import type { NextPage } from "next";
import { notFound } from "next/navigation";
import { Menu, Profile } from "#/components/ui";
import { useGetUser } from "./use-get-me";

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

type Props = {
  params: {
    id: string;
  };
};

const Page: NextPage<Props> = ({ params: { id } }) => {
  const { data, isLoading, error } = useGetUser(id);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.success || error) return notFound();

  //TODO: MEMO化しよう
  const profile = () => {
    const { user, pasonality } = data.data;
    return {
      name: user.name,
      imageUrl: user.imageUrl,
      description: pasonality.description,
      meters: [
        {
          label: "社交性",
          color: "red",
          value: pasonality.openness,
          merterColor: "custom-meter-red",
        },
        {
          label: "好奇心",
          color: "yellow",
          value: pasonality.conscientiousness,
          merterColor: "custom-meter-yellow",
        },
        {
          label: "感情安定性",
          color: "green",
          value: pasonality.extraversion,
          merterColor: "custom-meter-green",
        },
        {
          label: "勤勉性",
          color: "blue",
          value: pasonality.agreeableness,
          merterColor: "custom-meter-blue",
        },
        {
          label: "協調性",
          color: "purple",
          value: pasonality.neuroticism,
          merterColor: "custom-meter-purple",
        },
      ],
    };
  };

  return (
    <section>
      <div className="py-6 px-4 bg-gray-50">
        <Profile
          id={id}
          name={profile().name}
          imageUrl={profile().imageUrl || "/214x214.png"}
          description={profile().description}
          meters={profile().meters}
        />
      </div>
      <Menu />
    </section>
  );
};

export default Page;
