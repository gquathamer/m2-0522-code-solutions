SELECT "co"."name",
  count("c".*)
from cities as "c"
join countries as "co" using ("countryId")
group by "co"."name"
order by "co"."name";
