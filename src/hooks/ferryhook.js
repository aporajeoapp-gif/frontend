import { useEffect, useState } from "react";
import { getAllFerries } from "../api/ferryApi";

export default function useFerries() {
    const [ferries, setFerries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFerries = async () => {
        try {
            setLoading(true);
            const data = await getAllFerries();
            setFerries(data);
            return data;
        } catch (err) {
            setError(err);
            console.error("Error fetching ferries:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFerries();
    }, []);

    return {
        ferries,
        setFerries,
        loading,
        error,
        refresh: fetchFerries
    };
}
