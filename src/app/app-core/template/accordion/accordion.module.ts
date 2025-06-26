import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AccordionBodyComponent, AccordionComponent, AccordionHeaderComponent, AccordionItemComponent } from "./accordion.component";


@NgModule({
    declarations: [
        AccordionComponent,
        AccordionItemComponent,
        AccordionHeaderComponent,
        AccordionBodyComponent
    ],
    imports: [

    ],
    exports: [
        AccordionComponent,
        AccordionItemComponent,
        AccordionHeaderComponent,
        AccordionBodyComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccordionModule { }