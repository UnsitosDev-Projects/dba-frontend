import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = signal(0);
  isLoading = signal(false);

  show() {
    this.loadingCount.update(count => count + 1);
    this.isLoading.set(true);
  }

  hide() {
    this.loadingCount.update(count => {
      const newCount = Math.max(0, count - 1);
      if (newCount === 0) {
        this.isLoading.set(false);
      }
      return newCount;
    });
  }

  reset() {
    this.loadingCount.set(0);
    this.isLoading.set(false);
  }
}
