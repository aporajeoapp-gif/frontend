import { useEffect, useState } from "react";
import { getAllBuses } from "../api/busApi";
// import { getAllBuses } from "../api/busapi";

export default function useBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const data = await getAllBuses();
      setBuses(data);
      return data;
    } catch (err) {
      setError(err);
      console.error("Error fetching buses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return {
    buses,
    setBuses,
    loading,
    error,
    refresh: fetchBuses,
  };
}
