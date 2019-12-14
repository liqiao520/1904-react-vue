import immutable from "immutable";

const defaultState=immutable.fromJS({
   
    tab:'home',
    fenge:[],
    area:[],
    list:[],
    searchList:[]
})

export const data=(state=defaultState,action)=>{
      
    switch(action.type){
      
        case "changeTab":
            return  state.set('tab',action.tab);
            break;
        case "changeFen":
            return state.set("fenge",action.payload)
        
            break;
        case "changeArea":
            return state.set('area',action.payload);
            break;
        case "changeList":
            return state.set('list',action.payload);
            break;
        case "getSearchList":
            return state.set('searchList',action.payload);
            break;
        case "changeLists":
            return state.set('list',action.payload);
             break;
        case "changeListy":
            return state.set('list',action.payload);
            break;
            
        default:
            return state;
            break;
    }
}