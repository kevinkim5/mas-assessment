import React, { useContext } from "react";
import { CircularProgress, Container } from "@mui/material";
import Header from "@/components/Header";
import ErrorPage from "@/pages/ErrorPage";
import LandingPage from "@/pages/LandingPage";
import SearchResult from "@/pages/SearchResult";
import RoomsContext from "@/roomsContext";

export default function App() {
	const { error, loading, search } = useContext(RoomsContext);

	return (
		<>
			<Header />
			<Container>
				{loading ? (
					<div className="spinner-wrapper">
						<CircularProgress />
					</div>
				) : error ? (
					<ErrorPage />
				) : search !== "" ? (
					<SearchResult />
				) : (
					<LandingPage />
				)}
			</Container>
		</>
	);
}
