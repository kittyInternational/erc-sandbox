import authRoutes from './auth'

const routes = app => {
    app.use('/auth', authRoutes)
}

export default routes
