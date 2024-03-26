import fs from "fs";

class ProductManager {
    constructor() {
        this.patch = "./src/data/productos.json";
        this.products = [];
    }

    static id = 0;

    addProduct(title, description, price, image, code, stock) {
        ProductManager.id++;
        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            image,
            code,
            stock
        };
        this.products.push(newProduct);
        this.writeProducts();
    }

    readProducts() {
        try {
            const data = fs.readFileSync(this.patch, 'utf-8');
            if (!data.trim()) {
                throw new Error('El archivo está vacío o no contiene datos JSON válidos');
            }
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return [];
        }
    }

    writeProducts() {
        try {
            fs.writeFileSync(this.patch, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error al escribir en el archivo:', error);
        }
    }

    getProducts(limit = 0) {
        const products = this.readProducts();
        limit = Number(limit);
        if (limit > 0) {
            return products.slice(0, limit);
        }
        return products;
    }

    getProductsById(id) {
        id = Number(id);
        let products = this.readProducts();
        let product = products.find(product => product.id === id);
        if (!product) {
            return { error: "Disco no encontrado" }; 
        } else {
            console.log(product);
            return product;
        }
    }

    deleteProductsById(id) {
        let products = this.readProducts();
        let filteredProducts = products.filter(product => product.id !== id);
        this.products = filteredProducts;
        this.writeProducts();
    }

    modificarProducts({ id, ...producto }) {
        this.deleteProductsById(id);
        this.products.unshift({ id, ...producto });
        this.writeProducts();
    }
}

export default ProductManager;

