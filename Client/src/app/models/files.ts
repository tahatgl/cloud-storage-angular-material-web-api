export class Files {
    ID: number;
    UserID: number;
    FileNames: string;
    Names: string;
    ContentTypes: string;
    Description: string;
    file: File;

    constructor(file: File) {
        this.file = file;
    }
}