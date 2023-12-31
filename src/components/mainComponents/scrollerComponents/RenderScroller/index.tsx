import "./RenderScroller.scss";
import { ArticleData } from "../../FetchData";
import { MutableRefObject, memo } from "react";
import WidgetScroller from "../WidgetScroller";
import CategoryScroller from "../CategoryScroller";

interface RenderScrollerProps {
    isCategoryCard: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    observerElemRef: MutableRefObject<HTMLDivElement | null>;
}

const RenderScroller = ({
    isCategoryCard,
    isFavoritesCategory,
    articleData,
    observerElemRef,
}: RenderScrollerProps) => {
    const observerDiv = observerElemRef && (
        <div
            ref={(elem) => (observerElemRef!.current = elem)}
            className="observerRef"
        ></div>
    );

    return (
        <>
            {isCategoryCard ? (
                <CategoryScroller
                    isFavoritesCategory={isFavoritesCategory}
                    articleData={articleData}
                    observerDiv={observerDiv}
                />
            ) : (
                <WidgetScroller
                    articleData={articleData}
                    observerDiv={observerDiv}
                />
            )}
        </>
    );
};

export default memo(RenderScroller);
