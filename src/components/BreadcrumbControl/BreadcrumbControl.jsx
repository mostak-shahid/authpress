import { Breadcrumb } from "@douyinfe/semi-ui";
import { useLocation } from "react-router-dom";
import { useMain } from "../../contexts/MainContext";

/** Safe recursive search */
const findBreadcrumbPath = (items = [], currentUrl, path = []) => {
    if (!Array.isArray(items)) return null;

    for (const item of items) {
        const newPath = [...path, item];

        if (item.url === currentUrl) return newPath;

        if (item.items && Array.isArray(item.items)) {
            const res = findBreadcrumbPath(item.items, currentUrl, newPath);
            if (res) return res;
        }
    }
    return null;
};

/** Convert menu → breadcrumb */
const convertToBreadcrumbItems = (pathArray = []) => {
    if (!Array.isArray(pathArray)) return [];

    return pathArray.map((item) => ({
        path: item.url,
        name: item.text,
    }));
};

const BreadcrumbControl = () => {
    const { items: settingsMenu = [] } = useMain(); // ensure fallback to []
    const location = useLocation();

    const currentUrl =
        location.hash?.replace("#", "") || location.pathname;

    const breadcrumbPath = findBreadcrumbPath(settingsMenu, currentUrl);

    if (!breadcrumbPath) return null;

    const breadcrumbItems = convertToBreadcrumbItems(breadcrumbPath);

    return <Breadcrumb routes={breadcrumbItems} />;
};

export default BreadcrumbControl;
