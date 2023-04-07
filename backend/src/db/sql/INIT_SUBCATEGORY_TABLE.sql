CREATE TABLE MOOLMORTHS.SUBCATEGORY (
  ID int NOT NULL,
  CATEGORY_ID int NOT NULL,
  NAME varchar(100) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (CATEGORY_ID) REFERENCES MOOLMORTHS.CATEGORY(ID)
);

INSERT INTO MOOLMORTHS.SUBCATEGORY (ID, CATEGORY_ID, NAME)
VALUES
  (1, 1, 'Fruit'),
  (2, 1, 'Vegetables'),
  (3, 1, 'Salad'),
  (4, 1, 'Organic'),
  (5, 2, 'Poultry'),
  (6, 2, 'Meat'),
  (7, 2, 'Seafood'),
  (8, 2, 'Deli Meats'),
  (9, 3, 'Cheese'),
  (10, 3, 'Milk'),
  (11, 3, 'Yogurt'),
  (12, 3, 'Cream, Custard & Desserts'),
  (13, 4, 'Health Foods'),
  (14, 4, 'Vitamins'),
  (15, 4, 'Diet & Sport Nutrition'),
  (16, 4, 'First Aid & Medical'),
  (17, 5, 'Healthier Lunch Box'),
  (18, 5, 'Snacks'),
  (19, 5, 'Lunch'),
  (20, 5, 'Drinks');

COMMIT;