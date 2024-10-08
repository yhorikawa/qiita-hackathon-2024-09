-- name: createConversation :exec
INSERT INTO Conversations (id) VALUES (@id);

-- name: getConversationById :one
SELECT
    *
FROM
    Conversations
WHERE
    id = @id;

-- name: createMessage :exec
INSERT INTO Messages (id, conversation_id, sender, message) VALUES (@id, @conversation_id, @sender, @message);

-- name: updateConversationAskCount :exec
UPDATE
    Conversations
SET
    ask_count = @ask_count
WHERE
    id = @id;

-- name: getMessagesByConversationId :many
SELECT
    *
FROM
    Messages
WHERE
    conversation_id = @conversation_id
ORDER BY
    send_at_unix_time asc;

-- name: getDocuments :many
SELECT
    *
FROM
    Documents
ORDER BY
    created_at DESC;

-- name: createDocument :exec
INSERT INTO Documents (id, conversation_id, content) VALUES (@id, @conversation_id, @content);

-- name: getDocumentById :one
SELECT
    *
FROM
    Documents
WHERE
    id = @id;

-- name: getDocumentByConversationId :one
SELECT
    *
FROM
    Documents
WHERE
    conversation_id = @conversation_id;
