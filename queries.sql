-- Получить список всех категорий (идентификатор, наименование категории)
SELECT
  id AS "идентификатор",
  title AS "наименование категории"
FROM categories;

-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории);
SELECT
  offers_categories.category_id AS "идентификатор",
  categories.title  AS "наименование категории"
FROM offers_categories
INNER JOIN categories
	ON categories.id = offers_categories.category_id
GROUP BY offers_categories.category_id, categories.title;

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);
SELECT
  offers_categories.category_id AS "идентификатор",
  categories.title AS "наименование категории",
  count(offers_categories.category_id) AS "количество объявлений в категории"
FROM offers_categories
INNER JOIN categories
	ON categories.id = offers_categories.category_id
GROUP BY offers_categories.category_id, categories.title;

-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления,
-- текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий).
-- Сначала свежие объявления;
SELECT
  offers.id AS "идентификатор объявления",
  offers.title AS "заголовок объявления",
  offers.sum AS "стоимость",
  types.title AS "тип объявления",
  offers.description AS "текст объявления",
  offers.created_date AS "дата публикации",
  concat(users.first_name, ' ', users.last_name) AS "имя и фамилия автора",
  users.email AS "контактный email",
  (SELECT COUNT(*) FROM comments WHERE offers.id = comments.offer_id) AS "количество комментариев",
  STRING_AGG(categories.title, ', ') AS "наименование категорий"
FROM offers_categories
INNER JOIN offers
	ON offers.id = offers_categories.offer_id
INNER JOIN categories
	ON categories.id = offers_categories.category_id
INNER JOIN types
	ON offers.type_id = types.id
INNER JOIN users
	ON offers.user_id = users.id
GROUP BY
  offers.id,
  offers.title,
  offers.sum,
  types.title,
  offers.description,
  offers.created_date,
  users.first_name,
  users.last_name,
  users.email
ORDER BY
  offers.created_date DESC;

-- Получить полную информацию определённого объявления
-- (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора,
-- контактный email, количество комментариев, наименование категорий);
SELECT
  offers.id AS "идентификатор объявления",
  offers.title AS "заголовок объявления",
  offers.sum AS "стоимость",
  types.title AS "тип объявления",
  offers.description AS "текст объявления",
  offers.created_date AS "дата публикации",
  concat(users.first_name, ' ', users.last_name) AS "имя и фамилия автора",
  users.email AS "контактный email",
  (SELECT COUNT(*) FROM comments WHERE offers.id = comments.offer_id) AS "количество комментариев",
  STRING_AGG(categories.title, ', ') AS "наименование категорий"
FROM offers_categories
INNER JOIN offers
	ON offers.id = offers_categories.offer_id
INNER JOIN categories
	ON categories.id = offers_categories.category_id
INNER JOIN types
	ON offers.type_id = types.id
INNER JOIN users
	ON offers.user_id = users.id
WHERE
  offers.id = 1
GROUP BY
  offers.id,
  offers.title,
  offers.sum,
  types.title,
  offers.description,
  offers.created_date,
  users.first_name,
  users.last_name,
  users.email;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT
  comments.id AS "идентификатор комментария",
  comments.offer_id AS "идентификатор объявления",
  concat(users.first_name, ' ', users.last_name) AS "имя и фамилия автора",
  comments.text AS "текст комментария"
FROM comments
INNER JOIN users
	ON comments.user_id = users.id
ORDER BY comments.created_date DESC
LIMIT 5;

-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
  comments.id AS "идентификатор комментария",
  comments.offer_id AS "идентификатор объявления",
  concat(users.first_name, ' ', users.last_name) AS "имя и фамилия автора",
  comments.text AS "текст комментария"
FROM comments
INNER JOIN users
	ON comments.user_id = users.id
WHERE
  comments.offer_id = 1
ORDER BY comments.created_date DESC;

-- Выбрать 2 объявления, соответствующих типу «куплю»;
SELECT *
FROM offers
WHERE offers.type_id = (
  SELECT
    types.id
  FROM types
  WHERE types.title = 'offer'
)
LIMIT 2;

-- Обновить заголовок определённого объявления на «Уникальное предложение!»;
UPDATE offers
  set title = 'Уникальное предложение!'
WHERE
  offers.id = 1;
