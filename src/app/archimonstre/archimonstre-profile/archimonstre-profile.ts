import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArchimonstreService } from '../../archimonstre.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-archimonstre-profile',
  styles: ``,
  templateUrl: './archimonstre-profile.html',
})
export class ArchimonstreProfile {
  private readonly route = inject(ActivatedRoute);
  private readonly archimonstreService = inject(ArchimonstreService);

  private readonly archimonstreId = Number(this.route.snapshot.paramMap.get('id'));

  readonly archimonstre = toSignal(this.archimonstreService.getArchimonstreByID(this.archimonstreId));
}
