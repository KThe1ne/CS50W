import React, { useState } from "react";
import { MenuList } from "@mui/material";
import { MenuItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemIcon } from "@mui/material";

import Header from "./Header";
import TimeBar from "./TimeBar";
import PortfolioSelectWindow from "./PortfolioSelectWindow";
import { useEffect } from "react";

function PortfolioPage() {
	const [isOpen, setOpen] = useState(false);
	const [userHoldings, setUserHoldings] = useState({});
	const [holdingsUpdate, setHoldingsUpdate] = useState(true);
	const [userPrefs, setUserPrefs] = useState({});
	const [prefsUpdate, setPrefsUpdate] = useState(false);

	const handleClick = () => {
		setOpen(!isOpen);
	};

	/* useEffect(() => {
		fetch("http://localhost:8000/getUserHoldings")
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (holdingsUpdate === true) {
					setUserHoldings(result.currencies);
				}
				//Objects are compared by their reference so result and state will always be different because their references are different. Use stringify to convert them to a primitive type (string) to compare.
				if (JSON.stringify(result) !== JSON.stringify(userHoldings)){
        setUserHoldings(result)
      }
			});
		return setHoldingsUpdate(false);
	}, [holdingsUpdate, userHoldings]); */

	useEffect(() => {
		fetch("http://localhost:8000/getUserPreferences")
			.then((response) => response.json())
			.then((prefs) => {
				console.log("Prefs: ",prefs);
				setUserPrefs(prefs);
			});
	}, []);
	
	const handleSaveClick = () => {
		const portfolioPrefs = {}
		document.querySelectorAll("#allocation").forEach((inputField) => {
			if (inputField.value !== ''){
				portfolioPrefs[inputField.dataset.currency] = parseInt(inputField.value)
			}
			// Add pop up to check if user would like to remove currency with 0% allocation from their portfolio.
		})
		console.log(portfolioPrefs)
		setUserPrefs(prev => {
			return {
				...prev,
				...portfolioPrefs
			}
		})
		setPrefsUpdate(true)

	}

	useEffect(() => {
		if (prefsUpdate === true){
			fetch("http://localhost:8000/getUserPreferences", {
				method: "POST",
				body: JSON.stringify(userPrefs),
			})
			.then((response) => response.json())
			.then((result) => console.log(result))
	 	}
		return setPrefsUpdate(false)
	}, [prefsUpdate]); // For saving prefs update before sending to server

	const handlePercentageInput = ({ target }) => {
		let sum = 0;
		target.parentNode.parentNode.querySelector("span").style.visibility = "visible"
		Object.keys(userPrefs).forEach(currency => {
			console.log(currency)
			console.log(sum)
			if (currency !== target.dataset.currency){
				sum += userPrefs[currency]
			}
		})
		console.log(sum + parseInt(target.value))
		if (sum + parseInt(target.value) > 100) {
			target.parentNode.style.border = "1px solid red"
			document.getElementById("save-prefs-btn").disabled = true
		}
		else {
			target.parentNode.style.border = "1px solid green"
		}
	}

	return (
		<>
			<Header />
			<div className="grid h-screen bg-slate-700 grid-cols-3 p-5">
				<div className="col-start-1">
					<div className="flex flex-col justify-center border-[1px] border-white p-3 rounded-md min-w-min w-fit">
						<div className="flex flex-wrap justify-start gap-4">
							<p className="font-bold text-white">
								Top Performers
							</p>
							<TimeBar />
						</div>
						<div>
							<MenuList>
								<MenuItem className="w-full">
									<ListItemIcon>
										<img
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
											alt="BTC"
											className="h-4 aspect-square"
										/>
									</ListItemIcon>
									<ListItemText className="text-white font-semibold">
										Bitcoin
									</ListItemText>
									<ListItemText className="text-red-500 font-bold text-right">
										-24%
									</ListItemText>
								</MenuItem>
							</MenuList>
						</div>
					</div>
				</div>
				<div className="col-start-2 col-span-2 h-full pl-5 pt-5 pb-5 border-white border-[1px] rounded-md">
					<div className="bg-green-500 w-full p-2 text-white font-bold mb-5">
						My Portfolio
					</div>
					<div className="w-4/5 mt-[10px] flex flex-col">
						{userPrefs &&
							Object.keys(userPrefs).map((currency) => {
								return (
									<div
										className="flex flex-row justify-between rounded-md p-3 bg-slate-800 text-white my-1"
										key={currency}
									>
										{currency}
										<span>
											<span className="text-white opacity-50 invisible mr-1">{userPrefs[currency]}%</span>
											<span className="p-2 rounded-md">
												<input
													id="allocation"
													type="number"
													min="1"
													max="99"
													placeholder={userPrefs[currency]}
													className="bg-transparent text-center outline-none"
													data-currency={currency}
													onChange={handlePercentageInput}
												/>
												%
											</span>
										</span>
									</div>
								);
							})}
							<button
								onClick={handleClick}
								className="font-bold block p-3 bg-slate-900 text-white w-full mb-5"
								id='add-currency'
							>
								+ Add New Currency to Portfolio
							</button>
							{ console.log("userPrefs", userPrefs) }
						<button id="save-prefs-btn" className="relative bg-green-500 text-white font-bold p-3 block rounded-md right-0 left-auto w-min self-end" onClick={handleSaveClick}>Save</button>
						{isOpen && (
							<PortfolioSelectWindow isOpen={handleClick} userPrefs={userPrefs} setUserPrefs={setUserPrefs} setPrefsUpdate={setPrefsUpdate}/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default PortfolioPage;
