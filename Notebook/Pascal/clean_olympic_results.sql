CREATE TABLE IF NOT EXISTS clean_olympic_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discipline_title VARCHAR(50),
    event_title VARCHAR(50),
    slug_game VARCHAR(50),
    participant_type VARCHAR(50),
    medal_type VARCHAR(50),
    athletes VARCHAR(50),
    rank_equal INT(5),
    rank_position TINYINT(4),
    country_name VARCHAR(50),
    country_code VARCHAR(5),
    country_3_letter_code VARCHAR(3)
);

INSERT INTO clean_olympic_results (discipline_title, event_title, slug_game, participant_type, medal_type, athletes, rank_equal, rank_position, country_name, country_code, country_3_letter_code)
SELECT
   discipline_title,
    event_title,
    slug_game,
    participant_type,
    medal_type,
    athletes,
    rank_equal,
    rank_position,
    country_name,
    country_code,
    country_3_letter_code
FROM olympic_results
WHERE
    country_name NOT LIKE '%https%'
    AND country_name NOT LIKE '%None)%'
    AND country_name NOT LIKE '%Jr.%'
    AND country_name REGEXP '^[^0-9]*$'
    AND slug_game NOT IN (
        SELECT DISTINCT slug_game
        FROM olympic_results
        WHERE slug_game NOT IN (
            SELECT DISTINCT slug_game
            FROM clean_olympic_hosts
        )
    );

