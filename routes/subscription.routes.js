import {Router} from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({title: "Get all subscriptions"});
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({title: "Get subscription details"});
})

subscriptionRouter.post('/', (req, res) => {
    res.send({title: "Post create subscription"});
})

subscriptionRouter.put('/:id', (req, res) => {
    res.send({title: "Put subscription"});
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({title: "Delete subscription"});
})

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({title: "Get all user subscriptions"});
})

subscriptionRouter.get('/:id/cancel', (req, res) => {
    res.send({title: "Get Cancel subscription"});
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: "Get upcoming renewals"});
})


export default subscriptionRouter;