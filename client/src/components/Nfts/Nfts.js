import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { END_POINT } from 'utils'
import MockImage from 'components/MockImage'
import * as Styled from './Nfts.style'


const Nfts = () => {
    const [nfts, setNfts] = useState(undefined)

    useEffect(() => {
        if (nfts === undefined) {
            const getNfts = async () => {
                try {
                    const { data } = await axios.get(`${END_POINT}/nfts`)
                    setNfts([...data.sort((a, b) => a.tokenId - b.tokenId)])
                } catch (e) {
                    console.log(e) // TODO - handle errors
                }
            }
            getNfts()
        }

    }, [nfts])
    return (
        <Styled.Grid>
            {nfts && nfts.map(({ tokenId, owners, owner }, i) => {
                return (
                    <div key={i}>
                        <MockImage {...{ tokenId }} />
                        <h3>#{tokenId}</h3>
                        <p>Owners: {owners.length}</p>
                        <p><Link to={`/profile/${owner}`}>{owner}</Link></p>
                    </div>
                )
            })}
        </Styled.Grid>
    )
}

export default Nfts