
CREATE TABLE Groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL UNIQUE,
);

CREATE TABLE GroupMembers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    groupId INT NOT NULL,
    userId INT NOT NULL,
    role VARCHAR(255) NOT NULL,
    FOREIGN KEY (groupId) REFERENCES Groups(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    groupId INT NOT NULL,
    userId INT NOT NULL,
    messageText VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (groupId) REFERENCES Groups(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);
