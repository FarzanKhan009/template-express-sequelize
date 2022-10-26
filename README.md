
# Startup Express-Sequelize-JWTAuth Project

This very basic startup project. Perfectly structured, configured database, a very common user table and auth performed using jwt.
I will keep adding more basic things to this startup as soon as I realized it needs to be added.

For other things like migrations I will introduce separate branches and will not merge in main and if scenario or requiremnet appears will take clone to the specific branch.



Feel free to use it as a startup template for your great project to come.
## Documentation


**Steps**: 
1. First setup the database, it needs to create schema/database manually in database, once schema is created it will add relevant table on next run. 
**Notes:** It dont add new fields you can think of migrations in future.


```
CREATE DATABASE databasename; 
```
**Make sure** schema/database is same as in project's db configuration file.

```
//example
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "", // mysql 
    DB: "test",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
```

**New Module**

Whenever a new module need to be created do the following
1. Create a model file in model directory newModel.model.js
```
// app/models/newModel.model.js

module.exports = (sequelize, Sequelize) => {
  const newModel = sequelize.define("tableName", {
    col1: {
      type: [Sequelize.Type],
      //table constraints
      allowNull: false,
      unique: true,
      //sequelize validations
      validate: {
        isEmail: true,
      }
    },
    col2: {
      type: [Sequelize.Type],
      allowNull: false,
       unique: true
     },
  });

  return newModel;
};


```
2. model/index.js file extend db object with new models. Consider extending db object at the end of the file.
```
db.newModel = require("./newModel.model.js")(sequelize, Sequelize);
```
3. Create model relevant controller in controllers directory and define necessary functions
```
// example
// controllers/newModel.controller.js

const db = require("../models");
const newModel = db.tableName;
const Op = db.Sequelize.Op;

// Create and Save a new newModel
exports.create = (req, res) => {
  // Validate request

  // Create a newModel
  const record = {
    col1: req.body.col1,
    col2: req.body.col2,
  };

  // Save newModel in the database
  newModel.create(record)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the newModel.",
        error: err
      });
    });
};
```

4. Create controller related route file in routes directory
```
// routes/newModel.routes.js
module.exports = app => {
    const newModel = require("../controllers/newModel.controller.js");
    var router = require("express").Router();
  
    // Create a new newModel
    router.post("/", exports.create);
  
    app.use("/api/exports", router);
  };
  
```
5. Initialize route in server.js file at the bottom
```
require("./app/routes/newModel.routes")(app);

```
