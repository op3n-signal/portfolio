import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../shared/services/blog.service';
import { Blog } from '../../shared/models/blog.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-blog',
    templateUrl: 'blog.component.html',
    styleUrls: [`blog.component.scss`, `twoblog.component.scss`]
})

export class BlogComponent implements OnInit, OnDestroy {
    private getBlogs!: Subscription;
    private routerSub!: Subscription;
    blogs: Blog[] = [];
    categories: string[] = [
        'all',
        'how-to',
        'general'
    ];
    sortValues: string[] = [
        'recent',
        'oldest',
        'ascend',
        'descend'
    ];
    altRoute: boolean = false;
    query: string = '';
    snap!: ActivatedRouteSnapshot;
    disablePrevious: boolean = false;
    disableNext: boolean = false;
    page: string = '';
    openFilter: boolean = false;

    queries: {
        page: string,
        category: string,
        sort: string,
        search: string
    } = {
        page: '1',
        category: '',
        sort: '',
        search: ''
    }
    /* the state values of filter */
    filters: { 
        page: string, 
        category: string, 
        sort: string } = { 
            page: '1', 
            category: 'all', 
            sort: 'recent'};
   
    searchResult: {
        searched: boolean,
        found: boolean;
        resultPhrase: string,
        result: string
    } = {
        searched: false,
        found: false,
        resultPhrase: '',
        result: ''
    };
    errorQuery: RegExp = /[a-z]+%3F$/i;

    constructor(
        private blogService: BlogService,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.snap = this.route.snapshot;
        
        //checks to restore page to state before refresh
        this.onPageLoadChecks();
        //subscribing to blogs replay subject in service
        this.getBlogs = this.blogService.blogChuck.subscribe({ next: (v) => {
                if(v.length != 11) {
                    this.disableNext = true;
                } else {
                    v = v.slice(0, v.length - 1);
                    this.disableNext = false;
                }
                this.blogs = v[0].title == '?' ? [] : v;
                
            }
        });

        this.routerSub = this.router.events.pipe(filter((x: any) => x instanceof NavigationEnd)).subscribe((x: any) => {
            if(this.searchResult.searched == true && this.searchResult.found == false) {
                this.setSearchResult(false, false, '', ''); 
                if(this.queries.search != '')
                    this.queries.search = '';
            }
                
            //to show the filter or not on refresh
            if(this.filters.category != 'all' || this.filters.sort != 'recent') 
                this.openFilter = true;
            //checking if we are on the home blog page
            this.altRoute = !x.url.includes('/blog?page=') ? true : false;
            const catQuery = /general|all|how-to/;
            const sortQuery = /recent|oldest|ascend|descend/;
            
            if(this.queries.search == '') {
                if(x.url.match(/search/))
                    this.getBlogHelper(this.queries.page);
            }
            //here we check the url and handle it accordingly with the method needed
            if (this.queries.search == '' && !x.url.match(catQuery) && x.url.includes('/blog?page=')) {
                this.blogService.getBlogs(this.queries.page);
            }
            else if (x.url.match(catQuery)) {
                this.queries.category = x.url.match(catQuery)[0];

                if (x.url.match(sortQuery))
                    this.queries.sort = x.url.match(sortQuery)[0];

                if(this.queries.search == '') {
                    this.blogService.getFilteredBlogs(this.queries.page, this.queries.category, this.queries.sort);
                }   
                else {                    
                    if(x.url.match(this.errorQuery)) {
                        let searchQuery = x.url.match(this.errorQuery)[0];
                        this.setSearchResult(true, false, 'Nothing found for ', searchQuery.slice(0, searchQuery.length - 3));
                        this.queries.search = searchQuery;
                    } else {
                        this.blogService.search(this.queries.page, this.queries.search, this.queries.category, this.queries.sort);
                        this.setSearchResult(true, true, 'Showing results for ', this.queries.search);
                    }
                }      
            }
        });   
    }

    onPageLoadChecks(): void {   
        if(!this.snap.firstChild) {
            this.blogService.getBlogs();
        }
        else if(this.snap.queryParams.category) {
            if(this.snap.queryParams.search) {
                this.blogService.search(this.snap.queryParams.page, this.snap.queryParams.search, this.snap.queryParams.category, this.snap.queryParams.sort);
                this.queries.search = this.snap.queryParams.search;
            }
            else {
                this.blogService.getFilteredBlogs(this.snap.queryParams.page, this.snap.queryParams.category, this.snap.queryParams.sort);
            }
            
            this.setProps(this.filters, this.snap.queryParams.category, this.snap.queryParams.sort, this.snap.queryParams.page);
            this.setProps(this.queries, this.snap.queryParams.category, this.snap.queryParams.sort, this.snap.queryParams.page);
        }

        //if route doesn't exist or is changed to page outside of bounds
        if((this.snap.fragment == null && +this.snap.queryParams.page) || +this.snap.queryParams.page <= 0) {
            this.blogService.setPage('1');
        }

        if(this.snap.queryParams.page === '1' || !this.snap.queryParams.page) 
            this.disablePrevious = true;
        //checking if I am in the home page of blogs module, if I am not, do not show certain content
        this.altRoute = this.snap.firstChild == null ? false : true;
    }

    //function to set properties of search result object
    setSearchResult(prop1: boolean, prop2: boolean, prop3: string, prop4: string): void {
        this.searchResult = {
            searched: prop1,
            found: prop2,
            resultPhrase: prop3,
            result: prop4
        };
    }

    //use to set properties of filters and queries objects
    setProps(obj: any, category: string, sort: string, page?: string): void {
        for(let x in obj) {
            switch(x) {
                case 'category':
                    obj[x] = category;
                    break;
                case 'sort':
                    obj[x] = sort;
                    break;
                case 'page':
                    if(page)
                        obj[x] = page;
                    break;
                default: 
                    break;
            }
        }
    }

    search(q: NgForm): void {
        this.setProps(this.queries, this.filters.category, this.filters.sort);
        this.queries.search = this.query;
        this.getBlogHelper('1');
        q.reset();
    }

    filter(r: NgForm): void {
        if(r.pristine !== true) {
            let cat = this.filters.category;
            let sor = this.filters.sort;

            this.blogService.setPage(this.filters.page, this.filters.category, this.filters.sort);

            this.setProps(this.filter, cat, sor);
        }
    }
    //clearing the result phrase from page and resetting the results to other values dependent on filters
    clearResult() {
        this.setSearchResult(false, false, '', '');
        this.queries.page = '1';
        this.queries.search = '';
        this.disablePrevious = true;
        this.getBlogHelper(this.queries.page);
    }

    //method to route to blog list item component
    handleRoute(id: any): void {
        if(this.queries.category == '') {
            this.setProps(this.queries, this.filters.category, this.filters.sort);
        }
        //checking if there is no search query or if the search query has no results
        if(this.queries.search.length == 0 || this.queries.search.match(this.errorQuery)) {
            this.queries.search = '';
            this.router.navigate(
            ['/blog', 'article'], { 
                fragment: id.toString(), 
                queryParams: { 
                    page: this.queries.page, 
                    category: this.queries.category, 
                    sort: this.queries.sort
                 } });

        } else {
            this.router.navigate(
                ['/blog', 'article'], { 
                    fragment: id.toString(), 
                    queryParams: { 
                        page: this.queries.page, 
                        category: this.queries.category, 
                        sort: this.queries.sort,
                        search: this.queries.search
                     } });
        }
        
    }

    //this handles the setting of the url with query paramters
    getBlogHelper(page: string): void {
        const catQuerDefault = /general|how-to/;
        const sortQuerDefault = /oldest|ascend|descend/;

        if(this.queries.search.length > 0) 
        {
            this.blogService.setPage(page, this.filters.category, this.filters.sort, this.queries.search);
        } 
        else if(this.filters.category.match(catQuerDefault) || this.filters.sort.match(sortQuerDefault)) 
        {
            this.blogService.setPage(page, this.filters.category, this.filters.sort);
        } 
        else
        {
            this.blogService.setPage(page);
        }
       
    }

    previousPage(): void {
        if(!this.disablePrevious) {
            this.queries.page = (+this.route.snapshot.queryParams.page - 1).toString();
            this.getBlogHelper(this.queries.page);
        }
        if(this.queries.page == '1')
            this.disablePrevious = true;
    }

    nextPage(): void {
        if(!this.disableNext) {
            this.queries.page = (+this.route.snapshot.queryParams.page + 1).toString();
            this.getBlogHelper(this.queries.page);

            if(+this.queries.page > 1)
                this.disablePrevious = false;   
        }    
    }

    ngOnDestroy(): void {
        this.getBlogs.unsubscribe();
        if(this.routerSub)
            this.routerSub.unsubscribe();
    }
}