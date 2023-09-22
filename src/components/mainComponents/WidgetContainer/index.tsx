import "./WidgetContainer.scss";
import FetchAndFilterData from "../FetchAndFilterData";
import { RedCircleSvg, RightArrowSvg } from "../../../assets/svg/svgImports";

const WidgetContainer = () => {
    return (
        <section className="widget-container">
            <div className="latest-heading-container">
                <RedCircleSvg />
                <h2>Latest news</h2>
            </div>
            <FetchAndFilterData cardClass="widget-card" />
            <div className="see-all-news">
                <a href="https://www.nytimes.com/" target="_blank" rel="noopener noreferrer">See all news</a>
                <RightArrowSvg />
            </div>
        </section>
    );
};

export default WidgetContainer;
