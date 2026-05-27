-- Public dish map view for foodielog.app.
-- This view exposes only public map/share fields and intentionally omits
-- profiles, emails, notes, ratings, private saves, and private user metadata.

create or replace view public.public_map_dishes
with (security_invoker = true)
as
select
    post.id as dish_post_id,
    canonical.primary_name as dish_name,
    restaurant.name as restaurant_name,
    coalesce(post.city, restaurant.city) as city,
    coalesce(restaurant.country_name, restaurant.country) as country,
    restaurant.latitude,
    restaurant.longitude,
    post.photo_url
from public.dish_posts post
join public.canonical_dishes canonical
    on canonical.id = post.canonical_dish_id
join public.restaurants restaurant
    on restaurant.id = post.restaurant_id
where post.photo_url is not null
  and btrim(post.photo_url) <> ''
  and restaurant.latitude is not null
  and restaurant.longitude is not null;

grant select on public.public_map_dishes to anon, authenticated;
