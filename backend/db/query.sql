-- name: createUsers :exec
INSERT INTO Users (id, name) VALUES (@id, @name);

-- name: getUser :one
SELECT * FROM Users WHERE name = @name;
