import { useState, useCallback } from "react";
import bloodCampApi from "../api/bloodCampApi";

export const useBloodCamp = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCamps = useCallback(async () => {
    setLoading(true);
    try {
      const response = await bloodCampApi.getAllCamps();
      setCamps(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch camps");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCamp = async (data) => {
    setLoading(true);
    try {
      await bloodCampApi.createCamp(data);
      await fetchCamps();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to create camp" };
    } finally {
      setLoading(false);
    }
  };

  const updateCamp = async (id, data) => {
    setLoading(true);
    try {
      await bloodCampApi.updateCamp(id, data);
      await fetchCamps();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update camp" };
    } finally {
      setLoading(false);
    }
  };

  const deleteCamp = async (id) => {
    setLoading(true);
    try {
      await bloodCampApi.deleteCamp(id);
      await fetchCamps();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to delete camp" };
    } finally {
      setLoading(false);
    }
  };

  return {
    camps,
    loading,
    error,
    fetchCamps,
    createCamp,
    updateCamp,
    deleteCamp,
  };
};
