import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import theme from "./theme"
import {MuiThemeProvider} from "@material-ui/core/styles/index";
import QRCode from 'qrcode.react';
import Layout from "./components/layout";
import {Divider} from "@material-ui/core/es/index";


ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<App/>
	</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();



function ready(_window,callback){
	// in case the document is already rendered
	if (_window.document.readyState!='loading') callback();
	// modern browsers
	else if (_window.document.addEventListener) _window.document.addEventListener('DOMContentLoaded', callback);
	// IE <= 8
	else _window.document.attachEvent('onreadystatechange', function(){
			if (_window.document.readyState=='complete') callback();
		});
}

window.PrintElem = function(tokens){
	var printWindow = window.open('/print.html', 'PRINT', 'height=800,width=1024');
	class Print extends React.Component{
		componentDidMount(){
			setTimeout(function () {
				printWindow.print();
				printWindow.close();
			}, 1000);
		}
		render(){
			return <div><div style={{margin:"auto", width:1000}}>{
				this.props.tokens.map((item, i)=>{
					return <div key={i} style={{margin:"auto", width:900}}>
						<Layout>
							<div style={{width:400, margin:10, position:"relative", media:"print"}}>
								<img src={"/plastic-card-01.png"} style={{width:400}} ></img>
								<QRCode value={item._id} style={{left:33, top:148, position:"absolute", height:53, width:53}}/>
							</div>
							<div style={{width:400, margin:10, position:"relative", media:"print"}}>
								<img src={"/plastic-card-02.png"} style={{width:400}}></img>
							</div>
						</Layout>
						{(i+1)%5==0 && <p style={{"pageBreakAfter": "always"}}/>}
					</div>
				})
			}</div></div>
		}
	}

	printWindow.onload = ()=>{
		ReactDOM.render( <Print tokens={tokens}/>, printWindow.document.getElementById("root"));
	}
}