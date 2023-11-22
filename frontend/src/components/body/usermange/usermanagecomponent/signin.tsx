import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Userhead from './userhead'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Collapse, IconButton } from "@mui/material";

const SigninBox = styled("form")(({ theme }) => ({
    position: "absolute",
    top: "55%",
    width: "100%",
    padding: "24px",
    transform: "translate(0, -50%)",
    [theme.breakpoints.up("sm")]: {
        width: "70%",
        left: "15%",
    },
    [theme.breakpoints.up(768)]: {
        width: "60%",
        left: "20%",
    },
    [theme.breakpoints.up(1440)]: {
        width: "500px",
        left: "230px",
    },
    [theme.breakpoints.up("xl")]: {
        left: "calc((100% - 1536px)/2 + 230px)",
    },
}));

const TIMEOUT = 30000; // 30 seconds

const SignIn = () => {
    let logoutTimer: NodeJS.Timeout;
    const [state, setState] = useState("")
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted:', values);
            postKeyValue();
        },
    });

    const postKeyValue = () => {
        axios.post('http://localhost:4128/router/api/signin', formik.values)
            .then(res => {
                console.log(res.data);
                setStatus(res.data.status);
                setMsg(res.data.msg);
                setOpen(true);
                if (res.data.status === "success") {
                    localStorage.setItem(
                        "sessionStartTime",
                        String(new Date().getTime())
                    );
                    localStorage.setItem("currentUser", res.data.token);
                    setTimeout(() => (window.location.href = "/"), 4000);
                } else {

                }
            })
            .catch(error => console.log(error)
            )
    }
    return (
        <Box className="SignIn" style={{
            width: "100%",
            height: "100 %",
            backgroundImage: "url('/img/landing.png')",
            backgroundPosition: "center",
            backgroundSize: "cover"
        }}>
            <Userhead />
            <Box className="Firstpart">
                <Box style={{ top: "7vh", position: "absolute", right: "10px", width: "50vw" }}>
                    <Collapse in={open}>
                        <Alert action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                            sx={{ mb: 2 }}>
                            <AlertTitle>{status}</AlertTitle>
                            <strong>{msg}</strong>
                        </Alert>
                    </Collapse>
                </Box>
                <img />
                <Box className="Image-Cover">
                    <SigninBox>
                        <Box
                            component="form"
                            sx={{
                                "& .MuiTextField-root": { m: 1, mx: 0, width: "100%" },
                                "& .MuiInputLabel-root": {
                                    color: "#d0d0d0",
                                },
                                "& .MuiInputBase-root": { backgroundColor: "rgba(0,0,0,0.21)", height: "56px" },
                                "& .MuiSvgIcon-root": {
                                    color: "white",
                                    my: 1,
                                    p: 1,
                                    width: "50px",
                                    height: "56px",
                                },
                                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                                    color: "white !important"
                                },
                                "& .css-1wc848c-MuiFormHelperText-root": {
                                    position: 'absolute',
                                    top: "100%"
                                }
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <PersonIcon sx={{ backgroundColor: "rgba(0,0,0,0.21)" }} />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                            </Box>
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <KeyIcon sx={{ backgroundColor: "rgba(0,0,0,0.21)" }} />
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Box>
                            <Box>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Remember Me"
                                    sx={{ color: "white", height: "40px" }}
                                />
                            </Box>
                            <Button
                                onClick={postKeyValue}
                                variant="text"
                                sx={{
                                    width: "100%",
                                    color: "white",
                                    backgroundImage:
                                        "linear-gradient(268deg, rgba(166, 0, 207, 0.21) 16.92%, rgba(143, 151, 220, 0.21) 95.44%);",
                                }}
                            >
                                Sign In
                            </Button>
                            <Box
                                sx={{
                                    display: { xs: "flex" },
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    sx={{
                                        my: 2,
                                        fontFamily: "Inter",
                                        color: "#FFF",
                                        fontSize: "16px",
                                    }}
                                >
                                    <Link to="/">
                                        Forgot password?
                                    </Link>
                                </Typography>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    sx={{
                                        my: 2,
                                        fontFamily: "Inter",
                                        color: "#FFF",
                                        fontSize: "16px",
                                    }}
                                >
                                    <Link to="/signup">Sign up</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </SigninBox>
                </Box>
            </Box>
        </Box>
    );
};

export default SignIn;