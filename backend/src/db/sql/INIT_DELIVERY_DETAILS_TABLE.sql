CREATE TABLE MOOLMORTHS.DELIVERY_DETAILS (
  ID int NOT NULL AUTO_INCREMENT,
  FIRST_NAME varchar(20) NOT NULL,
  LAST_NAME varchar(20) NOT NULL,
  EMAIL varchar(255) NOT NULL,
  ADDRESS_LINE_1 varchar(100) NOT NULL,
  ADDRESS_LINE_2 varchar(100) NOT NULL,
  SUBURB varchar(20) NOT NULL,
  POSTCODE varchar(20) NOT NULL,
  STATE varchar(10) NOT NULL,
  PRIMARY KEY (ID)
);
