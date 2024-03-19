import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import faces from 'components/Nfts/faces'
import * as Styled from './Chainface.style'
import { END_POINT, formatDate } from 'utils'

const Chainface = () => {
    const { id } = useParams()
    const [face, setFace] = useState(undefined)
    const [meta, setMeta] = useState(undefined)
    useEffect(() => {
        const getFace = async () => {
            const _face = await axios.get(`${END_POINT}/nfts?tokenId=${id}`)
            if (_face.data && _face.data.length === 1) {
                setMeta(_face.data[0])
            }
            
        }
        if (id <= faces.length) {
            getFace()
            setFace(faces[id])
        }
    }, [id])

    return (
        <Styled.Div>
            {Number(id) > 0 && <Styled.Left><Link to={`/chainface/${Number(id) - 1}`}>←</Link></Styled.Left>}
            {face && <h1>{face}</h1>}
            {meta && (
                <>
                    <p>#{meta.tokenId}</p>
                    <p>minted: {formatDate(meta.timestamp * 1000)} (UTC) - block: {meta.blockNumber}</p>
                    <p>logIndex: {meta.logIndex} - txIndex: {meta.transactionIndex}</p>
                    <p>symmetry: {meta.faceSymmetry} - golf score: {meta.golfScore} - percentBear: {meta.percentBear}</p>
                    <p>owner: <Link to={`/profile/${meta.owner}`}>{meta.owner}</Link> - owners: {meta.owners.length}</p>
                </>
            )}
            {Number(id) < faces.length - 1 && <Styled.Right><Link to={`/chainface/${Number(id) + 1}`}>→</Link></Styled.Right>}
        </Styled.Div>
    )
}

export default Chainface