import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function ErrorPage() {
	return (
		<Alert severity="error" className="error-msg">
			<AlertTitle>Error</AlertTitle>
			Please try again later or contact the administrator if the error persists.
		</Alert>
	);
}
