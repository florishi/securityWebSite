import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Userhead from './userhead'
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password1: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    password2: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password1')], 'Passwords do not match'),
});

const SignupBox = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "55%",
    width: "100%",
    padding: "24px",
    transform: "translate(0, -50%)",
    gap: "50px",
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

const currentDate = new Date();
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SignUp = () => {
    const [alertStatus, setAlertStatus] = useState(0);
    const [userinfo, setUserInfo] = useState("")
    const currentDay = currentDate.getDay();
    const currentDayName = dayNames[currentDay];
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password1: '',
            password2: '',
        },
        validationSchema,
        onSubmit: (values) => { }
    });

    const handleCloseAlert = () => {
        setAlertStatus(0)
    }

    const handleErrorAlert = () => {
        setAlertStatus(0);
    }

    const postKeyValue = () => {
        axios.post('http://localhost:4128/router/api/signup', formik.values)
            .then(res => {
                console.log(res);
                if (res.data.msg == 'success') {
                    setAlertStatus(1);
                    setUserInfo(res.data.userinfo["email"]);
                    setTimeout(() => (window.location.href = "/"), 4000);
                } else { setAlertStatus(2) }
            })
            .catch(error => console.log(error)
            )
    }

    return (
        <div className="SignUp" style={{
            width: "100%",
            height: "100 %",
            backgroundImage: "url('/img/landing.png')",
            backgroundPosition: "center",
            backgroundSize: "cover"
        }}>
            <Userhead />
            <div style={{ top: "7vh", position: "absolute", right: "10px", width: "20vw" }}>{alertStatus == 1 &&
                <Alert severity="success" onClose={handleCloseAlert} >
                    <AlertTitle>Success</AlertTitle>
                    Hello {userinfo} Happy {currentDayName}.
                </Alert>}{
                    alertStatus == 2 &&
                    <Alert severity="error" onClose={handleErrorAlert}>
                        <AlertTitle>Error</AlertTitle>
                        Failed SingUp
                    </Alert>
                }
            </div>
            <Box className="Firstpart">
                <img />
                <div className="Image-Cover">
                    <SignupBox >
                        <Box
                            component="form"
                            sx={{
                                "& .MuiTextField-root": { my: 1, width: "100%" },
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
                                    id="filled-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    name="password1"
                                    value={formik.values.password1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password1 && Boolean(formik.errors.password1)}
                                    helperText={formik.touched.password1 && formik.errors.password1}
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <KeyIcon sx={{ backgroundColor: "rgba(0,0,0,0.21)" }} />
                                <TextField
                                    id="filled-password-input"
                                    label="Confirm Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    name="password2"
                                    value={formik.values.password2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password2 && Boolean(formik.errors.password2)}
                                    helperText={formik.touched.password2 && formik.errors.password2}
                                />
                            </Box>
                            <Button
                                // type="submit"
                                onClick={postKeyValue}
                                // disabled={formik.isValidating || !formik.isValid}
                                variant="text"
                                sx={{
                                    marginTop: "10px",
                                    width: "100%",
                                    color: "white",
                                    backgroundImage:
                                        "linear-gradient(268deg, rgba(166, 0, 207, 0.21) 16.92%, rgba(143, 151, 220, 0.21) 95.44%);",
                                }}
                            >
                                Sign Up
                            </Button>
                            <Box
                                sx={{
                                    display: { xs: "flex" },
                                    justifyContent: "flex-end",
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
                                    <Link to="/signin">Sign in</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </SignupBox>
                </div>
            </Box>
        </div >
    );
};

export default SignUp;