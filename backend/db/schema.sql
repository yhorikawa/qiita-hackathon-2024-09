CREATE TABLE IF NOT EXISTS Conversations (
  id TEXT PRIMARY KEY,
  ask_count INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS Messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  send_at_unix_time INTEGER DEFAULT (strftime('%s','now')),
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (conversation_id) REFERENCES Conversations(id)
);
CREATE INDEX idx_send_at_unix_time ON Messages (send_at_unix_time);

CREATE TABLE IF NOT EXISTS Documents (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (conversation_id) REFERENCES Conversations(id)
);
