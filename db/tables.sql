CREATE TABLE Institutes (
  id SERIAL PRIMARY KEY,
  proposerFirstName VARCHAR(255) NOT NULL,
  proposerMiddleName VARCHAR(255),
  proposerLastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contactNumber VARCHAR(255) NOT NULL,
  instituteName VARCHAR(255) NOT NULL,
  addressCountry VARCHAR(255) NOT NULL,
  addressState VARCHAR(255) NOT NULL,
  addressCity VARCHAR(255) NOT NULL,
  addressZipCode VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  isActive INTEGER DEFAULT 0,
  password VARCHAR(255) NOT NULL,
  
  -- Define the composite unique constraint
  CONSTRAINT uniqueInstitute UNIQUE (
    proposerFirstName,
    proposerLastName,
    email,
    contactNumber,
    instituteName
  )
);
