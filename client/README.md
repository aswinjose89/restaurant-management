
### Angular CRUD Operation Using LocalStorage

The following is an illustration of how we can apply CRUD operation in angular framework with the help of typescript and localstorage

#### Prerequisites:

- node v12.0.0
- angular v11.1.0
- ag-grid-community v26.1.0
- @angular/material v11.1.0
- bootstrap v5.0.2
- ngrx v12.5.0
- angular/router v11.1.0
- Refer the module source code directory path at src/app/routes/employee

#### How to Run:

- install all modules first by typing `npm install` or `yarn add`

- to run it please type `npm run start`
- Access Url http://localhost:4200/employee/list 0r http://localhost:4200

#### Build Docker image:

```
  docker build -t gic-front-end:1.0 .
  docker run --rm -it --publish 4200:4200 gic-front-end:1.0 bash
```

## ✨ Features

Landing Page

![alt text](docs/emp_home_page.png)

Add New Employee
![alt text](docs/add_emp.png)

Newly Added Employee via LocalStorage
![alt text](docs/newly_added_emp.png)

Form Validation
![alt text](docs/add_emp_validation.png)

Edit Employee
![alt text](docs/edit_emp.png)

Updated Employee
![alt text](docs/updated_emp.png)

Delete Employee
![alt text](docs/delete_emp.png)

## 📃 License

MIT
