import React, { useEffect, useState } from 'react'

export default function GrowthInfo(props) {

  const [growthDetails, setGrowthDetails] = useState({})
  const frequency = "weekly";

  useEffect(() => {
    fetch(`http://localhost:8000/pastHistoricalGrowth/${props.currency}/1day/1Y/${frequency}`)
      .then((response) => response.json())
      .then((growthData) => {
        setGrowthDetails(growthData)
      })
  }, [])

  const handleMouseOver = ({ target }) => {
    const popUp = target.parentNode.parentNode.querySelector(`#popUp-${props.currency}`)
    popUp.style.visibility = "visible" 
  }
  
  const handleMouseLeave = ({ target }) => {
    const popUp = target.parentNode.parentNode.querySelector(`#popUp-${props.currency}`)
    popUp.style.visibility = "hidden" 
  }

  return (
    <div>
        <div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </div>

        <div className='fixed z-[1] w-72 h-max p-3 rounded-md bg-slate-900 -translate-x-1/2 invisible' id={`popUp-${props.currency}`}> 
        Regular {`${frequency}`} investments from {growthDetails["startDate"]} until {growthDetails["endDate"]} would return <span className={ 
          (parseInt(growthDetails["growth"]) > 0) ? "text-green-500" : "text-red-500"
          }>{parseInt(growthDetails["growth"])}%</span></div>
    </div>
  )
}
