import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

import { BlogListItemComponent } from "./blog-list-item/blog-list-item.component";
import { BlogComponent } from "./blog.component";
import { WriteComponent } from './write/write.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    { path: '', component: BlogComponent, children: [
        { path: 'write', component: WriteComponent },
        { path: 'article', component: BlogListItemComponent },
        { path: 'edit', component: EditComponent }
      ]}
];

@NgModule({
    declarations: [
        BlogComponent,
        WriteComponent,
        BlogListItemComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})

export class BlogModule {}