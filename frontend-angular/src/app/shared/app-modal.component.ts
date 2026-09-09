import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.css'
})
export class AppModalComponent {
  readonly open = input(false);
  readonly title = input.required<string>();
  readonly labelledBy = input.required<string>();
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.open()) this.closed.emit();
  }
}
