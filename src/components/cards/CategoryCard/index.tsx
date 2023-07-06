import "./CategoryCard.scss";
import { useState, MouseEventHandler, useContext, useEffect } from "react";
import { sliceString } from "../../../util/helpers/functions/stringSlicer";
import { FavoriteArticlesDataContext } from "../../../context/FavoriteArticlesDataProvider";

interface CategoryCardProps {
    imgSrc: string;
    category: string;
    title: string;
    author: string;
    url: string;
    timestamp: string;
    isFavorite: boolean;
}

const CategoryCard = ({
    imgSrc,
    category,
    title,
    author,
    url,
    timestamp,
    isFavorite
}: CategoryCardProps) => {
    const [isArticleFavorite, setIsArticleFavorite] = useState(isFavorite ? isFavorite : false);
    const { favoriteArticlesArray, updateFavoriteArticlesArray } = useContext(
        FavoriteArticlesDataContext
    );
    const shortStringFiller = "xxx xxxx xxxx xxxx xxxxx xxxxx";

    const handleFavoriteBtnClick: MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        e.stopPropagation();
        const newIsArticleFavorite = !isArticleFavorite;
        const favoriteArticleObject = {
            url: url,
            title: title,
            byline: author,
            section: category,
            timestamp: timestamp,
            img_src: imgSrc,
            isFavorite: newIsArticleFavorite
        };
        updateFavoriteArticlesArray(favoriteArticleObject, newIsArticleFavorite);
        setIsArticleFavorite(newIsArticleFavorite);
    };

    useEffect(() => {
        const isAlreadyInFavorites = favoriteArticlesArray.some((article) => {
           return article.url === url
        });
        if (isAlreadyInFavorites !== isArticleFavorite) {
            setIsArticleFavorite(isAlreadyInFavorites);
        }
    }, [favoriteArticlesArray, url, isArticleFavorite]);

    return (
        <>
            <div className="img_container">
                <img
                    src={imgSrc}
                    alt="Article related photograph"
                    className="category-card__img"
                />
            </div>
            <div className="category-card__text-content">
                <p className="category-card__category">
                    {isArticleFavorite ? "favorite" : category}
                </p>
                {title.length < 42 && (
                    <h3>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {title}
                        </a>
                        <span className="shortStringFiller">
                            {shortStringFiller}
                        </span>
                    </h3>
                )}
                {title.length > 63 && (
                    <h3>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {sliceString(title, 63)}
                        </a>
                    </h3>
                )}
                {title.length >= 42 && title.length <= 63 && (
                    <h3>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {title}
                        </a>
                    </h3>
                )}
                <p className="author">{sliceString(author, 40, "author")}</p>
            </div>
            <button type="button" onClick={handleFavoriteBtnClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={isArticleFavorite ? "#bb1e1e" : "none"}
                    stroke={isArticleFavorite ? "none" : "#bb1e1e"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </>
    );
};

export default CategoryCard;
