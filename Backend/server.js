// Author: Navi Chander
// Code snippets written by Navi Chander marked as NC
// cs361 - microservice

const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const PORT = 3001;

app.use(express.json());
app.use(cors())

//NC
const SCRYFALLAPI = 'https://api.scryfall.com/cards/random?q='
const SCRYFALLAPILands = "https://api.scryfall.com/cards/random?q="
const colon = '%3A'
const landColon = '%3D'

//future iterations will use a more time efficient 'search' instead of random query, with backend sifting through data
//to randomly select cards, instead of using an api for each random card

app.post('/getdata', async (req, res) => {
    const URLs = toQuery(req.body);
    console.log(URLs);
    const deck = await generator(URLs, req.body);
    console.log(deck);
    res.status(200).json({ "deck": deck });
});

// returns query string from given request, NC
function toQuery(request) {
    let URLs = {
        creatures: "",
        spells: "",
        artifacts: "",
        enchantments: "",
        lands: ""
    }

    const colors = request['colors']
    let colorString = '+color' + colon
    let colorProduce = '+produces' + landColon
    const rarities = request['rarities']
    rarityString = '+rarity' + colon

    if (colors.length > 0) {
        for (let i = 0; i < colors.length; i++) {
            colorString += colors[i].toString()
            colorProduce += colors[i].toString()
            if (i < colors.length - 1) {
                colorProduce += "+or+"
            }
        }
    }
    
    if (rarities.length > 0) {
        for (let i = 0; i < rarities.length; i++) {
            rarityString += rarities[i].toString()
        }
    }
    
    URLs["creatures"] = SCRYFALLAPI + colorString + '+type' + colon + 'creature' + rarityString
    URLs["spells"] = SCRYFALLAPI + colorString + '+type' + colon + 'instant' + '+or+' + '+type' + colon + 'sorcery' + rarityString
    URLs["artifacts"] = SCRYFALLAPI + colorString + '+type' + colon + 'artifact' + rarityString
    URLs["enchantments"] = SCRYFALLAPI + colorString + '+type' + colon + 'enchantment' + rarityString
    URLs["lands"] = SCRYFALLAPILands + colorProduce + '+type' + colon + 'land'

    return URLs
}

async function getCard(API) {
    const response = await fetch(API);
    const json = await response.json();
    const card = json.name;
    return card;
}

async function generator(URLs, data) {
    let deck = {}
    
    const keys = ["creatures", "spells", "artifacts", "enchantments", "lands"]
    const total = [data["creatures"], data["spells"], data["artifacts"], data["enchantments"], data["lands"]]

    for (let i = 0; i < 5; i++) {
        let current = 0
        while (current < total[i]) {
            const card = await getCard(URLs[keys[i]]);
            random = Math.floor(Math.random() * 4) + 1;
            if (!(card in deck)) {
                if (current + random <= total[i]) {
                    current += random;
                } else {
                    random = total[i] - current;
                    current += random;
                }
                deck[card] = random;
            }
            // timeout ids, waiting 75ms until the next loop, ie fetch
            setTimeout(()=>{}, 75);
        }
    }
    return deck
}

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');
}); 
