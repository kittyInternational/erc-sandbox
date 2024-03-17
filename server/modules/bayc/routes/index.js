import nftRoutes from './nft'
import nftsRoutes from './nfts'
import ownersRoutes from './owners'

const routes = app => {
    app.use('/bayc/nft', nftRoutes)
    app.use('/bayc/nfts', nftsRoutes)
    app.use('/bayc/owners', ownersRoutes)
}

export default routes
