import React, {useState} from 'react';
import Collapsible from 'react-collapsible';
import { BsChevronDown, BsFillPatchQuestionFill } from 'react-icons/bs';

const Query = () => {
    const [lands, setLands] = useState(24);
    const [creatures, setCreatures] = useState(22);
    const [spells, setSpells] = useState(8);
    const [artifacts, setArtifacts] = useState(4);
    const [enchantments, setEnchantments] = useState(2);
    const [warning, setWarning] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasDeck, setHasDeck] = useState(false);
    let randomDeck = ""

    const [selectedColors, setSelectedColors] = useState(['w', 'b'])
    const [selectedRarities, setSelectedRarities] = useState(['mythic', 'rare', 'uncommon', 'common'])

    const handleChange = (event, setter) => {
        const value = event.target.value;
        setter(value);
        checkTotal();
    };

    const checkTotal = () => {
        const total =
            parseInt(lands) +
            parseInt(creatures) +
            parseInt(spells) +
            parseInt(artifacts) +
            parseInt(enchantments);

        if (total > 60) {
            setWarning('The total number of cards cannot be over 60.');
        } else {
            setWarning('');
        }
    };

    const handleSubmit = async (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        setIsLoading(true);
        setHasDeck(false);
        document.getElementById("deckBox").innerHTML = "";

        const data = {
            colors: formData.getAll("colors"),
            creatures: formData.getAll("creatures"),
            spells: formData.getAll("spells"),
            artifacts: formData.getAll("artifacts"),
            enchantments: formData.getAll("enchantments"),
            lands: formData.getAll("lands"),
            rarities: formData.getAll("rarities")
        };
        setSubmitted(true);

        const response = await fetch('http://localhost:3001/getdata', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data.deck);
                setIsLoading(false);
                randomDeck = data.deck;
                let mainContainer = document.getElementById("deckBox")
                for (const [key, value] of Object.entries(randomDeck)) {
                    console.log(value, key);
                    let div = document.createElement("div");
                    div.innerHTML = value + " " + key;
                    mainContainer.appendChild(div);
                }
                setHasDeck(true);
            })
            .catch((error) => {
                console.error("Error:", error);
        });
    };

    /* submit button, redirects to page
    const redirect = async () => {
        const res = await fetch('./Generate');
    } */

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Collapsible trigger ={["Color", <BsChevronDown />]}>
                    <p></p>
                <label>Color Options: </label>
                    <select 
                        name="colors" 
                        value={selectedColors}
                        multiple={true}
                        onChange={e =>{
                            const options = [...e.target.selectedOptions];
                            const values = options.map(option => option.value);
                            setSelectedColors(values);
                        }}
                    >
                        <option title="The color of peace, law, structure, selflessness, and equality" value="w">White (w)</option>
                        <option title="The color of knowledge, deceit, caution, deliberation, and perfection" value="u">Blue (u)</option>
                        <option title="The color of power, self-interest, death, sacrifice, and uninhibitedness."value="b">Black (b)</option>
                        <option title="The color of freedom, emotion, action, impulse, and destruction" value="r">Red (r)</option>
                        <option title="The color of nature, wildlife, connection, spirituality, and tradition" value="g">Green (g)</option>
                    </select>
                    <div className="tooltip"><BsFillPatchQuestionFill />
                        <span className="tooltiptext">Hold the ctrl key and click to make selections!</span>
                    </div>
                </Collapsible>

                <hr />

                <Collapsible trigger={["Card Types ", <BsChevronDown />]}>
                    <p></p>
                    <p>
                        <label htmlFor="creatures">Creatures: </label>
                        <input
                        name="creatures"
                        type="number"
                        id="creatures"
                        value={creatures}
                        onChange={(event) => handleChange(event, setCreatures)}
                        />
                    </p>
                    <p>
                        <label htmlFor="spells">Spells: </label>
                        <input
                        name="spells"
                        type="number"
                        id="spells"
                        value={spells}
                        onChange={(event) => handleChange(event, setSpells)}
                        />
                    </p>
                    <p>
                        <label htmlFor="artifacts">Artifacts: </label>
                        <input
                        name="artifacts"
                        type="number"
                        id="artifacts"
                        value={artifacts}
                        onChange={(event) => handleChange(event, setArtifacts)}
                        />
                    </p>
                    <p>
                        <label htmlFor="enchantments">Enchantments: </label>
                        <input
                        name="enchantments"
                        type="number"
                        id="enchantments"
                        value={enchantments}
                        onChange={(event) => handleChange(event, setEnchantments)}
                        />
                    </p>
                    <p>
                    <label htmlFor="lands">Lands: </label>
                    <input
                        name="lands"
                        type="number"
                        id="lands"
                        value={lands}
                        onChange={(event) => handleChange(event, setLands)}
                    />
                    <div className="tooltip"><BsFillPatchQuestionFill />
                        <span className="tooltiptext">Be careful deviating from this number of lands!</span>
                    </div>
                    </p>
                    {warning !== '' && <p style={{ color: 'red' }}>{warning}</p>}

                </Collapsible>

                <hr />

                <Collapsible trigger={["Restrictions ", <BsChevronDown />]}>
                    <p></p>
                    <label>Rarities: </label>
                        <select 
                        name="rarities" 
                        value={selectedRarities} 
                        multiple={true}
                        onChange={e =>{
                            const options = [...e.target.selectedOptions];
                            const values = options.map(option => option.value);
                            setSelectedRarities(values);
                        }}
                    >
                            <option value="mythic">Mythic</option>
                            <option value="rare">Rare</option>
                            <option value="uncommon">Uncommon</option>
                            <option value="common">Common</option>
                        </select>
                    <p></p>
                    {/*
                    <label htmlFor="include">Include... </label>
                    <input type="text" id="include" placeholder="Card Name"></input>

                    <label htmlFor="exclude"> Exclude... </label>
                    <input type="text" id="exclude" placeholder="Card Name"></input>
                    */}
                </Collapsible>
                        
                <hr />

                <p>Your selected colors: {selectedColors.join(', ')}</p>
                <p>Your selected rarities: {selectedRarities.join(', ')}</p>

                <button type="submit" name="generate">Generate</button>
                {isLoading && <p>Loading, this may take a few seconds...</p>}
            </form>

            {/*{hasDeck && */}
            <p>
                <label htmlFor="deckBox">The deck will appear below after you hit Generate!</label>
                <div id="deckBox"></div>
            </p> {/*}*/}


        </div>
    );
};

export default Query;
