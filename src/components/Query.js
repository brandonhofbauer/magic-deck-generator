import React, {useState} from 'react';
import Collapsible from 'react-collapsible';
import { BsChevronDown, BsFillPatchQuestionFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

const rarities = [
    {value: 'M', label: 'Mythic'},
    {value: 'R', label: 'Rare'},
    {value: 'U', label: 'Uncommon'},
    {value: 'C', label: 'Common'},
]

const Query = () => {
    const [lands, setLands] = useState(24);
    const [creatures, setCreatures] = useState(22);
    const [spells, setSpells] = useState(8);
    const [artifacts, setArtifacts] = useState(4);
    const [enchantments, setEnchantments] = useState(2);
    const [warning, setWarning] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [selectedColors, setSelectedColors] = useState(['White', 'Black'])
    const [selectedRarities, setSelectedRarities] = useState(['Mythic', 'Rare', 'Uncommon', 'Common'])

    const handleChange = (event, setter) => {
        const value = event.target.value;
        setter(value);
        checkTotal();
    };

    const history = useHistory();

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

    // get values from input elements in event, compile, fetch request to backend
    // or if frontend, take the values, fetch request directly into the api
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        setSubmitted(true);
        foo();
        history.push("/Generate")
    };

    // submit button, redirects to page
    const foo = async () => {
        const res = await fetch('./Generate');
    }

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
                        <option title="The color of peace, law, structure, selflessness, and equality" value="White">White</option>
                        <option title="The color of knowledge, deceit, caution, deliberation, and perfection" value="Blue">Blue</option>
                        <option title="The color of power, self-interest, death, sacrifice, and uninhibitedness."value="Black">Black</option>
                        <option title="The color of freedom, emotion, action, impulse, and destruction" value="Red">Red</option>
                        <option title="The color of nature, wildlife, connection, spirituality, and tradition" value="Green">Green</option>
                    </select>
                    <div class="tooltip"><BsFillPatchQuestionFill />
                        <span class="tooltiptext">Hold the ctrl key and click to make selections!</span>
                    </div>
                </Collapsible>

                <hr />

                <Collapsible trigger={["Card Types ", <BsChevronDown />]}>
                    <p></p>
                    <p>
                        <label htmlFor="creatures">Creatures: </label>
                        <input
                        type="number"
                        id="creatures"
                        value={creatures}
                        onChange={(event) => handleChange(event, setCreatures)}
                        />
                    </p>
                    <p>
                        <label htmlFor="spells">Spells: </label>
                        <input
                        type="number"
                        id="spells"
                        value={spells}
                        onChange={(event) => handleChange(event, setSpells)}
                        />
                    </p>
                    <p>
                        <label htmlFor="artifacts">Artifacts: </label>
                        <input
                        type="number"
                        id="artifacts"
                        value={artifacts}
                        onChange={(event) => handleChange(event, setArtifacts)}
                        />
                    </p>
                    <p>
                        <label htmlFor="enchantments">Enchantments: </label>
                        <input
                        type="number"
                        id="enchantments"
                        value={enchantments}
                        onChange={(event) => handleChange(event, setEnchantments)}
                        />
                    </p>
                    <p>
                    <label htmlFor="lands">Lands: </label>
                    <input
                        type="number"
                        id="lands"
                        value={lands}
                        onChange={(event) => handleChange(event, setLands)}
                    />
                    <div class="tooltip"><BsFillPatchQuestionFill />
                        <span class="tooltiptext">Be careful deviating from this number of lands!</span>
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
                        options={selectedRarities} 
                        multiple={true}
                        onChange={e =>{
                            const options = [...e.target.selectedOptions];
                            const values = options.map(option => option.value);
                            setSelectedRarities(values);
                        }}
                    >
                            <option value="Mythic">Mythic</option>
                            <option value="Rare">Rare</option>
                            <option value="Uncommon">Uncommon</option>
                            <option value="Common">Common</option>
                        </select>
                    <p></p>
                    <label htmlFor="include">Include... </label>
                    <input type="text" id="include" placeholder="Card Name"></input>

                    <label htmlFor="exclude"> Exclude... </label>
                    <input type="text" id="exclude" placeholder="Card Name"></input>
                    
                </Collapsible>
                        
                <hr />

                <p>Your selected colors: {selectedColors.join(', ')}</p>
                <p>Your selected rarities: {selectedRarities.join(', ')}</p>

                <button name="generate">Generate</button>
            </form>
        </div>
    );
};



export default Query;