USE master
DROP DATABASE KoiVeterinaryServiceCenter
GO
CREATE DATABASE KoiVeterinaryServiceCenter
USE KoiVeterinaryServiceCenter

CREATE TABLE Roles
(
	roleID VARCHAR(30) PRIMARY KEY NOT NULL,
	title VARCHAR(100)
);

CREATE TABLE Users
(
	userID VARCHAR(30) PRIMARY KEY NOT NULL,
	password VARCHAR(20) NOT NULL,
	name NVARCHAR(100),
	email VARCHAR(50),
	phoneNumber VARCHAR(10) NOT NULL,
	roleID VARCHAR(30) NOT NULL,
	address NVARCHAR(100),
	CONSTRAINT PK_roleID FOREIGN KEY (roleID) REFERENCES Roles(roleID)
);

CREATE TABLE Veterinarians
(
	veterinaID VARCHAR(30) PRIMARY KEY NOT NULL,
	rating FLOAT,
	userID VARCHAR(30) NOT NULL,
	status VARCHAR(10) NOT NULL,
	CONSTRAINT PK_userID FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE Services
(
	serviceID VARCHAR(30) PRIMARY KEY NOT NULL,
	name NVARCHAR(50) NOT NULL,
	type VARCHAR(50),
	price FLOAT,
);

CREATE TABLE TravelExpenses
(
	ExpenseID VARCHAR(30) PRIMARY KEY NOT NULL,
	ExpenseAmount FLOAT NOT NULL,
	startLocation VARCHAR(50) NOT NULL, 
	endLocation VARCHAR(50) NOT NULL,
	--CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Orders
(
	orderID VARCHAR(30) PRIMARY KEY NOT NULL,
	serviceID VARCHAR(30) NOT NULL,
	veterinaID VARCHAR(30) NOT NULL,
	userID VARCHAR(30) NOT NULL,
	orderDate DATE,
	startTime TIME,
	endTime TIME,
	CONSTRAINT PK_userID_2 FOREIGN KEY (userID) REFERENCES Users(userID),
	CONSTRAINT PK_serviceID FOREIGN KEY (serviceID) REFERENCES Services(serviceID),
	CONSTRAINT PK_veterinaID FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID)
);

CREATE TABLE Invoice
(
	invoiceID VARCHAR(30) PRIMARY KEY NOT NULL,
	userID VARCHAR(30) NOT NULL,
	veterinaID VARCHAR(30) NOT NULL,
	total INT,
	invDate DATE,
	CONSTRAINT PK_userID_3 FOREIGN KEY (userID) REFERENCES Users(userID),
	CONSTRAINT PK_veterinaID_2 FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID)
);

CREATE TABLE InvoiceDetails
(
	invoiceID VARCHAR(30) NOT NULL,
	orderID VARCHAR(30) NOT NULL,
	PRIMARY KEY(orderID, invoiceID),
	quantity INT,
	CONSTRAINT PK_invoiceID_2 FOREIGN KEY (invoiceID) REFERENCES Invoice(invoiceID),
	CONSTRAINT PK_orderID_2 FOREIGN KEY (orderID) REFERENCES Orders(orderID)
);

CREATE TABLE Schedule
(
	scheduleID VARCHAR(30) NOT NULL PRIMARY KEY,
	veterinaID VARCHAR(30) NOT NULL,
	scheduleDate DATE NOT NULL,
	startTime TIME NOT NULL,
	endTime TIME NOT NULL,
	CONSTRAINT PK_veterinaID_3 FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID)
);

CREATE TABLE Feedback 
(
	feedbackID VARCHAR(30) NOT NULL,
	invoiceID VARCHAR(30) NOT NULL,
	PRIMARY KEY(feedbackID, invoiceID),
	comment VARCHAR(100),
	rating FLOAT,
	feedbackDateTime DATETIME,
	CONSTRAINT PK_invoiceID FOREIGN KEY (invoiceID) REFERENCES INVOICE(invoiceID)
);

CREATE TABLE FishInformation
(
	fishID VARCHAR(30) NOT NULL,
	userID VARCHAR(30) NOT NULL,
	PRIMARY KEY (fishID, userID),
	weight FLOAT,
	age INT,
	length FLOAT,
	healthRecord NVARCHAR(MAX),
	CONSTRAINT PK_userID_4 FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE Proccess
(
	proccessID VARCHAR(30) PRIMARY KEY NOT NULL,
	veterinaID VARCHAR(30) NOT NULL,
	Description VARCHAR(100),
	status BIT NOT NULL,
	CONSTRAINT PK_veterinaID_4 FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID)
);
