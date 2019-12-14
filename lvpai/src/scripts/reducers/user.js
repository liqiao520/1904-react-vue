
import immutable from "immutable";

const defaultState = immutable.fromJS({
    mobile:null,
    token:"",
    // pic:JSON.parse(localStorage.userInfo).path
})

export const user = (state=defaultState,action)=>{
    switch(action.type){

        case "getUserMobile":
        return state.set("mobile",action.payload);
        break;

        case "getMyPic":
        return state.set("pic",action.payload);
        break;
        
        default:
        return state;
        break;
    }
}