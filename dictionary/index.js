const fs = require('fs')
const express = require('express')
const app = new express()
const port = process.env.PORT || 3000
const dictionary = JSON.parse(fs.readFileSync(`${__dirname}/words_dictionary.json`, 'utf8'))

if(!fs.existsSync(`${__dirname}/dictionaries`)) {
    fs.mkdirSync(`${__dirname}/dictionaries`)
}

app.get('/:min/:max', (req, res) => {

    let params = req.params

    if(!fs.existsSync(`${__dirname}/dictionaries/min-${params.min}-max-${params.max}.json`)) {
        res.send(createModifiedDictionary(params.min, params.max))
    } else {
        res.send(JSON.parse(fs.readFileSync(`${__dirname}/dictionaries/min-${params.min}-max-${params.max}.json`, 'utf8')))
    }
})

app.get('*', (req, res) => {
    res.status(404).send('Page not found')
})

app.listen(port, () => {
    console.log(`Currently listening to ${port}`)
})

const createModifiedDictionary = (min, max) => {

    let modifiedDictionary = {}

    for(let [key, value] of Object.entries(dictionary)) {

        if(key.length >= Number(min) && key.length <= Number(max)) {
            
            modifiedDictionary[key] = value
        }
    }

    fs.writeFileSync(`${__dirname}/dictionaries/min-${min}-max-${max}.json`, JSON.stringify(modifiedDictionary))
    return modifiedDictionary
}