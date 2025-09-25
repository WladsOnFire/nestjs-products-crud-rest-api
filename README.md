Products RESTful js test

Application programming interface for operating with the products database.
Allows user doing CRUD operations to manipulate with products information.
[nestjs, mysql, typeorm, swagger]

Steps to run the solution:

1. Create or import DB, that contains table 'product' with following fields 

  'id' INT PK AutoIncremental
  'price' INT NOT NULL
  'name' VARCHAR NOT NULL

2. Create .env (environment variables file) in root directory with following parameters: 
 
  PORT=yourAPIport
  DB_NAME=yourDBname
  DB_PORT=yourDBport
  DB_USER=yourDBuser
  DB_PASSWORD=yourDBuserPassword
  DB_HOST=yourDBhost
  DB_TYPE=yourDBtype #Consider typeOrm compatible types

3. Run project via terminal from root directory:

    npm install
    npm run start:dev





