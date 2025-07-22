import { useParams } from "react-router-dom";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import Categories from "../../components/Categories/Categories";
import ProductsList from "../../components/ProductsList/ProductsList";



export const HomePage = () => {
    const {categoryName } = useParams();
    return (
        <div>
            <HomePageHeader/>
            <Categories/>
            {categoryName && <ProductsList/>}
        </div>
    )
}