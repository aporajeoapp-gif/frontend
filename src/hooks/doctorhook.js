import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";

export default function useDoctors() {
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchDoctors = async () => {
        try {
            setLoading(true)
            const data = await getDoctors()
            setDoctors(data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    return {
        doctors,
        loading,
        error,
        refresh: fetchDoctors
    }
}
