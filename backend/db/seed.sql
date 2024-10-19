INSERT INTO Questions (id, type, order_num, question)
VALUES
  ('af99c5df-5c1f-4491-982b-2d6f068ffa03', 'extraversion', 1, '最近体験した楽しかった出来事や人との交流について教えてください。どのように感じましたか？'),
  ('c4c76868-5b04-4dff-b052-14d756534524', 'agreeableness', 2, '他人との意見の対立があったとき、あなたはどのように対処しますか？その経験について具体的に話してください。'),
  ('97d75df6-37f7-47e3-9dd7-46662e7a3475', 'conscientiousness', 3, '大きなプロジェクトやタスクをどのように計画して進めていきますか？その過程を教えてください。'),
  ('30744af0-d830-48a2-98d1-7af91b7c31d5', 'neuroticism', 4, '最近、ストレスを感じた状況について教えてください。それに対処するためにどのようなアプローチを取りましたか？'),
  ('4e5f6677-befd-4bb1-9b7a-3149162a330c', 'openness', 5, '新しいアイデアや異文化についてどのように考えていますか？最近どのような新しい体験をしましたか？');

INSERT INTO "Users" ("id", "name", "image_url", "created_at", "updated_at")
VALUES
  ('ba6d5b49-f786-478f-aaf9-b7948b83a05e', 'test', NULL, '2024-10-19 15:34:32', '2024-10-19 15:34:32'),
  ('ba6d5b49-f786-478f-aaf9-b7948b8eerfd', 'test1', NULL, '2024-10-20 15:34:32', '2024-10-20 15:34:32');

INSERT INTO Personalities (
  id,
  user_id,
  openness,
  conscientiousness,
  extraversion,
  agreeableness,
  neuroticism,
  description,
  description_en
) VALUES (
  '1eef9f9c-0f0a-4329-80c4-76744c19a70c',
  "ba6d5b49-f786-478f-aaf9-b7948b83a05e",
  85,
  90,
  80,
  75,
  40,
  'この人物は新しいものに対して非常にオープンであり、異文化や新しいアイデアを受け入れることに積極的です。誠実で計画的に物事を進める能力に優れています。人との交流を楽しみ、ポジティブな気分になることが多い。対立があっても調和的な解決策を見つけようとします。ストレスに対しては比較的柔軟に対処し、落ち着くことができる性質を持っています。',
  'This person is very open to new things and embraces new ideas and cultures enthusiastically. They excel in being conscientious and organized. They enjoy social interactions and often feel energized by them. When conflicts arise, they seek harmonious solutions. They handle stress relatively well and manage to stay composed.'
);

INSERT INTO Rooms (id, name, owner_id, member_id)
VALUES
  ('95144a33-d37d-0941-2099-882192201c8c', 'test room', 'ba6d5b49-f786-478f-aaf9-b7948b83a05e', 'ba6d5b49-f786-478f-aaf9-b7948b8eerfd');

INSERT INTO Messages (id, room_id, user_id, message, message_type, "created_at", "updated_at")
VALUES
  ('c3d9ca3f-e22c-a9f3-b28a-b03010dee145', '95144a33-d37d-0941-2099-882192201c8c', 'ba6d5b49-f786-478f-aaf9-b7948b83a05e', 'Hello, Bob!', 'text', '2024-10-19 15:34:32', '2024-10-19 15:34:32'),
  ('529453f4-0e12-c8a4-c881-60a33d65a21e', '95144a33-d37d-0941-2099-882192201c8c', 'ba6d5b49-f786-478f-aaf9-b7948b8eerfd', 'Hi, Alice!', 'text', '2024-10-19 16:34:32', '2024-10-19 16:34:32');
