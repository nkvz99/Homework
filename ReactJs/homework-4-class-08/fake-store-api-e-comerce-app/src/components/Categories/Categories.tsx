import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../services/api";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import './Categories.css';

const ProductsList = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const navigate = useNavigate();
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(undefined); 
            try {
                const categories = await getCategories();
                setCategories(categories);
            } catch (error) {
                setError("Failed to load categories");
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        }
        void fetchCategories();
    }, []);


    if (loading) {
        return <LoadingSpinner />;
    }

   
    if (error) {
        return <ErrorMessage message={error} />; 
    }

  
    if (categories.length === 0) {
        return <p>There are no categories at the moment.</p>;
    }

    return (
        <div className="category-buttons">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => navigate(`/category/${cat}`)}
                    className={`category-button ${categoryName === cat ? "active" : ""}`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}

export default ProductsList;