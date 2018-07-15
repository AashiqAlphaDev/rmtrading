import React from "react"
import {withPetsWrap} from "./index";


let _Index =  class extends React.Component{
    render(){
        return <div>Sample</div>
    }
}

export default withPetsWrap(_Index);
