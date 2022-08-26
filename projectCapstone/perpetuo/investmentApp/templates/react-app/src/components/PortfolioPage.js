import React from "react";
import { Stack } from '@mui/system';
import { MenuList } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemIcon } from '@mui/material';

import Header from "./Header";
import TimeBar from "./TimeBar";

function PortfolioPage() {
  return (
    <>
      <Header />
      <div className="grid h-screen bg-slate-700 grid-cols-3">
        <div className="col-start-1 p-5">
            <div className="flex flex-col justify-center border-[1px] border-white p-3 rounded-md min-w-min w-fit">
                <div className="flex flex-wrap justify-start gap-4">
                    <p className="font-bold text-white">Top Performers</p>
                    <TimeBar />
                </div>
                <div>
                  {/* <Stack spacing={0}>
                    <span>Bitcoin</span>
                    <span>Ethereum</span>
                  </Stack> */}
                  <MenuList>
                    <MenuItem className="w-full">
                      <ListItemIcon><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt="BTC" className="h-4 aspect-square"  /></ListItemIcon>
                      <ListItemText className="text-white font-semibold">Bitcoin</ListItemText>
                      <ListItemText className="text-red-500 font-bold text-right">-24%</ListItemText>
                    </MenuItem>
                  </MenuList>
                </div>
            </div>
        </div>
        <div className="col-start-2 col-span-2 w-full pl-5 pt-5 pb-5">
          <div className="bg-green-500 w-full p-2 text-white font-bold">My Portfolio</div>
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default PortfolioPage;
