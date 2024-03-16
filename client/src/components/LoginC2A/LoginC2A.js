import * as Styled from './LoginC2A.style'
import { ReactComponent as Metamask } from './metamask.svg'

const LoginC2A = ({ loggedIn, handleSignIn, handleSignOut }) => {
    return (
        <Styled.Div>
            {loggedIn
                ? <button onClick={handleSignOut}><Metamask />{'Sign out'}</button>
                : <button onClick={handleSignIn}><Metamask />{'Sign in'}</button>
            }
        </Styled.Div>
    )
    
}

export default LoginC2A