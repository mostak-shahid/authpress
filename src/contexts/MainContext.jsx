import { __ } from '@wordpress/i18n';
// import apiFetch from "@wordpress/api-fetch";
import { createContext, useContext, useState } from "react";
import {
  IconWrench,
  IconEyeClosedSolid,
  IconKey,
  IconSetting,
  IconLikeThumb,
  IconCloud,
  IconPlusCircle,
  IconUser,
  IconUserSetting,
} from '@douyinfe/semi-icons';
const MainContext = createContext();
const settingsMenu = [
  {
    itemKey: "customizer",
    text: __("Customizer", "authpress"),
    description: __(
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.",
      "authpress"
    ),
    url: "/settings/customizer",
    icon: <IconWrench />,
    items: [
      {
        itemKey: "redesign",
        text: __("Redesign", "authpress"),
        description: null,
        url: "/settings/customizer/redesign",
        icon: null,
        items: [
          {
            itemKey: "templates",
            text: __("Default Templates", "authpress"),
            description: __("Choose Theme", "authpress"),
            url: "/settings/customizer/redesign/templates",
          },
          {
            itemKey: "background",
            text: __("Background", "authpress"),
            description: null,
            url: "/settings/customizer/redesign/background",
          },
          {
            itemKey: "logo",
            text: __("Logo", "authpress"),
            description: __("Customize Your Logo Section", "authpress"),
            url: "/settings/customizer/redesign/logo",
          },
          {
            itemKey: "form",
            text: __("Form", "authpress"),
            description: null,
            url: "/settings/customizer/redesign/form",
          },
          {
            itemKey: "fields",
            text: __("Fields", "authpress"),
            description: null,
            url: "/settings/customizer/redesign/fields",
          },
          {
            itemKey: "button",
            text: __("Button", "authpress"),
            description: null,
            url: "/settings/customizer/redesign/button",
          },
          {
            itemKey: "other",
            text: __("Other", "authpress"),
            description: null,
            url: "/settings/customizer/redesign/other",
          },
        ],
      },
    ],
  },

  {
    itemKey: "hide_login",
    text: __("Hide Login", "authpress"),
    description: __("Hide your login page", "authpress"),
    url: "/settings/hide_login",
    icon: <IconEyeClosedSolid />,
  },

  {
    itemKey: "two_fa_authentication",
    text: __("2FA Authentication", "authpress"),
    description: __(
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.",
      "authpress"
    ),
    url: "/settings/two_fa_authentication",
    icon: <IconKey />,
  },

  {
    itemKey: "captcha",
    text: __("Captcha", "authpress"),
    description: __("Captcha Settings", "authpress"),
    url: "/settings/captcha",
    icon: <IconUserSetting />,
  },

  {
    itemKey: "auto_login",
    text: __("Auto Login", "authpress"),
    description: __("Auto Login", "authpress"),
    url: "/settings/auto_login",
    icon: <IconUser />,
    items: [
      {
        itemKey: "link_login",
        text: __("Link Login", "authpress"),
        description: __("Link Login", "authpress"),
        url: "/settings/auto_login/link_login",
      },
      {
        itemKey: "settings",
        text: __("Settings", "authpress"),
        description: __("Auto Login Settings", "authpress"),
        url: "/settings/auto_login/settings",
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
    url: "/settings/feedback",
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
