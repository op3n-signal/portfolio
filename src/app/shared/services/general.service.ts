import { Location } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class GeneralService {
    constructor(private location: Location) {}

    goBack(): void {
        this.location.back();
    }
}