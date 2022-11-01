import { inject, Injectable } from '@angular/core';
import { LumberjackLevel, LumberjackService } from '@ngworker/lumberjack';

@Injectable({ providedIn: 'root' })
export class Logger {
  #lumberjack = inject(LumberjackService);

  info(message: string) {
    this.#lumberjack.log({
      message: message,
      level: LumberjackLevel.Info,
      createdAt: new Date().getTime(),
    });
  }
}
