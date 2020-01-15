var express = require('express');
    app = express();
    mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: String,
   },{timestamps: true })
   const Person = mongoose.model('Person', PersonSchema);

mongoose.connect('mongodb://localhost/people_db', { useNewUrlParser: true })

app.set('view engine', 'ejs');
app.use(express.json());
app.get('/',(req, res) =>{
    Person.find()
        .then(persons => res.json(persons))
        .catch(err => res.json(err));
}),
app.get('/remove/:name', (req, res) =>{
    const person = Person.findOne({name: req.params.name})
        person.remove({name: req.params.name})
        .then(persons => res.json(persons))
        .catch(err => res.json(err));
}),
app.get('/new/:name', (req,res) =>{
    const person = new Person();
    person.name = req.params.name;
    person.save()
        .then(persons => res.json(persons))
        .catch(err => res.json(err));
})
app.get('/:name', (req,res) =>{
    Person.findOne({name: req.params.name})
        .then(persons => res.json(persons))
        .catch(err => res.json(err));
});
app.listen(8000, function () {
    console.log("server running on port 8000");
});