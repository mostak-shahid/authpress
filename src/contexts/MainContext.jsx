import { __ } from '@wordpress/i18n';
// import axios from "axios";
import { createContext, useContext, useState } from "react";
// import { extractJSONFromHTML } from "../lib/Helpers";
// import menuData from "../data/pages.json"; // Load menu JSON
const MainContext = createContext();
const settingsMenu = {
    "customizer": { 
        "title": __( "Customizer", "authpress" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "authpress" ), 
        "url":"/settings/customizer",

        "sub": {
            "redesign" : {
                "title": __( "Redesign", "authpress" ),                
                "url":"/settings/customizer/redesign",
                "sub": {
                    "templates" : {
                        "title": __( "Default Templates", "authpress" ),                
                        "url":"/settings/customizer/redesign/templates",
                    },
                    "background" : {
                        "title": __( "Background", "authpress" ),
                        "url":"/settings/customizer/redesign/background",
                    },
                    "logo" : {
                        "title": __( "Logo", "authpress" ),
                        "url":"/settings/customizer/redesign/logo",
                    },
                    "form" : {
                        "title": __( "Form", "authpress" ),
                        "url":"/settings/customizer/redesign/form",
                    },
                    "fields" : {
                        "title": __( "Fields", "authpress" ),
                        "url":"/settings/customizer/redesign/fields",
                    },
                    "button" : {
                        "title": __( "Button", "authpress" ),
                        "url":"/settings/customizer/redesign/button",
                    },
                    "other" : {
                        "title": __( "Other", "authpress" ),
                        "url":"/settings/customizer/redesign/other",
                    },
                }
            },
            "additional_fields" : {
                "title": __( "Additional Fields", "authpress" ),
                "url":"/settings/customizer/additional_fields",
            },
            "settings" : {
                "title": __( "Settings", "authpress" ),
                "url":"/settings/customizer/settings",
            }
        }
    },
    "security": { 
        "title": __( "Security", "authpress" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "authpress" ), 
        "url":"/settings/security"
    },
    "two_fa_authentication": { 
        "title": __( "2FA Authentication", "authpress" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "authpress" ), 
        "url":"/settings/two_fa_authentication"
    },
    "password_less_authentication": { 
        "title": __( "Passwordless Authentication", "authpress" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "authpress" ), 
        "url":"/settings/password_less_authentication"
    },
    "base_input": { 
        "title": __( "Base Input", "authpress" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "authpress" ), 
        "url":"/settings/base_input"
    },
    'array_input': {
        "title": __( "Array Input", "authpress" ),
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "authpress" ), 
        "url":"/settings/array_input",
    },
    "datatable": { 
        "title": __( "Datatable", "authpress" ), 
        "url":"/settings/datatable",      
        "sub": {
            "basic_table" : {
                "title": __( "Basic Table", "authpress" ),                
                "url":"/settings/datatable/basic_table",
            },
            "ajax_table" : {
                "title": __( "Ajax table", "authpress" ),
                "url":"/settings/datatable/ajax_table",
            }
        }
    },
    "components": { 
        "title": __( "Components", "authpress" ), 
        "url":"/settings/components",      
        "sub": {
            "basic" : {
                "title": __( "Basic", "authpress" ),                
                "url":"/settings/components/basic",
            },
            "advanced" : {
                "title": __( "Advanced", "authpress" ),
                "url":"/settings/components/advanced",
                "sub": {
                    "wordpress" : {
                        "title": __( "WordPress", "authpress" ),                
                        "url":"/settings/components/advanced/wordpress",
                    },
                    "custom" : {
                        "title": __( "Custom", "authpress" ),
                        "url":"/settings/components/advanced/custom",                        
                    }
                }
            }
        }
    },
    "import_export": { 
        "title": __( "Import & Expport", "authpress" ), 
        "description": __( "Import and Export your settings.", "authpress" ), 
        "url":"/settings/import_export"
    },
    "more": { 
        "title": __( "More", "authpress" ), 
        "description": __( "Adding more features to your Store.", "authpress" ), 
        "url":"/settings/more"
    },
    "feedback": { 
        "title": __( "Feedback", "authpress" ), 
        "description": __( "We\'re constantly enhancing our product, and your feedback is key to staying ahead of the curve and delivering a stronger, more reliable security solution for you.", "authpress" ), 
        "url":"/settings/feedback"
    },
};


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
