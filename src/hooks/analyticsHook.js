import { useEffect, useState } from "react";
import { getAnalytics } from "../api/analyticsApi";

export default function useAnalytics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadStats = async () => {
        try {
            setLoading(true);
            const res = await getAnalytics();
            if (res.success) {
                setStats(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch analytics:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    return { stats, loading, error, refresh: loadStats };
}
