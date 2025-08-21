CREATE TABLE dividas_tb (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cliente VARCHAR(100),
    valor VARCHAR(50),
    user_id INTEGER,

    FOREIGN KEY (user_id) REFERENCES user_tb(id)
)