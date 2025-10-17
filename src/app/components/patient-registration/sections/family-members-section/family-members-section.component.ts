import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FamilyMember } from '../../../../models/patient.model';

@Component({
  selector: 'app-family-members-section',
  imports: [FormsModule],
  templateUrl: './family-members-section.component.html',
  styleUrl: './family-members-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilyMembersSectionComponent {
  initialData = input<FamilyMember[]>();
  dataChange = output<FamilyMember[]>();

  familyMembers = signal<FamilyMember[]>([]);

  constructor() {
    effect(() => {
      const initial = this.initialData();
      if (initial && initial.length > 0) {
        this.familyMembers.set(initial);
      }
    });
    
    // Emitir cambios iniciales (lista vacía es válida)
    this.emitChange();
  }

  addFamilyMember() {
    this.familyMembers.update((members) => [
      ...members,
      {
        name: '',
        relationship: '',
        age: 0,
        occupation: '',
      },
    ]);
  }

  removeFamilyMember(index: number) {
    this.familyMembers.update((members) => members.filter((_, i) => i !== index));
    this.emitChange();
  }

  updateFamilyMember(index: number, field: keyof FamilyMember, value: string | number) {
    this.familyMembers.update((members) => {
      const updated = [...members];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
    this.emitChange();
  }

  private emitChange() {
    const members = this.familyMembers();
    // Solo emitir si todos los miembros están completos
    const allValid = members.every(
      (m) => m.name && m.relationship && m.age > 0 && m.occupation
    );
    if (allValid || members.length === 0) {
      this.dataChange.emit(members);
    }
  }

  isMemberValid(member: FamilyMember): boolean {
    return !!(member.name && member.relationship && member.age > 0 && member.occupation);
  }
}

