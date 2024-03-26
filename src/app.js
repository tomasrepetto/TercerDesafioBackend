import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const PORT = 8080;

app.get('/products', (req, res) => {
    const {limit} = req.query;
    const p = new ProductManager();
    return res.json({ Discos: p.getProducts (limit)});
});

app.get('/products/:pid', (req, res) =>{
    const { pid } = req.params; 
    const p = new ProductManager();
    return res.json({ Discos: p.getProductsById (Number(pid))});
});

app.listen(PORT, () => {
    console.log(`Corriendo aplicacion en el puerto ${PORT}`);
});