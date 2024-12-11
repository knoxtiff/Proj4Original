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
router.get("/", async (req, res) => {       // localhost:3000/questions/ [GET]
    try {
        const data =  await connection.promise().query(
          `SELECT *  from QUESTIONS;`
        );
        res.status(202).json({  // res.send(data)
            questions: data[0]
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
router.get("/:idquestions", async (req, res) => {       // localhost:3000/questions/ [GET]
  try {
    const {idquestions} = req.params; 
    const data =  await connection.promise().query(
        `SELECT *  from QUESTIONS WHERE IDQUESTIONS=?;`, [idquestions]
      );
      res.status(202).json({  // res.send(data)
        questions: data[0]      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});

/*************************************************************************
 * INSERT (POST)
 *************************************************************************/
router.post("/", async (req, res) => {       // localhost:3000/questions/ [POST]
  try {
      const {questionText, answer, categoryID} = req.body;
      const data =  await connection.promise().query(
        `INSERT INTO QUESTIONS ( QUESTIONTEXT, ANSWER, CATEGORYID) VALUES ( ?,?);`,[questionText, answer, categoryID]
      );
      res.status(202).json({  // res.send(data)
        questions: data[0]      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});

/*************************************************************************
 * DELETE (DELETE)
 *************************************************************************/
router.delete("/:idquestions", async (req, res) => {       // localhost:3000/questions/1 [DELETE]
  try {
      const {idquestions} = req.params;
      const data =  await connection.promise().query(
        `DELETE FROM QUESTIONS WHERE QUESTIONID=?;`,[idquestions]
      );
      res.status(202).json({  // res.send(data)
        questions: data[0]      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});

/*************************************************************************
 * UPDATE (PUT)
 *************************************************************************/
router.put("/:idquestions", async (req, res) => {       // localhost:3000/questions/1 [PUT]
  try {
      const {idquestions} = req.params;
      const {questionText, answer, categoryID} = req.body;
      const data =  await connection.promise().query(
        `UPDATE QUESTIONS SET QUESTIONTEXT=?,ANSWER=?, CATEGORYID=? WHERE IDQUESTION=?;`,[questionText, answer, categoryID, idquestions]
      );
      res.status(202).json({  // res.send(data)
        questions: data[0]      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});

/*************************************************************************
 * UPDATE/partial (PATCH)
 *************************************************************************/
router.patch("/:idquestions", async (req, res) => {       // localhost:3000/questions/1 [PATCH]
  try {
      console.log(JSON.stringify(req.body));
      const {idquestions} = req.params;
      const {questionText, answer, categoryID} = req.body;
      console.log("questionText="+questionText);
      console.log("answer="+answer);
      console.log("categoryID="+categoryID);
      if (questionText && answer && categoryID) {
        var data =  await connection.promise().query(
          `UPDATE QUESTIONS SET QUESTIONTEXT=?,ANSWER=?, CATEGORYID=? WHERE IDQUESTIONS=?;`,[questionText,answer, categoryID,idquestions]
        );
      }
      else if (questionText) {
        var data =  await connection.promise().query(
          `UPDATE QUESTIONS SET QUESTIONTEXT=? WHERE IDQUESTIONS=?;`,[questionText,idquestions]
        );
      }
      else {
        var data =  await connection.promise().query(
          `UPDATE QUESTIONS SET CATEGORYID=? WHERE IDQUESTIONS=?;`,[categoryID,idquestions]
        );
      }
      res.status(202).json({  // res.send(data)
        questions: data[0]      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});
export default router;