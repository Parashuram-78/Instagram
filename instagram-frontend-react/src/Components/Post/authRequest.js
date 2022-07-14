import axios from "axios";


export const PostAuthRequest = (url, body, successFunction,enqueueSnackbar,navigate) => {

    // setLoading(true);
    try {
        const getdata = (requestCount) => {
            const atoken = window.localStorage.getItem("access_token");
            const rtoken = window.localStorage.getItem("refresh_token");

            // Handling case whether access token is present or not
            if (atoken) {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${atoken}`,
                    },
                };

                Promise.resolve(
                    axios.post(
                        process.env.REACT_APP_BACKEND_URL + url, body, config
                    )
                )
                    .then((res) => {
                        successFunction(res)
                        return;
                    })
                    .catch((error) => {
                        // Handling case when access token is expired
                        if (error.response && error.response.status === 401 && requestCount === 0) {
                            axios
                                .post(process.env.REACT_APP_BACKEND_URL + "api/user/refresh", {
                                    refresh_token: rtoken,
                                })
                                .then((res) => {
                                    // Updating access and refresh token
                                    console.log(res);
                                    localStorage.setItem("access_token", res.data.access_token);
                                    localStorage.setItem("refresh_token", res.data.refresh_token);
                                    getdata(1);
                                    return;
                                })
                                .catch((error) => {
                                    enqueueSnackbar("You are not logged in", {
                                        variant: "error",
                                    });
                                    // setLoading(false);
                                    // window.localStorage.clear();
                                    navigate("/login");
                                    console.log(error)
                                    return;
                                });
                        } else {
                            enqueueSnackbar("Some error occurred while submitting. Please try again", {
                                variant: "error",
                            });
                            // setLoading(false);
                            alert("Some error occurred while submitting. Please try again"); console.log(error);
                        }
                    });
            } else {
                enqueueSnackbar("You need to login first", {
                    variant: "error",
                });
                // window.localStorage.clear();
                // setLoading(false);
                navigate("/login");
                alert("Access token unavailable.");
                return;
            }
        };

        getdata(0);
        return;
    } catch (error) {
        enqueueSnackbar("Some error occured", {
            variant: "error",
        });
        // setLoading(false);
        console.log(error)
        return;
    }
};


export const GetAuthRequest = (url, successFunction,enqueueSnackbar,navigate) => {
    // setLoading(true);
    try {
        const getdata = (requestCount) => {
            const atoken = window.localStorage.getItem("access_token");
            const rtoken = window.localStorage.getItem("refresh_token");

            // Handling case whether access token is present or not
            if (atoken) {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${atoken}`,
                    },
                };

                Promise.resolve(
                    axios.get(
                        process.env.REACT_APP_BACKEND_URL + url, config
                    )
                )
                    .then((res) => {
                        successFunction(res)
                        return;
                    })
                    .catch((error) => {
                        // Handling case when access token is expired
                        if (error.response && error.response.status === 401 && requestCount === 0) {
                            axios
                                .post(process.env.REACT_APP_BACKEND_URL + "api/user/refresh", {
                                    refresh_token: rtoken,
                                })
                                .then((res) => {
                                    // Updating access and refresh token
                                    console.log(res);
                                    localStorage.setItem("access_token", res.data.access_token);
                                    localStorage.setItem("refresh_token", res.data.refresh_token);
                                    getdata(1);
                                    return;
                                })
                                .catch((error) => {
                                    enqueueSnackbar("You are not logged in", {
                                        variant: "error",
                                    });
                                    // setLoading(false);
                                    window.localStorage.clear();
                                    navigate("/login");
                                    console.log(error)
                                    return;
                                });
                        } else {
                            
                            enqueueSnackbar("Some error occurred while submitting. Please try again", {
                                variant: "error",
                            });
                            // setLoading(false);
                            alert("Some error occurred while submitting. Please try again"); 
                            console.log(error);
                        }
                    });
            } else {
                enqueueSnackbar("You need to login first", {
                    variant: "error",
                });
                window.localStorage.clear();
                // setLoading(false);
                navigate("/login");
                alert("Access token unavailable.");
                return;
            }
        };

        getdata(0);
        return;
    } catch (error) {
        enqueueSnackbar("Some error occured", {
            variant: "error",
        });
        // setLoading(false);
        console.log(error)
        return;
    }
};