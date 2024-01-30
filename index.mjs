import express from "express";
import bodyParser from "body-parser";




const app = express();
const port = 3000;
var data = []

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var pic = ["/images/téléchargement (1).jpg","/images/téléchargement (2).jpg","/images/téléchargement (3).jpg"]





app.get("/", (req, res) => {
    res.render("index.ejs", {
        bdd: data,
        longueur: data.length,
        liste: pic,
        ln_liste: pic.length

    });
    console.log(data)
});



app.get("/blog", (req, res) => {
      res.render("blog.ejs", {
        bdd: data,
        longueur: data.length,
        longueur: data.length,
        liste: pic,
        ln_liste: pic.length
    });
      })
      

app.get("/post", (req, res) => {
res.render("post.ejs");
})


app.post("/submit", (req, res) => {
      var data_user = {};
      data_user["date"] = req.body["user_date"];
      data_user["domaine"] = req.body["user_domaine"];
      data_user["title"]= req.body["user_title"];
      data_user["message"] = req.body["user_message"];
      data_user["backr"] = pic[Math.floor(Math.random() * pic.length)]
      console.log(data_user);
      data.push(data_user);
      res.redirect("/");
      })






app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
    