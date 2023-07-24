import { observable, action } from "mobx";

export const FiltersStore = observable({
  categories: [],
  gemstones: [],
  sort: "sort",
  updateCategories: action((arr) => {
    FiltersStore.categories = arr;
    return FiltersStore.categories;
  }),
  updateGemstones: action((arr) => {
    FiltersStore.gemstones = arr;
    return FiltersStore.gemstones;
  }),
  updateSort: action((value) => {
    FiltersStore.sort = value;
    return FiltersStore.sort;
  }),
});
