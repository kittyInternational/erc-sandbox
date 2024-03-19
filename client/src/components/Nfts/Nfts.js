import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import * as Styled from './Nfts.style'
import faces from './faces'

const Nfts = () => {
    return (
        <Styled.Grid>
            {faces.map((face, i) => {
                return (
                    <Fragment key={i}>
                        <div key={i}><Link to={`/chainface/${i}`}>{face}</Link></div>
                        {i === 420 && <h1>Chainfaces</h1>}
                        {i === 690 && <h2>by natealex</h2>}
                    </Fragment>
                )
            })}
        </Styled.Grid>
    )
}

export default Nfts