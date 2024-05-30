CREATE TABLE clean_olympic_hosts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug_game VARCHAR(255),
    game_end_date DATETIME,
    game_start_date DATETIME,
    game_location VARCHAR(255),
    game_name VARCHAR(255),
    game_season VARCHAR(50),
    game_year INT(4)
);

INSERT INTO clean_olympic_hosts (slug_game, game_end_date, game_start_date, game_location, game_name, game_season, game_year)
SELECT
    game_slug AS slug_game,
    game_end_date,
    game_start_date,
    game_location,
    game_name,
    game_season,
    CASE
        WHEN game_year = '0000' THEN CAST(SUBSTRING_INDEX(game_slug, '-', -1) AS INT)
        ELSE CAST(game_year AS INT)
    END AS game_year
FROM
    olympic_hosts;

UPDATE clean_olympic_hosts
SET
    game_year = CAST(SUBSTRING_INDEX(slug_game, '-', -1) AS INT)
WHERE
    game_year = 0;
