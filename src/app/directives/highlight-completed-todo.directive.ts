import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appHighlightCompletedTodo]',
})
export class HighlightCompletedTodoDirective {
    @Input() isCompleted: boolean = false;

    constructor(private el: ElementRef) {}

    ngOnChanges() {
        this.updateStyles();
    }

    private updateStyles() {
        if (this.isCompleted) {
            this.el.nativeElement.style.textDecoration = 'line-through';
            this.el.nativeElement.style.backgroundColor = '#d3f9d8';
            this.el.nativeElement.style.color = '#6c757d';
        } else {
            this.el.nativeElement.style.textDecoration = 'none';
            this.el.nativeElement.style.backgroundColor = 'transparent';
            this.el.nativeElement.style.color = 'black';
        }
    }
}
