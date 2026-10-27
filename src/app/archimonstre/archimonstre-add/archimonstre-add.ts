import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArchimonstreService } from '../../archimonstre.service';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Archimonstre, ARCHIMONSTRE_RULES, getArchimonstreColor } from '../../archimonstre.model';

@Component({
  imports: [RouterLink,ReactiveFormsModule],
  selector: 'app-archimonstre-add',
  styles: ``,
  templateUrl: './archimonstre-add.html',
})
export class ArchimonstreAdd {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly archimonstreService = inject(ArchimonstreService);
  readonly ARCHIMONSTRE_RULES = ARCHIMONSTRE_RULES;
  readonly archimonstre = computed<Omit<Archimonstre, 'id'>>(() => {
      return {
        // Copies each archi properties, and the overwrites what needs to be.
        name: this.archimonstreName.value,
        life: this.archimonstreLife.value,
        damage: this.archimonstreDamage.value,
        resistances: this.archimonstreResistanceList.value,
        picture: this.archimonstrePicture.value,
        created: new Date()
      };
  });
  readonly addForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(ARCHIMONSTRE_RULES.MIN_NAME),
      Validators.maxLength(ARCHIMONSTRE_RULES.MAX_NAME),
      Validators.pattern(ARCHIMONSTRE_RULES.NAME_PATTERN)
    ]),
    picture: new FormControl('',
      Validators.required
    ),
    life: new FormControl(3000),
    damage: new FormControl(250),
    resistances: new FormArray([new FormControl('neutre')],[
      Validators.required,
      Validators.maxLength(ARCHIMONSTRE_RULES.MAX_RES),
      Validators.minLength(ARCHIMONSTRE_RULES.MIN_RES)
    ])
  });

  get archimonstreName(): FormControl {
    return this.addForm.get('name') as FormControl;
  }

  get archimonstreLife(): FormControl {
    return this.addForm.get('life') as FormControl;
  }

  get archimonstreDamage(): FormControl {
    return this.addForm.get('damage') as FormControl;
  }

  get archimonstreResistanceList(): FormArray {
    return this.addForm.get('resistances') as FormArray;
  }

  get archimonstrePicture(): FormControl {
    return this.addForm.get('picture') as FormControl;
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

  isArchimonstreResistanceSelected(res: string): boolean {
    return !!this.archimonstreResistanceList.controls.find((control) => control.value === res)
  }

  onSubmit() {

    const isFormValid = this.addForm.valid;

    //Mark name and picture as dirty to allow error messages for invalid fields.
    this.archimonstreName.markAsDirty();
    this.archimonstrePicture.markAsDirty();


    // Check if the form is valid
    if(isFormValid) {
      const  archimonstre: Omit<Archimonstre, 'id'> = {
        // Copies each archi properties, and the overwrites what needs to be.
        name: this.archimonstreName.value,
        life: this.archimonstreLife.value,
        damage: this.archimonstreDamage.value,
        resistances: this.archimonstreResistanceList.value,
        picture: this.archimonstrePicture.value,
        created: new Date()
      };

      // Redirect to the profile page
      this.archimonstreService.addArchimonstre(archimonstre).subscribe((archiAdded) => {
        this.router.navigate(['/archimonstres', archiAdded.id]);
      })
    }
  }

}
