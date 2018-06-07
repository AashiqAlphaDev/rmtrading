import React from "react";
import QrReader from 'react-qr-reader'


export default class extends React.Component {

    render() {
        return <div>
	        <QrReader
		        delay={500}
		        onError={console.error}
		        onScan={console.log}
		        style={{ width: 800, height:800 }}
	        />
        </div>

    }
}