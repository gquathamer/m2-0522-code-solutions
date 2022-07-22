SELECT "c"."lastName",
  "c"."firstName",
  sum("p"."amount") as "totalRented"
FROM "customers" as "c"
JOIN payments as "p" using ("customerId")
GROUP BY "c"."lastName", "c"."firstName"
ORDER BY "totalRented" DESC;
