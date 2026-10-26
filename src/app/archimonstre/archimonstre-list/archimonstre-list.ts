import { Component, computed, inject, signal } from '@angular/core';
import { ArchimonstreService } from '../../archimonstre.service';
import { Archimonstre } from '../../archimonstre.model';
import { ArchimonstreBorder } from '../../archimonstre-border';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [ArchimonstreBorder, DatePipe, RouterLink],
  selector: 'app-archimonstre-list',
  styles: ``,
  templateUrl: './archimonstre-list.html',
})
export class ArchimonstreList {
  private readonly archimonstreService = inject(ArchimonstreService);
  readonly searchTerm = signal('')
  readonly archimonstreList = toSignal(this.archimonstreService.getArchimonstreList(), {
    initialValue: [],
  });
  readonly archimonstreListFiltered = computed(() => {
    const searchTerm = this.searchTerm();
    const archimonstreList = this.archimonstreList();

    return archimonstreList.filter(archi => archi.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  })

  readonly loading = computed(() => this.archimonstreList().length == 0);

  incrementLife(archi: Archimonstre){
    archi.life += 100;
  }

  decrementLife(archi: Archimonstre){
    archi.life -= 100;
  }

  difficulty(archi: Archimonstre) : number {
    if(archi.life >= 5000){
      return 150;
    }

    if(archi.life < 1000) {
      return 50;
    }

    return 100;
  }
}
