import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { TaskApiService } from '../../services/taskApi.service';
import ITaskFull from '../../../../entities/dtos/taskFull.dto.js';
import { ePriority, eStatsLabel } from '../../../../entities/global.enum';
import cronstrue from 'cronstrue';
import { StatApiService } from '../../services/statApi.service';
import ISuccessReturn from '../../../../entities/dtos/successReturn.dto';
import { IntervalVarApiService } from '../../services/internalVarApi.service';
import ITaskCustomVar from '../../../../entities/ientities/icustomvar.entity';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import ITaskCore from '../../../../entities/dtos/taskCore.dto';

@Component({
  selector: 'app-task-data-view-page',
  templateUrl: './task-data-view.page.html',
  styleUrls: ['./task-data-view.page.scss'],
})
export class TaskDataViewPage implements OnInit {
  priority = ePriority;
  statsLabel = eStatsLabel;
  id: string;
  taskFull: ITaskFull;
  taskCore: ITaskCore;
  cronString: string = '';
  buttonSaveDisabled = true;
  coreSettingsForm: FormGroup;
  isFormValid: boolean = true;

  constructor(
    private taskApiService: TaskApiService,
    private statApiService: StatApiService,
    private internalVarApiService: IntervalVarApiService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.taskFull = {} as ITaskFull;
    this.taskCore = {} as ITaskCore;

    this.coreSettingsForm = this.formBuilder.group({
      cron: ['', [Validators.required, this.customCronValidator()]],
      delayEnabled: [null, [Validators.required]],
      delayMin: [null, [Validators.required, Validators.min(0)]],
      delayMax: [true, [Validators.required, Validators.min(0)]],
      priority: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.taskApiService.getFull(this.id).subscribe({
      next: (res) => {
        this.taskFull = res;
        this.cronString = cronstrue.toString(this.taskFull.cron);
        this.taskCore.id = this.taskFull.id;
        this.taskCore.name = this.taskFull.name;
        this.taskCore.cron = this.taskFull.cron;
        this.taskCore.delay = { ...this.taskFull.delay };
        this.taskCore.priority = this.taskFull.priority;
        //
        this.coreSettingsForm.patchValue({
          cron: this.taskCore.cron,
          delayEnabled: this.taskCore.delay.enabled,
          delayMin: this.taskCore.delay.minDelay,
          delayMax: this.taskCore.delay.maxDelay,
          priority: this.taskCore.priority,
        });
        if (this.taskCore.delay.enabled === false) {
          this.coreSettingsForm.controls['delayMin'].disable();
          this.coreSettingsForm.controls['delayMax'].disable();
        }
      },
      error: (err) => console.error(err),
    });
  }

  customCronValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      let isValid = false;
      try {
        cronstrue.toString(value);
        isValid = true;
      } catch {
        isValid = false;
      }
      return !isValid ? { invalidCronString: true } : null;
    };
  }

  onFormChange() {
    if (this.coreSettingsForm.value.delayEnabled === false) {
      this.coreSettingsForm.controls['delayMin'].disable();
      this.coreSettingsForm.controls['delayMax'].disable();
    } else {
      this.coreSettingsForm.controls['delayMin'].enable();
      this.coreSettingsForm.controls['delayMax'].enable();
    }

    if (
      this.coreSettingsForm.value.cron !== this.taskCore.cron ||
      this.coreSettingsForm.value.delayEnabled !==
        this.taskCore.delay.enabled ||
      this.coreSettingsForm.value.priority !== this.taskCore.priority ||
      (this.coreSettingsForm.value.delayEnabled &&
        (this.coreSettingsForm.value.delayMin !==
          this.taskCore.delay.minDelay ||
          this.coreSettingsForm.value.delayMax !==
            this.taskCore.delay.maxDelay))
    ) {
      this.buttonSaveDisabled = false;
    } else {
      this.buttonSaveDisabled = true;
    }
  }

  resetStat(statName: eStatsLabel): void {
    this.statApiService.reset(this.id, statName).subscribe({
      next: (res: ISuccessReturn) => {
        const typedStatName = statName as keyof typeof eStatsLabel;
        (this.taskFull.statistics[typedStatName] as any) = 0;
      },
    });
  }

  resetInternVar(internVarName: string): void {
    this.internalVarApiService.reset(this.id, internVarName).subscribe({
      next: (res: ISuccessReturn) => {
        const index = this.taskFull.internals.findIndex(
          (item) => item.name === internVarName
        );
        if (index !== -1) {
          this.taskFull.internals[index].value = '';
        }
      },
    });
  }

  updateInternVar(internVarName: string, internVarValue: string): void {
    const payload: ITaskCustomVar = {
      name: internVarName,
      value: internVarValue,
    };
    this.internalVarApiService.update(this.id, payload).subscribe({
      next: (res: ISuccessReturn) => {
        const index = this.taskFull.internals.findIndex(
          (item) => item.name === internVarName
        );
        if (index !== -1) {
          this.taskFull.internals[index].value = internVarValue;
        }
      },
    });
  }

  deleteInternVar(internVarName: string): void {
    this.internalVarApiService.delete(this.id, internVarName).subscribe({
      next: (res: ISuccessReturn) => {
        const index = this.taskFull.internals.findIndex(
          (item) => item.name === internVarName
        );
        if (index !== -1) {
          this.taskFull.internals.splice(index, 1);
        }
      },
    });
  }

  updateCronPreview(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    try {
      this.cronString = cronstrue.toString(newValue);
    } catch {
      this.cronString = '';
    }
  }

  goToHome() {
    this.router.navigateByUrl(`/`);
  }

  submitForm() {
    if (!this.coreSettingsForm.valid) {
      this.isFormValid = false;
      return;
    }
    this.isFormValid = true;

    const newSettings: ITaskCore = {
      id: this.id,
      name: this.taskFull.name,
      cron: this.coreSettingsForm.value.cron,
      delay: {
        enabled: this.coreSettingsForm.value.delayEnabled,
        minDelay: this.coreSettingsForm.value.delayMin || 0,
        maxDelay: this.coreSettingsForm.value.delayMax || 0,
      },
      priority: this.coreSettingsForm.value.priority,
    };

    this.taskApiService.update(this.id, newSettings).subscribe({
      next: (res: ISuccessReturn) => {
        this.router.navigateByUrl(`/`);
      },
    });

    console.log(newSettings);
  }
}
