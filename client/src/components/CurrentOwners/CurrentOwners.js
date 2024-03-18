import { useEffect, useState } from 'react'
import axios from 'axios'
import { END_POINT } from 'utils'

const CurrentOwners = () => {
    const [owners, setOwners] = useState(undefined)

    useEffect(() => {
        if (owners === undefined) {
            const getOwners = async () => {
                try {
                    const { data } = await axios.get(`${END_POINT}/owners`)
                    setOwners(data.length)
                } catch (e) {
                    console.log(e) // TODO - handle errors
                }
            }
            getOwners()
        }

    }, [owners])

    return (
        <p>Current Owners: {owners === undefined ? '...' : owners}</p>
    )
}

export default CurrentOwners