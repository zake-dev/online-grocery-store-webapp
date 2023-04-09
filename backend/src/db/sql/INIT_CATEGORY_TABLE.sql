CREATE TABLE MOOLMORTHS.CATEGORY (
  ID int NOT NULL,
  NAME varchar(100) NOT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO MOOLMORTHS.CATEGORY (ID, NAME)
VALUES
  (1, 'Fruit & Veg'),
  (2, 'Meat, Seafood & Deli'),
  (3, 'Dairy, Eggs & Fridge'),
  (4, 'Health & Wellness'),
  (5, 'Lunch Box');

COMMIT;
