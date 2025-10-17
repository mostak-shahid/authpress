import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import './MediaUploaderControl.scss';
import { Button, TextControl, Dashicon } from '@wordpress/components';
export default function MediaUploaderControl({ data, name, handleChange, options={}, className='' }) {    
    const [media, setMedia] = useState({});

    useEffect(()=> {
        setMedia(data)
    },[data])
    const runUploader = (event) => {
        let frame
        event.preventDefault()

        // If the media frame already exists, reopen it.
        if (frame) {
            frame.open()
            return
        }

        // Create a new media frame
        frame = wp.media({
            title: options?.frame?.title || __("Select or Upload Image", "authpress"),
            button: {
                text: options?.buttons?.select || __("Use this image", "authpress"),
            },
            multiple: false, // Set to true to allow multiple files to be selected
            library: options?.library || {type: 'image'},
        })
        frame.on("open", function() {
			let selection = frame.state().get('selection');
			let attachment = wp.media.attachment(media?.id);
			selection.add(attachment ? [attachment] : []);
			/*
			let ids = []; // array of IDs of previously selected files. You're gonna build it dynamically
			ids.forEach(function(id) {
			  let attachment = wp.media.attachment(id);
			  selection.add(attachment ? [attachment] : []);
			}); // would be probably a good idea to check if it is indeed a non-empty array
			*/
		});
        frame.on("select", function(){
            var media = frame.state().get("selection").first().toJSON();
            var thumbnail = (media?.sizes?.thumbnail?.url)?media.sizes.thumbnail.url:media.thumb.src;
            setMedia({id:media.id, url:media.url, thumbnail:thumbnail});
            handleChange(name, {id:media.id, url:media.url, thumbnail:thumbnail});
        });	

        // Finally, open the modal on click
        frame.open()
    }
    const removeImage  = (event) => {
        event.preventDefault();
        setMedia({id:0, url:''});
        handleChange(name, {id:0, url:'', thumbnail:''});
    }
    return (
        <>
            {/* {console.log(data)} */}
            <div className={`authpress-media-uploader-unit ${className}`}>
                <div className="media-uploader row align-items-center">
                    <div className="col-6">
                        { media?.url && media?.id ?                     
                            <div className="file-name background-primary with-close-button">
                                <img className="uploaded-image" src={media?.thumbnail} onClick={runUploader} />                                
                                <Dashicon className="authpress-remove-image text-danger" onClick={removeImage} icon="remove" />
                            </div> : 
                            <div className="file-name background-primary d-flex align-items-center justify-content-center" onClick={runUploader}>
                                <div className="no-media-wrap">
                                    <div className="img-wrap">
                                        <Dashicon icon="cloud-upload" />
                                    </div>  
                                    <div className="text-wrap">
                                        <span className="title">{__("Upload Media", "authpress")}</span>
                                        <span className="sub-title">{__("Use the upload button", "authpress")} <br/> {__("and select media  ", "authpress")}</span>
                                    </div> 

                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-6">
                        <div className="file-detail">
                            <div className="button-wrapper d-flex flex-column gap-2">
                                <Button
                                    variant="primary"
                                    onClick={ runUploader }
                                    className='justify-content-center'
                                >
                                    {options?.buttons?.upload || __("Upload Image", "authpress")}
                                </Button>    
                                <Button
                                    variant="secondary"
                                    onClick={ removeImage }
                                    className='justify-content-center'
                                >
                                    {options?.buttons?.remove || __("Remove Image", "authpress")}
                                </Button>      
                                <div className="file-link">                                                                     
                                    <TextControl
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                        // label="Additional CSS Class"
                                        value={ media?.url? media.url:'' }
                                        readOnly
                                        // onChange={ ( value ) => setClassName( value ) }
                                    />
                                    <input type="hidden" value={media?.id? media.id:''} readOnly/>
                                    {
                                        options?.message?.info && 
                                        <div className="input-help mt-small"  dangerouslySetInnerHTML={{__html: options.message.info}} />
                                    }                                    
                                </div>                                                  
                            </div>
                        </div> 
                    </div>                   
                </div>
            </div>
        </>        
    )
}
/*
// Uses
<MediaUploaderControl 
    data={settingData?.elements?.advanced?.media_uploader} 
    name='elements.advanced.media_uploader' 
    handleChange={handleChange}
    options = {{
        frame:{
            title: __("Select or Upload Image", "authpress"),
        },
        library: {type: 'image'},
        buttons: {
            upload: __("Upload Image", "authpress"),
            remove: __("Remove", "authpress"),
            select: __("Use this image", "authpress")                                            
        }
    }}
/>
*/