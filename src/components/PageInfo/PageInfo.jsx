import { useLocation } from 'react-router-dom';
import { useMain } from '../../contexts/MainContext';
import { Layout, Typography,  Banner, Breadcrumb, Card, Button, Space,} from '@douyinfe/semi-ui';

const { Title, Text, Paragraph } = Typography;  
const findPageInfo = (menu, path) => {
    for (const key in menu) {
        const item = menu[key];
        if (item.url === path) {
            return { title: item.title, description: item.description };
        }
        if (item.sub) {
            const foundInSub = findPageInfo(item.sub, path);
            if (foundInSub) return foundInSub;
        }
    }
    return null;
};

const PageInfo = ({ url }) => {
    const {
        settingsMenu
    } = useMain();
    const location = useLocation();
    const currentPath = url || location.hash.replace('#', '');
    const pageInfo = findPageInfo(settingsMenu, currentPath);
    // console.log("PageInfo:", pageInfo, "Current Path:", currentPath);
    if (!pageInfo) return null;

    return (
        <div className="page-info">
            <Title heading={3} className="page-title">{pageInfo.title}</Title>
            {pageInfo.description && (
                <Paragraph className="page-description">{pageInfo.description}</Paragraph>
            )}
        </div>
    );
};

export default PageInfo;