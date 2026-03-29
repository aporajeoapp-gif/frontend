import { useEffect, useState } from "react";

import { getAllEmergencyServices } from "../api/emergencyApi";

export default function useEmergencyServices() {
    const [emergencies, setEmergencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEmergencies = async () => {
        try {
            setLoading(true);
            const data = await getAllEmergencyServices();
            setEmergencies(data);
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
        fetchEmergencies();
    }, []);

    return {
        emergencies,
        setEmergencies,
        loading,
        error,
        refresh: fetchEmergencies
    };
}
