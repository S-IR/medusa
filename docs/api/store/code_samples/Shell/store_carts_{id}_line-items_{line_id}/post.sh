curl -X POST 'https://medusa-url.com/store/carts/{id}/line-items/{line_id}' \
-H 'Content-Type: application/json' \
--data-raw '{
    "quantity": 1
}'
