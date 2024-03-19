import express from 'express'

const routes = (Models) => {
    const router = express.Router()

    router.get('/', (req, res) => {
        const query = {}
        if (req.query.tokenId) {
            const tokenId = Number(req.query.tokenId)
            if (!isNaN(tokenId)) {
                query.tokenId = { $eq: tokenId };
            }
        }
        Models.NFT.find(query).sort({ tokenId: -1 }).then(data => res.status(200).send(data)).catch(err => console.log(err))
    }
       
    )

    return router
}


export default routes