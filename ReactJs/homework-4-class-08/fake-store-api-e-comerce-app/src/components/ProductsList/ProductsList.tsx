import { useParams } from "react-router-dom";
import type { Product } from "../../types/Product";
import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../../services/api";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ProductCard from "../ProductCard/ProductCard";
import './ProductsList.css';


const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setError(undefined);
            setLoading(true);
            try {
                const data = categoryName
                    ? await getProductsByCategory(categoryName)
                    : await getAllProducts();
                
                
                setProducts(Array.isArray(data) ? data : []);
                
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : "An error occurred while fetching products";
                setError(errorMessage);
                console.error("Error fetching products:", error);
                 
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (products.length === 0) {
        return <p>{categoryName ? "No products in this category." : "No products available."}</p>;
    }

    return (
        <div className="products-list">
            {products.map(({ id, ...product }) => (
                <ProductCard 
                    key={id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductsList;