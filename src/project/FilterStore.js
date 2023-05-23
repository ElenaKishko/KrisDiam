import { observable, action} from "mobx"

export const FilterStore = observable({
    category: "category",
    gemstone: "gemstone",
    sort: "sort",
    updateCategory: action((value) => 
    {
        FilterStore.category = value
        return(FilterStore.category)
    }),
    updateGemstone: action((value) =>
    {
        FilterStore.gemstone = value
        return(FilterStore.gemstone)
    }),
    updateSort: action((value) =>
    {
        FilterStore.sort = value
        return(FilterStore.sort)
    })
})

