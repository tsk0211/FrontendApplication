// src/components/Container.tsx
import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";

const Container: React.FC = () => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDataFromApi = async () => {
			setLoading(true);
			try {
				const response = [1]; // Replace with actual endpoint
				setData(response);
			} catch (err) {
				setError("Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};

		fetchDataFromApi();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className={styles.container}>
			<h2>Data from API</h2>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default Container;
