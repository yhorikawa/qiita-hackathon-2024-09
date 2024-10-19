CREATE TABLE IF NOT EXISTS Users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS Rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id INTEGER NOT NULL,
  member_id INTEGER,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (owner_id) REFERENCES Users(id),
  FOREIGN KEY (member_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Messages (
  id TEXT PRIMARY KEY,
  room_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (room_id) REFERENCES Rooms(id)
);

CREATE TABLE IF NOT EXISTS Personalities (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  openness INTEGER NOT NULL,
  conscientiousness INTEGER NOT NULL,
  extraversion INTEGER NOT NULL,
  agreeableness INTEGER NOT NULL,
  neuroticism INTEGER NOT NULL,
  description TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Questions (
  id TEXT PRIMARY KEY,
  order_number INTEGER NOT NULL,
  question TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS Answers (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  answer TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (question_id) REFERENCES Questions(id)
);