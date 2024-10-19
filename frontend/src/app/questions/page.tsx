"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui";

const schema = z.object({
  answer1: z.string(),
  answer2: z.string(),
  answer3: z.string(),
  answer4: z.string(),
  answer5: z.string(),
});

const QUESTIONS = [
  "Q1. シチューとカレーは飲み物ですか",
  "Q2. 味噌汁は飲み物ですか",
  "Q3. ハヤシライスは飲み物ですか",
  "Q4. ぜんざいは飲み物ですか",
  "Q5. コーンスープは飲み物ですか",
];

type FormValues = z.infer<typeof schema>;

const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("---------------");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="flex items-center justify-center mb-48">
          <span className="text-xl text-black font-bold">{QUESTIONS[0]}</span>
        </h2>
        <div>
          <p className="text-sm font-medium">回答内容</p>
          <input type="textarea" {...register("answer1")} />
        </div>
      </div>
      <input type="textarea" {...register("answer2")} />
      <input type="textarea" {...register("answer3")} />
      <input type="textarea" {...register("answer4")} />
      <input type="textarea" {...register("answer5")} />
      <Button type="submit" icon={true}>
        この回答で守護霊を作成する
      </Button>
    </form>
  );
};

export default Page;
