document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#animal').addEventListener('submit', async (event) => {
        event.preventDefault();
        let name = document.querySelector('#animal input').value
        let url = `http://localhost:3000/animal/${name}`
        let {data} = await axios.get(url);
        addToDOM('#animal', data);
    })

    document.querySelector('#random').addEventListener('submit', async (event) => {
        event.preventDefault();
        let floor = document.querySelector('#random input').value
        let ceil = document.querySelector('#random input + input').value
        let url = `http://localhost:3000/random?floor=${floor}&ceil=${ceil}`
        let {data} = await axios.get(url);
        addToDOM('#random', data);
    })

    document.querySelector('#queue').addEventListener('click', async (event) => {
        console.log(event.target.value)
        let action = event.target.value;
        if (action === 'enqueue') {
            console.log("triggered enquee")
            let payload = {name: document.querySelector('#queue input').value}
            let {data} = await axios.post(`http://localhost:3000/queue/enqueue`, payload)
            addToDOM('#queue', data);
        } else if (action === 'dequeue') {
            let {data} = await axios.delete(`http://localhost:3000/queue/dequeue`)
            addToDOM('#queue', data);
        } else if (action === 'peek') {
            let {data} = await axios.get(`http://localhost:3000/queue/peek`)
            addToDOM('#queue', data);
        } else {
            return;
        }
    })
})

const addToDOM = (endpoint, data) => {
    let info = document.querySelector(`${endpoint} + ul`);
    let item = document.createElement('li');
    item.innerText = data.status;
    info.appendChild(item);
}
