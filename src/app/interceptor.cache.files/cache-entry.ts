import { HttpResponse } from '@angular/common/http';

export interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  entryTime: number;
}

export const MAX_CACHE_AGE = 2000; // in milliseconds
