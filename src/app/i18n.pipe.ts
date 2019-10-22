import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'i18n'
})
export class I18nPipe implements PipeTransform {
  translation: string;

  async transform(term: string, language: string) {
    await import(`../assets/i18n/a.${language}.json`)
      .then(result => this.translation = result.default[term]);

    return this.translation;
  }
}
