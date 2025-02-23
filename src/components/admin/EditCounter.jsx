import React, { useState } from 'react'
import {
    IconButton, Menu,
    MenuItem,
    Button,
    TextField, Container, Typography, Box
} from "@mui/material";



const UpdateCounter = () => {

    const [show, setShow] = useState(true);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        ownerName: "",
        mobileNo: "",
        email: "",
        counterName: "",
        imagePath: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, imagePath: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        alert("Form submitted successfully!");
        setShow(!show);
    };


    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                 <Modal.Header closeButton>
                    <Modal.Title>ADD COUNTER</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
            <Container maxWidth="sm">
                <Box  >
                    {/* //sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }} */}


                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Owner Name"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Mobile Number"
                            name="mobileNo"
                            type="tel"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Counter Name"
                            name="counterName"
                            value={formData.counterName}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <Button variant="contained" component="label" sx={{ mt: 2 }}>
                            Upload Image
                            <input type="file" required hidden onChange={handleImageChange} />
                        </Button>

                        {formData.imagePath && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Selected: {formData.imagePath.name}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container>
            </Modal.Body>

            </Modal>

        </>
    )
}


function EditCounter() {
    return (
        <>
            {/* <div className='text-center m-1'>EditCounter Details :</div> */}
            <UpdateCounter />

        </>

    )
}

export default EditCounter