export class Comment {
    id: number;
    userId: number;
    title: string;
    body: string;
    created_at: string;

    constructor(){
        this.id = 0;
        this.title = '';
        this.body = '';
    }
}