"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui";
import { QUESTIONS } from "#/constants/questions";
import { usePostAnswers } from "./use-post-question";

const schema = z.object({
  extraversion: z.string().min(1),
  agreeableness: z.string().min(1),
  conscientiousness: z.string().min(1),
  neuroticism: z.string().min(1),
  openness: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { handleAction } = usePostAnswers();

  const onSubmit = (data: FormValues) => {
    handleAction([
      { uuid: QUESTIONS[0].id, answer: data.extraversion },
      { uuid: QUESTIONS[1].id, answer: data.agreeableness },
      { uuid: QUESTIONS[2].id, answer: data.conscientiousness },
      { uuid: QUESTIONS[3].id, answer: data.neuroticism },
      { uuid: QUESTIONS[4].id, answer: data.openness },
    ]);
  };

  console.error(errors);

  return (
    <section className="pt-6 px-4 pb-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        {QUESTIONS.map(({ type, id, text, order }) => (
          <Fragment key={id}>
            <div className="[&:not(:first-child)]:mt-12">
              <h2 className="flex items-center justify-center text-lg leading-relaxed font-bold">
                Q{order}.{text}
              </h2>
              <div className="mt-6">
                <p className="text-sm font-medium">Q{order}への回答</p>
                <textarea
                  {...register(type)}
                  className="mt-3 block w-full rounded-md placeholder:text-sm"
                  placeholder="回答を入力…"
                />
                <p className="mt-3 text-xs font-normal leading-normal">
                  電話番号や住所など個人を特定する情報は入力しないでください
                </p>
              </div>
            </div>
          </Fragment>
        ))}
        <Button type="submit" icon={true} isDisabled={!isValid} isFull={true}>
          {isValid ? "この回答で守護霊を作成する" : "未入力の項目があります"}
        </Button>
      </form>
    </section>
  );
};

export default Page;
