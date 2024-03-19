import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { END_POINT } from 'utils'
import * as Styled from './Profile.style'

const Profile = ({ loggedIn }) => {
    let { _profile } = useParams()
    const [profile, setProfile] = useState(undefined)
    const [nfts, setNfts] = useState(undefined)
    useEffect(() => {
        if (nfts === undefined && profile) {
            const getNfts = async () => {
                try {
                    const { data } = await axios.get(`${END_POINT}/nfts`) 
                    setNfts([...data.filter(({ owner }) => owner === profile.owner).sort((a, b) => a.tokenId - b.tokenId)]) // TODO - hacky but time running out
                } catch (e) {
                    console.log(e) // TODO - handle errors
                }
            }
            getNfts()
        }

    }, [nfts, profile])

    useEffect(() => {
        const getProfile = async (account) => {
            const { data } = await axios.get(`${END_POINT}/owners`) // TODO - hacky but time running out
            const p = data.find(({ owner }) => owner === account)
            setProfile(p)
        }
        if (profile === undefined && _profile) {
            getProfile(_profile)
        }

    }, [profile, _profile])

    return (
        <>
            <Styled.Div>
                <h3>{_profile}</h3>
                <h3>balance: {profile ? profile.balance : '...'}</h3>
            </Styled.Div>
            <Styled.Grid>
                {nfts && nfts.map(({ tokenId, face }, i) => {
                    return (
                        <div key={i}><Link to={`/chainface/${tokenId}`}>{face}</Link></div>
                    )
                })}
            </Styled.Grid>
        </>
        
    )
}

export default Profile