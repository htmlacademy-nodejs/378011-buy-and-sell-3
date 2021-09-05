-- Получить список всех категорий (идентификатор, наименование категории)
SELECT
  id ,
  title
FROM categories;

-- Получить спискок юзеров (имя, емейл)
SELECT
  name,
  email
FROM users;

-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории);
SELECT
  offers_categories.category_id,
  categories.title
FROM offers_categories
INNER JOIN categories
	ON categories.id = offers_categories.category_id
GROUP BY offers_categories.category_id, categories.title;

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);
SELECT
  offers_categories.category_id,
  categories.title,
  count(offers_categories.category_id) AS "count of offers in category"
FROM offers_categories
INNER JOIN categories
	ON categories.id = offers_categories.category_id
GROUP BY offers_categories.category_id, categories.title;

-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления,
-- текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий).
-- Сначала свежие объявления;
SELECT
  offers.id,
  offers.title,
  offers.sum,
  offers.type,
  offers.description,
  offers.created_date,
  users.name AS "first and last name",
  users.email,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.title, ', ') AS "categories list"
FROM offers
JOIN offers_categories ON offers.id = offers_categories.offer_id
JOIN categories ON offers_categories.category_id = categories.id
LEFT JOIN comments ON comments.offer_id = offers.id
JOIN users ON users.id = offers.user_id
GROUP BY offers.id, users.id
ORDER BY offers.created_date DESC


-- Получить полную информацию определённого объявления
-- (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора,
-- контактный email, количество комментариев, наименование категорий);
SELECT
  offers.id,
  offers.title,
  offers.sum,
  offers.type,
  offers.description,
  offers.created_date,
  users.name AS "first and last name",
  users.email,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.title, ', ') AS "categories list"
FROM offers
JOIN offers_categories ON offers.id = offers_categories.offer_id
JOIN categories ON offers_categories.category_id = categories.id
LEFT JOIN comments ON comments.offer_id = offers.id
JOIN users ON users.id = offers.user_id
WHERE
  offers.id = 1
GROUP BY offers.id, users.id

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT
  comments.id,
  comments.offer_id,
  users.name AS "first and last name",
  comments.text
FROM comments
INNER JOIN users
	ON comments.user_id = users.id
ORDER BY comments.created_date DESC
LIMIT 5;

-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
  comments.id,
  comments.offer_id,
  users.name AS "first and last name",
  comments.text
FROM comments
INNER JOIN users
	ON comments.user_id = users.id
WHERE
  comments.offer_id = 1
ORDER BY comments.created_date DESC;

-- Выбрать 2 объявления, соответствующих типу «куплю»;
SELECT * FROM offers
WHERE type = 'OFFER'
LIMIT 2;

-- Обновить заголовок определённого объявления на «Уникальное предложение!»;
UPDATE offers
  set title = 'Уникальное предложение!'
WHERE
  offers.id = 1;
