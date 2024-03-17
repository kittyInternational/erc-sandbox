import authRoutes from './auth'
import nftRoutes from './nft'
import nftsRoutes from './nfts'

const routes = app => {
    app.use('/auth', authRoutes)
    app.use('/nft', nftRoutes)
    app.use('/nfts', nftsRoutes)
}

export default routes
