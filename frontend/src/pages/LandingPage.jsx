import React, { useContext } from "react";
import { Grid, Pagination } from "@mui/material";
import GenericCard from "@/components/GenericCard";
import FilterBar from "@/components/FilterBar";
import RoomsContext from "@/roomsContext";

export default function LandingPage() {
	const { data, handlePageChange, page, totalPages } = useContext(RoomsContext);

	return (
		<>
			<FilterBar />
			<div className="landing-page">
				<Grid
					container
					columnGap={3}
					justifyContent="center"
					rowGap={2}
					spacing={{ xs: 2, md: 4, xl: 6 }}
					style={{ marginLeft: 0, marginTop: 0 }}
				>
					{data.map((room) => {
						return <GenericCard key={room.title} details={room} />;
					})}
				</Grid>
			</div>
			<Pagination
				count={totalPages}
				onChange={handlePageChange}
				page={page}
				showFirstButton
				showLastButton
				style={{ marginBottom: "10px" }}
			/>
		</>
	);
}
