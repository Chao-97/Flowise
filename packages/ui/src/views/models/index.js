import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

// material-ui
import { Grid, Box, Stack, Badge } from '@mui/material'
import { useTheme } from '@mui/material/styles'
// import { IconHierarchy, IconTool } from '@tabler/icons'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import ItemCard from 'ui-component/cards/ItemCard'
import { gridSpacing } from 'store/constant'
import WorkflowEmptySVG from 'assets/images/workflow_empty.svg'
import ToolDialog from 'views/tools/ToolDialog'

// API
import modelsApi from 'api/models'

// Hooks
import useApi from 'hooks/useApi'

// const
import { baseURL } from 'store/constant'

function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`attachment-tabpanel-${index}`}
            aria-labelledby={`attachment-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
}

// ==============================|| Marketplace ||============================== //

const Models = () => {
    const navigate = useNavigate()

    const theme = useTheme()
    const customization = useSelector((state) => state.customization)

    const [isChatflowsLoading, setChatflowsLoading] = useState(true)
    const [isToolsLoading, setToolsLoading] = useState(true)
    const [images, setImages] = useState({})
    // const tabItems = ['Chatflows', 'Tools']
    // const [value, setValue] = useState(0)
    const [showToolDialog, setShowToolDialog] = useState(false)
    const [toolDialogProps, setToolDialogProps] = useState({})

    const getAllModes = useApi(modelsApi.getAllModels)

    const onUseTemplate = (selectedTool) => {
        const dialogProp = {
            title: '添加新的工具',
            type: 'IMPORT',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Add',
            data: selectedTool
        }
        setToolDialogProps(dialogProp)
        setShowToolDialog(true)
    }

    // const goToTool = (selectedTool) => {
    //     const dialogProp = {
    //         title: selectedTool.templateName,
    //         type: 'TEMPLATE',
    //         data: selectedTool
    //     }
    //     setToolDialogProps(dialogProp)
    //     setShowToolDialog(true)
    // }

    const goToCanvas = (selectedChatflow) => {
        navigate(`/marketplace/${selectedChatflow.id}`, { state: selectedChatflow })
    }

    // const handleChange = (event, newValue) => {
    //     setValue(newValue)
    // }

    useEffect(() => {
        getAllModes.request()
        // getAllToolsMarketplacesApi.request()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setChatflowsLoading(getAllModes.loading)
    }, [getAllModes.loading])

    // useEffect(() => {
    //     setToolsLoading(getAllToolsMarketplacesApi.loading)
    // }, [getAllToolsMarketplacesApi.loading])

    useEffect(() => {
        if (getAllModes.data) {
            try {
                const chatflows = getAllModes.data
                const images = {}
                for (let i = 0; i < chatflows.length; i += 1) {
                    const flowDataStr = chatflows[i].flowData
                    const flowData = JSON.parse(flowDataStr)
                    const nodes = flowData.nodes || []
                    images[chatflows[i].id] = []
                    for (let j = 0; j < nodes.length; j += 1) {
                        const imageSrc = `${baseURL}/api/v1/node-icon/${nodes[j].data.name}`
                        if (!images[chatflows[i].id].includes(imageSrc)) {
                            images[chatflows[i].id].push(imageSrc)
                        }
                    }
                }
                setImages(images)
            } catch (e) {
                console.error(e)
            }
        }
    }, [getAllModes.data])

    return (
        <>
            <MainCard sx={{ background: customization.isDarkMode ? theme.palette.common.black : '' }}>
                <Stack flexDirection='row'>
                    <h1>模型</h1>
                </Stack>
                <TabPanel>
                    <Grid container spacing={gridSpacing}>
                        {!isChatflowsLoading &&
                            getAllModes.data &&
                            getAllModes.data.map((data, index) => (
                                <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                                    {data.badge && (
                                        <Badge
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    right: 20
                                                }
                                            }}
                                            badgeContent={data.badge}
                                            color={data.badge === 'POPULAR' ? 'primary' : 'error'}
                                        >
                                            <ItemCard onClick={() => goToCanvas(data)} data={data} images={images[data.id]} />
                                        </Badge>
                                    )}
                                    {!data.badge && <ItemCard onClick={() => goToCanvas(data)} data={data} images={images[data.id]} />}
                                </Grid>
                            ))}
                    </Grid>
                </TabPanel>
                {((!isChatflowsLoading && (!getAllModes.data || getAllModes.data.length === 0)) ||
                    (!isToolsLoading && (!getAllToolsMarketplacesApi.data || getAllToolsMarketplacesApi.data.length === 0))) && (
                    <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
                        <Box sx={{ p: 2, height: 'auto' }}>
                            <img
                                style={{ objectFit: 'cover', height: '30vh', width: 'auto' }}
                                src={WorkflowEmptySVG}
                                alt='WorkflowEmptySVG'
                            />
                        </Box>
                        <div>暂时还没有模型</div>
                    </Stack>
                )}
            </MainCard>
            <ToolDialog
                show={showToolDialog}
                dialogProps={toolDialogProps}
                onCancel={() => setShowToolDialog(false)}
                onConfirm={() => setShowToolDialog(false)}
                onUseTemplate={(tool) => onUseTemplate(tool)}
            ></ToolDialog>
        </>
    )
}

export default Models
