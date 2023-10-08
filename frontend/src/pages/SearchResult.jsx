import React, { useContext, useState } from "react";
import {
	Link,
	List,
	ListItem,
	ListItemText,
	Pagination,
	Typography,
} from "@mui/material";
import RoomsContext from "@/roomsContext";
import GenericDialog from "@/components/GenericDialog";

export default function SearchResult() {
	const { data, handlePageChange, page, search, totalCount, totalPages } =
		useContext(RoomsContext);
	const [dialogData, setDialogData] = useState({});
	const [dialogOpen, setDialogOpen] = useState(false);

	const renderListItem = (room) => {
		return (
			<ListItem key={room.title}>
				<ListItemText
					primary={
						<Link
							onClick={() => {
								setDialogData(room);
								setDialogOpen(true);
							}}
						>
							{room.title}
						</Link>
					}
					secondary={
						<>
							<Typography variant="body2">Location: {room.location}</Typography>
							<Typography variant="body2">
								{room.bedrooms} Beds + {room.bathrooms} Baths
							</Typography>
						</>
					}
				/>
			</ListItem>
		);
	};

	return (
		<div className="search-result">
			{search !== "" && data.length === 0 ? (
				<Typography className="no-data">
					No Data for {search}. Please search for another keyword.
				</Typography>
			) : (
				<>
					<Typography className="no-data">
						Found {totalCount} results.
					</Typography>
					<GenericDialog
						handleClose={() => setDialogOpen(false)}
						open={dialogOpen}
						room={dialogData}
					/>
					<List style={{ width: "100%" }}>
						{data.map((room) => {
							return renderListItem(room);
						})}
					</List>
					<div>
						<Pagination
							count={totalPages}
							onChange={handlePageChange}
							page={page}
							showFirstButton
							showLastButton
							style={{ marginBottom: "10px" }}
						/>
					</div>
				</>
			)}
		</div>
	);
}
