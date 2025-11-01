import { __ } from "@wordpress/i18n";
import React, {useState, useMemo} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from './withForm';
import { 
    ToggleControl,    
    MenuGroup, 
    MenuItem,
} from '@wordpress/components';
const Two_FA = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [open, setOpen] = useState(null);
    return (
        <>
            <div className="setting-unit border-bottom py-4">
                <div className="row justify-content-between">
                    <div className="col-lg-7">
                        {
                            settingLoading 
                            ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                            : <h4>{__("Enable Two FA", "authpress")}</h4>
                        }
                        {
                            settingLoading 
                            ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                            : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                        }
                    </div>    
                    {
                        !settingLoading &&  
                        <div className="col-auto">     
                            <ToggleControl
                                __nextHasNoMarginBottom
                                onChange={(value) => handleChange('two_fa_authentication.settings.enabled', value)}
                                checked={ settingData?.two_fa_authentication?.settings?.enabled }
                            />      
                        </div>
                    }
                </div>
            </div>
            
            <div
                className="myplugin-horizontal-menu"
                style={{ display: 'flex', gap: '1rem', position: 'relative' }}
            >
                <MenuGroup>
                    <div style={{ position: 'relative' }}>
                        <MenuItem
                            onClick={() =>
                                setActiveSubmenu(activeSubmenu === 'home' ? null : 'home')
                            }
                        >
                            Home
                        </MenuItem>
                        {activeSubmenu === 'home' && (
                            <div
                                className="submenu"
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    background: '#fff',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                                }}
                            >
                                <MenuItem>Overview</MenuItem>
                                <MenuItem>Updates</MenuItem>
                            </div>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                        <MenuItem
                            onClick={() =>
                                setActiveSubmenu(activeSubmenu === 'about' ? null : 'about')
                            }
                        >
                            About
                        </MenuItem>
                        {activeSubmenu === 'about' && (
                            <div
                                className="submenu"
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    background: '#fff',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                                }}
                            >
                                <MenuItem>Team</MenuItem>
                                <MenuItem>History</MenuItem>
                            </div>
                        )}
                    </div>
                </MenuGroup>
            </div>
            <hr />
            <div
			className="myplugin-vertical-menu"
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '200px',
			}}
		>
			<MenuGroup>
				<MenuItem
					onClick={() => setOpen(open === 'settings' ? null : 'settings')}
				>
					Settings
				</MenuItem>
				{open === 'settings' && (
					<div style={{ marginLeft: '1rem' }}>
						<MenuItem>General</MenuItem>
						<MenuItem>Advanced</MenuItem>
					</div>
				)}

				<MenuItem onClick={() => setOpen(open === 'help' ? null : 'help')}>
					Help
				</MenuItem>
				{open === 'help' && (
					<div style={{ marginLeft: '1rem' }}>
						<MenuItem>Docs</MenuItem>
						<MenuItem>Support</MenuItem>
					</div>
				)}
			</MenuGroup>
		</div>

        </>
    )
}
export default withForm(Two_FA);