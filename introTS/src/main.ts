class Service {
    constructor(){ }

    getStudents(){
        return []
    }
}
const service = new Service;

interface Student  {
    name: string;
    age: number;
    cpf: string;
    discipline: string;
}

function getStudents(): Student[] {
    return service.getStudents();
}

function getStudents2(): any {

}