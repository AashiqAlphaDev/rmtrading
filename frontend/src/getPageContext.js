import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

const primaryColor = "#2196f3"

const theme = createMuiTheme({
    palette:{
        primary:{
            main:primaryColor
        }
    },
    typography:{
        fontFamily:'Open Sans'
    },
    props:{
        MuiButton:{
            disableRipple: true,
            elevation:0
        },
        MuiAppBar:{
            elevation:0
        },
        MuiCheckbox:{
            disableRipple: true,
        },
        MuiSwitch:{
            disableRipple: true,
        },
        MuiInput:{
            disableUnderline:true
        },
        MuiTab:{
            disableRipple:true
        },
        MuiInputLabel:{
            shrink:true
        }

    },
    overrides:{
        MuiTabs:{
            indicator:{
	            display:"none"
            }
        },
        MuiTab:{
            root:{
                // textTransform:"none"
            },
	        selected:{
	            color:primaryColor
            }
        },
        MuiButton:{
            root:{
                textTransform: 'none',
                borderRadius: 4,
                fontSize: 16,
                padding: '6px 12px'
            },
            raised:{
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                }
            },
            fab:{
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                }
            },

        },
        MuiInputLabel:{
            root:{
                marginLeft:5,
                paddingBottom:5
            }
        },
        MuiAppBar:{
            root:{
                boxShadow: '0px 0px 24px rgba(0,0,0,0.2)',
                //borderBottom: "1px solid #e8e8e8"
            }
        },
        MuiPopover:{
            paper:{
                boxShadow: 'none',
                border: "1px solid #e8e8e8"
            }
        },
        MuiDialog:{
            paper:{
                boxShadow: 'none',
                border: "1px solid #e8e8e8"
            }
        },
        MuiExpansionPanel:{
            root:{
                boxShadow: 'none',
                border: "1px solid #e8e8e8"
            }
        },
        MuiInput:{
            input:{
                padding:10,
                borderRadius:4,
	            background: '#FFF',
                border: "2px solid #e8e8e8",
                '&:focus':{
                    borderRadius:4,
                    borderColor:primaryColor
                }
            }
        },
        MuiList:{
            padding:{
                padding:0
            }
        },
        MuiSwitch:{
            icon:{
                boxShadow: 'none',
                border: "1px solid #e8e8e8"
            },
            iconChecked:{
                boxShadow: 'none',
                border: "1px solid #e8e8e8"
            }
        },


    }
});


function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
    };
}

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }

    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext();
    }

    return global.__INIT_MATERIAL_UI__;
}