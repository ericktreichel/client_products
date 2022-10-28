import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;

    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 18px 12px;
    margin-bottom: 25px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    @media (min-width: 768px) {
        max-width: 1600px;
    }
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    max-width: 220px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 4px;
    height: 36px;
    background-color: #f1f2f3;
`;

const InputAreaSM = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100px;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const DivInputs = styled.div`
    width: 100%;
    flex-wrap: wrap;
    align-content: end;
    justify-content: space-around;
    margin: 0;
    display: flex;
    flex: 1;
    flex-direction: row;
`;

const Label = styled.label`
    text-align: start;
`;

const Button = styled.button`
    background-image: linear-gradient(
        30.88deg,
        #455eb5 9%,
        #5643cc 143.89%,
        #673fd7 64.72%
    );
    border-radius: 7px;
    border-style: none;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 500;
    height: 2.6rem;
    padding: 0 0.7rem;
    text-align: center;
    text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
    transition: all 0.5s;
    align-self: end;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    @media (min-width: 768px) {
        padding: 0rem 1rem;
    }

    &:hover {
        box-shadow: rgba(80, 63, 145, 0.6) 0 1px 9px;
        border-radius: 9px;
        transition-duration: 0.25s;
    }
`;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const product = ref.current;
            product.prod_id.value = onEdit.prod_id;
            product.prod_name.value = onEdit.prod_name;
            product.prod_price.value = onEdit.prod_price;
            product.prod_qnt.value = onEdit.prod_qnt;
            product.prod_desc.value = onEdit.prod_desc;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = ref.current;

        if (
            !product.prod_name.value ||
            !product.prod_price.value ||
            !product.prod_qnt.value
        ) {
            return toast.warn(
                "Must provide ID, name, price and quantity in stock.",
                {
                    position: "bottom-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }

        if (onEdit) {
            await axios
                .put("https://trchl-inventory.herokuapp.com/" + onEdit._id, {
                    prod_id: product.prod_id.value,
                    prod_name: product.prod_name.value,
                    prod_price: product.prod_price.value,
                    prod_qnt: product.prod_qnt.value,
                    prod_desc: product.prod_desc.value,
                })
                .then(({ data }) =>
                    toast.success("Product updated successfully!", {
                        position: "bottom-right",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                )
                .catch(({ data }) =>
                    toast.error(
                        "Houston, we have a problem updating this product. Please refresh the page and try again.",
                        {
                            position: "bottom-right",
                            autoClose: 3500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        }
                    )
                );
        } else {
            await axios
                .post("https://trchl-inventory.herokuapp.com/", {
                    prod_id: product.prod_id.value,
                    prod_name: product.prod_name.value,
                    prod_price: product.prod_price.value,
                    prod_qnt: product.prod_qnt.value,
                    prod_desc: product.prod_desc.value,
                })
                .then(({ data }) =>
                    toast.success(
                        "Product successfully added into inventory!",
                        {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        }
                    )
                )
                .catch(({ data }) =>
                    toast.error(
                        "A problem occurred while inserting the data. Please check your inputs and try again.",
                        {
                            position: "bottom-right",
                            autoClose: 3500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        }
                    )
                );
        }
        product.prod_id.value = "";
        product.prod_name.value = "";
        product.prod_price.value = "";
        product.prod_qnt.value = "";
        product.prod_desc.value = "";

        setOnEdit(null);
        getProducts();
    };

    return (
        <div>
            <FormContainer ref={ref} onSubmit={handleSubmit}>
                <DivInputs>
                    <InputAreaSM>
                        <Label>ID</Label>
                        <Input
                            name="prod_id"
                            min={100000}
                            max={999999}
                            type="number"
                            placeholder="(six digits)"
                        />
                    </InputAreaSM>
                    <InputArea>
                        <Label>Product name</Label>
                        <Input name="prod_name" type="text" />
                    </InputArea>
                    <InputAreaSM>
                        <Label>Price</Label>
                        <Input
                            name="prod_price"
                            minLength={6}
                            maxLength={6}
                            step={0.01}
                            type="number"
                        />
                    </InputAreaSM>
                    <InputAreaSM>
                        <Label>Qnt</Label>
                        <Input
                            name="prod_qnt"
                            min={0}
                            max={9999999}
                            type="number"
                        />
                    </InputAreaSM>
                    <InputArea>
                        <Label>Description</Label>
                        <Input name="prod_desc" type="text" />
                    </InputArea>

                    <Button type="submit">Add Product</Button>
                </DivInputs>
            </FormContainer>
        </div>
    );
};

export default Form;
