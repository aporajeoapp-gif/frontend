import { useState, useCallback } from "react";
import eventApi from "../api/eventApi";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await eventApi.getAllEvents();
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = async (data) => {
    setLoading(true);
    try {
      await eventApi.createEvent(data);
      await fetchEvents();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to create event" };
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id, data) => {
    setLoading(true);
    try {
      await eventApi.updateEvent(id, data);
      await fetchEvents();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update event" };
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    setLoading(true);
    try {
      await eventApi.deleteEvent(id);
      await fetchEvents();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to delete event" };
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
