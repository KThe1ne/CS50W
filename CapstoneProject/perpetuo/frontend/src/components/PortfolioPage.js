import React, { useState } from "react";
import { MenuList } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemIcon } from '@mui/material';


import Header from "./Header";
import TimeBar from "./TimeBar";
import PortfolioSelectWindow from "./PortfolioSelectWindow";
import { useEffect } from "react";


function PortfolioPage() {

  const [isOpen, setOpen] = useState(false)
  const [userHoldings, setUserHoldings] = useState({})
  const [holdingsUpdate, setHoldingsUpdate] = useState(true)
  const [userPrefs, setUserPrefs] = useState([])
  const [prefsUpdate, setPrefsUpdate] = useState(true)

  const handleClick = () => {
    setOpen(!isOpen)
  }

  useEffect(() => {
    fetch("http://localhost:8000/getUserHoldings")
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if (holdingsUpdate === true) {
        setUserHoldings(result.currencies)
      }
      //Objects are compared by their reference so result and state will always be different because their references are different. Use stringify to convert them to a primitive type (string) to compare.
      /* if (JSON.stringify(result) !== JSON.stringify(userHoldings)){
        setUserHoldings(result)
      } */
    })
    return setHoldingsUpdate(false)
  }, [holdingsUpdate])

  useEffect(() => {
    fetch('http://localhost:8000/getUserPreferences')
    .then((response) => response.json())
    .then((prefs) => {
      console.log(prefs)
    })
  }, [prefsUpdate])

  return (
    <>
      <Header />
      <div className="grid h-screen bg-slate-700 grid-cols-3 p-5">
        <div className="col-start-1">
            <div className="flex flex-col justify-center border-[1px] border-white p-3 rounded-md min-w-min w-fit">
                <div className="flex flex-wrap justify-start gap-4">
                    <p className="font-bold text-white">Top Performers</p>
                    <TimeBar />
                </div>
                <div>
                  <MenuList>
                    <MenuItem className="w-full">
                      <ListItemIcon><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt="BTC" className="h-4 aspect-square" /></ListItemIcon>
                      <ListItemText className="text-white font-semibold">Bitcoin</ListItemText>
                      <ListItemText className="text-red-500 font-bold text-right">-24%</ListItemText>
                    </MenuItem>
                  </MenuList>
                </div>
            </div>
        </div>
        <div className="col-start-2 col-span-2 h-full pl-5 pt-5 pb-5 border-white border-[1px] rounded-md">
          <div className="bg-green-500 w-full p-2 text-white font-bold mb-5">My Portfolio</div>
          <div className="w-4/5 mt-[10px]">
            {userHoldings && Object.keys(userHoldings).map((curr) => {
              return (
              <div className='flex flex-row justify-between rounded-md p-3 bg-slate-800 text-white my-1' key={curr} >
                {curr}
                <span><input type="number" min="1"  /></span>
              </div>)
            })}
            <div className="bg-slate-900 p-3 text-white">
              <button onClick={handleClick} className="font-bold id='add-currency'">+ Add New Currency to Portfolio</button>
              {isOpen && 
                <PortfolioSelectWindow isOpen={handleClick}/>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PortfolioPage;
