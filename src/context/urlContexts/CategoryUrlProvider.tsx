import { IsFetchDataContext } from "../IsFetchDataProvider";
import { newsAPI_Key, nytAPI_Key } from "../../util/helpers/constants";
import { SelectedCategoryContext } from "../SelectedCategoryProvider";
import { EncodedSearchInputContext } from "../EncodedSearchInputProvider";
import {
    Dispatch, SetStateAction, ReactNode, createContext, useContext, useEffect, useState,
} from "react";
interface ICategoryUrlContext {
    API_Card_URL: string;
    isMaxCategoryFetchCalls: boolean;
    maxFetchNum: () => number;
    changeCardURLparams: () => void;
    setTotalSearchResultsNum: Dispatch<SetStateAction<number>>;
    resetCardURLparams: () => void;
}

export const CategoryUrlContext = createContext<ICategoryUrlContext>({
    API_Card_URL: `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=0&api-key=${nytAPI_Key}`,
    isMaxCategoryFetchCalls: false,
    maxFetchNum: () => 400,
    changeCardURLparams: () => {},
    setTotalSearchResultsNum: () => {},
    resetCardURLparams: () => {},
});

const CategoryUrlProvider = ({ children }: { children: ReactNode }) => {
    const { selectedCategory } = useContext(SelectedCategoryContext);
    const { encodedSearchInput } = useContext(EncodedSearchInputContext);
    const { setIsFetchCategoryData, debounceFetch } =
        useContext(IsFetchDataContext);

    const [cardURL_Offset, setCardURL_Offset] = useState(0);
    const [API_Card_URL, setAPI_Card_URL] = useState(
        `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
    );

    const [searchURL_pageNum, setSearchURL_pageNum] = useState(1);
    const [totalSearchResultsNum, setTotalSearchResultsNum] = useState(0);
    const isSearchResults = selectedCategory === "searchResults";

    const maxFetchNum = () => {
        switch (selectedCategory) {
            case "Health":
                return 200;

            case "Technology":
                return 300;

            case "searchResults":
                return totalSearchResultsNum;

            default:
                return 400;
        }
    };

    const isMaxCategoryFetchCalls = cardURL_Offset === maxFetchNum();

    const resetCardURLparams = () => {
        setCardURL_Offset(0);
        setSearchURL_pageNum(1);
    };

    const changeCardURLparams = () => {
        if (
            selectedCategory !== "Favorites" &&
            !isSearchResults
        ) {
            setCardURL_Offset((prevNum) => {
                return prevNum + 100;
            });

        } else if (isSearchResults) {
            setSearchURL_pageNum((prevNum) => {
                return prevNum + 1;
            });
        }

        debounceFetch(setIsFetchCategoryData);
    };

    useEffect(() => {
        switch (selectedCategory) {
            case "Home":
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;

            case "General":
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/world.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;

            case "searchResults":
                setAPI_Card_URL(
                    `https://newsapi.org/v2/everything?q=${encodedSearchInput}&searchIn=title&language=en&page=${searchURL_pageNum}&apiKey=${newsAPI_Key}`
                );
                return;

            case "Favorites":
                setAPI_Card_URL("");
                return;

            default:
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/${selectedCategory.toLowerCase()}.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;
        }
    }, [selectedCategory, cardURL_Offset, encodedSearchInput, searchURL_pageNum]);

    return (
        <CategoryUrlContext.Provider
            value={{
                API_Card_URL,
                isMaxCategoryFetchCalls,
                maxFetchNum,
                changeCardURLparams,
                setTotalSearchResultsNum,
                resetCardURLparams,
            }}
        >
            {children}
        </CategoryUrlContext.Provider>
    );
};

export default CategoryUrlProvider;