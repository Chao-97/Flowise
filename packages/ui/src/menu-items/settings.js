// assets
import { IconTrash, IconFileUpload, IconFileExport, IconCopy, IconSearch, IconMessage, IconPictureInPictureOff } from '@tabler/icons'

// constant
const icons = { IconTrash, IconFileUpload, IconFileExport, IconCopy, IconSearch, IconMessage, IconPictureInPictureOff }

// ==============================|| SETTINGS MENU ITEMS ||============================== //

const settings = {
    id: 'settings',
    title: '',
    type: 'group',
    children: [
        {
            id: 'conversationStarters',
            title: '对话开始提示词',
            type: 'item',
            url: '',
            icon: icons.IconPictureInPictureOff
        },
        {
            id: 'viewMessages',
            title: '消息记录',
            type: 'item',
            url: '',
            icon: icons.IconMessage
        },
        {
            id: 'duplicateChatflow',
            title: '复制聊天流',
            type: 'item',
            url: '',
            icon: icons.IconCopy
        },
        {
            id: 'loadChatflow',
            title: '加载聊天流',
            type: 'item',
            url: '',
            icon: icons.IconFileUpload
        },
        {
            id: 'exportChatflow',
            title: '导出聊天流',
            type: 'item',
            url: '',
            icon: icons.IconFileExport
        },
        {
            id: 'analyseChatflow',
            title: '分析聊天流',
            type: 'item',
            url: '',
            icon: icons.IconSearch
        },
        {
            id: 'deleteChatflow',
            title: '删除聊天流',
            type: 'item',
            url: '',
            icon: icons.IconTrash
        }
    ]
}

export default settings
