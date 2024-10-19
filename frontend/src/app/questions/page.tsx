"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  const { setAnswers, handleAction } = usePostAnswers();

  const onSubmit = (data: FormValues) => {
    setAnswers([
      { uuid: QUESTIONS[0].id, answer: data.extraversion },
      { uuid: QUESTIONS[1].id, answer: data.agreeableness },
      { uuid: QUESTIONS[2].id, answer: data.conscientiousness },
      { uuid: QUESTIONS[3].id, answer: data.neuroticism },
      { uuid: QUESTIONS[4].id, answer: data.openness },
    ]);
    handleAction();
  };

  console.error(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {QUESTIONS.map(({ type, id, text }) => (
        <Fragment key={id}>
          <div>
            <h2 className="flex items-center justify-center mb-48">
              <span className="text-xl text-black font-bold">{text}</span>
            </h2>
            <div>
              <p className="text-sm font-medium">回答内容</p>
              <input type="textarea" {...register(type)} />
            </div>
          </div>
        </Fragment>
      ))}
      <button
        type="submit"
        disabled={!isValid}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isValid ? "この回答で守護霊を作成する" : "未入力の項目があります"}
      </button>
    </form>
  );
};

export default Page;
