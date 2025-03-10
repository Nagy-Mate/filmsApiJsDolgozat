import express from 'express'
import films from './data/films.js'

const app = express();
app.use(express.json());

app.get("/movies", (req, res)=>{
    res.status(200).json(films);
});

app.get("/movies/:id", (req, res)=>{
    const id = req.params.id;
    if(id < 0 || id > films.length - 1){
        res.status(404).json({Message: 'Invalid id! '});
    }
    res.status(200).json(films[id]);
});

app.post("/movies", (req, res)=>{
    const {title, director, year, oszkar} = req.body;
    if(!title || !director || !year || oszkar == null){
        res.status(404).json({message: 'Some data missing! '});
    }

    const newFilm = {title, director, year, oszkar};
    films.push(newFilm);
    res.status(200).json(newFilm);
});

app.put("/movies/:id", (req, res)=>{
    const id = req.params.id;
    if(id < 0 || id > films.length - 1){
        res.status(404).json({message: 'Invalid id! '});
    }

    const {title, director, year, oszkar} = req.body;
    if(!title || !director || !year || oszkar == null){
        res.status(404).json({message: 'Some data missing! '});
    }

    films[id] = {title, director, year, oszkar};
    res.status(200).json(films[id]);
});


app.delete("/movies/:id", (req, res)=>{
    const id = req.params.id;
    if(id < 0 || id > films.length - 1){
        res.status(404).json({message: 'Invalid id! '});
    }

    films.splice(id, 1);
    res.status(200).json({message: "Deleted successfully"});
});

app.listen(3000, (req, res)=>{
    console.log("Server runs on 3000 port.");
});