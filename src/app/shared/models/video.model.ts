export class Video {
    constructor(
        public src: string, 
        public length: string,
        public when: string,
        public year: number,
        public month: number,
        public day: number,
        public title: string,
        public date: Date,
        public views: number,
        public poster?: string) {}
}

export class VideoFrame {
    constructor(public name: string, public frames: string[]) {}
}