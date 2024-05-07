
export default function PromptSearch() {
    
    return (
        <div style={{display:"flex", flexDirection:"column"}} id='prompt-search-input'>
        <select id="">
            <option value="" selected disabled hidden>Enter your prompt here</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
        </select>

        <button>Continue</button>
    </div>
    )
    

}