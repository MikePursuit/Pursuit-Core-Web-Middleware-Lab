const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 3000;
const app = express();

const animals = [ "Aardvark", "Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Donkey", "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly", "Camel", "Capybara", "Caribou", "Cassowary", "Cat", "Caterpillar", "Cattle", "Chamois", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Chough", "Clam", "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote", "Crab", "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Dotterel", "Dove", "Dragonfly", "Duck", "Dugong", "Dunlin", "Eagle", "Echidna", "Eel", "Eland", "Elephant", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil", "Giraffe", "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish", "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Koala", "Kookabura", "Kouprey", "Kudu", "Lapwing", "Lark", "Lemur", "Leopard", "Lion", "Llama", "Lobster", "Locust", "Loris", "Louse", "Lyrebird", "Magpie", "Mallard", "Manatee", "Mandrill", "Mantis", "Marten", "Meerkat", "Mink", "Mole", "Mongoose", "Monkey", "Moose", "Mosquito", "Mouse", "Mule", "Narwhal", "Newt", "Nightingale", "Octopus", "Okapi", "Opossum", "Oryx", "Ostrich", "Otter", "Owl", "Oyster", "Panther", "Parrot", "Partridge", "Peafowl", "Pelican", "Penguin", "Pheasant", "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise", "Quail", "Quelea", "Quetzal", "Rabbit", "Raccoon", "Rail", "Ram", "Rat", "Raven", "Red deer", "Red panda", "Reindeer", "Rhinoceros", "Rook", "Salamander", "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion", "Seahorse", "Seal", "Shark", "Sheep", "Shrew", "Skunk", "Snail", "Snake", "Sparrow", "Spider", "Spoonbill", "Squid", "Squirrel", "Starling", "Stingray", "Stinkbug", "Stork", "Swallow", "Swan", "Tapir", "Tarsier", "Termite", "Tiger", "Toad", "Trout", "Turkey", "Turtle", "Viper", "Vulture", "Wallaby", "Walrus", "Wasp", "Weasel", "Whale", "Wildcat", "Wolf", "Wolverine", "Wombat", "Woodcock", "Woodpecker", "Worm", "Wren", "Yak", "Zebra"
].map(name => name.toLowerCase());

const validAnimal = (req, res, next) => {
    let animalName = req.params.name.toLowerCase();
    res.json({
        status: animals.includes(animalName) ?
            `success ${animalName} is a valid name` : 
            `invalid input ${animalName}`,
        message: animals.includes(animalName),
    })
}

const generateSpread = (req, res, next) => {
    let floor = req.query.floor;
    let ceil = req.query.ceil;
    let range = [floor, ceil];
    let arr = [];

    for (i = floor; i <= ceil; i++) arr.push(i)
    let randPick = arr[Math.floor(Math.random() * (ceil - floor))];
    
    res.json({
        status: ceil > floor && !isNaN(ceil) && !isNaN(floor) ?
            `success range from ${floor} to ${ceil}. Random pick: ${randPick}` :
            `Error: \n ${ceil} > ${floor}: ${ceil > floor}\n${ceil} is a number: ${!isNaN(ceil)}\n${floor} is a number: ${!isNaN(floor)}`,
        range,
        randPick,
    })
}

let queue = ['xavier', 'michelle', 'corey', 'reed'];

const enqueue = (req, res, next) => {
    let name = req.body.name;
    queue.unshift(name)
    res.json({
        status: 'success',
        enqueued: name,
        queue,
    })
}
const dequeue = (req, res, next) => {
    let name = queue.pop()
    res.json({
        status: 'success',
        dequeued: name,
        queue,
    })
}
const peek = (req, res, next) => {
    res.json({
        status: 'success', 
        data: queue[queue.length - 1],
        queue,
    })
}

const handleQueue = (req, res, next) => {
    if (req.params.action === 'enqueue') enqueue(req, res, next)
    if (req.params.action === 'dequeue') dequeue(req, res, next)
    if (req.params.action === 'peek') peek(req, res, next)
}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/queue/:action', handleQueue)

app.get('/random', generateSpread)

app.get('/animal/:name', validAnimal)

app.listen(port, ()=> console.log('Running middleware lesson server.js'));