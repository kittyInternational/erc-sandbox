import Blockheight from 'components/Blockheight'
import * as Styled from './Welcome.style'
import CurrentOwners from 'components/CurrentOwners'
import CurrentNouns from 'components/CurrentNouns'
import MockImage from 'components/MockImage'

const Welcome = ({ socket, loggedIn, handleSignIn }) => {
    return (
        <Styled.Div>
            <MockImage tokenId={1034} /> 
            <h1>Nouns</h1>
            {loggedIn ? (
                <p>You are logged in!</p>
            ) : (
                <p>Use <a href={'/'} onClick={e => {
                    e.preventDefault()
                    handleSignIn()
                }}>Metamask</a> to login</p>
            )}
            <CurrentNouns />
            <CurrentOwners />
            <Blockheight {...{ socket }} />
        </Styled.Div>
    )
}

export default Welcome