import {observable,action,computed} from "mobx";
import {axios} from "~";

class   Details{
    @observable detail=[]
    @observable  goods=[]
    @observable  good=[]

    @action getDetail=(goods_id)=>{
        console.log(goods_id)
        axios.get("/react/getGood",{
     
            params:{
                goods_id
            }
        
        }).then(res=>{
          
            this.detail=res.data.result
            this.goods=res.data.result.goods_img
            this.good=res.data.result.goods_descs
        })
    }

  

   
}

export default new Details();