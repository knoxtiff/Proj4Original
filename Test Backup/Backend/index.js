import express from 'express';
import cors from 'cors';
import mysql from 'mysql'; 
import categories from './router/categories.js';
import questions from './router/questions.js';

const app = express(); 

app.use(cors()); 
app.use(express.json());
app.use('/categories', categories);      
app.use('/questions', questions);    

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root",
    database: "friends"
}); 

app.post('/register', (req, res) => {
    const userName = req.body.userName; 
    const password = req.body.password; 
    const confirmPassword = req.body.confirmPassword; 

    connection.query("INSERT INTO users (userName, password) VALUES (?, ?)", [userName, password], 
        (err, result) => {
            if(result){
                res.send(result); 
            } else {
                res.send({message: "Enter Requested Data"})
            }
        }
    )
})

app.post('/login', (req, res) => {
    const userName = req.body.userName; 
    const password = req.body.password; 

    connection.query("SELECT * FROM users WHERE userName = ? AND password = ?", [userName, password], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err}); 
            } else {
                if(result.length > 0){
                    res.send(result); 
                } else {
                    res.send({message: "Incorrect UserName or Password Entered"}); 
                }
            }
        }
    )
});

app.listen(3001, () => {
    console.log("Backend is running")
})