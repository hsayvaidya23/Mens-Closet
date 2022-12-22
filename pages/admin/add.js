import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import {
  Grid,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import BaseCard from "./../../src/components/baseCard/BaseCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const [form, setForm] = useState({})
  const [title, setTitle] = useState('')
  const [img, setImg] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState(499)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [slug, setSlug] = useState('')
  const [availableQty, setAvailableQty] = useState(10)
  const [category, setCategory] = useState('')

  const handleChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "img") {
      setImg(e.target.value);
    } else if (e.target.name == "desc") {
      setDesc(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(e.target.value);
    } else if (e.target.name == "slug") {
      setSlug(e.target.value);
    } else if (e.target.name == "availableQty") {
      setAvailableQty(e.target.value);
    } else if (e.target.name == "category") {
      setCategory(e.target.value);
    } else if (e.target.name == "size") {
      setSize(e.target.value);
    } else if (e.target.name == "color") {
      setColor(e.target.value);
    }
  }
  const submitForm = async(e) => {
    e.preventDefault();
    // Request to add a product

    const data = {title, desc, price, slug, availableQty, category, img, size, color}
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([data]),
    });
    let response = await res.json();
    console.log(response)
    setTitle('')
    setDesc('')
    setPrice('')
    setSize('')
    setSlug('')
    setAvailableQty('')
    setCategory('')
    setImg('')
    setColor('')
    if(response.success) {
       toast.success("Product added successfully !", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,  
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    } else {
      toast.error("Internal Server Error !", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,  
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
   
  }
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>
        {`
          footer {
            display: none;
          }
          navbar {
            display: none;
          }
        `}
      </style>
      <FullLayout>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add a Product">
              <Stack spacing={3}>
                <TextField onChange={handleChange} value={title} name="title" label="Title" variant="outlined" />
                <TextField onChange={handleChange} value={category} name="category" label="Category" variant="outlined" />
                <TextField  onChange={handleChange} value={size} name="size" label="Size" variant="outlined" />
                <TextField onChange={handleChange} value={img} name="img" label="Image Url" variant="outlined" />
                <TextField onChange={handleChange} value={color} name="color" label="Color" variant="outlined" />
                <TextField onChange={handleChange} value={slug} name="slug" label="Slug" variant="outlined" />
                <TextField onChange={handleChange} value={price} name="price" label="Price" type="number" variant="outlined" />
                <TextField onChange={handleChange} value={availableQty} name="availableQty" label="Available Quantity" type="number" variant="outlined" />

                <TextField onChange={handleChange} value={desc}
                  name="desc"
                  label="Description"
                  multiline
                  rows={4}
                />
              </Stack>
              <br />
              <Button onClick={submitForm} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;
