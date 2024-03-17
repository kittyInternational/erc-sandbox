import express from 'express'
import Models from '../models'

const router = express.Router()

router.get('/', async (req,res) => {
    if (req.query.id) {
        try {
            const nft = await Models.NFT.findOne({ tokenId: req.query.id }).exec()
            const data = Object.assign({}, nft.toObject(), {})
            res.status(200).send(data)
        } catch (err) {
            console.error(err)
            res.status(500).send({ message: 'Server error' })
        }
    }
})

export default router