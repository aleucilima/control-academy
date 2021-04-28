const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const cards = require('./data')


app.use(express.static('public'))

app.set('view engine', 'njk')

nunjucks.configure('views', {
    express: app
})


app.get('/', (request, response) => {
    const company = {
        img_company: 'https://pbs.twimg.com/profile_images/1291682473592659968/sEorc6oh.jpg',
        name: 'Rocketseat',
        title: 'Escola de programação',
        description: 'A maior escola de programação da América Latina com foco em:',
        techs: [
            { name: 'Node.JS' },
            { name: 'React.JS' },
            { name: 'React Native' }
        ],
        links: [
            { name: 'Github', url: 'https://github.com/rocketseat' },
            { name: 'Instagram', url: 'https://instagram.com/rocketseat' },
            { name: 'Facebook', url: 'https://facebook.com/rocketseat' },
        ]
    }

    return response.render('about', { company })
})

app.get('/courses', (request, response) => {
    return response.render('courses', { items: cards })
})

app.get('/courses/:id', (request, response) => {
    const { id } = request.params

    const card = cards.find((card) => card.id === id)

    if(!card) {
        return response.status(404).render('not-found')
    }

    return response.render('description', { items: card })
})

app.use((request, response) => {
    response.status(404).render("not-found");
});


app.listen(3333)