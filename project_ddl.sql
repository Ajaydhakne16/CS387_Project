DROP TABLE IF EXISTS supply;
DROP TABLE IF EXISTS made_of;
DROP TABLE IF EXISTS order_contain;
DROP TABLE IF EXISTS prepares;
DROP TABLE IF EXISTS delivery;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS food_table;
DROP TABLE IF EXISTS food_order;
DROP TABLE IF EXISTS discount_coupon;
DROP TABLE IF EXISTS pin_info;
DROP TABLE IF EXISTS owner;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS chef;
DROP TABLE IF EXISTS waiter;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS delivery_person;
DROP TABLE IF EXISTS cashier;
DROP TABLE IF EXISTS supplier;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS ingredient;
DROP FUNCTION IF EXISTS check_shares();
DROP FUNCTION IF EXISTS check_total_orders();
DROP FUNCTION IF EXISTS check_total_deliveries();
DROP FUNCTION IF EXISTS update_stock();
DROP FUNCTION IF EXISTS item_availability();
DROP FUNCTION IF EXISTS update_ingredient_stock();
DROP FUNCTION IF EXISTS update_order_type();

-- sum of shares is ensured to be <= 100
CREATE TABLE owner (
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    contact varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    share float NOT NULL CHECK (share<=100 and share>=0),
    salary int NOT NULL CHECK (salary>=0),
    Primary key(email)
);

CREATE TABLE manager (
    email varchar(255)  NOT NULL,
    name varchar(255)   NOT NULL,
    contact varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    description varchar(255),
    salary int  NOT NULL CHECK (salary>=0),
    Primary key(email)
);

CREATE TABLE chef (
    email varchar(255) NOT NULL,
    name varchar(255)  NOT NULL,
    contact varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    speciality varchar(255),
    salary int NOT NULL CHECK (salary>=0),
    Primary key(email)
);

CREATE TABLE delivery_person (
    email varchar(255) NOT NULL,
    name varchar(255)  NOT NULL,
    contact varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    salary int NOT NULL CHECK (salary>=0),
    primary_code varchar(255) NOT NULL,
    secondary_code varchar(255) NOT NULL,
    rating float,
    Primary key(email)
);

--total number of bills = total number of offline orders placed
CREATE TABLE cashier (
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    contact varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    salary int NOT NULL CHECK (salary>=0),
    no_of_bills int NOT NULL CHECK (no_of_bills>=0),
    Primary key(email)
);

CREATE TABLE waiter (
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    contact varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    salary int NOT NULL CHECK (salary>=0),
    rating float,
    Primary key(email)
);

CREATE TABLE customer (
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    contact varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    password varchar(255),
    premium int NOT NULL CHECK (premium>=0),
    Primary key(email)
);

CREATE TABLE supplier (
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    contact varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    preference int NOT NULL CHECK (preference>=0),
    Primary key(email)
);

-- update availability on each update in stock
CREATE TABLE item (
    item_id int NOT NULL,
    name varchar(255) NOT NULL,
    price float NOT NULL CHECK (price>=0),
    type varchar(255)  CHECK(type ='BEVERAGE' or type = 'FOOD'),
    category varchar(255) CHECK(category ='VEG' or category = 'NON-VEG' or category = 'ALCOHOLIC' or category = 'NON-ALCOHOLIC'),
    availability int NOT NULL,
    rating float,
    Primary key(item_id)
);

--update stock after each food_order
CREATE TABLE ingredient (
    ingredient_id int NOT NULL,
    name varchar(255) NOT NULL,
    stock float NOT NULL CHECK (stock>=0),
    description varchar(255),
    Primary key(ingredient_id)
);

-- update stock after each supply
CREATE TABLE supply (
    supplier_id varchar(255) NOT NULL,
    ingredient_id int NOT NULL,
    quantity float NOT NULL CHECK (quantity>=0),
    Primary key(supplier_id, ingredient_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(email),
    FOREIGN KEY(ingredient_id) REFERENCES ingredient(ingredient_id)
);

CREATE TABLE made_of (
    item_id int NOT NULL,
    ingredient_id int NOT NULL,
    quantity float NOT NULL CHECK (quantity>=0),
    Primary key(item_id, ingredient_id),
    FOREIGN KEY(item_id) REFERENCES item(item_id),
    FOREIGN KEY(ingredient_id) REFERENCES ingredient(ingredient_id)
);

CREATE TABLE discount_coupon (
    coupon_id varchar(255) NOT NULL,
    discount float NOT NULL CHECK (discount>=0 and discount<100),
    isPremium boolean NOT NULL,
    Primary key(coupon_id)
);

--waiter_id,tip null => online/telephone food_order cashier_id null => online food_order

CREATE TABLE food_order (
    order_id int NOT NULL,
    price float NOT NULL CHECK (price>=0),
    type varchar(255) CHECK(type ='ONLINE' or type = 'OFFLINE' or type = 'TELEPHONE'),
    waiter_id varchar(255),
    tip float CHECK (tip>=0 or tip is null),
    customer_id varchar(255) NOT NULL,
    discount_coupon varchar(255),
    timestamp timestamp NOT NULL,
    cashier_id varchar(255),
    Primary key(order_id),
    FOREIGN KEY(waiter_id) REFERENCES waiter(email),
    FOREIGN KEY(customer_id) REFERENCES customer(email),
    FOREIGN KEY(cashier_id) REFERENCES cashier(email),
    FOREIGN KEY(discount_coupon) REFERENCES discount_coupon(coupon_id)
);

CREATE TABLE order_contain (
    order_id int NOT NULL,
    item_id int NOT NULL,
    quantity float NOT NULL,
    Primary key(order_id, item_id),
    FOREIGN KEY(order_id) REFERENCES food_order(order_id),
    FOREIGN KEY(item_id) REFERENCES item(item_id)
);

CREATE TABLE prepares (
    item_id int NOT NULL,
    chef_id varchar(255) NOT NULL,
    --quantity float,
    Primary key(item_id, chef_id),
    FOREIGN KEY(item_id) REFERENCES item(item_id),
    FOREIGN KEY(chef_id) REFERENCES chef(email)
);

CREATE TABLE pin_info (
    pincode int NOT NULL,
    charges varchar(255) NOT NULL,
    time varchar(255)  NOT NULL,
    Primary key(pincode)
);

--type should be online

CREATE TABLE delivery (
    house_no varchar(255) NOT NULL,
    street_name varchar(255) NOT NULL,
    landmark varchar(255),
    pincode int NOT NULL,
    contact varchar(255) NOT NULL,
    order_id int NOT NULL,
    delivery_person_id varchar(255) NOT NULL,
    Primary key(order_id),
    FOREIGN KEY(order_id) REFERENCES food_order(order_id),
    FOREIGN KEY(delivery_person_id) REFERENCES delivery_person(email),
    FOREIGN KEY(pincode) REFERENCES pin_info(pincode)
);

CREATE TABLE food_table (
    table_num int NOT NULL,
    --type varchar(255),
    location varchar(255) NOT NULL,
    seating_capacity int NOT NULL CHECK (seating_capacity>=0),
    Primary key(table_num)
);

CREATE TABLE books (
    booking_id int NOT NULL,
    table_num int NOT NULL,
    customer_id varchar(255) NOT NULL,
    timestamp timestamp NOT NULL,
    Primary key(booking_id),
    FOREIGN KEY(table_num) REFERENCES food_table(table_num),
    FOREIGN KEY(customer_id) REFERENCES customer(email)
);

---------------------------------------------------------------------
-- -- sum of shares is ensured to be <= 100

CREATE FUNCTION check_shares() RETURNS TRIGGER 
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF NEW.share + (SELECT sum(share) from owner) <= 100 THEN
        RETURN NULL;
        ELSE 
        RETURN NEW;
        END IF;
    END;
$$;

CREATE TRIGGER check_shares
  BEFORE UPDATE or INSERT
  ON owner
  FOR EACH ROW
  EXECUTE PROCEDURE check_shares();

--total number of bills == number of offline orders
CREATE  FUNCTION check_total_orders()
  RETURNS trigger LANGUAGE plpgsql AS
$$
BEGIN
    IF (SELECT sum(no_of_bills) from cashier) == (SELECT count(order_id) FROM food_order WHERE food_order.type == "OFFLINE" OR food_order.type == "TELEPHONE")  THEN
    RETURN NEW;
    ELSE 
    RETURN NULL;
    END IF;
END;
$$;

CREATE TRIGGER check_total_orders
  AFTER UPDATE
  ON cashier
  FOR EACH ROW
  EXECUTE PROCEDURE check_total_orders();


-- update stock after each food_order

CREATE FUNCTION update_stock() RETURNS TRIGGER 
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE ingredient SET stock = stock - NEW.quantity*(SELECT made_of.quantity FROM made_of WHERE made_of.item_id = NEW.item_id AND made_of.ingredient_id = ingredient.ingredient_id) 
    WHERE ingredient.ingredient_id in (SELECT made_of.ingredient_id FROM made_of WHERE made_of.item_id = NEW.item_id);
    RETURN NEW ;
END;
$$;

CREATE TRIGGER update_stock
  AFTER UPDATE or INSERT
  ON order_contain
  FOR EACH ROW
  EXECUTE PROCEDURE update_stock();

--update  availabilty of ingredients after each food_order

CREATE FUNCTION item_availability() RETURNS TRIGGER 
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE item SET availability = CASE
    WHEN item.availability = 1 AND NOT EXISTS (SELECT item_id FROM made_of WHERE item.item_id = made_of.item_id AND made_of.ingredient_id = NEW.ingredient_id and made_of.quantity > New.stock)
    THEN 0
    ELSE 3
    END;
    RETURN NEW ;
END;
$$;

CREATE TRIGGER item_availability
  AFTER UPDATE
  ON ingredient
  FOR EACH STATEMENT
  EXECUTE PROCEDURE item_availability();


CREATE FUNCTION update_ingredient_stock() RETURNS TRIGGER 
    LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE ingredient SET stock = stock + NEW.quantity WHERE ingredient.ingredient_id = NEW.ingredient_id;
    RETURN NEW ;
END;
$$;

CREATE TRIGGER update_ingredient_stock
  AFTER UPDATE or INSERT
  ON supply
  FOR EACH ROW
  EXECUTE PROCEDURE update_ingredient_stock();


CREATE FUNCTION update_order_type() RETURNS TRIGGER 
    LANGUAGE plpgsql
AS $$
BEGIN
    IF (NEW.waiter_id is NULL OR NEW.tip is NULL) AND (NEW.type = 'OFFLINE') THEN
    RETURN NULL;
    ELSE 
    IF (NEW.cashier_id is NULL) AND (NEW.type = 'OFFLINE' OR NEW.type = 'TELEPHONE') THEN
    RETURN NULL;
    ELSE 
    RETURN NEW;
    END IF;
END IF;
END;
$$;

CREATE TRIGGER update_order_type
  AFTER UPDATE or INSERT
  ON food_order
  FOR EACH ROW
  EXECUTE PROCEDURE update_order_type();



