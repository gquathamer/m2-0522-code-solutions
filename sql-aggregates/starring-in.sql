SELECT "g"."name",
  count("f".*)
FROM actors as "a"
JOIN "castMembers" as "c" using ("actorId")
JOIN "films" as "f" using ("filmId")
JOIN "filmGenre" as "fg" using ("filmId")
JOIN "genres" as "g" using ("genreId")
WHERE "a"."firstName" = 'Lisa'
AND "a"."lastName" = 'Monroe'
GROUP BY "g"."name"
ORDER BY "g"."name";
