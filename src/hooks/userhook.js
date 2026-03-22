import { useEffect, useState } from "react";
import { getUser } from "../api/authApi";

export default function fetchUser() {

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(null)

    const loadprofile = async () => {
        try {
            setLoading(true)
            const data = await getUser()
            setProfile(data.user)
        } catch (error) {
            return error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadprofile()
    }, [])

    return {
        profile,
        loading
    }

}