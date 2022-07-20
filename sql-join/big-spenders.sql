select *
from "payments"
join "customers" using ("customerId")
order by "payments"."amount" DESC
limit 10;
