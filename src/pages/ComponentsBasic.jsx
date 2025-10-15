import '@coreui/icons/css/all.css';
import { __ } from "@wordpress/i18n";
import React, {useState} from 'react';
import { useMain } from '../contexts/MainContext';
import withForm from '../pages/withForm';
import { 
    Panel, 
    PanelBody, 
    AlignmentMatrixControl, 
    AnglePickerControl,
    BorderBoxControl,
    BorderControl,
    BoxControl,
    // Button
    Button, 
    ButtonGroup,
    ClipboardButton,
    Composite,
    DatePicker,
    DateTimePicker,
    // Button
    // Card
    Card,
    CardHeader,
    CardBody,
    CardMedia,
    CardDivider,
    CardFooter,
    // Card
    // Form Elements
    CheckboxControl,
    TextControl,
    CustomSelectControl,
    FormFileUpload,
    FormToggle,
    // Form Elements
    // Color
    ColorIndicator,
    ColorPalette,
    ColorPicker,
    DuotonePicker, 
    DuotoneSwatch,
    GradientPicker,
    // Color
    ComboboxControl,
    Dashicon,
    Draggable,
    DropZone,
    //Menu
    DropdownMenu, 
    MenuGroup, 
    MenuItem,
    MenuItemsChoice,
    Dropdown,
    __experimentalItemGroup as ItemGroup,
    __experimentalItem as Item,
    //Menu
    ExternalLink,
    // Flex
    Flex, 
    FlexBlock, 
    FlexItem,
    // Flex
    FocalPointPicker,
    FocusableIframe,
    FontSizePicker,

    FormTokenField,
    Guide,
    navigateRegions,
    IsolatedEventContainer,
    Modal,
    NavigableMenu,
    TabbableContainer,
    Navigator,
    Notice,

    __experimentalInputControl as InputControl,
    __experimentalText as Text,
    __experimentalHeading as Heading,
    __experimentalConfirmDialog as ConfirmDialog,
    __experimentalDimensionControl as DimensionControl,
    __experimentalDivider as Divider,
        __experimentalElevation as Elevation,
    __experimentalSurface as Surface,
    __experimentalGrid as Grid,
    __experimentalHStack as HStack,
    __experimentalNavigation as Navigation,
    __experimentalNavigationGroup as NavigationGroup,
    __experimentalNavigationItem as NavigationItem,
    __experimentalNavigationMenu as NavigationMenu,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { Icon, more, envelope, rotateRight, check, arrowUp, arrowDown, trash } from '@wordpress/icons'; // Example icon
import { UNITS, GRADIENTS, COLORS, DUOTONE_PALETTE, COLOR_PALETTE, DEFAULT_BORDER, FONT_SIZES } from '../lib/Constants';

const ComponentsBasic = ({handleChange}) => {
    const {
        settingData,
        settingLoading
    } = useMain();
    const [ processing, setProcessing ] = useState('normal');
    const [ alignment, setAlignment ] = useState( 'center center' );
    const [ angle, setAngle ] = useState( 0 );
    const [ borders, setBorders ] = useState( {
        top: DEFAULT_BORDER,
        right: DEFAULT_BORDER,
        bottom: DEFAULT_BORDER,
        left: DEFAULT_BORDER,
    } );
    const [ border, setBorder ] = useState();
    const [ values, setValues ] = useState( {
        top: '50px',
        left: '10%',
        right: '10%',
        bottom: '50px',
    } );
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ isChecked, setChecked ] = useState( true );
    const [ hasCopied, setHasCopied ] = useState( false );
    const [ color, setColor ] = useState ( '#f00' );
    const [ duotone, setDuotone ] = useState( [ '#000000', '#ffffff' ] );
    const [ gradient, setGradient ] = useState( null );

    
    //ComboboxControl
    const options = [
        { value: 'small', label: 'Small' },
        { value: 'normal', label: 'Normal' },
        { value: 'large', label: 'Large' },
    ];
    const [ fontSize, setFontSize ] = useState('');
    const [ filteredOptions, setFilteredOptions ] = useState( options );
    const [ isLoading, setIsLoading ] = useState(false);

    //ComboboxControl
    // CustomSelectControl
    const optionsCustomSelectControl = [
        {
            key: 'small',
            name: 'Small',
            style: { fontSize: '50%' },
        },
        {
            key: 'normal',
            name: 'Normal',
            style: { fontSize: '100%' },
        },
        {
            key: 'large',
            name: 'Large',
            style: { fontSize: '200%' },
        },
        {
            key: 'huge',
            name: 'Huge',
            style: { fontSize: '300%' },
        },
    ];
    // CustomSelectControl
    const [ paddingSize, setPaddingSize ] = useState( '' );
    const [ hasDropped, setHasDropped ] = useState( false );

    // FocalPointPicker
    const [ focalPoint, setFocalPoint ] = useState( {
        x: 0.5,
        y: 0.5,
    } );

    const url = `${authpress_ajax_obj.image_url}feedback.jpg`; // Example image URL

    /* Example function to render the CSS styles based on Focal Point Picker value */
    const style = {
        backgroundImage: `url(${ url })`,
        backgroundPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`,
    };
    // FocalPointPicker
    // const [ fontSize, setFontSize ] = useState( 12 );
    const fallbackFontSize = 12;

    // FormTokenField
    const continents = [
        'Africa',
        'America',
        'Antarctica',
        'Asia',
        'Europe',
        'Oceania',
    ];
    const [ selectedContinents, setSelectedContinents ] = useState( [] );
    // FormTokenField
    const [ isOpen, setIsOpen ] = useState( true );
    const [ value, setValue ] = useState( '' );
    // MenuGroup
    const [ mode, setMode ] = useState( 'visual' );
    const choices = [
        {
            value: 'visual',
            label: 'Visual editor',
        },
        {
            value: 'text',
            label: 'Code editor',
        },
    ];
    // MenuGroup

    // Modal
    const [ modalOpen, setModalOpen ] = useState( false );
    const openModal = () => setModalOpen( true );
    const closeModal = () => setModalOpen( false );
    // Modal


    const onNavigate = ( index, target ) => {
        console.log( `Navigates to ${ index }`, target );
    }


    const handleButtonClick = () => {
        setProcessing('processing');
        // Simulate an async operation (e.g., form submission)
        setTimeout(() => {
            setProcessing('done');
            // Reset to normal state after a short delay
            setTimeout(() => {
                setProcessing('normal');
            }, 2000);
        }, 3000);
    }
    const clickHandler = () => {
        console.log('xyz')
    }
    return (
        <>
            <h4>{__("Grid", "authpress")}</h4>
            <Panel>
                <PanelBody title={__('AlignmentMatrixControl', 'authpress')} initialOpen={ true }>                    
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("AlignmentMatrixControl", "authpress")}</h4>
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
                                    <AlignmentMatrixControl
                                        value={ alignment }
                                        onChange={ setAlignment }
                                    />                           
                                </div>
                            }
                        </div>
                    </div>                    
                </PanelBody>
                <PanelBody title={__('AnglePickerControl', 'authpress')} initialOpen={ false }>                    
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("AnglePickerControl", "authpress")}</h4>
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
                                    <AnglePickerControl
                                        value={ angle }
                                        onChange={ setAngle }
                                    />                          
                                </div>
                            }
                        </div>
                    </div>                    
                </PanelBody>
                <PanelBody title={__('Border', 'authpress')} initialOpen={ false }>                    
                    <div className="setting-unit border-bottom py-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("BorderBoxControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <BorderBoxControl
                                        __next40pxDefaultSize
                                        colors={ COLORS }
                                        label={ __( 'Borders' ) }
                                        onChange={ ( newBorders ) => setBorders( newBorders ) }
                                        value={ borders }
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
                                    : <h4>{__("BorderControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <BorderControl
                                        __next40pxDefaultSize
                                        colors={ COLORS }
                                        label={ __( 'Border' ) }
                                        onChange={ setBorder }
                                        value={ border }
                                    />                      
                                </div>
                            }
                        </div>
                    </div>                    
                </PanelBody>
                <PanelBody title={__('BoxControl', 'authpress')} initialOpen={ false }>                    
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("BoxControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <BoxControl
                                        __next40pxDefaultSize
                                        values={ values }
                                        onChange={ setValues }
                                    />                        
                                </div>
                            }
                        </div>
                    </div>                    
                </PanelBody>
                <PanelBody title={__('Button', 'authpress')} initialOpen={ false }>                    
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ButtonGroup & Button", "authpress")}</h4>
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
                                    <ButtonGroup>
                                        <Button variant="primary">Button 1</Button>
                                        <Button variant="primary">Button 2</Button>
                                    </ButtonGroup>                      
                                </div>
                            }
                        </div>
                    </div>  
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Button", "authpress")}</h4>
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
                                    <Button
                                        isDestructive={ processing=='processing'?true:false } // Red button
                                        isBusy={ processing!='normal'?true:false  } // Show loading indicator
                                        disabled={ processing!='normal'?true:false } // Disable the button
                                        isPressed={ false } // Appear pressed, Become black  
                                        icon={ processing=='processing'?rotateRight:processing=='done'?check:envelope} // Button icon
                                        iconPosition="left" // Icon position (left, right)
                                        iconSize={ 20 } // Icon size
                                        size="medium" // Button size (small, medium, large)
                                        style={ { marginRight: '8px' } } // Custom styles
                                        className={processing=='processing'?'button-processing':'' } // Custom class name (button-processing)                  
                                        variant="primary"
                                        onClick={ handleButtonClick }
                                    >
                                        {
                                            processing == 'processing' ? __( "Sending...", "authpress" ) : __( "Send", "authpress" )
                                        }
                                    </Button>                    
                                </div>
                            }
                        </div>
                    </div>                   
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ClipboardButton", "authpress")}</h4>
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
                                    <ClipboardButton
                                        variant="primary"
                                        text="Text to be copied."
                                        onCopy={ () => setHasCopied( true ) }
                                        onFinishCopy={ () => setHasCopied( false ) }
                                    >
                                        { hasCopied ? 'Copied!' : 'Copy Text' }
                                    </ClipboardButton>                   
                                </div>
                            }
                        </div>
                    </div>                   
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Composite", "authpress")}</h4>
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
                                    <Composite>
                                        <Composite.Group>
                                            <Composite.GroupLabel>Label</Composite.GroupLabel>
                                            <Composite.Item>Item 1</Composite.Item>
                                            <Composite.Item>Item 2</Composite.Item>
                                        </Composite.Group>
                                    </Composite>                   
                                </div>
                            }
                        </div>
                    </div>     
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("NavigableMenu, TabbableContainer", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <div>
                                        <span>Navigable Menu:</span>
                                        <NavigableMenu onNavigate={ onNavigate } orientation="horizontal">
                                            <Button variant="secondary">Item 1</Button>
                                            <Button variant="secondary">Item 2</Button>
                                            <Button variant="secondary">Item 3</Button>
                                        </NavigableMenu>

                                        <span>Tabbable Container:</span>
                                        <TabbableContainer onNavigate={ onNavigate }>
                                            <Button variant="secondary" tabIndex="0">
                                                Section 1
                                            </Button>
                                            <Button variant="secondary" tabIndex="0">
                                                Section 2
                                            </Button>
                                            <Button variant="secondary" tabIndex="0">
                                                Section 3
                                            </Button>
                                            <Button variant="secondary" tabIndex="0">
                                                Section 4
                                            </Button>
                                        </TabbableContainer>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>                
                </PanelBody>
                <PanelBody title={__('Calendar', 'authpress')} initialOpen={ false }>                    
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DatePicker", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <DatePicker currentDate={ selectedDate } onChange={ setSelectedDate } />                    
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
                                    : <h4>{__("DateTimePicker", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">                                    
                                    <DateTimePicker
                                        currentDate={ selectedDate }
                                        onChange={ setSelectedDate }
                                        is12Hour={ true }
                                    />                    
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Card', 'authpress')} initialOpen={ false }>               
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Card", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">                                    
                                    <Card>
                                        <CardHeader>
                                            <Heading level={ 4 }>{__("CardHeader", "authpress")}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{__("CardBody", "authpress")}</Text>
                                        </CardBody>
                                        <CardFooter>
                                            <Text>{__("CardFooter", "authpress")}</Text>
                                        </CardFooter>
                                    </Card>                   
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
                                    : <h4>{__("Card with media and seperator", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">                                    
                                    <Card>
                                        <CardMedia>
                                            <img className="img-fluid" src={`${authpress_ajax_obj.image_url}default-login-right.png`} alt=""  />
                                        </CardMedia>
                                        <CardBody>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae eveniet quas vero ut perspiciatis doloribus?</CardBody>
                                        <CardDivider />
                                        <CardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia blanditiis fuga soluta adipisci, incidunt reiciendis beatae! Natus, deleniti molestias!</CardBody>
                                    </Card>                  
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Toggle', 'authpress')} initialOpen={ false }>                                               
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("CheckboxControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <CheckboxControl
                                        __nextHasNoMarginBottom
                                        label="Is author"
                                        help="Is the user a author or not?"
                                        checked={ isChecked }
                                        onChange={ setChecked }
                                    />  
                                    <hr/>
                                    <FormToggle
                                        checked={ isChecked }
                                        onChange={ () => setChecked( ( state ) => ! state ) }
                                    />               
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Color', 'authpress')} initialOpen={ false }>                                               
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ColorIndicator", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ColorIndicator colorValue={color} />                     
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ColorPalette", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ColorPalette
                                        colors={ COLORS }
                                        value={ color }
                                        onChange={ ( color ) => setColor( color ) }
                                    />                    
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ColorPicker", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ColorPicker
                                        color={color}
                                        onChange={setColor}
                                        enableAlpha
                                        defaultValue="#000"
                                    />                   
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DuotonePicker, DuotoneSwatch", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <>
                                        <DuotonePicker
                                            duotonePalette={ DUOTONE_PALETTE }
                                            colorPalette={ COLOR_PALETTE }
                                            value={ duotone }
                                            onChange={ setDuotone }
                                        />
                                        <Divider />
                                        <DuotoneSwatch values={ duotone } />
                                    </>                  
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("GradientPicker, DuotoneSwatch", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <GradientPicker
                                        value={ gradient }
                                        onChange={ ( currentGradient ) => setGradient( currentGradient ) }
                                        gradients={GRADIENTS}
                                        />                 
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('ComboboxControl', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ComboboxControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ComboboxControl
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                        label="Font Size"
                                        value={fontSize}
                                        onChange={setFontSize}
                                        isLoading={isLoading}
                                        options={filteredOptions}
                                        onFilterValueChange={(inputValue) => {
                                            setIsLoading(true);

                                            // Simulate async filtering (optional)
                                            setTimeout(() => {
                                                const filtered = options.filter((option) =>
                                                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                                                );
                                                setFilteredOptions(filtered);
                                                setIsLoading(false);
                                            }, 200);
                                        }}
                                    />                  
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('ConfirmDialog', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ConfirmDialog", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ConfirmDialog onConfirm={ () => console.debug( ' Confirmed! ' ) }>
                                        Are you sure? <strong>This action cannot be undone!</strong>
                                    </ConfirmDialog>  
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Form Elements', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("CustomSelectControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <CustomSelectControl
                                        __next40pxDefaultSize
                                        label="Font Size"
                                        options={ optionsCustomSelectControl }
                                        onChange={ ( { selectedItem } ) => setFontSize( selectedItem ) }
                                    />
                                    <hr /> 
                                    <CustomSelectControl
                                        __next40pxDefaultSize
                                        label="Font Size"
                                        options={ optionsCustomSelectControl }
                                        onChange={ ( { selectedItem } ) => setFontSize( selectedItem ) }
                                        value={ options.find( ( option ) => option.key === fontSize.key ) }
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
                                    : <h4>{__("InputControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <InputControl
                                        __next40pxDefaultSize
                                        value={ value }
                                        onChange={ ( nextValue ) => setValue( nextValue ?? '' ) }
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
                                    : <h4>{__("NumberControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <NumberControl
                                        __next40pxDefaultSize
                                        isShiftStepEnabled={ true }
                                        onChange={ setValue }
                                        shiftStep={ 10 }
                                        value={ value }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Icons', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Dashicon", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Dashicon icon="admin-home" />
                                    <Dashicon icon="products" />
                                    <Dashicon icon="wordpress" />
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('DimensionControl', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DimensionControl", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("'DimensionControl' is deprecated.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <DimensionControl
                                        __nextHasNoMarginBottom
                                        __next40pxDefaultSize
                                        label={ 'Padding' }
                                        icon={ 'desktop' }
                                        onChange={ ( value ) => setPaddingSize( value ) }
                                        value={ paddingSize }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Draggable', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Draggable", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Need usable example.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <div id="draggable-panel">
                                        <Panel header="Draggable panel">
                                            <PanelBody>
                                                <Draggable elementId="draggable-panel" transferData={ {} }>
                                                    { ( { onDraggableStart, onDraggableEnd } ) => (
                                                        <div
                                                            className="example-drag-handle"
                                                            draggable
                                                            onDragStart={ onDraggableStart }
                                                            onDragEnd={ onDraggableEnd }
                                                        >
                                                            <Icon icon={ more } />
                                                        </div>
                                                    ) }
                                                </Draggable>
                                            </PanelBody>
                                        </Panel>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('DropZone', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DropZone", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Need usable example", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <div>
                                        { hasDropped ? 'Dropped!' : 'Drop something here' }
                                        <DropZone
                                            onFilesDrop={ () => setHasDropped( true ) }
                                            onHTMLDrop={ () => setHasDropped( true ) }
                                            onDrop={ () => setHasDropped( true ) }
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Menu & Dropdown', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("DropdownMenu, MenuGroup, MenuItem", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <DropdownMenu icon={ more } label="Select a direction">
                                        { ( { onClose } ) => (
                                            <>
                                                <MenuGroup>
                                                    <MenuItem icon={ arrowUp } onClick={ onClose }>
                                                        Move Up
                                                    </MenuItem>
                                                    <MenuItem icon={ arrowDown } onClick={ onClose }>
                                                        Move Down
                                                    </MenuItem>
                                                </MenuGroup>
                                                <MenuGroup>
                                                    <MenuItem icon={ trash } onClick={ onClose }>
                                                        Remove
                                                    </MenuItem>
                                                </MenuGroup>
                                            </>
                                        ) }
                                    </DropdownMenu>
                                </div>
                            }
                        </div>
                    </div>                                 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Button, Dropdown", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Dropdown
                                        className="my-container-class-name"
                                        contentClassName="my-popover-content-classname"
                                        popoverProps={ { placement: 'bottom-start' } }
                                        renderToggle={ ( { isOpen, onToggle } ) => (
                                            <Button
                                                variant="primary"
                                                onClick={ onToggle }
                                                aria-expanded={ isOpen }
                                            >
                                                Toggle Popover!
                                            </Button>
                                        ) }
                                        renderContent={ () => <div>This is the content of the popover.</div> }
                                    />
                                </div>
                            }
                        </div>
                    </div>                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ItemGroup, Item", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    
                                    <ItemGroup>
                                        <Item>Code</Item>
                                        <Item>is</Item>
                                        <Item>Poetry</Item>
                                    </ItemGroup>
                                </div>
                            }
                        </div>
                    </div> 
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("MenuGroup, MenuItemsChoice", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">                                    
                                    <MenuGroup label="Editor">
                                        <MenuItemsChoice
                                            choices={ choices }
                                            value={ mode }
                                            onSelect={ ( newMode ) => setMode( newMode ) }
                                        />
                                    </MenuGroup>
                                </div>
                            }
                        </div>
                    </div>  
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Navigation, NavigationMenu", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("'Navigation' is deprecated. 'NavigationMenu' is deprecated. 'NavigationItem' is deprecated. 'NavigationGroup' is deprecated.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Navigation>
                                        <NavigationMenu title="Home">
                                            <NavigationGroup title="Group 1">
                                                <NavigationItem item="item-1" title="Item 1" />
                                                <NavigationItem item="item-2" title="Item 2" />
                                            </NavigationGroup>
                                            <NavigationGroup title="Group 2">
                                                <NavigationItem
                                                    item="item-3"
                                                    navigateToMenu="category"
                                                    title="Category"
                                                />
                                            </NavigationGroup>
                                        </NavigationMenu>

                                        <NavigationMenu
                                            backButtonLabel="Home"
                                            menu="category"
                                            parentMenu="root"
                                            title="Category"
                                        >
                                            <NavigationItem badge="1" item="child-1" title="Child 1" />
                                            <NavigationItem item="child-2" title="Child 2" />
                                        </NavigationMenu>
                                    </Navigation>
                                </div>
                            }
                        </div>
                    </div>                                 
                </PanelBody>
                <PanelBody title={__('Elevation, Surface', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Elevation, Surface", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Surface>
                                        <Text>Code is Poetry</Text>
                                        <Elevation value={ 5 } />
                                    </Surface>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('ExternalLink', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("ExternalLink", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <ExternalLink href="https://wordpress.org">WordPress.org</ExternalLink>

                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Flex, Grid, HStack', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Flex, FlexBlock, FlexItem", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Flex>
                                        <FlexItem>
                                            <p>Code</p>
                                        </FlexItem>
                                        <FlexBlock>
                                            <p>Poetry</p>
                                        </FlexBlock>
                                    </Flex>
                                    <Flex className="input-group-authpress">
                                        <FlexItem className="input-group-text">
                                            <span>{authpress_ajax_obj.home_url}/</span>
                                        </FlexItem>
                                        <FlexBlock>
                                            <TextControl
                                                __nextHasNoMarginBottom
                                                __next40pxDefaultSize
                                                // label="Additional CSS Class"
                                                value={ settingData?.customizer?.settings?.login_url }
                                                onChange={ ( value ) => handleChange('customizer.settings.login_url', value) }
                                            />
                                        </FlexBlock>
                                    </Flex> 
                                </div>
                            }
                        </div>
                    </div>                                     
                    <div className="setting-unit py-4 border-bottom">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Grid", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Grid columns={ 3 }>
                                        <Text>Code</Text>
                                        <Text>is</Text>
                                        <Text>Poetry</Text>
                                    </Grid>
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
                                    : <h4>{__("HStack", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <HStack>
                                        <Text>Code</Text>
                                        <Text>is</Text>
                                        <Text>Poetry</Text>
                                    </HStack>
                                </div>
                            }
                        </div>
                    </div>                                      
                </PanelBody>
                <PanelBody title={__('FocalPointPicker', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FocalPointPicker", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <>
                                        <FocalPointPicker
                                        __nextHasNoMarginBottom
                                            url={ url }
                                            value={ focalPoint }
                                            onDragStart={ setFocalPoint }
                                            onDrag={ setFocalPoint }
                                            onChange={ setFocalPoint }
                                        />
                                        <div style={ style } />
                                    </>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('FocusableIframe', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FocusableIframe", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FocusableIframe
                                        src="https://mostak-shahid.github.io/"
                                        onFocus={ () => console.log( 'iframe is focused' ) }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('FontSizePicker', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FontSizePicker", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FontSizePicker
                                        __next40pxDefaultSize
                                        fontSizes={ FONT_SIZES }
                                        value={ fontSize }
                                        fallbackFontSize={ fallbackFontSize }
                                        onChange={ ( newFontSize ) => {
                                            setFontSize( newFontSize );
                                        } }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('FormFileUpload', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FormFileUpload", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FormFileUpload
                                        __next40pxDefaultSize
                                        accept="image/*"
                                        onChange={ ( event ) => console.log( event.currentTarget.files ) }
                                    >
                                        Upload
                                    </FormFileUpload>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('FormTokenField', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("FormTokenField", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <FormTokenField
                                        __next40pxDefaultSize
                                        value={ selectedContinents }
                                        suggestions={ continents }
                                        onChange={ ( tokens ) => setSelectedContinents( tokens ) }
                                        __nextHasNoMarginBottom
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Guide', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Guide", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Guide
                                        onFinish={ () => setIsOpen( false ) }
                                        pages={ [
                                            {
                                                content: <p>Welcome to the ACME Store!</p>,
                                            },
                                            {
                                                image: <img src="https://acmestore.com/add-to-cart.png" />,
                                                content: (
                                                    <p>
                                                        Click <i>Add to Cart</i> to buy a product.
                                                    </p>
                                                ),
                                            },
                                        ] }
                                    />
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('IsolatedEventContainer', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("IsolatedEventContainer", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("IsolatedEventContainer is deprecated since version 5.7.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <IsolatedEventContainer
                                        className="component-some_component"
                                        onClick={ clickHandler }
                                    >
                                        <p>This is an isolated component</p>
                                    </IsolatedEventContainer>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Modal', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Modal", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, odio.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <>
                                        <Button variant="secondary" onClick={ openModal }>
                                            Open Modal
                                        </Button>
                                        { modalOpen && (
                                            <Modal title="This is my modal" onRequestClose={ closeModal }>
                                                <Button variant="secondary" onClick={ closeModal }>
                                                    My custom close button
                                                </Button>
                                            </Modal>
                                        ) }
                                    </>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Navigator', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Navigator", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("'Navigation' is deprecated. 'NavigationMenu' is deprecated. 'NavigationItem' is deprecated. 'NavigationGroup' is deprecated.", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Navigator initialPath="/">
                                        <Navigator.Screen path="/">
                                            <p>This is the home screen.</p>
                                            <Navigator.Button path="/child">
                                                Navigate to child screen.
                                            </Navigator.Button>
                                        </Navigator.Screen>
                                        <Navigator.Screen path="/child">
                                            <p>This is the child screen.</p>
                                            <Navigator.BackButton>Go back</Navigator.BackButton>
                                        </Navigator.Screen>
                                    </Navigator>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
                <PanelBody title={__('Notice', 'authpress')} initialOpen={ false }>                                              
                    <div className="setting-unit pt-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-7">
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton h4" style={{width: '60%'}}></div>
                                    : <h4>{__("Notice", "authpress")}</h4>
                                }
                                {
                                    settingLoading 
                                    ? <div className="loading-skeleton p" style={{width: '70%'}}></div>
                                    : <p>{__("status: warning | success | error | info", "authpress")}</p>
                                }
                            </div>    
                            {
                                !settingLoading &&                               
                                <div className="col-lg-5">
                                    <Notice status="error">An unknown error occurred.</Notice>
                                </div>
                            }
                        </div>
                    </div>                                     
                </PanelBody>
            </Panel>
            
        </>
    )
}
export default withForm(ComponentsBasic);