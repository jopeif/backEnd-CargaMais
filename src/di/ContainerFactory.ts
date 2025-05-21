import { Container } from "./Container";

export class ContainerFactory{
    public static instance:Container | null

    public static getContainer(){
        if(!this.instance){
            this.instance=new Container
        }
        return this.instance
    }
}