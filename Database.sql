USE master
DROP DATABASE KoiVeterinaryServiceCenter
GO
CREATE DATABASE KoiVeterinaryServiceCenter
USE KoiVeterinaryServiceCenter

CREATE TABLE Users
(
	userID VARCHAR(30) PRIMARY KEY NOT NULL,
	password VARCHAR(20) NOT NULL,
	name NVARCHAR(100),
	email VARCHAR(50),
	phoneNumber VARCHAR(10),
	role VARCHAR(10) NOT NULL,
	address NVARCHAR(100)
);

CREATE TABLE Veterinarians
(
	veterinaID VARCHAR(30) PRIMARY KEY NOT NULL,
	rating FLOAT,
	userID VARCHAR(30) NOT NULL,
	CONSTRAINT PK_userID FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE Services
(
	serviceID VARCHAR(30) PRIMARY KEY NOT NULL,
	name NVARCHAR(50) NOT NULL,
	type VARCHAR(50),
	price INT,
);

CREATE TABLE Invoice
(
	invoiceID VARCHAR(30) PRIMARY KEY NOT NULL,
	userID VARCHAR(30) NOT NULL,
	veterinaID VARCHAR(30) NOT NULL,
	datdata VARCHAR(50),
	total INT,
	CONSTRAINT PK_userID_2 FOREIGN KEY (userID) REFERENCES Users(userID),
	CONSTRAINT PK_veterinaID FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID)
);

CREATE TABLE Schedule
(
	veterinaID VARCHAR(30) NOT NULL,
	scheduleDate DATE NOT NULL,
	period TIME NOT NULL,
	status BIT NOT NULL,
	PRIMARY KEY(scheduleDate, period),
	CONSTRAINT PK_veterinaID_2 FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID)
);

CREATE TABLE Feedback 
(
	invoiceID VARCHAR(30) PRIMARY KEY NOT NULL,
	userID VARCHAR(30) NOT NULL,
	veterinaID VARCHAR(30) NOT NULL,
	comment VARCHAR(100),
	rating FLOAT,
	CONSTRAINT PK_userID_3 FOREIGN KEY (userID) REFERENCES Users(userID),
	CONSTRAINT PK_veterinaID_3 FOREIGN KEY (veterinaID) REFERENCES Veterinarians(veterinaID),
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

DROP TABLE FishInformation