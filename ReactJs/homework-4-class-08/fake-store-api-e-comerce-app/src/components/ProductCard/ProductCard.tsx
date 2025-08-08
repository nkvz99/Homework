import type { Product } from "../../types/Product";
import './ProductCard.css'

interface ProductCardProps {
    product: Omit<Product , 'id'>;            
}


const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        </div>
    );
}

export default ProductCard;