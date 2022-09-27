import React, { useState } from "react";
import { Stack } from '@mui/system';
import { MenuList } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Popover } from '@mui/material';


import Header from "./Header";
import TimeBar from "./TimeBar";
import PortfolioSelectWindow from "./PortfolioSelectWindow";


function PortfolioPage() {

  const [isOpen, setOpen] = useState()
  const [w, h] = [window.innerWidth, window.innerHeight]

  const handleClick = () => {
    setOpen(true)
  }

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
            <div className="bg-slate-900 p-3 text-white">
              <button onClick={handleClick} className="font-bold id='add-currency'">+ Add New Currency to Portfolio</button>
              {isOpen && 
                <Popover
                  open={true}
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: h/2, left: w/2 }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                    <div className="w-80 bg-slate-600"> Content </div>
                </Popover>
              }
            </div>
          </div>
        </div>
      </div>
      <PortfolioSelectWindow/>
    </>
  );
}

export default PortfolioPage;
