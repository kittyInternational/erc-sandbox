import express from 'express'
import Models from '../models'

const router = express.Router()

router.get('/', (req, res) => 
    Models.NFT.find({}).sort({ tokenId: -1 }).then(data => res.status(200).send(data))
    .catch(err => console.log(err))
)

export default router