const express=require("express");
const app=express();

function Movie(title,posterPath,overview){
    this.title=title;
    this.posterPath=posterPath;
    this.overview=overview;
}

app.get("/",(req,res)=>{
    const spidermanMovie=new Movie(
        "Spider-Man: No Way Home","/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
    );
    res.json(spidermanMovie);
});

app.get("/favourite",(req,res)=>{
    res.send("<h1>Welcome to Favourite Page</h1>");
});

app.use((error500,req,res,next)=>{
    console.error(error500.stack);
    res.status(500).send("<h1>Sorry, Something went Wrong!</h1>");
});

app.use((error404,req,res,next)=>{
    console.error(error404.stack);
    res.status(404).send("<h1>Page not found!</h1>");
});

const port = 7777;
app.listen(port,()=>{
    console.log("Server is running at port 7777");
});