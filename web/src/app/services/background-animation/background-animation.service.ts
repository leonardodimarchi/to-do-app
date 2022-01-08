import { Injectable } from '@angular/core';
import WAVES from 'vanta/dist/vanta.waves.min';
import { BackgroundWaveOptions } from '../../models/interfaces/background-wave-options.interface';

@Injectable({
  providedIn: 'root'
})
export class BackgroundAnimationService {
  public addWaveEffect(elementToApply: HTMLElement, options: BackgroundWaveOptions): void {
    WAVES({
      el: elementToApply,
      ...options
    });
  }
}
