import {Component, Inject, Input, OnInit} from '@angular/core';
import {TypeModal} from '../../../enums/modals.enum';
import {Lawyer} from '../../../models/lawyer.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LawyersService} from '../../../services/lawyers.service';
import Swal from 'sweetalert2';
import {SwalTool} from '../../../tools/swal.tool';

@Component({
  selector: 'app-add-edit-lawyer',
  templateUrl: './add-edit-lawyer.component.html',
  styleUrls: ['./add-edit-lawyer.component.css']
})
export class AddEditLawyerComponent implements OnInit {

  @Input() title: string;
  @Input() type: TypeModal;
  @Input() lawyer: Lawyer;
  public addEditLawyerForm: FormGroup;
  private emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public loading = false;
  public imageToUpload: File;

  constructor(public dialogRef: MatDialogRef<AddEditLawyerComponent>,
              private fb: FormBuilder,
              private lawyerService: LawyersService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addEditLawyerForm = this.fb.group({
      name: ['', [Validators.required]],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.pattern(this.emailRegex)]],
      professional_card: [null]
    });

    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if (this.type === TypeModal.SHOW) {
          this.addEditLawyerForm.disable();
        }

        this.addEditLawyerForm.patchValue({
          name: this.lawyer.name,
          document_type: this.lawyer.document_type,
          document_number: this.lawyer.document_number,
          phone: this.lawyer.phone,
          email: this.lawyer.email
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditLawyerForm.get(field);
  }

  registerUpdateLawyer(): void {
    if (this.addEditLawyerForm.valid) {
      const name = this.getFormField('name').value;
      if (this.type === TypeModal.CREATE) {
        this.loading = true;
        this.lawyerService.createLawyer(this.addEditLawyerForm.value, this.imageToUpload)
          .subscribe(resp => {
            this.loading = false;
            SwalTool.onMessage('Abogado agregado', `El abogado ${name} fue agregado correctamente`);
            this.dialogRef.close('YES');
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo agregar el abogado');
          });
      } else {
        this.loading = true;
        this.lawyerService.updateLawyer(this.addEditLawyerForm.value, this.lawyer.id, this.imageToUpload)
          .subscribe(resp => {
            this.loading = false;
            SwalTool.onMessage('Abogado actualizado', `El abogado ${name} fue actualizado correctamente`);
            this.dialogRef.close('YES');
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo actualizar el abogado');
          });
      }
    }
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.addEditLawyerForm.patchValue({file});
      this.imageToUpload = file;
    }
  }

}
