import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { END_POINT } from 'utils'

const CurrentNouns = () => {
    const [nfts, setNfts] = useState(undefined)

    useEffect(() => {
        if (nfts === undefined) {
            const getNfts = async () => {
                try {
                    const { data } = await axios.get(`${END_POINT}/nfts`)
                    setNfts(data.length)
                } catch (e) {
                    console.log(e) // TODO - handle errors
                }
            }
            getNfts()
        }

    }, [nfts])

    return (
        <p>Current Nouns: {nfts === undefined ? '...' : <Link to={'/nouns'}>{nfts}</Link>}</p>
    )
}

export default CurrentNouns