import React, { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";

export default function TimeBar() {
	const [timePeriods, setTimePeriod] = useState({
        "1D":"contained",
        "3D":"outlined",
        "1W":"outlined",
        "1M":"outlined",
        "3M":"outlined",
        "1Y":"outlined",
        "YTD":"outlined",
    });
    
    const defaultDesign = {
        "1D":"outlined",
        "3D":"outlined",
        "1W":"outlined",
        "1M":"outlined",
        "3M":"outlined",
        "1Y":"outlined",
        "YTD":"outlined",
    }
    
	return (
		<div>
			<ButtonGroup variant="text" aria-label="text button group" size="small" color="secondary">
                {Object.entries(timePeriods).map(([time, variant]) => {
                    return <Button key={time} variant={variant} onClick={() => setTimePeriod({...defaultDesign, [time]:"contained"})}>{time}</Button>}
                    )}
			</ButtonGroup>
		</div>
	);
}
