"use client";
import type { NextPage } from "next";
import { notFound } from "next/navigation";
import { Menu, Profile } from "#/components/ui";
import { Loading } from "#/components/ui";
import { useGetUser } from "./use-get-me";

type Props = {
  params: {
    id: string;
  };
};

const Page: NextPage<Props> = ({ params: { id } }) => {
  const { data, isLoading, error } = useGetUser(id);

  if (isLoading)
    return (
      <div className="flex flex-col gap-6">
        <p>Loading...</p>
        <Loading />
      </div>
    );

  console.log(data, error);
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
