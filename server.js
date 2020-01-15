var express = require('express');
    app = express();
    mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
   })
   const Task = mongoose.model('Task', TaskSchema);

mongoose.connect('mongodb://localhost/task_db', { useNewUrlParser: true })

app.set('view engine', 'ejs');
app.use(express.json());
app.get('/',(req, res) =>{
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
}),
app.delete('/remove/:id', (req, res) =>{
    const task = Task.findOne({_id: req.params.id})
        task.remove({_id: req.params.id})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
}),
app.post('/new', (req,res) =>{
    const task = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
    task.save()
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
})
app.get('/:id', (req,res) =>{
    Task.findOne({_id: req.params.id})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});
app.put('/:id', (req,res) =>{
    Task.findOne({_id: req.params.id})
        .then(tasks =>{
            tasks.title = req.body.title;
            tasks.description = req.body.description;
            tasks.completed = req.body.completed;
            return tasks.save()
        })
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});
app.listen(8000, function () {
    console.log("server running on port 8000");
});