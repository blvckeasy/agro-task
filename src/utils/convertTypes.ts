export class convertTypes {
    static classToPlainObject (classInstance: any) {
        const objData: object = JSON.parse(JSON.stringify(classInstance));
        return objData;
    }
}