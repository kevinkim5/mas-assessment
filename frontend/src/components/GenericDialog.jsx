import React from "react";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import GenericCard from "@/components/GenericCard";

export default function GenericDialog(props) {
	const { handleClose, open, room } = props;
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogContent>
				<GenericCard
					dialog
					key={room.title}
					details={room}
					style={{ border: "none", boxShadow: "none" }}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}
