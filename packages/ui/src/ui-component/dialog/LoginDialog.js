import { createPortal } from 'react-dom'
import { useState } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'
import { Dialog, DialogActions, DialogContent, Typography, DialogTitle } from '@mui/material'
import { StyledButton } from 'ui-component/button/StyledButton'
import { Input } from 'ui-component/input/Input'

const LoginDialog = ({ show, dialogProps, onConfirm }) => {
    const portalElement = document.getElementById('portal')
    const usernameInput = {
        label: 'Username',
        name: 'username',
        type: 'string',
        placeholder: 'john doe'
    }
    const passwordInput = {
        label: 'Password',
        name: 'password',
        type: 'password'
    }
    const [usernameVal, setUsernameVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')
    const [ifQrcode, setifQrcode] = useState(false)
    const component = show ? (
        <Dialog
            onKeyUp={(e) => {
                console.log(usernameVal,passwordVal);
                if (e.key === 'Enter') {
                    onConfirm(usernameVal, passwordVal)
                }
            }}
            open={show}
            fullWidth
            maxWidth='xs'
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '1vw' }}>
                {/* <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                {dialogProps.title}
            </DialogTitle>
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                {dialogProps.title}
            </DialogTitle> */}
                <StyledButton variant='contained' onClick={() => setifQrcode(false)}>
                    账号密码登录
                </StyledButton>
                <StyledButton variant='contained' onClick={() => setifQrcode(true)}>
                    微信扫码登录
                </StyledButton>
            </div>
            {!ifQrcode ? (
                <div style={{ height: '18vw' }}>
                    <DialogContent>
                        <Typography>Username</Typography>
                        <Input
                            inputParam={usernameInput}
                            onChange={(newValue) => setUsernameVal(newValue)}
                            value={usernameVal}
                            showDialog={false}
                        />
                        <div style={{ marginTop: 20 }}></div>
                        <Typography>Password</Typography>
                        <Input inputParam={passwordInput} onChange={(newValue) => setPasswordVal(newValue)} value={passwordVal} />
                    </DialogContent>
                    <DialogActions>
                        <StyledButton variant='contained' onClick={() => onConfirm(usernameVal, passwordVal)}>
                            {dialogProps.confirmButtonName}
                        </StyledButton>
                    </DialogActions>
                </div>
            ) : (
                <>
                    <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '18vw' }}>
                        <QRCode size={180} bgColor='#ffffff' fgColor='#412728' value='RichBrain----YYDS' renderAs='svg' level='M' />
                    </DialogContent>
                </>
            )}
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

LoginDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onConfirm: PropTypes.func
}

export default LoginDialog
