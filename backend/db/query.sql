-- name: createUsers :exec
INSERT INTO Users (id, name) VALUES (@id, @name);

-- name: getUser :one
SELECT * FROM Users WHERE name = @name;

-- name: getQuestions :many
SELECT * FROM Questions order by order_num asc;

-- name: getQuestionByOrderNum :one
SELECT * FROM Questions WHERE order_num = @order_num;

-- name: getRoomById :one
SELECT * FROM Rooms AS room WHERE id = @id;

-- name: createRoom :exec
INSERT INTO Rooms (id, name, owner_id, member_id) VALUES (@id, @name, @owner_id, @member_id);

-- name: getMessagesByRoomId :many
SELECT * FROM Messages WHERE room_id = @room_id order by created_at asc;
