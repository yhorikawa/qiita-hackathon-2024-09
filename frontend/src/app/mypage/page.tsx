"use client";
import type { NextPage } from "next";
import { notFound } from "next/navigation";
import { Loading, Menu, Notice, Profile } from "#/components/ui";
import { useGetMe } from "../_dependencies/use-get-me";

const Page: NextPage = () => {
  const { data, isLoading, error } = useGetMe();

  if (isLoading)
    return (
      <div className="flex flex-col gap-6">
        <p>Loading...</p>
        <Loading />
      </div>
    );
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
        <Notice />
        <div className="mt-4">
          <Profile
            name={profile().name}
            imageUrl={profile().imageUrl || "/214x214.png"}
            description={profile().description}
            meters={profile().meters}
          />
        </div>
      </div>
      <Menu />
    </section>
  );
};

export default Page;
