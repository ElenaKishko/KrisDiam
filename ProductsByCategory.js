import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
import { Filter, ProductThumbnail } from "./components";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { FilterStore, FiltersStore } from "./stores";

const ProductsByCategory = observer(() => {
  const storeData = useSelector((state) => state);
  const [products, setProducts] = useState([]);
  const [overlay, setOverlay] = useState(false);

  const params = useParams();
  let category = params.category;
  //save all existing gemstones in variables
  let gemstones = [
    ...new Set(storeData.wholeCollection.map((product) => product.gemstone)),
  ];

  useEffect(() => {
    async function getProducts() {
      let resp = await storeData.wholeCollection.filter(
        (product) => product.type === category
      );
      setProducts(resp);
    }
    getProducts();
  }, [category]);

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
  //filter products by selected gemstones
  const filterSelected = () => {
    let data = storeData.wholeCollection;
    let filteredData = [];
    let selectedGemstones = FiltersStore.gemstones;

    if (selectedGemstones.length === 0) {
      filteredData = data.filter((product) => product.type === category);
      setProducts(filteredData);
    } else {
      data.map((product) => {
        if (category === product.type) {
          if (selectedGemstones.includes(product.gemstone)) {
            filteredData = [...filteredData, product];
          }
        }
      });
      setProducts(filteredData);
    }
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
            category={params.category}
            setOverlay={setOverlay}
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
                    <ProductThumbnail key={item.id} product={item} />
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
export default ProductsByCategory;
