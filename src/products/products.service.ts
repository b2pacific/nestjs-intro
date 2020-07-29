import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './products.model';

@Injectable()

export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): string{
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts(): Product[] {
        return [...this.products];
    }

    getSingleProduct(ProdId: string): any {
        const product = this.products.find((prod) => prod.id === ProdId);
        if(!product){
            throw new NotFoundException("Could not found product");
        }
        return {...product};
    }

    updateProduct(ProdId: string, title: string, desc: string, price: number): any {
        const ind = this.products.findIndex((prod) => prod.id === ProdId);
        const product = this.products[ind];
        if(!product){
            throw new NotFoundException("Could not found product");
        }
        else {
            const updatedProduct = {...product};
            if(title){
                updatedProduct.title = title;
            }

            if(desc){
                updatedProduct.description = desc;
            }

            if(price){
                updatedProduct.price = price;
            }
        }
    }

    removeProduct(ProdId: string) {
        const ind = this.products.findIndex((prod) => prod.id === ProdId);
        const product = this.products[ind];
        if(!product){
            throw new NotFoundException("Could not found product");
        }
        else {
            this.products.splice(ind, 1);
        }
    }
}