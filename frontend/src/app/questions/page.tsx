"use client";
import type { NextPage } from "next";
import { useState } from "react";
import { TextArea } from "./_components/TextArea";

const QUESTIONS = [
  "Q1. シチューとカレーは飲み物ですか",
  "Q2. 味噌汁は飲み物ですか",
  "Q3. ハヤシライスは飲み物ですか",
  "Q4. ぜんざいは飲み物ですか",
  "Q5. コーンスープは飲み物ですか",
];

const Page: NextPage = () => {
  const [ansers, setAnsers] = useState(["", "", "", "", ""]);
  const [page, setPage] = useState(0);

  const handleChange = (text: string) => {
    const newAnsers = [...ansers];
    newAnsers[page] = text;
    setAnsers(newAnsers);
  };

  const handleClick = (page: number) => {
    if (page < 0 || page >= QUESTIONS.length) {
      return;
    }
    setPage(page);
  };

  return (
    <div>
      <h2 className="flex items-center justify-center mb-48">
        <span className="text-xl text-black font-bold">{QUESTIONS[page]}</span>
      </h2>
      <div>
        <p className="text-sm font-medium">回答内容</p>
        <TextArea text={ansers[page]} setText={handleChange} />
      </div>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          disabled={page < 1}
          onClick={() => handleClick(page - 1)}
          className="bg-green-700 text-white py-2 px-8 mx-4 rounded-xl disabled:bg-green-200 text-sm font-extrabold"
        >
          ← 前にもどる
        </button>
        <button
          type="button"
          disabled={page > 3}
          onClick={() => handleClick(page + 1)}
          className="bg-green-700 text-white py-2 px-8 mx-4 rounded-xl disabled:bg-green-200 text-sm font-extrabold"
        >
          次の設問へ進む →
        </button>
      </div>
    </div>
  );
};

export default Page;
