import React, { useState, useEffect } from 'react'

function PortfolioSelectWindow() {

    const [currencyList, setCurrencyList] = useState()

    useEffect(() => {
        fetch('http://localhost:8000/getAllCurrencies')
        .then((response) => response.json())
        .then((result) => {
            const currencies = result.symbols.map((symbol) => symbol)
            setCurrencyList(currencies)
        })
    }, [])
    
    const handleXClick = () => {
        
    }

    return (
        <div style={{ 
            position: "fixed", 
            width: "100%",
            height: "100vh",
            top: "0px",
            left: "0px",
            backgroundColor: "rgb(15 23 42 / 0.75)"
        }}>
            <div className= 'rounded-md p-3' style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgb(30 41 59)"
            }}>
                <div className="exit text-white" style={{
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
                            return (<div className='rounded-md p-3 bg-slate-700 text-white my-1' key={currency} >
                                {currency}
                            </div>)
                        })}
                        <div className='rounded-md p-3 bg-slate-700 text-white my-1'>
                            hssbjhfbsjs
                        </div>
                        <div className='rounded-md p-3 bg-slate-700 text-white my-1'>
                            hssbjhfbsjs
                        </div>
                        <div className='rounded-md p-3 bg-slate-700 text-white my-1'>
                            hssbjhfbsjs
                        </div>
                    </div>
                    <button className='relative left-1/2 top-[0.5rem] translate-x-[-50%] bg-green-500 text-slate-900 font-bold rounded-md p-3 mb-3'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default PortfolioSelectWindow