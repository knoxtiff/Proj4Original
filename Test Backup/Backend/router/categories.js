import express from 'express';
import mysql from 'mysql2';


const router = express.Router()
// connecting Database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Root",
    database: "friends"
});  
/*************************************************************************
 * QUERY (GET)
 *************************************************************************/
router.get("/", async (req, res) => {       // localhost:3000/category/ [GET]
    try {
        const data =  await connection.promise().query(
          `SELECT * from CATEGORY;`
        );
        res.status(202).json({  // res.send(data)
            category: data[0]
        });
      } catch (err) {
        res.status(500).json({
          message: err
        });
      }
});

/*************************************************************************
 * QUERY (GET) INDIVIDUAL
 *************************************************************************/
router.get("/:categoryID", async (req, res) => {       // localhost:3000/category/1 [GET]
  try {
    const {categoryID} = req.params; 
    const data =  await connection.promise().query(
        `SELECT *  from CATEGORY WHERE CATEGORYID=?;`, [categoryID]
      );
      res.status(202).json({  // res.send(data)
        category: data[0]
      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});
export default router;