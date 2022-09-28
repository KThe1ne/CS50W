import React, { useState, useEffect } from 'react'

function PortfolioSelectWindow(props) {

    const [currencyList, setCurrencyList] = useState()
    const [clickedCurrency, setClickedCurrency] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/getAllCurrencies')
        .then((response) => response.json())
        .then((result) => {
            let currencies = result.symbols.map((symbol) => symbol.split("-")[0])
            const userPrefCurrencies = props.userPrefs.map((prefs) => {
                return prefs.currency
            })
            currencies = currencies.filter(currency => !userPrefCurrencies.includes(currency))
            setCurrencyList(currencies)
            console.log(currencyList)
        })
    }, [])

    const handleCurrencyClick = ({target}) => {
        console.log("Clicked", target.querySelector("#tick").style.visibility)
        if (target.querySelector("#tick").style.visibility === "hidden"){
            target.querySelector("#tick").style.visibility = "visible"
            target.className += " selected"
        }
        else{
            target.querySelector("#tick").style.visibility = "hidden"
            target.className = target.className.replace(" selected", "")
        }
    }

    const handleSubmitButtonClick = () => {
        const selectedTargets = document.querySelectorAll(".selected");
        const selectedCurrencies = []
        selectedTargets.forEach((element) => {
            selectedCurrencies.push({"currency": [element.querySelector("p").innerHTML][0], "percentage": 0})
        })
        props.setUserPrefs((prevState) => {
            return [
                ...prevState,
                ...selectedCurrencies
            ]
        })
        props.isOpen()
    }

    return (
        <div style={{ 
            position: "fixed", 
            width: "100%",
            height: "100vh",
            top: "0px",
            left: "0px",
            backgroundColor: "rgb(15 23 42 / 0.75)"
        }} id="portfolioSelectWindow">
            <div className= 'rounded-md p-3' style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgb(30 41 59)"
            }}>
                <div className="exit text-white cursor-pointer" onClick={props.isOpen} style={{
                    position: "absolute",
                    right: "10px",
                    top: "18px",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1rem",
                    lineHeight: "1rem",
                    height: "1rem"
                }}>x</div>
                <div style={{
                    paddingTop: "1rem"
                }}>
                    <div className='rounded-md bg-slate-900 p-3 text-white text-center my-3'>
                        <p>Add New Cryptos to Your Portfolio</p>
                    </div>
                    <div className='overflow-y-auto h-[263px] px-2' id='currency-list-container'>
                        { currencyList && currencyList.map((currency) => {
                            return (<button className='flex flex-row justify-between rounded-md p-3 bg-slate-700 text-white my-1 w-full' onClick={handleCurrencyClick} key={currency} >
                                <p>{currency}</p>
                                <span className='invisible' id='tick'>✅</span>
                            </button>)
                        })}
                    </div>
                    <button className='relative left-1/2 top-[0.5rem] translate-x-[-50%] bg-green-500 text-slate-900 font-bold rounded-md p-3 mb-3 'onClick={handleSubmitButtonClick}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default PortfolioSelectWindow