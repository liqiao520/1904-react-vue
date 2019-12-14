
import {observable,action,computed} from "mobx";
import {axios} from "~";

class   Homes{
    @observable homes=[]
    @observable liyu={}
    @observable lis=[]

    @action getHome=()=>{
        
      axios.get("/react/gethome",{
           
            }).then(res=>{
              
                this.homes=res.data.result.slice(0,4)
                this.lis=res.data.result.slice(4,6)
            })
      
        
    }

    @action getLiyu=()=>{
        axios.get("/react/getliyu",{
        
        }).then(res=>{
          
            this.liyu=res.data.result[0]
           
        })
    }

   
}

export default new Homes();