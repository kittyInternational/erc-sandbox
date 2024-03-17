import { useEffect, useState } from 'react'
import axios from 'axios'

const { REACT_APP_END_POINT } = process.env

const CurrentNouns = () => {
    const [nfts, setNfts] = useState(undefined)

    useEffect(() => {
        if (nfts === undefined) {
            const getNfts = async () => {
                try {
                    const { data } = await axios.get(`${REACT_APP_END_POINT}/nfts`)
                    setNfts(data.length)
                } catch (e) {
                    console.log(e) // TODO - handle errors
                }
            }
            getNfts()
        }

    }, [nfts])

    return (
        <p>Current Nouns: {nfts === undefined ? '...' : nfts}</p>
    )
}

export default CurrentNouns