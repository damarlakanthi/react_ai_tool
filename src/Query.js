import React, { useState } from "react";

import { TextField, Button, CircularProgress, Box } from "@mui/material";

import Fade from '@mui/material/Fade';

const Query = () => {

const [prompt, setPrompt] = useState("");

const [query, setQuery] = useState("");

const [loading, setLoading] = useState(false);

const handleTextField = (text) => {

setPrompt(text.target.value);

};

const handlePrompt = () => {

setLoading(true);

const requestOptions = {

method: "POST",

headers: { "Content-Type": "application/json" },

body: JSON.stringify({ prompt: prompt }),

};

fetch("http://localhost:8080/query1", requestOptions)

.then((resp) => resp.json())

.then((data) => {

setQuery(data.data);

setLoading(false);

console.log(data.data);

});

};

const paragraphs = query.split('\n').map((paragraph, index) => (

<p key={index}>{paragraph}</p>

));

return (

<Box

component="form"

autoComplete="off"

sx={{

maxWidth: 600,

margin: "auto",

padding: 2,

backgroundColor: "#F5F5F5",

borderRadius: 4,

boxShadow: 1,

}}

>

<h2>In House GPT</h2>

<Box

sx={{

backgroundColor: "#DCDCDC",

overflowY: "scroll",

textAlign: "left",

padding: 2,

position: "relative",

}}

>

<Fade

in={loading}

style={{

transitionDelay: loading ? '800ms' : '0ms',

position: "absolute",

top: "50%",

left: "50%",

transform: "translate(-50%, -50%)",

}}

unmountOnExit

>

<CircularProgress />

</Fade>

{query ? (

<div style={{ padding: "30px", lineHeight: "30px" }}>{paragraphs}</div>

) : null}

</Box>

<Box sx={{ paddingTop: "40vh" }}>

<TextField

label="Enter prompt here"

required

variant="outlined"

color="secondary"

type="text"

multiline

fullWidth

sx={{ mb: 3 }}

onChange={handleTextField}

/>

<Button

variant="outlined"

color="secondary"

onClick={handlePrompt}

sx={{ width: "100%" }}

>

Submit

</Button>

</Box>

</Box>

);

};

export default Query;