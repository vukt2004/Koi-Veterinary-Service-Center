-- Table: Roles
CREATE TABLE Roles (
    roleID CHAR(1) PRIMARY KEY NOT NULL,
    title VARCHAR(10)
);

-- Table: Slots
CREATE TABLE Slots (
    slot INT PRIMARY KEY NOT NULL,
    startTime TIME,
    endTime TIME
);

-- Table: Users
CREATE TABLE Users (
    userID VARCHAR(30) PRIMARY KEY NOT NULL,
    password VARCHAR(20) NOT NULL,
    name NVARCHAR(100),
    email VARCHAR(50),
    phoneNumber VARCHAR(10) NOT NULL,
    roleID CHAR(1) NOT NULL,
    address NVARCHAR(100),
    FOREIGN KEY (roleID) REFERENCES Roles(roleID)
);

-- Table: Veterina
CREATE TABLE Veterina (
    veterinaID VARCHAR(30) PRIMARY KEY NOT NULL,
    userID VARCHAR(30) NOT NULL,
    description NVARCHAR(200),
    status BIT,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Table: Fish
CREATE TABLE Fish (
    userID VARCHAR(30) NOT NULL,
    fishID VARCHAR(30) NOT NULL,
    weight FLOAT,
    length FLOAT,
    months INT,
    description NVARCHAR(100),
    PRIMARY KEY (userID, fishID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Table: Services
CREATE TABLE Services (
    serviceID VARCHAR(30) PRIMARY KEY NOT NULL,
    name NVARCHAR(50) NOT NULL,
    type VARCHAR(50),
    price FLOAT
);

-- Table: TravelExpenses
CREATE TABLE TravelExpenses (
    ExpenseID VARCHAR(30) PRIMARY KEY NOT NULL,
    Fee INT NOT NULL,
    endLocation VARCHAR(50) NOT NULL
);

-- Table: Orders
CREATE TABLE Orders (
    orderID VARCHAR(30) PRIMARY KEY NOT NULL,
    veterinaID VARCHAR(30) NOT NULL,
    userID VARCHAR(30) NOT NULL,
    orderDate DATE,
    slot INT,
    ExpenseID VARCHAR(30) NOT NULL,
    address VARCHAR(100) NOT NULL,
    description NVARCHAR(255),
    status VARCHAR(10),
    FOREIGN KEY (veterinaID) REFERENCES Veterina(veterinaID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (slot) REFERENCES Slots(slot),
    FOREIGN KEY (ExpenseID) REFERENCES TravelExpenses(ExpenseID)
);

-- Table: Invoice
CREATE TABLE Invoice (
    invoiceID VARCHAR(30) PRIMARY KEY NOT NULL,
    orderID VARCHAR(30) NOT NULL,
    total INT,
    invDate DATE,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID)
);

-- Table: OrderDetails
CREATE TABLE OrderDetails (
    orderID VARCHAR(30) NOT NULL,
    serviceID VARCHAR(30) NOT NULL,
    quantity INT,
    PRIMARY KEY (orderID, serviceID),
    FOREIGN KEY (orderID) REFERENCES Orders(orderID),
    FOREIGN KEY (serviceID) REFERENCES Services(serviceID)
);

-- Table: Feedback
CREATE TABLE Feedback (
    feedbackID VARCHAR(30) PRIMARY KEY NOT NULL,
    invoiceID VARCHAR(30) NOT NULL,
    comment NVARCHAR(100),
    rating FLOAT,
    feedbackDateTime DATETIME,
    FOREIGN KEY (invoiceID) REFERENCES Invoice(invoiceID)
);
