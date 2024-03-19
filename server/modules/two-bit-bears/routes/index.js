import nftsRoutes from './nfts'
import ownersRoutes from './owners'

const routes = (app, urlPrepend, Models) => {
    const url = urlPrepend ? `/${urlPrepend}` : ``
    app.use(`${url}/nfts`, nftsRoutes(Models))
    app.use(`${url}/owners`, ownersRoutes(Models))
}

export default routes
