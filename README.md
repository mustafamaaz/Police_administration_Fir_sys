# Police Administration and FIR System 

The Police Administration and FIR System is a comprehensive solution designed for efficient management of police personnel and FIR (First Information Report) records. 
It encompasses several modules tailored to streamline administrative tasks and facilitate seamless communication between administrators and station administrators.

## Key Modules:

### Administrator Role:

- `EMPLOYEE MANAGEMENT` : Administrators can register new employees, assign duties, and manage transfers to specific Station Numbers.

- `STATION ADMIN CREATION` : They have the authority to create station administrators for particular Station Numbers.

- `FIR MONITORING` : Administrators can monitor both created and deleted FIR records for oversight and accountability.

### Station Administrator Role:

- `FIR MANAGEMENT` : Station administrators can create new FIR records and initiate requests for FIR deletion.

- `FIR DELETION APPROVAL`: Deleted FIR records are not immediately removed but instead sent as requests to the administrator for approval. Once approved, the FIR is permanently deleted.

- `COMMUNICATION MODULE` : Station administrators can engage in real-time communication with administrators using the built-in chat feature, ensuring prompt and efficient exchange of information.


## Technical Setup:


### Database Mysql

- first you create database in your mysql server name police_administration and import given mysql file into your database 

after this you must add your mysql host name and password in backend/connection_db.js

### AWS s3 bucket

- you must have AWS account for S3 bucket and add sensitive info into .env  like secret key bucket name region name ,secreat Key


#### packages installation

 - go to backend dir and run

```bash
 npm install
```
- go to frontend dir and run

```bash
 npm install
```

### run locally

 - go to backend dir and run

```bash
 npm run start-watch
```

- go to frontend dir and run

```bash
 npm start
```

 
