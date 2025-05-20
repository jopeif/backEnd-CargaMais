import { Container } from "./Container";

export class ContainerFactory{

    public static getContainer(){
        return new Container()
    }
}