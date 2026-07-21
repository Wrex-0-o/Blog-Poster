import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;
var blogs = [];

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/post", (req, res) => {
    res.render("post.ejs");
});

function blog(req, res, next){
    blogs.push(req.body.blog_content);
    next();
}

//app.use(blog);

app.get("/view", (req, res) => {
    res.render("view.ejs", { blogs });
});

//app.use(blog);

app.post("/view", blog, (req, res) => {
    res.render("view.ejs", { blogs });
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}...`);
});