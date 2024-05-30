CREATE TABLE IF NOT EXISTS clean_olympic_medals (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    discipline_title VARCHAR(50),
    slug_game VARCHAR(50),
    event_title VARCHAR(50),
    event_gender VARCHAR(50),
    medal_type VARCHAR(50),
    participant_type VARCHAR(50),
    participant_title VARCHAR(50),
    athlete_url TEXT,
    athlete_full_name TEXT,
    country_name VARCHAR(50),
    country_code VARCHAR(5),
    country_3_letter_code VARCHAR(3)
);

INSERT INTO clean_olympic_medals (discipline_title, slug_game, event_title, event_gender, medal_type, participant_type, participant_title, athlete_url, athlete_full_name, country_name, country_code, country_3_letter_code)
SELECT
    discipline_title,
    slug_game,
    event_title,
    event_gender,
    medal_type,
    participant_type,
    participant_title,
    athlete_url,
    athlete_full_name,
    country_name,
    country_code,
    country_3_letter_code
FROM
    olympic_medals
WHERE
    slug_game NOT IN (
        SELECT DISTINCT slug_game
        FROM olympic_results
        WHERE slug_game NOT IN (
            SELECT DISTINCT slug_game
            FROM clean_olympic_hosts
        )
    );