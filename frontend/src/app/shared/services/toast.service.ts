import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Toast {
  title: string;
  message: string;
  color: string;
  autohide: boolean;
  delay: number;
  closeButton: boolean;
}

@Injectable({
  providedIn: "root",
})
export class ToastService {
  toasts$: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);

  show(toast: Toast) {
    const currentToasts = this.toasts$.getValue();
    this.toasts$.next([...currentToasts, toast]);
  }

  remove(toast: Toast) {
    const currentToasts = this.toasts$.getValue();
    this.toasts$.next(currentToasts.filter((t) => t !== toast));
  }
}
