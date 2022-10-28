import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Table = styled.table`
    width: 100%;
    background-color: #eee;

    box-shadow: 0px 0px 5px #ccc;
    border-radius: 6px;
    max-width: 1120px;
    margin: 20px auto;
    word-break: break-all;
    border-collapse: collapse;
    border-spacing: 0px;
    border: solid white;
    border-width: 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

    @media (min-width: 1050px) {
        width: 1800px;
    }
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
    border-spacing: 10px;
    &:nth-of-type(odd) {
        background: #fff;
    }
`;

export const Th = styled.th`
    background-color: #ddd;
    text-align: start;
    border-bottom: gray inset;
    padding-bottom: 3px;
    padding-top: 5px;
    min-width: 55px;
    cursor: pointer;
    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Th2 = styled.th`
    background-color: #ddd;
    text-align: start;
    border-bottom: gray inset;
    padding-bottom: 3px;
    padding-top: 5px;
    min-width: 55px;
    cursor: pointer;
    word-break: break-word;
    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 8px;
    padding-bottom: 8px;
    border-spacing: 0;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
    align-self: center;
    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td2 = styled.td`
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: end;
    padding-right: 25px;
    text-content: center;
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 768px) {
        text-align: center;
        padding-right: 0px;
    }
`;

const Grid = ({ products, setProducts, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        let checkb = document.getElementById(id);
        if (!checkb.checked == true) {
            toast.warn(
                "Please tick the checkbox near the respective trash icon to confirm the item removal.",
                {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            );
        } else {
            await axios
                .delete("https://trchl-inventory.herokuapp.com/" + id)
                .then(({ data }) => {
                    const newArray = products.filter(
                        (product) => product._id !== id
                    );

                    setProducts(newArray);
                    toast.success("Product successfully removed.", {
                        position: "bottom-right",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    checkb.checked = false;
                })
                .catch((error) =>
                    toast.error(
                        "We couldn't delete the selected product. Try again please.",
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

            setOnEdit(null);
        }
    };

    // Declaring states for sorting feature
    const [sorted, setSorted] = useState({
        sorted: "prod_id",
        reversed: false,
    });

    // Sort products by ID
    const sortById = () => {
        const productsCopy = [...products];
        productsCopy.sort((prodA, prodB) => {
            if (sorted.reversed) {
                return prodA.prod_id - prodB.prod_id;
            }
            return prodB.prod_id - prodA.prod_id;
        });
        setProducts(productsCopy);
        setSorted({ sorted: "prod_id", reversed: !sorted.reversed });
    };

    //Sort products by Name
    const sortByName = () => {
        const productsCopy = [...products];
        productsCopy.sort((prodA, prodB) => {
            const upperProdA = prodA.prod_name.toUpperCase();
            const upperProdB = prodB.prod_name.toUpperCase();
            if (sorted.reversed) {
                return upperProdA.localeCompare(upperProdB);
            }
            return upperProdB.localeCompare(upperProdA);
        });
        setProducts(productsCopy);
        setSorted({ sorted: "prod_name", reversed: !sorted.reversed });
    };

    // Sort products by ID
    const sortByPrice = () => {
        const productsCopy = [...products];
        productsCopy.sort((prodA, prodB) => {
            if (sorted.reversed) {
                return prodA.prod_price - prodB.prod_price;
            }
            return prodB.prod_price - prodA.prod_price;
        });
        setProducts(productsCopy);
        setSorted({ sorted: "prod_price", reversed: !sorted.reversed });
    };

    // Sort products by ID
    const sortByQnt = () => {
        const productsCopy = [...products];
        productsCopy.sort((prodA, prodB) => {
            if (sorted.reversed) {
                return prodA.prod_qnt - prodB.prod_qnt;
            }
            return prodB.prod_qnt - prodA.prod_qnt;
        });
        setProducts(productsCopy);
        setSorted({ sorted: "prod_qnt", reversed: !sorted.reversed });
    };

    const renderArrow = () => {
        if (sorted.reversed) {
            return <FaArrowUp />;
        }
        return <FaArrowDown />;
    };

    // Render each product received via API in a table row
    const renderProducts = () => {
        return products.map((item, i) => {
            return (
                <Tr key={i}>
                    <Td width="auto">{item.prod_id}</Td>
                    <Td width="auto">{item.prod_name}</Td>
                    <Td2 width="auto%">
                        {item.prod_price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}
                    </Td2>
                    <Td2 width="4%">{item.prod_qnt}</Td2>
                    <Td width="auto" onlyWeb>
                        {item.prod_desc}
                    </Td>
                    <Td title="Edit item" alignCenter width="5%">
                        <FaEdit onClick={() => handleEdit(item)} />
                    </Td>
                    <Td title="Remove item" alignCenter width="5%">
                        <FaTrash onClick={() => handleDelete(item._id)} />
                    </Td>
                    <Td title="Must check here to be removed" width="5%">
                        <input type="checkbox" id={item._id} name={item._id} />
                    </Td>
                </Tr>
            );
        });
    };

    return (
        <div>
            <Table>
                <Thead>
                    <Tr>
                        <Th
                            onClick={sortById}
                            title="Provide a six digit number ID"
                        >
                            <span style={{ marginRight: 10 }}>&ensp; ID</span>
                            {sorted.sorted === "prod_id" ? renderArrow() : null}
                        </Th>
                        <Th onClick={sortByName}>
                            <span style={{ marginRight: 10 }}>Name</span>
                            {sorted.sorted === "prod_name"
                                ? renderArrow()
                                : null}
                        </Th>
                        <Th2 onClick={sortByPrice}>
                            <span style={{ marginRight: 10 }}>Price (R$)</span>
                            {sorted.sorted === "prod_price"
                                ? renderArrow()
                                : null}
                        </Th2>
                        <Th onClick={sortByQnt}>
                            <span style={{ marginRight: 10 }}>Qnt</span>
                            {sorted.sorted === "prod_qnt"
                                ? renderArrow()
                                : null}
                        </Th>
                        <Th onlyWeb>Description</Th>

                        <Th colSpan={3}>&ensp;Edit / Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>{renderProducts()}</Tbody>
            </Table>
        </div>
    );
};

export default Grid;
