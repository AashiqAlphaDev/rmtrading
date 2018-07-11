import {createMuiTheme} from '@material-ui/core/styles';

const primaryColor = "#4a68e2";
const primaryDarkColor = "#1d2b58";
const accentColor = "#4a68e2";
//#

const theme = createMuiTheme({
	palette: {
		primary: {
			main: primaryColor,
			dark:primaryDarkColor
		},
		secondary: {
			main: accentColor
		}
	},
	typography: {
		fontFamily: 'Open Sans'
	},
	props: {
		MuiButton: {
			disableRipple: true,
			elevation: 0
		},
		MuiAppBar: {
			elevation: 0
		},
		MuiCheckbox: {
			disableRipple: true,
		},
		MuiSwitch: {
			disableRipple: true,
		},
		MuiInput: {
			disableUnderline: true
		},
		MuiTab: {
			disableRipple: true
		},
		MuiInputLabel: {
			shrink: true
		}

	},
	overrides: {
		MuiTabs: {
			indicator: {
				// display: "none"
			}
		},
		MuiTab: {
			root: {
				//textTransform: "none",
				//minHeight: "60px"
			},
			selected: {
				fontWeight:600,
				// color: accentColor
			},
		},
		MuiButton: {
			root: {
				// textTransform: 'none',
				borderRadius: 4,
				fontSize: 16,
				padding: '6px 12px'
			},
			raised: {
				boxShadow: 'none',
				'&:active': {
					boxShadow: 'none',
				}
			},
			fab: {
				boxShadow: 'none',
				'&:active': {
					boxShadow: 'none',
				}
			},

		},
		MuiInputLabel: {
			root: {
				marginLeft: 5,
				paddingBottom: 5
			}
		},
		MuiAppBar: {
			colorDefault: {
				backgroundColor: "#FFF"
			},
			root: {
				boxShadow: '0px 0px 16px rgba(0,0,0,0.05)',
				//borderBottom: "1px solid #e8e8e8"
			}
		},
		MuiPopover: {
			paper: {
				//boxShadow: 'none',
				boxShadow: '0px 0px 16px rgba(0,0,0,0.1)',
				// border: "1px solid #e8e8e8"
			}
		},
		MuiDialog: {
			paper: {
				boxShadow: 'none',
				border: "1px solid #e8e8e8"
			},
			paperWidthSm:{
				maxWidth:1024,
			}
		},
		MuiExpansionPanel: {
			root: {
				boxShadow: 'none',
				//border: "1px solid #e8e8e8"
			}
		},
		MuiInput: {
			input: {
				padding: 10,
				borderRadius: 4,
				background: '#FFF',
				border: "2px solid #e8e8e8",
				'&:focus': {
					borderRadius: 4,
					borderColor: primaryColor
				}
			}
		},
		MuiList: {
			padding: {
				padding: 0,
				paddingTop: 0,
				paddingBottom: 0
			}
		},
		MuiSwitch: {
			icon: {
				boxShadow: 'none',
				border: "1px solid #e8e8e8"
			},
			iconChecked: {
				boxShadow: 'none',
				border: "1px solid #e8e8e8"
			}
		},
	}
});

export default theme;
