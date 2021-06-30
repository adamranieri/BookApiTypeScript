
export default class ResourceNotFoundError{

    message:string

    constructor(public missingResourceId: number){
        this.message = `The Resource with the ID ${this.missingResourceId} could not be found`
    }

}