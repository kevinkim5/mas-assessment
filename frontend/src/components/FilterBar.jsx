import React, { useContext } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import RoomsContext from "@/roomsContext";
import { filterSelectOptions } from "@/constants";

export default function FilterBar() {
	const { setSort, sort } = useContext(RoomsContext);

	const handleChange = (e) => setSort(e.target.value);

	return (
		<div className="filter-bar">
			<FormControl
				size="small"
				sx={{ m: 1, minWidth: 120 }}
				style={{ marginLeft: 0 }}
			>
				<InputLabel id="select-label">Sort</InputLabel>
				<Select
					id="sort"
					label="sort"
					labelId="select-label"
					onChange={handleChange}
					value={sort}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{filterSelectOptions.map((item) => {
						return (
							<MenuItem key={item} value={item.toLowerCase()}>
								{item}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}
