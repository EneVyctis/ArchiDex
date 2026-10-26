import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArchimonstreService } from '../../archimonstre.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-archimonstre-profile',
  styles: ``,
  templateUrl: './archimonstre-profile.html',
})
export class ArchimonstreProfile {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly archimonstreService = inject(ArchimonstreService);

  private readonly archimonstreId = Number(this.route.snapshot.paramMap.get('id'));

  private readonly archimonstreResponse = toSignal(this.archimonstreService.getArchimonstreByID(this.archimonstreId).pipe(
    map((archi) => ({ value: archi, error: undefined})),
    catchError((error) => of({value: undefined, error}))
  ));

  readonly loading = computed(() => this.archimonstreResponse === undefined);
  readonly error = computed(() => this.archimonstreResponse()?.error != undefined)

  readonly archimonstre = computed(() => this.archimonstreResponse()?.value);

  deleteArchimonstre() {
    // Send a delete request to the back-end watch for the response. Redirect to home page after successful deletion.
    this.archimonstreService.deleteArchimonstre(this.archimonstreId).subscribe(() => {
        this.router.navigate(['/archimonstres'])
    })
  }
}
