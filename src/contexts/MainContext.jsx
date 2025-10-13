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
        "url":"/settings/security",
        "sub": {
            "password_policy" : {
                "title": __( "Password policy", "authpress" ),                
                "url":"/settings/security/password_policy",
                "description": __( "Below you will find a list of advance security options related to login of your WordPress site that reinforces the integrity of your site. All the features add common security implementation and can easily be implemented via easy to understand customization options.", "authpress" ), 
            },
            "active_logins" : {
                "title": __( "Active Logins", "authpress" ),
                "url":"/settings/security/active_logins",
                "description": __( "Easily manage and monitor login sessions for your users with advanced controls to enhance security and prevent unauthorized access.", "authpress" ), 
            },
            "anti_bot" : {
                "title": __( "Anti Bot", "authpress" ),
                "url":"/settings/security/anti_bot",
                "description": __( "Protect your sensitive information with cutting-edge security measures designed to safeguard your website. Implement robust encryption, prevent unauthorized access, and block potential threats before they arise. Whether it's user data, transaction details, or confidential content, ensure your information remains private, secure, and uncompromised at all times.", "authpress" ), 
            },
            "brute_force" : {
                "title": __( "Brute Force", "authpress" ),
                "url":"/settings/security/brute_force",
                "description": __( "Limit the number of login attempts to prevent brute-force attacks and ensure the security of your login process.", "authpress" ),             
            },
            "blacklist_manager" : {
                "title": __( "Blacklist Manager", "authpress" ),
                "url":"/settings/security/blacklist_manager",
                "description": __( "Limit the number of login attempts to prevent brute-force attacks and ensure the security of your login process.", "authpress" ), 
            }
        }
    },
    "two_fa_authentication": { 
        "title": __( "2FA Authentication", "authpress" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "authpress" ), 
        "url":"/settings/two_fa_authentication",
        "sub": {
            "email_otp" : {
                "title": __( "Email OTP", "authpress" ),                
                "url":"/settings/two_fa_authentication/email_otp",
                "description": __( "Below you will find a list of advance security options related to login of your WordPress site that reinforces the integrity of your site. All the features add common security implementation and can easily be implemented via easy to understand customization options.", "authpress" ), 
            },
            "totp" : {
                "title": __( "TOTP", "authpress" ),                
                "url":"/settings/two_fa_authentication/totp",
                "description": __( "TOTP (time based - most common algorithm; used by Google Authenticator)", "authpress" ), 
            },
            "hotp" : {
                "title": __( "HOTP", "authpress" ),                
                "url":"/settings/two_fa_authentication/hotp",
                "description": __( "TOTP (event based - most common algorithm; used by Google Authenticator)", "authpress" ), 
            },
            "fixed_otp" : {
                "title": __( "Fixed OTP", "authpress" ),                
                "url":"/settings/two_fa_authentication/fixed_otp",
                "description": __( "Dynamically generated fixed OTP", "authpress" ), 
            },
        }
    },
    "password_less_authentication": { 
        "title": __( "Passwordless Authentication", "authpress" ), 
        "description": __( "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quisquam non velit recusandae maxime, soluta labore id dignissimos tenetur, vitae nesciunt? Aspernatur nemo velit veniam adipisci obcaecati impedit alias, officiis hic ratione perspiciatis, quo molestiae expedita? Aliquam, quam dolorem? Similique enim minus error tempore necessitatibus dolorum quidem modi maiores suscipit.", "authpress" ), 
        "url":"/settings/password_less_authentication",
        "sub": {
            "otl" : {
                "title": __( "OTL", "authpress" ),                
                "url":"/settings/password_less_authentication/otl",
                "description": __( "Below you will find a list of advance security options related to login of your WordPress site that reinforces the integrity of your site. All the features add common security implementation and can easily be implemented via easy to understand customization options.", "authpress" ), 
            },
            "social_login" : {
                "title": __( "Social Login", "authpress" ),                
                "url":"/settings/password_less_authentication/social_login",
                "description": __( "Below you will find a list of advance security options related to login of your WordPress site that reinforces the integrity of your site. All the features add common security implementation and can easily be implemented via easy to understand customization options.", "authpress" ), 
            },
            "qr_code" : {
                "title": __( "QR Code", "authpress" ),                
                "url":"/settings/password_less_authentication/qr_code",
                "description": __( "Below you will find a list of advance security options related to login of your WordPress site that reinforces the integrity of your site. All the features add common security implementation and can easily be implemented via easy to understand customization options.", "authpress" ), 
            },
            "puzzel" : {
                "title": __( "Puzzel Login", "authpress" ),                
                "url":"/settings/password_less_authentication/puzzel",
                "description": __( "Below you will find a list of advance security options related to login of your WordPress site that reinforces the integrity of your site. All the features add common security implementation and can easily be implemented via easy to understand customization options.", "authpress" ), 
            },
        }
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
    "tools": { 
        "title": __( "Tools", "authpress" ), 
        "description": __( "Adding more features to your Store.", "authpress" ), 
        "url":"/settings/tools"
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
