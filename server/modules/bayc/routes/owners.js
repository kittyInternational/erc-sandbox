import express from 'express'
import Models from '../models'

const router = express.Router()

router.get('/', (req, res) =>
    Models.Owner.find({ balance: { $gt: 0 }}, '-_id -__v').then(data => res.status(200).send(data))
        .catch(err => console.log(err))
)

export default router