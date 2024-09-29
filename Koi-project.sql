
USE KoiServices
-- Create table for Roles
CREATE TABLE Roles (
    roleID VARCHAR(30) PRIMARY KEY NOT NULL,
    title VARCHAR(100)
);

-- Create table for Users
CREATE TABLE Users (
    userID VARCHAR(30) PRIMARY KEY NOT NULL,
    password VARCHAR(20) NOT NULL,
    name NVARCHAR(100),
    email VARCHAR(50),
    phoneNumber VARCHAR(10) NOT NULL,
    roleID VARCHAR(30) NOT NULL,
    address NVARCHAR(100),
    FOREIGN KEY (roleID) REFERENCES Roles(roleID)
);

-- Create table for Veterinarians
CREATE TABLE Veterinarians (
    veterinaID VARCHAR(30) PRIMARY KEY NOT NULL,
    rating FLOAT,
    userID VARCHAR(30) NOT NULL,
    status VARCHAR(10) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Create table for Services
CREATE TABLE Services (
    serviceID VARCHAR(30) PRIMARY KEY NOT NULL,
    name NVARCHAR(50) NOT NULL,
    type VARCHAR(50),
    price FLOAT
);

-- Create table for TravelExpenses
CREATE TABLE TravelExpenses (
    ExpenseID VARCHAR(30) PRIMARY KEY NOT NULL,
    Fee INT NOT NULL,
    endLocation VARCHAR(50) NOT NULL
);

-- Create table for Orders
CREATE TABLE Orders (
    orderID VARCHAR(30) PRIMARY KEY NOT NULL,
    veterinaID VARCHAR(30) NOT NULL,
    userID VARCHAR(30) NOT NULL,
    orderDate DATE,
    slot INT,
    ExpenseID VARCHAR(30) NOT NULL,
    address VARCHAR(100) NOT NULL,
    Description VARCHAR(255),
    status VARCHAR(10),
    FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (ExpenseID) REFERENCES TravelExpenses(ExpenseID)
);

-- Create table for Invoice
CREATE TABLE Invoice (
    invoiceID VARCHAR(30) PRIMARY KEY NOT NULL,
    orderID VARCHAR(30) NOT NULL,
    total INT,
    invDate DATE,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID)
);

-- Create table for OrderDetails
CREATE TABLE OrderDetails (
    orderID VARCHAR(30) NOT NULL,
    serviceID VARCHAR(30) NOT NULL,
    quantity INT,
    PRIMARY KEY (orderID, serviceID),
    FOREIGN KEY (orderID) REFERENCES Orders(orderID),
    FOREIGN KEY (serviceID) REFERENCES Services(serviceID)
);

-- Create table for Schedule
CREATE TABLE Schedule (
    scheduleID VARCHAR(30) PRIMARY KEY NOT NULL,
    veterinaID VARCHAR(30) NOT NULL,
    scheduleDate DATE NOT NULL,
    slot INT,
    FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID)
);

-- Create table for Feedback
CREATE TABLE Feedback (
    feedbackID VARCHAR(30) PRIMARY KEY NOT NULL,
    invoiceID VARCHAR(30) NOT NULL,
    comment VARCHAR(100),
    rating FLOAT,
    feedbackDateTime DATETIME,
    FOREIGN KEY (invoiceID) REFERENCES Invoice(invoiceID)
);
