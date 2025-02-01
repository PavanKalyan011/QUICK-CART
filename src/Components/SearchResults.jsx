import React, { useContext, useEffect, useState } from 'react'
import Axiosinstance from '../api/Axiosinstance'
import { Axiosinstance2 } from '../api/Axiosinstance'
import { searchContext } from '../App'
import Card from './Card'

const SearchResults = () =>  {
    const { searchState } = useContext(searchContext);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const resp1 = await Axiosinstance.get("/products");
                const response1 = resp1.data;

                const resp2 = await Axiosinstance2.get("/products");
                const response2 = resp2.data.products;

                const combinedProducts = [...response1, ...response2];
                setAllProducts(combinedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const safeSearchState = searchState ? searchState.toLowerCase() : "";
     
        const filtered = allProducts.filter((product) =>{
            const titleMatch = product.title?.toLowerCase().includes(safeSearchState);
    const brandMatch = product.brand?.toLowerCase().includes(safeSearchState);

    return titleMatch || brandMatch;
        }
        );
        setFilteredProducts(filtered);
    }, [searchState, allProducts]);

 
    return (
        <div className="p-10 flex flex-row flex-wrap gap-20 justify-around">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                    <Card product={product} key={index} />
                ))
            ) : (
                <p className="text-center">No Results Found</p>
            )}
        </div>
    );
};

export default SearchResults;


