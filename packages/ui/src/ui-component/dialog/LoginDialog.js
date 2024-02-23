import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import QRCode from 'qrcode.react'
import { Dialog, DialogActions, DialogContent, Typography, DialogTitle } from '@mui/material'
import { StyledButton } from 'ui-component/button/StyledButton'
import { Input } from 'ui-component/input/Input'
import axios from 'axios'
import { baseURL } from 'store/constant'
const LoginDialog = ({ show, dialogProps, onConfirm, setShow }) => {
    const portalElement = document.getElementById('portal')
    const phoneInput = {
        label: 'Phone',
        name: 'phone'
    }
    const usernameInput = {
        label: 'Username',
        name: 'username',
        type: 'string',
        placeholder: ''
    }
    const passwordInput = {
        label: 'Password',
        name: 'password',
        type: 'password'
    }

    const phoneInput1 = {
        label: 'Phone1',
        name: 'phone1',
        type: 'string',
        placeholder: ''
    }
    const passwordInput1 = {
        label: 'Password1',
        name: 'password1',
        type: 'password'
    }
    const [usernameVal, setUsernameVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')
    const [phoneVal, setphoneVal] = useState('')
    const [ifQrcode, setifQrcode] = useState(false)
    const [Register, setRegister] = useState(false)

    useEffect(() => {
        const loginDetails = JSON.parse(localStorage.getItem('loginDetails'))
        if (loginDetails) {
            const currentTime = new Date().getTime() // 获取当前时间的时间戳
            // 检查时间是否超过24小时 (24 * 60 * 60 * 1000 毫秒 = 24小时)
            if (currentTime - loginDetails.loginTime > 24 * 60 * 60 * 1000) {
                // 时间超过24小时，移除登录信息
                localStorage.removeItem('loginDetails')
            }
        }
    })
    // 注册
    const handleRegister = function () {
        if (usernameVal || phoneVal || passwordVal !== '') {
            axios
                .post(`${baseURL}/api/v1/register`, {
                    name: usernameVal,
                    phone: phoneVal,
                    password: passwordVal
                })
                .then((res) => {
                    console.log(res)
                    //注册成功转手机账号密码登录
                    setRegister(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    // 登录
    const handleLogin = function () {
        if (phoneVal || passwordVal !== '') {
            axios
                .post(`${baseURL}/api/v1/login`, {
                    phone: phoneVal,
                    password: passwordVal
                })
                .then((res) => {
                    console.log(res)
                    //登录成功关闭dialog/储存token/标记登录时间
                    const currentTime = new Date().getTime()
                    const loginDetails = { token: res?.data?.jwt, loginTime: currentTime }
                    localStorage.setItem('loginDetails', JSON.stringify(loginDetails))
                    setShow(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    const component = show ? (
        <Dialog
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(255, 255, 255, 1)'
                }
            }}
            onKeyUp={(e) => {
                console.log(usernameVal, passwordVal, phoneVal)
                if (e.key === 'Enter') {
                    onConfirm(usernameVal, passwordVal, phoneVal)
                }
            }}
            open={show}
            fullWidth
            maxWidth='xs'
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '1vw' }}>
                {!Register ? (
                    <>
                        <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                            {/* {dialogProps.title} */}
                            登录
                        </DialogTitle>
                    </>
                ) : (
                    <>
                        <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                            {/* {dialogProps.title} */}
                            注册
                        </DialogTitle>
                    </>
                )}

                {/* <StyledButton variant='contained' onClick={() => setifQrcode(false)}>
                    手机账号登录
                </StyledButton>
                <StyledButton variant='contained' onClick={() => setifQrcode(true)}>
                    微信扫码登录
                </StyledButton> */}
            </div>
            {!Register ? (
                <>
                    {/* {!ifQrcode ? ( */}
                    <div style={{ height: '18vw' }}>
                        <DialogContent>
                            <Typography>手机号</Typography>
                            <Input
                                inputParam={phoneInput}
                                onChange={(newValue) => setphoneVal(newValue)}
                                value={phoneVal}
                                showDialog={false}
                            />
                            <div style={{ marginTop: 20 }}></div>
                            <Typography>密码</Typography>
                            <Input inputParam={passwordInput} onChange={(newValue) => setPasswordVal(newValue)} value={passwordVal} />
                        </DialogContent>
                        <DialogActions style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <StyledButton onClick={() => setRegister(true)} style={{ backgroundColor: 'white', color: 'black' }}>
                                注册
                            </StyledButton>
                            <StyledButton onClick={() => handleLogin()}>登录</StyledButton>
                        </DialogActions>
                    </div>
                    {/* ) : (
                        <>
                            <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '18vw' }}>
                                <QRCode size={180} bgColor='#ffffff' fgColor='#412728' value='RichBrain----YYDS' renderAs='svg' level='M' />
                            </DialogContent>
                        </>
                    )} */}
                </>
            ) : (
                <>
                    {!ifQrcode ? (
                        <div style={{ height: '25vw' }}>
                            <DialogContent>
                                <Typography>手机号</Typography>
                                <Input
                                    inputParam={phoneInput}
                                    onChange={(newValue) => setphoneVal(newValue)}
                                    value={phoneVal}
                                    showDialog={false}
                                />
                                <div style={{ marginTop: 20 }}></div>
                                <Typography>用户名</Typography>
                                <Input
                                    inputParam={usernameInput}
                                    onChange={(newValue) => setUsernameVal(newValue)}
                                    value={usernameVal}
                                    showDialog={false}
                                />
                                <div style={{ marginTop: 20 }}></div>
                                <Typography>密码</Typography>
                                <Input inputParam={passwordInput} onChange={(newValue) => setPasswordVal(newValue)} value={passwordVal} />
                            </DialogContent>
                            <DialogActions style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <StyledButton onClick={() => setRegister(false)} style={{ backgroundColor: 'white', color: 'black' }}>
                                    手机账号登录
                                </StyledButton>
                                <StyledButton onClick={() => handleRegister()}>
                                    {/* {dialogProps.confirmButtonName} */}
                                    注册
                                </StyledButton>
                            </DialogActions>
                        </div>
                    ) : (
                        <>
                            {/* <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '18vw' }}>
                                <QRCode size={180} bgColor='#ffffff' fgColor='#412728' value='RichBrain----YYDS' renderAs='svg' level='M' />
                            </DialogContent> */}
                        </>
                    )}
                </>
            )}
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

LoginDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onConfirm: PropTypes.func,
    setShow: PropTypes.any
}

export default LoginDialog
