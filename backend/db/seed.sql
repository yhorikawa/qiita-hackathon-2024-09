BEGIN TRANSACTION;

-- 会話を挿入
INSERT INTO Conversations(id)VALUES('1c0c86d6-ea23-418f-9a45-d67cbd073b3b');

-- メッセージを挿入
INSERT INTO Messages(id, conversation_id, sender, message)VALUES('28c90185-aa2d-4778-bbb9-dccca5687e69', '1c0c86d6-ea23-418f-9a45-d67cbd073b3b', 'user', 'Hello, world!');
INSERT INTO Messages(id, conversation_id, sender, message)VALUES('57393032-053a-45c5-815e-ff5eea070c62', '1c0c86d6-ea23-418f-9a45-d67cbd073b3b', 'ai', 'Hello, user!');

INSERT INTO Documents(id, conversation_id, content)VALUES('3025ffe6-5aea-4ef3-b3b8-0176ffffabd8', '1c0c86d6-ea23-418f-9a45-d67cbd073b3b', 'Hello, world!');

COMMIT;
