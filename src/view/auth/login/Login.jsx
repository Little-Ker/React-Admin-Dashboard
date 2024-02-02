import React, {
  useEffect, useContext, useCallback, useState
} from 'react'
import {
  Link, useNavigate
} from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import {
  Divider, Grid, Stack, Typography, useMediaQuery, TextField, Button, Card
} from '@mui/material'
import AuthContext from 'contexts/authContext'

function Login() {
  const navigate = useNavigate()

  const ctx = useContext(AuthContext)

  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

  const [account, setAccount] = useState('abc')
  const [password, setPassword] = useState('123')

  const onSubmit = useCallback(async () => {
    await ctx?.onLogin(account, password)
    navigate('/')
  }, [account, ctx, password, navigate])

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh',
        background: '#EEF2F6',
      }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
          <Grid
            item
            sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}
          >
            <Card>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item sx={{ mb: 3 }}>
                  <Link to="#">
                    LOGO
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                          Enter your credentials to continue
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="帳號"
                        variant="outlined"
                        value={account}
                        onChange={(e) => { setAccount(e.target.value) }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="密碼"
                        variant="outlined"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                      />
                    </Grid>
                    {(ctx?.logFalseTip !== '') && (
                      <Grid item xs={12}>
                        <p>{ctx?.logFalseTip}</p>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={onSubmit}>Login</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography component={Link} to="/pages/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                      Don&apos;t have an account?
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }} />
    </Grid>
  )
}

export default Login
