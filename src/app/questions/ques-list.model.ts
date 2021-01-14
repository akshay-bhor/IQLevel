export class QuesList {
    
    constructor(
        public qid: number,
        public cat: string,
        public questiontype: number,
        public slug: string,
        public queimg?: [],
        public question?: string
    ) {}
}