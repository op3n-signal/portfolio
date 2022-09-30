export interface Blog {
        title: string, 
        category: string,
        article: string,
        month: number,
        day: number,
        year: number,
        img: string,
        id?: number,
        when?: string
}

//get when from local var and assign to blog when I get when it was uploaded
//get sample text from article by use slice on a certain length
// now try to get data and put in blog component and put eveything back how it was
//then find a way to host this site with php back-end