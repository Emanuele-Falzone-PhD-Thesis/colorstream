'use strict';

const WebSocket = require('ws');
const ejs = require('ejs');
const uuid = require('uuid');

const wss = new WebSocket.Server({
    port: 8080
});

function broadcast() {
    const jsonld = {
        '@context': {
            'color': 'http://www.streamreasoning.org/ontologies/2018/9/colors#',
            'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            'rdfs': 'http://www.w3.org/2000/01/rdf-schema#'
        },
        '@id': uuid.v4(),
        '@type': 'color:' + randomItem(['Blue', 'Red', 'Yellow'])
    }

    const jsonldString = JSON.stringify(jsonld);

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(jsonldString);
        }
    });
}

console.log('Web Socket on port 8080!');

(function loop() {
    var rand = Math.round(Math.random() * 1000);
    setTimeout(function() {
        broadcast();
        loop();
    }, rand);
}());

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}