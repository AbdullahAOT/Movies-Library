const express=require("express");
const app=express();
const movieData=require("./Movie_Data/data.json");

function Movie(title,posterPath,overview){
    this.title=title;
    this.posterPath=posterPath;
    this.overview=overview;
}

app.get("/",(req,res)=>{
    let movieArray=[];
    movieData.map((item)=>{
        let singleMovie=new Movie(item.title,item.posterPath,item.overview);
        movieArray.push(singleMovie);
    });
    res.send(JSON.stringify(movieArray));
});

app.get("/favourite",(req,res)=>{
    res.send("<h1>Welcome to Favourite Page</h1>");
});

app.use((req,res,next)=>{
    res.status(404).send("<h1>Page not found!</h1>");
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("<h1>Sorry, Something went Wrong!</h1>");
});

const port = 7777;
app.listen(port,()=>{
    console.log("Server is running at port 7777");
});