import './HomePageHeader.css'


const HomepageHeader = () => {
    return (
        <>
        <div className="homeP-header-container">
        <h1 className="homeP-header">Welcome to FakeStore </h1>
        <h2 className="homeP-header-txt">
            Browse products from different categories: electronics, jewerly, men's clothing and women's clothing.
            <div className="homeP-header-features">
            <h4> Features:</h4>
            <ul>
                <li>View all products or filter by category</li>
                <li>Product details with prices</li>
                <li>Simple navigation between Home and Products pages</li>
            </ul>
            </div>
        </h2>
        </div>
        </>
     )
}

export default HomepageHeader;