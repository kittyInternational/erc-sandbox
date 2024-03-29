import Blockheight from 'components/Blockheight'
import * as Styled from './Welcome.style'

const furlin = 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/124.png'

const Welcome = ({ socket, loggedIn, handleSignIn }) => {
    return (
        <Styled.Div>
            <img src={furlin} alt={'Furlin - Kitty #124'} />
            <h1>ERC SANDBOX</h1>
            <h2>by <a href={'https://kitty.international'} target={'_blank'} rel="noreferrer">Kitty.International</a></h2>
            {loggedIn ? (
                <p>You are logged in!</p>
            ) : (
                <p>Use <a href={'/'} onClick={e => {
                    e.preventDefault()
                    handleSignIn()
                }}>Metamask</a> to login</p>
            )}
            <Blockheight {...{ socket }} />
        </Styled.Div>
    )
}

export default Welcome