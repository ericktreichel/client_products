import GlobalStyle from "./styles/global";
import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/App.css";
import axios from "axios";

const Title = styled.h1`
    color: #212223;
    font-size: 2.4rem;
    font-family: "Catamaran";
    font-weight: 800;
    padding: 20px;
    margin: 20px 0px 40px 0px;
`;

const Details = styled.div`
    padding-left: 30px;
    font-size: 13px;
    text-align: start;

    @media (max-width: 600px) {
        font-size: 11.5px;
    }
`;

function App() {
    const [products, setProducts] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getProducts = async () => {
        try {
            const res = await axios.get(
                "https://trchl-inventory.herokuapp.com/"
            );
            setProducts(
                res.data.sort((a, b) => (a.prod_id > b.prod_id ? 1 : -1))
            );
        } catch (error) {
            toast.error(error, {
                position: "bottom-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    useEffect(() => {
        getProducts();
    }, [setProducts]);

    return (
        <div className="App">
            <Title>PRODUCT INVENTORY</Title>
            <Form
                onEdit={onEdit}
                setOnEdit={setOnEdit}
                getProducts={getProducts}
            ></Form>
            <div className="grid"></div>
            <Grid
                products={products}
                setProducts={setProducts}
                setOnEdit={setOnEdit}
            />
            <Details>
                Note[1]: All fields are required to add a new product, except
                the product description field.{" "}
            </Details>
            <Details>Note[2]: The ID field must be 6-digits long. </Details>
            <ToastContainer />
            <GlobalStyle />
        </div>
    );
}

export default App;
