import { useLocation } from 'react-router-dom';
import { useMain } from '../../contexts/MainContext';
import { Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const findPageInfo = (menuArray, path) => {
    for (const item of menuArray) {
        if (item.url === path) {
            return { title: item.title, description: item.description };
        }

        if (item.sub) {
            const subArray = Object.values(item.sub); // convert nested object → array
            const foundInSub = findPageInfo(subArray, path);
            if (foundInSub) return foundInSub;
        }
    }
    return null;
};

const PageInfo = ({ url }) => {
    const { settingsMenu } = useMain();    // ⚡ now reading array, not object
    const location = useLocation();
    const currentPath = url || location.hash.replace('#', '');

    const pageInfo = findPageInfo(settingsMenu, currentPath);

    if (!pageInfo) return null;

    return (
        <div className="page-info">
            <Title heading={3} className="page-title">
                {pageInfo.title}
            </Title>

            {pageInfo.description && (
                <Paragraph className="page-description">
                    {pageInfo.description}
                </Paragraph>
            )}
        </div>
    );
};

export default PageInfo;
