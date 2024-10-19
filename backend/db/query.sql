-- name: createUsers :exec
INSERT INTO Users (id, name) VALUES (@id, @name);

-- name: getUser :one
SELECT * FROM Users WHERE name = @name;

-- name: getQuestions :many
SELECT * FROM Questions order by order_num asc;

-- name: getQuestionByOrderNum :one
SELECT * FROM Questions WHERE order_num = @order_num;
