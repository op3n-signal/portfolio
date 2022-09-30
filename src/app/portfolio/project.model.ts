export class Project {
    constructor(
        public title: string, 
        public imagePath: string[], 
        public siteUrl: string, 
        public data: string[],
        public langLogos: string[],
        public status?: string) {}
}