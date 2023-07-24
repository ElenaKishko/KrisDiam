import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
import { ProductThumbnail, Filter } from "./components";
import { observer } from "mobx-react";
import { FilterStore, FiltersStore } from "./stores";

const Products = observer(() => {
  const storeData = useSelector((state) => state);
  const [products, setProducts] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //save all existing categories and gemstones in variables
  let categories = [
    ...new Set(storeData.wholeCollection.map((product) => product.type)),
  ];
  let gemstones = [
    ...new Set(storeData.wholeCollection.map((product) => product.gemstone)),
  ];

  //load products from redux
  useEffect(() => {
    setProducts(storeData.wholeCollection);
  }, [storeData.wholeCollection]);

  //filter and sort products
  const filterAndSort = () => {
    let data = storeData.wholeCollection;
    let filteredData = [];
    let category = FilterStore.category;
    let gemstone = FilterStore.gemstone;
    let sort = FilterStore.sort;

    data.map((product) => {
      if (category === "category" && gemstone === "gemstone") {
        filteredData = storeData.wholeCollection;
      } else if (category !== "category" && gemstone === "gemstone") {
        if (product.type === category) {
          filteredData = [...filteredData, product];
        }
      } else if (category === "category" && gemstone !== "gemstone") {
        if (product.gemstone === gemstone) {
          filteredData = [...filteredData, product];
        }
      } else {
        if (product.type === category && product.gemstone === gemstone) {
          filteredData = [...filteredData, product];
        }
      }
      if (filteredData.length === 0) {
        setProducts(storeData.wholeCollection);
      } else {
        setProducts(filteredData);
      }
    });

    let p = [...filteredData].sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : sort === "highest"
        ? a.price < b.price
          ? 1
          : -1
        : ""
    );
    setProducts(p);
  };

  //filter products by selected categories and gemstones
  const filterSelected = () => {
    let data = storeData.wholeCollection;
    let filteredData = [];
    let selectedCategories = FiltersStore.categories;
    let selectedGemstones = FiltersStore.gemstones;

    data.map((product) => {
      if (selectedCategories.length > 0 && selectedGemstones.length > 0) {
        if (
          selectedGemstones.includes(product.gemstone) &&
          selectedCategories.includes(product.type)
        ) {
          filteredData = [...filteredData, product];
        }
      } else if (
        selectedCategories.length > 0 &&
        selectedGemstones.length === 0
      ) {
        if (selectedCategories.includes(product.type)) {
          filteredData = [...filteredData, product];
        }
      } else if (
        selectedCategories.length === 0 &&
        selectedGemstones.length > 0
      ) {
        if (selectedGemstones.includes(product.gemstone)) {
          filteredData = [...filteredData, product];
        }
      } else {
        filteredData = data;
      }
      if (filteredData.length === 0) {
        setProducts(filteredData);
      } else {
        setProducts(filteredData);
        setFilteredProducts(filteredData);
      }
    });
  };

  //sort products
  const sort = () => {
    let sort = FiltersStore.sort;
    let p = [...products].sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : sort === "highest"
        ? a.price < b.price
          ? 1
          : -1
        : ""
    );
    setProducts(p);
  };
  return (
    <>
      <div className={overlay ? "overlay" : ""}></div>
      <div className="products">
        <Container>
          <Filter
            filterAndSort={filterAndSort}
            setOverlay={setOverlay}
            categories={categories}
            gemstones={gemstones}
            filterSelected={filterSelected}
            sort={sort}
          />
        </Container>

        <Container className="products_container">
          <Grid container spacing={3} sx={{ pb: 10 }}>
            {products.length > 0 ? (
              products.map((item) => {
                return (
                  <Grid item key={item.id} xs={6} sm={4} md={3}>
                    <ProductThumbnail product={item} />
                  </Grid>
                );
              })
            ) : (
              <div className="products_alert">No items were found</div>
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
});

export default Products;
