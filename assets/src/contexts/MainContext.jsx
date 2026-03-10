import { __ } from '@wordpress/i18n';
// import apiFetch from "@wordpress/api-fetch";
import { createContext, useContext, useState } from "react";

import {IconSetting,IconLikeThumb,IconCloud,IconPlusCircle,IconUser,} from '@douyinfe/semi-icons';

const MainContext = createContext();
const settingsMenu = [
    {
        itemKey: "page",
        text: __("Page", "authpress"),
        description: __("Page", "authpress"),
        url: "/settings/page",
        icon: <IconUser />,
        items: [
            {
                itemKey: "page-1",
                text: __("Page 1", "authpress"),
                description: __("Page 1", "authpress"),
                url: "/settings/page/page-1",
            },
            {
                itemKey: "page-2",
                text: __("Page 2", "authpress"),
                description: __("Page 2", "authpress"),
                url: "/settings/page/page-2",
            },
        ],
    },

    {
        itemKey: "import_export",
        text: __("Import & Expport", "authpress"),
        description: __("Import and Export your settings.", "authpress"),
        url: "/settings/import_export",
        icon: <IconCloud />,
    },

    {
        itemKey: "more",
        text: __("More", "authpress"),
        description: __("Adding more features to your Store.", "authpress"),
        url: "/settings/more",
        icon: <IconPlusCircle />,
    },

    {
        itemKey: "tools",
        text: __("Tools", "authpress"),
        description: __("Adding more features to your Store.", "authpress"),
        url: "/settings/tools",
        icon: <IconSetting />,
    },

    {
        itemKey: "feedback",
        text: __("Feedback", "authpress"),
        description: __(
        "We're constantly enhancing our product, and your feedback is key to staying ahead of the curve and delivering a stronger, more reliable security solution for you.",
        "authpress"
        ),
        url: "/feedback",
        icon: <IconLikeThumb />,
    },
];


export const MainProvider = ({ children }) => {
    const [settingData, setSettingData] = useState({});
    const [settingLoading, setSettingLoading] = useState(true);
    const [settingReload, setSettingReload] = useState(true);
    return (
        <MainContext.Provider
            value={{
                settingData, 
                setSettingData,
                settingLoading,
                setSettingLoading,
                settingsMenu,
                settingReload, 
                setSettingReload
            }}
        >
            {children}
            {/* {console.log('settingData from contex API', settingData)} */}
        </MainContext.Provider>
    );
};

export const useMain = () => useContext(MainContext);
