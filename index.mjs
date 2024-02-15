import express from "express";
import bodyParser from "body-parser";
import pg from "pg";



const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "",
    port: 5432


});

db.connect();

const result = await db.query("SELECT * FROM blog_data ORDER BY id DESC"); 
const blogData = result.rows; 

var data = []

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var pic = ["/images/téléchargement (1).jpg","/images/téléchargement (2).jpg","/images/téléchargement (3).jpg"]





app.get("/",  async (req, res) => {
    const result = await db.query("SELECT * FROM blog_data ORDER BY id DESC"); 
    const blogData = result.rows; 
    res.render("index.ejs", {
        bdd: blogData,
        longueur: blogData.length,
        liste: pic,
        ln_liste: pic.length

    });
    console.log(blogData)
});





app.get("/blog", (req, res) => {
      res.render("blog.ejs", {
        bdd: blogData,
        longueur: blogData.length,
        longueur: blogData.length,
        liste: pic,
        ln_liste: pic.length
    });
      })
      

app.get("/post", (req, res) => {
res.render("post.ejs");
})


app.post("/submit", async (req, res) => {
      var data_user = {};
      data_user["date"] = req.body["user_date"];
      data_user["domaine"] = req.body["user_domaine"];
      data_user["title"]= req.body["user_title"];
      data_user["message"] = req.body["user_message"];
      data_user["backr"] = pic[Math.floor(Math.random() * pic.length)];
      try {
            await db.query("INSERT INTO blog_data (date_p, domaine, title, messages, image) VALUES ($1, $2, $3, $4, $5)",
            [data_user["date"], data_user["domaine"], data_user["title"], data_user["message"], data_user["backr"]  ]);
            data.push(data_user);
            res.redirect("/");
      } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'insertion dans la base de données");

      } 
      
      });






app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
    
