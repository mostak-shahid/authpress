import { __ } from '@wordpress/i18n';
// import axios from "axios";
import { createContext, useContext, useState } from "react";
// import { extractJSONFromHTML } from "../lib/Helpers";
// import menuData from "../data/pages.json"; // Load menu JSON
const MainContext = createContext();
const settingsMenu = {
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
                    "advanced-1" : {
                        "title": __( "Advanced 1", "authpress" ),                
                        "url":"/settings/components/advanced/advanced-1",
                    },
                    "advanced-2" : {
                        "title": __( "Advanced 2", "authpress" ),
                        "url":"/settings/components/advanced/advanced-2",                        
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
