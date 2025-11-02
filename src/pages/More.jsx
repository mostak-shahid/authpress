import { __ } from "@wordpress/i18n";
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { 
    ToggleControl
} from '@wordpress/components';

import AceEditor from "react-ace";
// Load modes and theme
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
const More = ({handleChange}) => {
    const {
        settingData,
        settingLoading,
    } = useMain();
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Enable Scripts", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Enable/Disable \"Scripts\" functionalities", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-auto">
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(value) => handleChange('more.enable_scripts', value)}
                                checked={ settingData?.more.enable_scripts }
                            />  
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("CSS Editor", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Add any custom CSS code if necessary", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-12 mt-2">
                            <AceEditor
                                mode="css"
                                theme="monokai"
                                value={settingData?.more?.css}
                                onChange={(value) => handleChange("more.css", value)}
                                name="css-editor"
                                width="100%"
                                height="200px"
                                editorProps={{ $blockScrolling: true }}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("JavaScript Editor", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Add any custom JS code if necessary", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-12 mt-2">
                            <AceEditor
                                mode="javascript"
                                theme="monokai"
                                value={settingData?.more?.js}
                                onChange={(value) => handleChange("more.js", value)}
                                name="js-editor"
                                width="100%"
                                height="200px"
                                editorProps={{ $blockScrolling: true }}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Header Code", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("This code will be placed inside <head> tag", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-12 mt-2">
                            <AceEditor
                                mode="html"
                                theme="monokai"
                                value={settingData?.more?.header_content}
                                onChange={(value) => handleChange("more.header_content", value)}
                                name="html-editor-1"
                                width="100%"
                                height="200px"
                                editorProps={{ $blockScrolling: true }}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className="setting-unit pt-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Footer Code", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("This code will be placed inside <body> tag", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&                               
                        <div className="col-lg-12 mt-2">
                            <AceEditor
                                mode="html"
                                theme="monokai"
                                value={settingData?.more?.footer_content}
                                onChange={(value) => handleChange("more.footer_content", value)}
                                name="html-editor-2"
                                width="100%"
                                height="200px"
                                editorProps={{ $blockScrolling: true }}
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default withForm(More, 'more');