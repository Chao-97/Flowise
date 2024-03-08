// assets
import {
    IconHierarchy,
    IconBuildingStore,
    IconKey,
    IconTool,
    IconLock,
    IconRobot,
    IconVariable,
    IconFile3d,
    IconFiles,
    IconBrandSnapseed
} from '@tabler/icons'

// constant
const icons = {
    IconHierarchy,
    IconBuildingStore,
    IconKey,
    IconTool,
    IconLock,
    IconRobot,
    IconVariable,
    IconFile3d,
    IconFiles,
    IconBrandSnapseed
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'chatflows',
            title: '聊天流',
            type: 'item',
            url: '/chatflows',
            icon: icons.IconHierarchy,
            breadcrumbs: true
        },
        {
            id: 'marketplaces',
            title: '市场',
            type: 'item',
            url: '/marketplaces',
            icon: icons.IconBuildingStore,
            breadcrumbs: true
        },
        {
            id: 'models',
            title: '模型',
            type: 'item',
            url: '/models',
            icon: icons.IconFile3d,
            breadcrumbs: true
        },
        {
            id: 'assistants',
            title: '助手',
            type: 'item',
            url: '/assistants',
            icon: icons.IconRobot,
            breadcrumbs: true
        },
        {
            id: 'credentials',
            title: '证书',
            type: 'item',
            url: '/credentials',
            icon: icons.IconLock,
            breadcrumbs: true
        },
        {
            id: 'variables',
            title: '变量',
            type: 'item',
            url: '/variables',
            icon: icons.IconVariable,
            breadcrumbs: true
        },
        {
            id: 'apikey',
            title: 'API 密钥',
            type: 'item',
            url: '/apikey',
            icon: icons.IconKey,
            breadcrumbs: true
        },
        {
            id: 'evaluate',
            title: '评测模型推理速率',
            type: 'item',
            url: '/predict',
            icon: icons.IconBrandSnapseed,
            breadcrumbs: false
        }
        // {
        //     id: 'doc',
        //     title: '文档',
        //     type: 'item',
        //     url: '/doc',
        //     icon: icons.IconFiles,
        //     breadcrumbs: true
        // }
    ]
}

export default dashboard
