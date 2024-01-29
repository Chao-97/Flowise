import { lazy } from 'react'

// project imports
import MainLayout from 'layout/MainLayout'
import Loadable from 'ui-component/loading/Loadable'

// chatflows routing
const Chatflows = Loadable(lazy(() => import('views/chatflows')))

// marketplaces routing
const Marketplaces = Loadable(lazy(() => import('views/marketplaces')))

// models routing
const Models = Loadable(lazy(() => import('views/models')))

// apikey routing
const APIKey = Loadable(lazy(() => import('views/apikey')))

// tools routing
const Tools = Loadable(lazy(() => import('views/tools')))

// assistants routing
const Assistants = Loadable(lazy(() => import('views/assistants')))

// credentials routing
const Credentials = Loadable(lazy(() => import('views/credentials')))

// variables routing
const Variables = Loadable(lazy(() => import('views/variables')))

// variables routing
const Doc = Loadable(lazy(() => import('views/doc')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Chatflows />
        },
        {
            path: '/chatflows',
            element: <Chatflows />
        },
        {
            path: '/marketplaces',
            element: <Marketplaces />
        },
        {
            path: '/models',
            element: <Models />
        },
        {
            path: '/apikey',
            element: <APIKey />
        },
        {
            path: '/tools',
            element: <Tools />
        },
        {
            path: '/assistants',
            element: <Assistants />
        },
        {
            path: '/credentials',
            element: <Credentials />
        },
        {
            path: '/variables',
            element: <Variables />
        },
        {
            path: '/doc',
            element: <Doc />
        }
    ]
}

export default MainRoutes
