import { Component, effect, inject, signal } from '@angular/core';
import { ArchimonstreService } from '../../archimonstre.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ARCHIMONSTRE_RULES, getArchimonstreColor} from '../../archimonstre.model';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-archimonstre-edit',
  styles: ``,
  templateUrl: './archimonstre-edit.html',
})
export class ArchimonstreEdit {
  readonly route = inject(ActivatedRoute);
  readonly archiService = inject(ArchimonstreService);
  readonly archimonstreiD = signal(
    Number(this.route.snapshot.paramMap.get('id'))
  ).asReadonly();
  readonly archimonstre = toSignal(
    this.archiService.getArchimonstreByID(this.archimonstreiD())
  );
  readonly ARCHIMONSTRE_RULES = ARCHIMONSTRE_RULES;
  
  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(ARCHIMONSTRE_RULES.MIN_NAME),
      Validators.maxLength(ARCHIMONSTRE_RULES.MAX_NAME),
      Validators.pattern(ARCHIMONSTRE_RULES.NAME_PATTERN)
    ]),
    life: new FormControl(),
    damage: new FormControl(),
    resistances: new FormArray([],[
      Validators.required,
      Validators.maxLength(ARCHIMONSTRE_RULES.MAX_RES),
      Validators.minLength(ARCHIMONSTRE_RULES.MIN_RES)
    ])
  })

  constructor() {
    effect(() => {
      const archi = this.archimonstre();

      if(archi) { 
        this.form.patchValue({
          name: archi.name,
          life: archi.life,
          damage: archi.damage,
        });

        archi.resistances.forEach((res) => this.archimonstreResistanceList.push(new FormControl(res)));
      }
    })
  }

  get archimonstreResistanceList(): FormArray {
    return this.form.get('resistances') as FormArray;
  }

  get archimonstreName(): FormControl {
    return this.form.get('name') as FormControl;
  }
  
  get archimonstreLife(): FormControl {
    return this.form.get('life') as FormControl;
  }

  get archimonstreDamage(): FormControl {
    return this.form.get('damage') as FormControl;
  }

  incrementLife() {
    const newValue = this.archimonstreLife.value + 100;
    this.archimonstreLife.setValue(newValue);
  }

  decrementLife() {
    const newValue = this.archimonstreLife.value - 100;
    this.archimonstreLife.setValue(newValue);
  }

  incrementDamage() {
    const newValue = this.archimonstreDamage.value + 10;
    this.archimonstreDamage.setValue(newValue);
  }

  decrementDamage() {
    const newValue = this.archimonstreDamage.value - 10;
    this.archimonstreDamage.setValue(newValue);
  }


  isArchimonstreResistanceSelected(res: string): boolean {
    return !!this.archimonstreResistanceList.controls.find((control) => control.value === res)
  }

  getArchimonstreResistanceColor(res: string): string {
    return getArchimonstreColor(res);
  }

  onArchimonstreResistanceChange(res: string, isChecked: boolean){
    if(isChecked) {
      const control = new FormControl(res);
      this.archimonstreResistanceList.push(control);
    } else {
      const index = this.archimonstreResistanceList.controls.map((control) => control.value).indexOf(res);

      this.archimonstreResistanceList.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
