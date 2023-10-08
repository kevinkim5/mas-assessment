import React, { createContext, useEffect, useRef, useState } from "react";

const RoomsContext = createContext({
	data: [],
	error: false,
	loading: true,
	page: 1,
	search: "",
	sort: "",
	totalCount: 0,
	totalPages: 1,
});

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const RoomsContextProvider = (props) => {
	const prevSearch = useRef();
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("");
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(1);

	const handlePageChange = (e, value) => setPage(value);

	const fetchData = () => {
		fetch(`${apiURL}?page=${page}&search=${search}&sort=${sort}`)
			.then((res) => res.json())
			.then((res) => {
				setData(res.data);
				setTotalCount(res.totalCount);
				setTotalPages(res.maxPage);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		if (prevSearch.current !== search) {
			setLoading(true);
			prevSearch.current = search;
		}
		fetchData();
	}, [page, search, sort]);

	return (
		<RoomsContext.Provider
			value={{
				data,
				error,
				handlePageChange,
				loading,
				page,
				search,
				setPage,
				setSearch,
				setSort,
				sort,
				totalCount,
				totalPages,
			}}
		>
			{props.children}
		</RoomsContext.Provider>
	);
};

export default RoomsContext;
