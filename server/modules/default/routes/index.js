import authRoutes from './auth'
import nftRoutes from './nft'
import nftsRoutes from './nfts'
import ownersRoutes from './owners'

const routes = app => {
    app.use('/auth', authRoutes)
    app.use('/nft', nftRoutes)
    app.use('/nfts', nftsRoutes)
    app.use('/owners', ownersRoutes)
}

export default routes
